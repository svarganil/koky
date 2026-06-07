const STEPS = ["doneness", "size", "temp", "result"];

function iconSlot(id, size = "") {
  const sizeClass = size ? ` icon-slot--${size}` : "";
  return `<span class="icon-slot${sizeClass}" data-icon="${id}" aria-hidden="true"></span>`;
}

function optionImage(src, alt) {
  return `<img class="option-image" src="${src}" alt="${alt}" width="96" height="96" loading="lazy">`;
}

const state = {
  step: 0,
  doneness: null,
  size: null,
  temp: null,
};

let eggTimer = null;

const stepContainer = document.getElementById("step-container");
const btnBack = document.getElementById("btn-back");
const btnNext = document.getElementById("btn-next");
const wizardNav = document.querySelector(".wizard-nav");
const stepDots = document.querySelectorAll(".step-dot");

function render() {
  updateStepDots();
  const isResult = state.step === STEPS.length - 1;
  wizardNav.classList.toggle("hidden", isResult);
  btnBack.classList.toggle("hidden", state.step === 0);
  btnNext.classList.toggle("hidden", isResult);

  if (state.step === STEPS.length - 1) {
    renderResult();
    return;
  }

  const key = STEPS[state.step];
  const templates = {
    doneness: renderDoneness,
    size: renderSize,
    temp: renderTemp,
  };

  stepContainer.innerHTML = templates[key]();
  bindOptionClicks();
  updateNextButton();
}

function updateStepDots() {
  stepDots.forEach((dot, i) => {
    dot.classList.remove("active", "done");
    if (i < state.step) dot.classList.add("done");
    if (i === state.step) dot.classList.add("active");
  });
}

function renderDoneness() {
  return `
    <div class="step-label">Шаг 1 — Тип варки</div>
    <div class="options cols-3">
      ${Object.entries(LABELS.doneness).map(([key, val]) => `
        <button class="option-card${state.doneness === key ? " selected" : ""}" data-value="${key}">
          ${optionImage(val.image, val.name)}
          <div class="option-name">${val.name}</div>
          <div class="option-desc">${val.desc}</div>
        </button>
      `).join("")}
    </div>
  `;
}

function renderSize() {
  return `
    <div class="step-label">Шаг 2 — Размер яйца</div>
    <div class="options cols-5">
      ${Object.entries(LABELS.size).map(([key, name]) => `
        <button class="option-card size-card${state.size === key ? " selected" : ""}" data-value="${key}">
          <div class="option-name">${name}</div>
        </button>
      `).join("")}
    </div>
  `;
}

function renderTemp() {
  return `
    <div class="step-label">Шаг 3 — Температура яиц</div>
    <div class="options cols-2">
      ${Object.entries(LABELS.temp).map(([key, val]) => `
        <button class="option-card${state.temp === key ? " selected" : ""}" data-value="${key}">
          ${iconSlot(val.icon)}
          <div class="option-name">${val.name}</div>
          <div class="option-desc">${val.desc}</div>
        </button>
      `).join("")}
    </div>
  `;
}

function renderResult() {
  const timeStr = getCookTime(state.temp, state.doneness, state.size);
  const seconds = parseTime(timeStr);

  stepContainer.innerHTML = `
    <div class="result-screen">
      <div class="result-summary">
        <div class="summary-row">
          <span class="summary-label">Варка</span>
          <span class="summary-value">${LABELS.doneness[state.doneness].name}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Размер</span>
          <span class="summary-value">${LABELS.size[state.size]}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Температура</span>
          <span class="summary-value">${LABELS.temp[state.temp].name}</span>
        </div>
      </div>

      <div class="result-time">
        <div class="result-time-label">Время после закипания</div>
        <div class="result-time-value">${timeStr}</div>
        <div class="result-time-hint">Положите яйца в кипящую воду и запустите таймер</div>
        <div id="timer-mount"></div>
      </div>

      <div class="result-actions">
        <button class="btn btn-secondary" id="btn-restart">Новый расчёт</button>
      </div>
    </div>
  `;

  if (eggTimer) eggTimer.destroy();
  const mount = document.getElementById("timer-mount");
  eggTimer = new EggTimer(mount, seconds);

  document.getElementById("btn-restart").addEventListener("click", () => {
    state.step = 0;
    state.doneness = null;
    state.size = null;
    state.temp = null;
    if (eggTimer) eggTimer.destroy();
    eggTimer = null;
    render();
  });
}

function bindOptionClicks() {
  stepContainer.querySelectorAll(".option-card").forEach((card) => {
    card.addEventListener("click", () => {
      const key = STEPS[state.step];
      state[key] = card.dataset.value;

      stepContainer.querySelectorAll(".option-card").forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      updateNextButton();

      setTimeout(() => {
        if (state.step < STEPS.length - 2) {
          state.step++;
          render();
        } else if (state.step === STEPS.length - 2) {
          state.step++;
          render();
        }
      }, 300);
    });
  });
}

function updateNextButton() {
  const key = STEPS[state.step];
  btnNext.disabled = !state[key];
}

btnBack.addEventListener("click", () => {
  if (state.step > 0) {
    state.step--;
    render();
  }
});

btnNext.addEventListener("click", () => {
  const key = STEPS[state.step];
  if (!state[key]) return;
  if (state.step < STEPS.length - 1) {
    state.step++;
    render();
  }
});

if ("Notification" in window && Notification.permission === "default") {
  Notification.requestPermission();
}

render();
