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

const SITE_SECTIONS = ["timer", "tips", "recipes", "chef"];
const ALARM_AUDIO_SRC = "./assets/cluck.mp3";
const OFFICE_HELPER_GIFS = {
  crack: [
    { src: "./assets/gif/crackl.gif", duration: 640 },
    { src: "./assets/gif/crackr.gif", duration: 640 }
  ],
  open: { src: "./assets/gif/open.gif", duration: 7200 },
  idle: { src: "./assets/gif/idle.gif" },
  ask: { src: "./assets/gif/ask.gif" }
};
const OFFICE_HELPER_SCALE = 0.5;
const OFFICE_HELPER_FACTS_SRC = "./md/facts.md";
const OFFICE_HELPER_FALLBACK_FACTS = [
  "В разговорной речи и жаргоне «коками» (или «яйками») называют тестикулы.",
  "Коки (Coki) — диджей и продюсер, пионер жанра «дабстеп», половина дуэта Digital Mystikz и сооснователь лейбла DMZ.",
  "Самое крупное яйцо страуса было получено в Китае, его вес был более 2.3 кг, а диаметр — более 18 см."
];
const OFFICE_HELPER_INTRO_TEXT = "Ко-ко! Я Клава — живу здесь и знаю много интересного про яйца. Жми, чтобы узнать.";
const OFFICE_HELPER_TYPE_SPEED = 42;
const OFFICE_HELPER_BUBBLE_HOLD = 7000;
const OFFICE_HELPER_ASK_DELAY = 1000;

const SKY_GRID = {
  targetColumns: 24,
  minCellSize: 28,
  maxCellSize: 72,
  stageMinCellSize: 18,
  stageMaxCellSize: 42
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

const THEME_COLORS = {
  morning: "#4AC6FD",
  day: "#00B0EB",
  evening: "#6B5272",
  night: "#281B4F"
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

const NIGHT_STAR_CONFIG = {
  pageCount: 140,
  stageCount: 34,
  duration: 16,
  pageMaxSize: 8,
  stageMaxSize: 6,
  colors: [
    "rgba(255, 255, 230, 0.86)",
    "rgba(255, 243, 188, 0.74)",
    "rgba(222, 236, 255, 0.72)"
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
  alarmAudio: null,
  officeHelperOpened: false,
  officeHelperTimerId: null,
  officeHelperCrackIndex: 0,
  officeHelperTypingTimerId: null,
  officeHelperBubbleTimerId: null,
  officeHelperAskTimerId: null,
  officeHelperAskActive: false,
  officeHelperFactLoading: false,
  officeHelperNextAskDelay: OFFICE_HELPER_ASK_DELAY
};

let currentTheme = "";
let pixelSkyElement = null;
let stageSkyElement = null;
let chefStageSkyElement = null;
let cloudFieldElement = null;
let stageCloudFieldElement = null;
let chefStageCloudFieldElement = null;
let nightStarFieldElement = null;
let stageNightStarFieldElement = null;
let chefStageNightStarFieldElement = null;
let activeSiteSection = "timer";

document.addEventListener("DOMContentLoaded", () => {
  setupTimeTheme();
  bindSiteMenu();
  updateMenuYear();
  bindAccordions();
  loadRecipes();
  loadHints();
  setupOfficeHelper();

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

function updateMenuYear() {
  const yearElement = document.getElementById("menuYear");

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

function setupOfficeHelper() {
  const shell = document.getElementById("officeHelperShell");
  const helper = document.getElementById("officeHelper");
  const image = document.getElementById("officeHelperGif");

  if (!shell || !helper || !image) {
    return;
  }

  shell.hidden = true;
  hideOfficeHelperBubble();
  image.addEventListener("load", () => scaleOfficeHelperImage(image));
  helper.addEventListener("click", handleOfficeHelperClick);
  scaleOfficeHelperImage(image);
}

function scaleOfficeHelperImage(image) {
  if (!image.naturalWidth || !image.naturalHeight) {
    return;
  }

  image.style.width = `${Math.round(image.naturalWidth * OFFICE_HELPER_SCALE)}px`;
  image.style.height = `${Math.round(image.naturalHeight * OFFICE_HELPER_SCALE)}px`;
}

function syncOfficeHelperWithMenu(isMenuOpen) {
  if (!isMenuOpen) {
    hideOfficeHelper();
    return;
  }

  if (state.officeHelperOpened) {
    showOfficeHelper();
    return;
  }

  startOfficeHelperCrackLoop();
}

function showOfficeHelper() {
  const shell = document.getElementById("officeHelperShell");

  if (shell) {
    shell.hidden = false;
  }
}

function hideOfficeHelper() {
  const shell = document.getElementById("officeHelperShell");

  if (!state.officeHelperOpened) {
    clearOfficeHelperTimer();
  }

  if (shell) {
    shell.hidden = true;
  }
}

function startOfficeHelperCrackLoop() {
  if (state.officeHelperOpened) {
    return;
  }

  clearOfficeHelperTimer();
  state.officeHelperCrackIndex = 0;
  showOfficeHelper();
  playOfficeHelperCrackCycle();
}

function playOfficeHelperCrackCycle() {
  state.officeHelperTimerId = null;

  if (state.officeHelperOpened || !isSiteMenuOpen()) {
    return;
  }

  const crackGif = OFFICE_HELPER_GIFS.crack[state.officeHelperCrackIndex % OFFICE_HELPER_GIFS.crack.length];

  state.officeHelperCrackIndex += 1;
  setOfficeHelperGif(crackGif.src);
  state.officeHelperTimerId = window.setTimeout(playOfficeHelperCrackCycle, crackGif.duration);
}

function activateOfficeHelper() {
  if (state.officeHelperOpened) {
    return;
  }

  state.officeHelperOpened = true;
  state.officeHelperAskActive = false;
  state.officeHelperFactLoading = false;
  clearOfficeHelperTimer();
  showOfficeHelper();
  setOfficeHelperGif(OFFICE_HELPER_GIFS.open.src);
  state.officeHelperTimerId = window.setTimeout(() => {
    setOfficeHelperGif(OFFICE_HELPER_GIFS.idle.src);
    showOfficeHelperBubble();
    state.officeHelperTimerId = null;
  }, OFFICE_HELPER_GIFS.open.duration);
}

function handleOfficeHelperClick() {
  if (!state.officeHelperOpened) {
    activateOfficeHelper();
    return;
  }

  if (state.officeHelperAskActive && !state.officeHelperFactLoading) {
    showRandomOfficeHelperFact();
  }
}

function showOfficeHelperBubble(text = OFFICE_HELPER_INTRO_TEXT, askDelay = OFFICE_HELPER_ASK_DELAY) {
  const bubble = document.getElementById("officeHelperBubble");
  const textElement = document.getElementById("officeHelperBubbleText");

  if (!bubble || !textElement) {
    return;
  }

  state.officeHelperAskActive = false;
  state.officeHelperFactLoading = false;
  state.officeHelperNextAskDelay = askDelay;
  clearOfficeHelperBubbleTimers();
  textElement.textContent = "";
  bubble.hidden = false;
  typeOfficeHelperText(textElement, text, 0);
}

function typeOfficeHelperText(textElement, text, index) {
  if (index >= text.length) {
    state.officeHelperBubbleTimerId = window.setTimeout(hideOfficeHelperBubble, OFFICE_HELPER_BUBBLE_HOLD);
    return;
  }

  textElement.textContent += text[index];
  state.officeHelperTypingTimerId = window.setTimeout(() => {
    typeOfficeHelperText(textElement, text, index + 1);
  }, OFFICE_HELPER_TYPE_SPEED);
}

function showRandomOfficeHelperFact() {
  state.officeHelperAskActive = false;
  state.officeHelperFactLoading = true;
  setOfficeHelperGif(OFFICE_HELPER_GIFS.idle.src);

  fetchOfficeHelperFacts()
    .then((facts) => {
      if (facts.length === 0) {
        throw new Error("No facts found");
      }

      showOfficeHelperBubble(getRandomItem(facts), 0);
    })
    .catch(() => {
      showOfficeHelperBubble(getRandomItem(OFFICE_HELPER_FALLBACK_FACTS), 0);
    });
}

function fetchOfficeHelperFacts() {
  return fetch(OFFICE_HELPER_FACTS_SRC, { cache: "no-cache" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Facts markdown is unavailable");
      }

      return response.text();
    })
    .then(parseOfficeHelperFacts);
}

function parseOfficeHelperFacts(markdown) {
  const source = markdown.replace(/\r\n?/g, "\n").trim();

  if (!source) {
    return [];
  }

  const listFacts = source
    .split(/\n(?=\s*(?:\d+[.)]|[-*•])\s+)/)
    .map(cleanOfficeHelperFact)
    .filter(Boolean);

  if (listFacts.length > 0) {
    return listFacts;
  }

  return source
    .split(/\n{2,}/)
    .map(cleanOfficeHelperFact)
    .filter(Boolean);
}

function cleanOfficeHelperFact(value) {
  return value
    .replace(/^\s*(?:\d+[.)]|[-*•])\s+/, "")
    .replace(/\s*\n\s*/g, " ")
    .trim();
}

function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function hideOfficeHelperBubble() {
  const bubble = document.getElementById("officeHelperBubble");
  const textElement = document.getElementById("officeHelperBubbleText");

  clearOfficeHelperBubbleTimers();

  if (textElement) {
    textElement.textContent = "";
  }

  if (bubble) {
    bubble.hidden = true;
  }

  scheduleOfficeHelperAsk(state.officeHelperNextAskDelay);
}

function clearOfficeHelperBubbleTimers() {
  if (state.officeHelperTypingTimerId) {
    window.clearTimeout(state.officeHelperTypingTimerId);
    state.officeHelperTypingTimerId = null;
  }

  if (state.officeHelperBubbleTimerId) {
    window.clearTimeout(state.officeHelperBubbleTimerId);
    state.officeHelperBubbleTimerId = null;
  }

  if (state.officeHelperAskTimerId) {
    window.clearTimeout(state.officeHelperAskTimerId);
    state.officeHelperAskTimerId = null;
  }
}

function scheduleOfficeHelperAsk(delay = OFFICE_HELPER_ASK_DELAY) {
  if (!state.officeHelperOpened) {
    return;
  }

  state.officeHelperAskTimerId = window.setTimeout(() => {
    setOfficeHelperGif(OFFICE_HELPER_GIFS.ask.src);
    state.officeHelperAskActive = true;
    state.officeHelperFactLoading = false;
    state.officeHelperAskTimerId = null;
  }, delay);
}

function setOfficeHelperGif(src) {
  const image = document.getElementById("officeHelperGif");

  if (!image) {
    return;
  }

  if (image.dataset.currentSrc === src) {
    image.removeAttribute("src");
    window.requestAnimationFrame(() => {
      image.src = src;
      image.dataset.currentSrc = src;
    });
    return;
  }

  image.src = src;
  image.dataset.currentSrc = src;
}

function clearOfficeHelperTimer() {
  if (state.officeHelperTimerId) {
    window.clearTimeout(state.officeHelperTimerId);
    state.officeHelperTimerId = null;
  }
}

function bindAccordions() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".retro-accordion__button");

    if (!button) {
      return;
    }

    const content = button.nextElementSibling;
    const isOpen = !button.classList.contains("active");
    const singleAccordionList = button.closest("#recipesList, #tipsList");

    if (singleAccordionList && isOpen) {
      singleAccordionList.querySelectorAll(".retro-accordion__button.active").forEach((activeButton) => {
        if (activeButton === button) {
          return;
        }

        const activeContent = activeButton.nextElementSibling;
        activeButton.classList.remove("active");
        activeButton.setAttribute("aria-expanded", "false");

        if (activeContent && activeContent.classList.contains("retro-accordion__content")) {
          activeContent.hidden = true;
        }
      });
    }

    button.classList.toggle("active", isOpen);
    button.setAttribute("aria-expanded", String(isOpen));

    if (content && content.classList.contains("retro-accordion__content")) {
      content.hidden = !isOpen;
    }
  });
}

function loadRecipes() {
  const recipesList = document.getElementById("recipesList");

  if (!recipesList || !recipesList.dataset.recipesSrc || !window.fetch) {
    return;
  }

  fetch(recipesList.dataset.recipesSrc, { cache: "no-cache" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Recipes markdown is unavailable");
      }

      return response.text();
    })
    .then((markdown) => {
      const recipes = parseRecipesMarkdown(markdown);

      if (recipes.length > 0) {
        recipesList.innerHTML = renderRecipesAccordions(recipes);
      }
    })
    .catch(() => {});
}

function loadHints() {
  const tipsList = document.getElementById("tipsList");

  if (!tipsList || !tipsList.dataset.hintsSrc || !window.fetch) {
    return;
  }

  fetch(tipsList.dataset.hintsSrc, { cache: "no-cache" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Hints markdown is unavailable");
      }

      return response.text();
    })
    .then((markdown) => {
      const hints = parseHintsMarkdown(markdown);

      if (hints.length > 0) {
        tipsList.innerHTML = renderHintsAccordions(hints);
      }
    })
    .catch(() => {});
}

function parseRecipesMarkdown(markdown) {
  return markdown
    .replace(/\r\n?/g, "\n")
    .split(/\n(?=##\s+)/)
    .map(parseRecipeBlock)
    .filter((recipe) => recipe.title && (recipe.ingredients || recipe.instructions));
}

function parseHintsMarkdown(markdown) {
  return markdown
    .replace(/\r\n?/g, "\n")
    .split(/\n(?=##\s+)/)
    .map(parseHintBlock)
    .filter((hint) => hint.title && hint.content);
}

function parseHintBlock(block) {
  const lines = block.split("\n");
  const titleIndex = lines.findIndex((line) => line.startsWith("## "));

  if (titleIndex === -1) {
    return {
      title: "",
      content: ""
    };
  }

  return {
    title: lines[titleIndex].replace(/^##\s+/, "").trim(),
    content: lines.slice(titleIndex + 1).join("\n").trim()
  };
}

function parseRecipeBlock(block) {
  const recipe = {
    title: "",
    ingredients: "",
    instructions: ""
  };
  const buffers = {
    ingredients: [],
    instructions: []
  };
  let activeSection = "";

  block.split("\n").forEach((line) => {
    if (line.startsWith("## ")) {
      recipe.title = line.replace(/^##\s+/, "").trim();
      return;
    }

    if (line.startsWith("### ")) {
      activeSection = getRecipeSectionKey(line.replace(/^###\s+/, "").trim());
      return;
    }

    if (activeSection) {
      buffers[activeSection].push(line);
    }
  });

  recipe.ingredients = buffers.ingredients.join("\n").trim();
  recipe.instructions = buffers.instructions.join("\n").trim();

  return recipe;
}

function getRecipeSectionKey(heading) {
  const normalizedHeading = heading.toLowerCase();

  if (normalizedHeading.startsWith("ингредиенты")) {
    return "ingredients";
  }

  if (normalizedHeading.startsWith("рецепт")) {
    return "instructions";
  }

  return "";
}

function renderRecipesAccordions(recipes) {
  return recipes.map((recipe, index) => {
    const contentId = `recipe-content-${index}`;

    return `
      <button class="retro-accordion__button" type="button" aria-expanded="false" aria-controls="${contentId}">${escapeHtml(recipe.title)}</button>
      <div class="retro-accordion__content" id="${contentId}" hidden>
        ${renderRecipeSection("Ингредиенты", recipe.ingredients, `recipe-ingredients-${index}`)}
        ${renderRecipeSection("Рецепт", recipe.instructions, `recipe-steps-${index}`)}
      </div>
    `;
  }).join("");
}

function renderHintsAccordions(hints) {
  return hints.map((hint, index) => {
    const contentId = `hint-content-${index}`;

    return `
      <button class="retro-accordion__button" type="button" aria-expanded="false" aria-controls="${contentId}">${escapeHtml(hint.title)}</button>
      <div class="retro-accordion__content" id="${contentId}" hidden>
        <div class="recipe-copy">
          ${renderMarkdownText(hint.content)}
        </div>
      </div>
    `;
  }).join("");
}

function renderRecipeSection(title, content, id) {
  if (!content) {
    return "";
  }

  return `
    <section class="recipe-section" aria-labelledby="${id}">
      <h3 id="${id}">${title}</h3>
      <div class="recipe-copy">
        ${renderMarkdownText(content)}
      </div>
    </section>
  `;
}

function renderMarkdownText(content) {
  const lines = content.split("\n");
  const html = [];
  let activeList = "";

  const closeList = () => {
    if (!activeList) {
      return;
    }

    html.push(activeList === "ol" ? "</ol>" : "</ul>");
    activeList = "";
  };

  const openList = (listType, className) => {
    if (activeList === listType) {
      return;
    }

    closeList();
    html.push(`<${listType} class="${className}">`);
    activeList = listType;
  };

  lines.forEach((rawLine) => {
    const line = rawLine.replace(/\s{2,}$/, "").trim();

    if (!line) {
      closeList();
      return;
    }

    const bullet = line.match(/^[•*-]\s+(.+)/);
    const step = line.match(/^\d+\.\s+(.+)/);

    if (bullet) {
      openList("ul", "recipe-list");
      html.push(`<li>${renderInlineMarkdown(bullet[1])}</li>`);
      return;
    }

    if (step) {
      openList("ol", "recipe-steps");
      html.push(`<li>${renderInlineMarkdown(step[1])}</li>`);
      return;
    }

    closeList();
    html.push(`<p${isStandaloneMarkdownLink(line) ? " class=\"recipe-link-row\"" : ""}>${renderInlineMarkdown(line)}</p>`);
  });

  closeList();

  return html.join("");
}

function renderInlineMarkdown(value) {
  const linkPattern = /\[([^\]]+)]\((https?:\/\/[^)\s]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match = linkPattern.exec(value);

  while (match) {
    parts.push(escapeHtml(value.slice(lastIndex, match.index)));
    parts.push(renderRecipeLink(match[1], match[2]));
    lastIndex = match.index + match[0].length;
    match = linkPattern.exec(value);
  }

  parts.push(escapeHtml(value.slice(lastIndex)));

  return parts.join("");
}

function isStandaloneMarkdownLink(value) {
  return /^\[[^\]]+]\(https?:\/\/[^)\s]+\)$/.test(value);
}

function renderRecipeLink(label, url) {
  return `<a class="retro-button retro-button--link recipe-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
}

function escapeHtml(value) {
  const replacements = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  };

  return String(value).replace(/[&<>"']/g, (character) => replacements[character]);
}

function bindSiteMenu() {
  const menuToggles = document.querySelectorAll("[data-menu-toggle]");
  const menuPanel = document.getElementById("siteMenuView");
  const menuItems = document.querySelectorAll("[data-section-target]");

  if (!menuPanel || menuItems.length === 0) {
    return;
  }

  activeSiteSection = getInitialSiteSection();
  switchSiteSection(activeSiteSection, { updateHash: false });

  menuToggles.forEach((button) => {
    button.addEventListener("click", () => {
      setSiteMenuOpen(!isSiteMenuOpen());
    });
  });

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      switchSiteSection(item.dataset.sectionTarget);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isSiteMenuOpen()) {
      setSiteMenuOpen(false);
    }
  });

  window.addEventListener("hashchange", () => {
    const section = getValidSiteSection(window.location.hash.slice(1));

    if (section) {
      switchSiteSection(section, { updateHash: false });
    }
  });
}

function getInitialSiteSection() {
  return getValidSiteSection(window.location.hash.slice(1)) || "timer";
}

function getValidSiteSection(section) {
  return SITE_SECTIONS.includes(section) ? section : null;
}

function isSiteMenuOpen() {
  const menuPanel = document.getElementById("siteMenuView");

  return Boolean(menuPanel && !menuPanel.classList.contains("is-hidden"));
}

function setSiteMenuOpen(isOpen) {
  const menuPanel = document.getElementById("siteMenuView");

  if (!menuPanel) {
    return;
  }

  document.querySelectorAll("[data-section-panel]").forEach((panel) => {
    panel.classList.toggle("is-hidden", isOpen || panel.dataset.sectionPanel !== activeSiteSection);
  });

  menuPanel.classList.toggle("is-hidden", !isOpen);
  updateMenuToggleState(isOpen);
  syncOfficeHelperWithMenu(isOpen);

  if (!isOpen) {
    refreshVisibleStageTheme();
  }
}

function updateMenuToggleState(isOpen) {
  document.querySelectorAll("[data-menu-toggle]").forEach((button) => {
    const symbol = button.querySelector(".menu-toggle__symbol");

    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");

    if (symbol) {
      symbol.textContent = isOpen ? "×" : "Ξ";
    }
  });
}

function switchSiteSection(section, options = {}) {
  const nextSection = getValidSiteSection(section) || "timer";
  const menuPanel = document.getElementById("siteMenuView");

  activeSiteSection = nextSection;

  document.querySelectorAll("[data-section-panel]").forEach((panel) => {
    panel.classList.toggle("is-hidden", panel.dataset.sectionPanel !== nextSection);
  });

  if (menuPanel) {
    menuPanel.classList.add("is-hidden");
  }

  document.querySelectorAll("[data-section-target]").forEach((item) => {
    const isActive = item.dataset.sectionTarget === nextSection;
    item.classList.toggle("is-active", isActive);

    if (isActive) {
      item.setAttribute("aria-current", "page");
    } else {
      item.removeAttribute("aria-current");
    }
  });

  if (options.updateHash !== false && window.location.hash !== `#${nextSection}`) {
    window.location.hash = nextSection;
  }

  updateMenuToggleState(false);
  syncOfficeHelperWithMenu(false);
  refreshVisibleStageTheme();
}

function setupTimeTheme() {
  ensurePixelSky();
  ensureStageSky();
  ensureDayClouds();
  ensureNightStars();
  applyTimeTheme();
  window.setInterval(applyTimeTheme, 60000);
  window.addEventListener("resize", () => renderPixelSky(currentTheme));
}

function refreshVisibleStageTheme() {
  if (!currentTheme) {
    return;
  }

  window.requestAnimationFrame(() => renderPixelSky(currentTheme));
}

function applyTimeTheme(date = new Date()) {
  const theme = getTimeTheme(date);

  document.body.classList.remove("theme-morning", "theme-day", "theme-evening", "theme-night");
  document.body.classList.add(`theme-${theme}`);
  updateThemeChrome(theme);

  if (theme !== currentTheme) {
    renderPixelSky(theme);
    currentTheme = theme;
  }
}

function updateThemeChrome(theme) {
  const color = THEME_COLORS[theme] || THEME_COLORS.day;
  const themeColorMeta = document.getElementById("themeColorMeta");

  document.documentElement.style.backgroundColor = color;

  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", color);
  }
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
  document.body.prepend(pixelSkyElement);
}

function ensureStageSky() {
  if (stageSkyElement && chefStageSkyElement) {
    return;
  }

  stageSkyElement = document.getElementById("stageSky");
  chefStageSkyElement = document.getElementById("chefStageSky");

}

function ensureDayClouds() {
  cloudFieldElement = document.getElementById("cloudField");
  stageCloudFieldElement = document.getElementById("stageCloudField");
  chefStageCloudFieldElement = document.getElementById("chefStageCloudField");

  renderDayClouds(cloudFieldElement, DAY_CLOUD_LAYOUTS.page);
  renderDayClouds(stageCloudFieldElement, DAY_CLOUD_LAYOUTS.stage);
  renderDayClouds(chefStageCloudFieldElement, DAY_CLOUD_LAYOUTS.stage);
}

function ensureNightStars() {
  nightStarFieldElement = document.getElementById("nightStarField");
  stageNightStarFieldElement = document.getElementById("stageNightStarField");
  chefStageNightStarFieldElement = document.getElementById("chefStageNightStarField");

  renderNightStars(nightStarFieldElement, NIGHT_STAR_CONFIG.pageCount, NIGHT_STAR_CONFIG.pageMaxSize);
  renderNightStars(stageNightStarFieldElement, NIGHT_STAR_CONFIG.stageCount, NIGHT_STAR_CONFIG.stageMaxSize);
  renderNightStars(chefStageNightStarFieldElement, NIGHT_STAR_CONFIG.stageCount, NIGHT_STAR_CONFIG.stageMaxSize);
}

function renderNightStars(element, count, maxSize) {
  if (!element || element.children.length > 0) {
    return;
  }

  const fragment = document.createDocumentFragment();

  for (let index = 0; index < count; index += 1) {
    const star = document.createElement("span");
    const size = getRandomInt(1, maxSize);
    const color = NIGHT_STAR_CONFIG.colors[getRandomInt(0, NIGHT_STAR_CONFIG.colors.length - 1)];
    const delay = -Math.random() * NIGHT_STAR_CONFIG.duration;

    star.className = "night-star";
    star.style.setProperty("--star-top", `${Math.random() * 100}%`);
    star.style.setProperty("--star-left", `${Math.random() * 100}%`);
    star.style.setProperty("--star-size", `${size}px`);
    star.style.setProperty("--star-color", color);
    star.style.setProperty("--star-duration", `${NIGHT_STAR_CONFIG.duration}s`);
    star.style.setProperty("--star-delay", `${delay.toFixed(2)}s`);
    fragment.appendChild(star);
  }

  element.appendChild(fragment);
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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

  renderSkyPixels(pixelSkyElement, palette, theme, "page");
  renderSkyPixels(stageSkyElement, palette, theme, "stage");
  renderSkyPixels(chefStageSkyElement, palette, theme, "stage");
}

function renderSkyPixels(element, palette, theme, area) {
  if (!element) {
    return;
  }

  const metrics = getSquareSkyMetrics(element, area);

  if (!metrics) {
    return;
  }

  element.style.setProperty("--sky-cell-size", `${metrics.cellSize}px`);
  element.style.gridTemplateColumns = `repeat(${metrics.columns}, ${metrics.cellSize}px)`;
  element.style.gridAutoRows = `${metrics.cellSize}px`;
  ensureSkyPixelCount(element, metrics.columns * metrics.rows);

  Array.from(element.children).forEach((pixel, index) => {
    const row = Math.floor(index / metrics.columns);
    const column = index % metrics.columns;
    pixel.style.backgroundColor = getSkyPixelColor(palette, row, column, theme, metrics.rows);
  });
}

function getSquareSkyMetrics(element, area) {
  const isStage = area === "stage";
  const rect = typeof element.getBoundingClientRect === "function"
    ? element.getBoundingClientRect()
    : { width: 0, height: 0 };
  const fallbackWidth = isStage ? 520 : window.innerWidth;
  const fallbackHeight = isStage ? 430 : window.innerHeight;
  const width = Math.ceil(rect.width || fallbackWidth);
  const height = Math.ceil(rect.height || fallbackHeight);

  if (width <= 0 || height <= 0) {
    return null;
  }

  const minCellSize = isStage ? SKY_GRID.stageMinCellSize : SKY_GRID.minCellSize;
  const maxCellSize = isStage ? SKY_GRID.stageMaxCellSize : SKY_GRID.maxCellSize;
  const cellSize = clamp(Math.round(width / SKY_GRID.targetColumns), minCellSize, maxCellSize);

  return {
    cellSize,
    columns: Math.ceil(width / cellSize) + 1,
    rows: Math.ceil(height / cellSize) + 1
  };
}

function ensureSkyPixelCount(element, count) {
  while (element.children.length < count) {
    const pixel = document.createElement("span");
    pixel.className = "sky-pixel";
    element.appendChild(pixel);
  }

  while (element.children.length > count) {
    element.removeChild(element.lastElementChild);
  }
}

function getSkyPixelColor(palette, row, column, theme, totalRows) {
  const paletteRow = totalRows <= 1
    ? 0
    : Math.min(palette.length - 1, Math.round((row / (totalRows - 1)) * (palette.length - 1)));
  const rowColors = palette[paletteRow];
  const themeShift = theme === "morning" ? 5 : 7;
  const colorIndex = Math.abs((row * themeShift + column * 3 + row * column) % rowColors.length);

  return rowColors[colorIndex];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
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
  prepareAlarmSound();

  state.totalSeconds = parseTime(getCurrentTime());
  state.remainingSeconds = state.totalSeconds;
  state.endAt = Date.now() + state.remainingSeconds * 1000;
  state.running = true;
  state.finished = false;

  elements.setupScreen.classList.add("is-hidden");
  elements.timerScreen.classList.remove("is-hidden");
  renderPixelSky(currentTheme);
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

function getAlarmAudio() {
  if (!state.alarmAudio) {
    state.alarmAudio = new Audio(ALARM_AUDIO_SRC);
    state.alarmAudio.preload = "auto";
  }

  return state.alarmAudio;
}

function prepareAlarmSound() {
  const audio = getAlarmAudio();
  const previousVolume = audio.volume || 1;

  audio.pause();
  audio.currentTime = 0;
  audio.volume = 0;

  const playPromise = audio.play();

  if (!playPromise) {
    audio.volume = previousVolume;
    audio.load();
    return;
  }

  playPromise
    .then(() => {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = previousVolume;
    })
    .catch(() => {
      audio.volume = previousVolume;
      audio.load();
    });
}

function playAlarm() {
  const audio = getAlarmAudio();

  audio.pause();
  audio.currentTime = 0;
  audio.volume = 1;

  const playPromise = audio.play();

  if (playPromise) {
    playPromise.catch(() => {});
  }
}

function showToast(elements) {
  elements.alarmToast.classList.add("show");
  window.setTimeout(() => elements.alarmToast.classList.remove("show"), 3600);
}

function stopAlarm(elements) {
  if (state.alarmAudio) {
    state.alarmAudio.pause();
    state.alarmAudio.currentTime = 0;
  }

  if (elements) {
    elements.alarmToast.classList.remove("show");
  }
}
