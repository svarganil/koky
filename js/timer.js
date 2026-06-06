/**
 * 3D ring countdown timer — ported from timer/src (React → vanilla JS)
 */
class EggTimer {
  constructor(container, totalSeconds) {
    this.container = container;
    this.totalSeconds = totalSeconds;
    this.remaining = totalSeconds;
    this.intervalId = null;
    this.isRunning = false;
    this.isFinished = false;
    this.tickCount = 60;
    this.radius = window.innerWidth < 600 ? 110 : 160;
    this.onFinish = null;
    this.alarm = new Audio("timer.mp3");
    this.alarm.preload = "auto";

    this.build();
    this.updateDisplay();
  }

  build() {
    this.container.innerHTML = "";
    this.container.className = "timer-wrap";

    this.displayEl = document.createElement("div");
    this.displayEl.className = "timer-display";

    const scene = document.createElement("div");
    scene.className = "timer-scene";

    const ringContainer = document.createElement("div");
    ringContainer.className = "timer-ring-container";

    this.ringEl = document.createElement("div");
    this.ringEl.className = "timer-ring";
    this.buildTicks();

    const pointer = document.createElement("div");
    pointer.className = "timer-pointer";

    ringContainer.appendChild(this.ringEl);
    scene.appendChild(ringContainer);
    scene.appendChild(pointer);

    this.statusEl = document.createElement("div");
    this.statusEl.className = "timer-status";

    const controls = document.createElement("div");
    controls.className = "timer-controls";

    this.startBtn = document.createElement("button");
    this.startBtn.className = "btn btn-primary";
    this.startBtn.textContent = "Старт";
    this.startBtn.addEventListener("click", () => this.toggle());

    this.resetBtn = document.createElement("button");
    this.resetBtn.className = "btn btn-secondary";
    this.resetBtn.textContent = "Сброс";
    this.resetBtn.addEventListener("click", () => this.reset());

    controls.appendChild(this.startBtn);
    controls.appendChild(this.resetBtn);

    this.container.appendChild(this.displayEl);
    this.container.appendChild(scene);
    this.container.appendChild(controls);
    this.container.appendChild(this.statusEl);

    this.updateRing(0);
  }

  buildTicks() {
    const step = 360 / this.tickCount;
    for (let i = 0; i < this.tickCount; i++) {
      const tick = document.createElement("div");
      const isMajor = i % 5 === 0;
      tick.className = `timer-tick ${isMajor ? "major" : "minor"}`;
      const angle = i * step;
      tick.style.transform = `rotateY(${angle}deg) translateZ(${this.radius}px)`;
      if (isMajor) {
        const label = document.createElement("span");
        label.textContent = i;
        tick.appendChild(label);
      }
      this.ringEl.appendChild(tick);
    }
  }

  updateRing(elapsed) {
    const progress = this.totalSeconds > 0 ? elapsed / this.totalSeconds : 1;
    const rotation = -360 * progress;
    this.ringEl.style.transform = `rotateY(${rotation}deg)`;
  }

  updateDisplay() {
    this.displayEl.textContent = formatTime(this.remaining);
  }

  toggle() {
    if (this.isFinished) {
      this.reset();
      this.start();
      return;
    }
    if (this.isRunning) {
      this.pause();
    } else {
      this.start();
    }
  }

  start() {
    if (this.remaining <= 0) return;

    this.isRunning = true;
    this.isFinished = false;
    this.startBtn.textContent = "Пауза";
    this.statusEl.textContent = "Вода кипит — варим!";
    this.statusEl.className = "timer-status running";
    this.displayEl.classList.remove("finished");

    const startRemaining = this.remaining;
    const startTime = Date.now();

    this.intervalId = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      this.remaining = Math.max(0, startRemaining - elapsed);
      this.updateDisplay();
      this.updateRing(this.totalSeconds - this.remaining);

      if (this.remaining <= 0) {
        this.finish();
      }
    }, 200);
  }

  pause() {
    this.isRunning = false;
    clearInterval(this.intervalId);
    this.startBtn.textContent = "Продолжить";
    this.statusEl.textContent = "На паузе";
    this.statusEl.className = "timer-status";
  }

  stopAlarm() {
    this.alarm.pause();
    this.alarm.currentTime = 0;
  }

  playAlarm() {
    this.stopAlarm();
    this.alarm.play().catch(() => {});
  }

  reset() {
    this.isRunning = false;
    this.isFinished = false;
    clearInterval(this.intervalId);
    this.stopAlarm();
    this.remaining = this.totalSeconds;
    this.updateDisplay();
    this.updateRing(0);
    this.startBtn.textContent = "Старт";
    this.statusEl.textContent = "";
    this.statusEl.className = "timer-status";
    this.displayEl.classList.remove("finished");
  }

  finish() {
    this.isRunning = false;
    this.isFinished = true;
    clearInterval(this.intervalId);
    this.remaining = 0;
    this.updateDisplay();
    this.updateRing(this.totalSeconds);
    this.startBtn.textContent = "Заново";
    this.statusEl.textContent = "Готово!";
    this.statusEl.className = "timer-status done";
    this.displayEl.classList.add("finished");

    this.playAlarm();

    if (typeof this.onFinish === "function") {
      this.onFinish();
    }

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("КОКИ", { body: "Яйца готовы!" });
    }
  }

  destroy() {
    clearInterval(this.intervalId);
    this.stopAlarm();
    this.container.innerHTML = "";
  }
}
