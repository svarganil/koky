const DEFAULT_TIMES = {
  room: {
    soft: { "СВ": "5:00", "С0": "4:30", "С1": "4:10", "С2": "3:40", "С3": "3:10" },
    jammy: { "СВ": "6:10", "С0": "5:40", "С1": "5:10", "С2": "4:40", "С3": "4:10" },
    hard: { "СВ": "11:00", "С0": "10:20", "С1": "9:30", "С2": "8:40", "С3": "8:10" }
  },
  cold: {
    soft: { "СВ": "6:20", "С0": "5:40", "С1": "5:20", "С2": "4:40", "С3": "4:00" },
    jammy: { "СВ": "7:30", "С0": "6:50", "С1": "6:20", "С2": "5:40", "С3": "5:00" },
    hard: { "СВ": "12:20", "С0": "11:30", "С1": "10:40", "С2": "9:40", "С3": "8:50" }
  }
};

const LABELS = {
  temperature: {
    room: "Комнатная",
    cold: "Холодильник"
  },
  doneness: {
    soft: "Всмятку",
    jammy: "В мешочек",
    hard: "Вкрутую"
  }
};

const state = {
  doneness: "soft",
  size: "СВ",
  temperature: "room",
  totalSeconds: 0,
  remainingSeconds: 0,
  timerId: null,
  endAt: 0,
  running: false,
  finished: false,
  audioContext: null,
  alarmId: null
};

document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    setupScreen: document.getElementById("setupScreen"),
    timerScreen: document.getElementById("timerScreen"),
    selectedTime: document.getElementById("selectedTime"),
    recipePreview: document.getElementById("recipePreview"),
    startButton: document.getElementById("startButton"),
    chickenGif: document.getElementById("chickenGif"),
    timerState: document.getElementById("timerState"),
    timerTitle: document.getElementById("timerTitle"),
    timerDisplay: document.getElementById("timerDisplay"),
    timerRecipe: document.getElementById("timerRecipe"),
    progressBar: document.getElementById("progressBar"),
    pauseButton: document.getElementById("pauseButton"),
    resetButton: document.getElementById("resetButton"),
    alarmToast: document.getElementById("alarmToast")
  };

  document.querySelectorAll(".choice-button").forEach((button) => {
    button.addEventListener("click", () => {
      selectChoice(button);
      updatePreview(elements);
    });
  });

  elements.startButton.addEventListener("click", () => startTimer(elements));
  elements.pauseButton.addEventListener("click", () => togglePause(elements));
  elements.resetButton.addEventListener("click", () => resetTimer(elements));

  updatePreview(elements);
});

function selectChoice(button) {
  const group = button.dataset.group;
  const value = button.dataset.value;

  document.querySelectorAll(`[data-group="${group}"]`).forEach((item) => {
    item.classList.remove("is-selected");
    item.setAttribute("aria-pressed", "false");
  });

  button.classList.add("is-selected");
  button.setAttribute("aria-pressed", "true");
  state[group] = value;
}

function updatePreview(elements) {
  const time = getCurrentTime();
  elements.selectedTime.textContent = formatClock(parseTime(time));
  elements.recipePreview.textContent = getRecipeLabel();
}

function startTimer(elements) {
  stopAlarm(elements);
  initAudio();

  state.totalSeconds = parseTime(getCurrentTime());
  state.remainingSeconds = state.totalSeconds;
  state.endAt = Date.now() + state.remainingSeconds * 1000;
  state.running = true;
  state.finished = false;

  elements.setupScreen.classList.add("is-hidden");
  elements.timerScreen.classList.remove("is-hidden");
  elements.chickenGif.src = "./assets/gif/peck.gif";
  elements.chickenGif.alt = "Курица клюет";
  elements.timerState.textContent = "ВАРИМ";
  elements.timerTitle.textContent = "До готовности";
  elements.timerRecipe.textContent = getRecipeLabel();
  elements.pauseButton.textContent = "Пауза";

  tick(elements);
  state.timerId = window.setInterval(() => tick(elements), 250);
}

function togglePause(elements) {
  if (state.finished) {
    startTimer(elements);
    return;
  }

  if (state.running) {
    window.clearInterval(state.timerId);
    state.timerId = null;
    state.remainingSeconds = Math.max(0, Math.ceil((state.endAt - Date.now()) / 1000));
    state.running = false;
    elements.timerState.textContent = "ПАУЗА";
    elements.pauseButton.textContent = "Продолжить";
    return;
  }

  state.endAt = Date.now() + state.remainingSeconds * 1000;
  state.running = true;
  elements.timerState.textContent = "ВАРИМ";
  elements.pauseButton.textContent = "Пауза";
  tick(elements);
  state.timerId = window.setInterval(() => tick(elements), 250);
}

function resetTimer(elements) {
  window.clearInterval(state.timerId);
  state.timerId = null;
  state.running = false;
  state.finished = false;
  state.remainingSeconds = 0;

  stopAlarm(elements);
  elements.timerScreen.classList.add("is-hidden");
  elements.setupScreen.classList.remove("is-hidden");
  elements.progressBar.style.width = "0%";
}

function tick(elements) {
  state.remainingSeconds = Math.max(0, Math.ceil((state.endAt - Date.now()) / 1000));
  renderTimer(elements);

  if (state.remainingSeconds <= 0) {
    finishTimer(elements);
  }
}

function renderTimer(elements) {
  const elapsed = state.totalSeconds - state.remainingSeconds;
  const progress = state.totalSeconds > 0 ? (elapsed / state.totalSeconds) * 100 : 0;

  elements.timerDisplay.textContent = formatClock(state.remainingSeconds);
  elements.progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
}

function finishTimer(elements) {
  window.clearInterval(state.timerId);
  state.timerId = null;
  state.running = false;
  state.finished = true;
  state.remainingSeconds = 0;

  renderTimer(elements);
  elements.timerState.textContent = "ГОТОВО";
  elements.pauseButton.textContent = "Повторить";
  elements.chickenGif.src = "./assets/gif/cluck.gif";
  elements.chickenGif.alt = "Курица кудахчет";
  showToast(elements);
  playAlarm();
}

function getCurrentTime() {
  return DEFAULT_TIMES[state.temperature][state.doneness][state.size];
}

function getRecipeLabel() {
  return `${LABELS.doneness[state.doneness]} / ${state.size} / ${LABELS.temperature[state.temperature]}`;
}

function parseTime(time) {
  const [minutes, seconds] = time.split(":").map(Number);
  return minutes * 60 + seconds;
}

function formatClock(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function initAudio() {
  const AudioConstructor = window.AudioContext || window.webkitAudioContext;

  if (state.audioContext || !AudioConstructor) {
    return;
  }

  state.audioContext = new AudioConstructor();
  state.audioContext.resume();
}

function playAlarm() {
  let beeps = 0;
  beep();
  state.alarmId = window.setInterval(() => {
    beeps += 1;
    if (beeps >= 5) {
      window.clearInterval(state.alarmId);
      state.alarmId = null;
      return;
    }
    beep();
  }, 450);
}

function beep() {
  const audioContext = state.audioContext;
  if (!audioContext) {
    return;
  }

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(620, audioContext.currentTime);
  gain.gain.setValueAtTime(0.08, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.18);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.18);
}

function showToast(elements) {
  elements.alarmToast.classList.add("show");
  window.setTimeout(() => elements.alarmToast.classList.remove("show"), 3600);
}

function stopAlarm(elements) {
  if (state.alarmId) {
    window.clearInterval(state.alarmId);
    state.alarmId = null;
  }

  if (elements) {
    elements.alarmToast.classList.remove("show");
  }
}
