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

const SKY_GRID = {
  columns: 24,
  rows: 13
};

const SKY_PALETTES = {
  morning: [
    ["#4AC6FD", "#55C3F6", "#63BFF0"],
    ["#5DC1F4", "#6ABEEB", "#78B9E4"],
    ["#76B9E4", "#84B5DC", "#91B0D4"],
    ["#8EB1D5", "#9DACCA", "#ACA7C0"],
    ["#A9A7C0", "#B9A1B4", "#C69CA8"],
    ["#C69CA8", "#D49698", "#DE9088"],
    ["#DD9088", "#E98A76", "#F08466"],
    ["#EF8466", "#F47F52", "#F77C3E"],
    ["#F77C3E", "#FB7926", "#FE7801"],
    ["#FE7801", "#F98214", "#F28B25"],
    ["#FE7801", "#F5740A", "#EA6E18"],
    ["#FE7801", "#FF8A19", "#F06D12"],
    ["#FE7801", "#FF8212", "#F06A08"]
  ],
  evening: [
    ["#6B5272", "#72536F", "#7A546E"],
    ["#75536F", "#80546C", "#8A566D"],
    ["#84556C", "#91576D", "#9B5A70"],
    ["#93586E", "#A05A70", "#A95D73"],
    ["#A15B70", "#AE5E73", "#B76176"],
    ["#B35F75", "#BE6278", "#C8657A"],
    ["#C36578", "#CD6779", "#D36A79"],
    ["#D16A78", "#DA6874", "#E06770"],
    ["#E06770", "#E7606A", "#E35965"],
    ["#E35965", "#D95D6B", "#CC6070"],
    ["#E35965", "#EA6671", "#D95768"],
    ["#E35965", "#F06E73", "#D95363"],
    ["#E35965", "#EC6570", "#D84F5E"]
  ]
};

const DAY_CLOUD_SCALE = 0.4;

const DAY_CLOUDS = [
  { src: "./assets/cloud1.png", width: 416 },
  { src: "./assets/cloud2.png", width: 240 },
  { src: "./assets/cloud3.png", width: 384 },
  { src: "./assets/cloud4.png", width: 288 },
  { src: "./assets/cloud5.png", width: 160 }
];

const DAY_CLOUD_LAYOUTS = {
  page: [
    { top: "4vh", start: "-260px", end: "calc(100vw + 260px)", duration: "98s", delay: "-64s" },
    { top: "14vh", start: "-260px", end: "calc(100vw + 260px)", duration: "86s", delay: "-24s" },
    { top: "24vh", start: "-260px", end: "calc(100vw + 260px)", duration: "112s", delay: "-92s" },
    { top: "34vh", start: "-260px", end: "calc(100vw + 260px)", duration: "91s", delay: "-48s" },
    { top: "44vh", start: "-260px", end: "calc(100vw + 260px)", duration: "119s", delay: "-18s" },
    { top: "54vh", start: "-260px", end: "calc(100vw + 260px)", duration: "104s", delay: "-76s" },
    { top: "64vh", start: "-260px", end: "calc(100vw + 260px)", duration: "88s", delay: "-34s" },
    { top: "74vh", start: "-260px", end: "calc(100vw + 260px)", duration: "108s", delay: "-58s" },
    { top: "84vh", start: "-260px", end: "calc(100vw + 260px)", duration: "95s", delay: "-12s" }
  ],
  stage: [
    { top: "6%", start: "-220px", end: "calc(100% + 220px)", duration: "42s", delay: "-21s" },
    { top: "29%", start: "-220px", end: "calc(100% + 220px)", duration: "36s", delay: "-8s" },
    { top: "52%", start: "-220px", end: "calc(100% + 220px)", duration: "46s", delay: "-33s" },
    { top: "75%", start: "-220px", end: "calc(100% + 220px)", duration: "39s", delay: "-17s" }
  ]
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

let currentTheme = "";
let pixelSkyElement = null;
let stageSkyElement = null;
let cloudFieldElement = null;
let stageCloudFieldElement = null;
let themeOverride = null;

document.addEventListener("DOMContentLoaded", () => {
  setupTimeTheme();

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

function setupTimeTheme() {
  ensurePixelSky();
  ensureStageSky();
  ensureDayClouds();
  bindThemeSwitcher();
  applyTimeTheme();
  window.setInterval(applyTimeTheme, 60000);
}

function applyTimeTheme(date = new Date()) {
  const theme = themeOverride || getTimeTheme(date);

  document.body.classList.remove("theme-morning", "theme-day", "theme-evening", "theme-night");
  document.body.classList.add(`theme-${theme}`);

  if (theme !== currentTheme) {
    renderPixelSky(theme);
    currentTheme = theme;
  }

  updateThemeSwitcherState();
}

function bindThemeSwitcher() {
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.themeToggle;
      themeOverride = value === "auto" ? null : value;
      currentTheme = "";
      applyTimeTheme();
    });
  });
}

function updateThemeSwitcherState() {
  const activeValue = themeOverride || "auto";

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    const isSelected = button.dataset.themeToggle === activeValue;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function getTimeTheme(date) {
  const hour = date.getHours();

  if (hour >= 6 && hour < 12) {
    return "morning";
  }

  if (hour >= 12 && hour < 18) {
    return "day";
  }

  if (hour >= 18 && hour < 23) {
    return "evening";
  }

  return "night";
}

function ensurePixelSky() {
  if (pixelSkyElement) {
    return;
  }

  pixelSkyElement = document.createElement("div");
  pixelSkyElement.className = "pixel-sky";
  pixelSkyElement.setAttribute("aria-hidden", "true");

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < SKY_GRID.columns * SKY_GRID.rows; i += 1) {
    const pixel = document.createElement("span");
    pixel.className = "sky-pixel";
    fragment.appendChild(pixel);
  }

  pixelSkyElement.appendChild(fragment);
  document.body.prepend(pixelSkyElement);
}

function ensureStageSky() {
  if (stageSkyElement) {
    return;
  }

  stageSkyElement = document.getElementById("stageSky");

  if (!stageSkyElement) {
    return;
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < SKY_GRID.columns * SKY_GRID.rows; i += 1) {
    const pixel = document.createElement("span");
    pixel.className = "sky-pixel";
    fragment.appendChild(pixel);
  }

  stageSkyElement.appendChild(fragment);
}

function ensureDayClouds() {
  cloudFieldElement = document.getElementById("cloudField");
  stageCloudFieldElement = document.getElementById("stageCloudField");

  renderDayClouds(cloudFieldElement, DAY_CLOUD_LAYOUTS.page);
  renderDayClouds(stageCloudFieldElement, DAY_CLOUD_LAYOUTS.stage);
}

function renderDayClouds(element, layouts) {
  if (!element || element.children.length > 0) {
    return;
  }

  getCloudSequence(layouts.length).forEach((asset, index) => {
    const cloud = document.createElement("img");
    const layout = layouts[index % layouts.length];

    cloud.className = "day-cloud";
    cloud.src = asset.src;
    cloud.alt = "";
    cloud.decoding = "async";
    cloud.loading = "eager";
    cloud.setAttribute("aria-hidden", "true");
    cloud.style.setProperty("--cloud-top", layout.top);
    cloud.style.setProperty("--cloud-width", `${Math.round(asset.width * DAY_CLOUD_SCALE)}px`);
    cloud.style.setProperty("--cloud-start", layout.start);
    cloud.style.setProperty("--cloud-end", layout.end);
    cloud.style.setProperty("--cloud-duration", layout.duration);
    cloud.style.setProperty("--cloud-delay", layout.delay);

    element.appendChild(cloud);
  });
}

function getCloudSequence(count) {
  const sequence = [];

  while (sequence.length < count) {
    sequence.push(...shuffleArray(DAY_CLOUDS));
  }

  return sequence.slice(0, count);
}

function shuffleArray(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function renderPixelSky(theme) {
  const palette = SKY_PALETTES[theme];

  if (!palette) {
    return;
  }

  renderSkyPixels(pixelSkyElement, palette, theme);
  renderSkyPixels(stageSkyElement, palette, theme);
}

function renderSkyPixels(element, palette, theme) {
  if (!element) {
    return;
  }

  Array.from(element.children).forEach((pixel, index) => {
    const row = Math.floor(index / SKY_GRID.columns);
    const column = index % SKY_GRID.columns;
    pixel.style.backgroundColor = getSkyPixelColor(palette, row, column, theme);
  });
}

function getSkyPixelColor(palette, row, column, theme) {
  const rowColors = palette[Math.min(row, palette.length - 1)];
  const themeShift = theme === "morning" ? 5 : 7;
  const colorIndex = Math.abs((row * themeShift + column * 3 + row * column) % rowColors.length);

  return rowColors[colorIndex];
}

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
