const COOK_TIMES = {
  room: {
    soft:   { sv: "5:00",  s0: "4:30", s1: "4:10", s2: "3:40", s3: "3:10" },
    medium: { sv: "6:10",  s0: "5:40", s1: "5:10", s2: "4:40", s3: "4:10" },
    hard:   { sv: "11:00", s0: "10:20", s1: "9:30", s2: "8:40", s3: "8:10" },
  },
  fridge: {
    soft:   { sv: "6:20",  s0: "5:40", s1: "5:20", s2: "4:40", s3: "4:00" },
    medium: { sv: "7:30",  s0: "6:50", s1: "6:20", s2: "5:40", s3: "5:00" },
    hard:   { sv: "12:20", s0: "11:30", s1: "10:40", s2: "9:40", s3: "8:50" },
  },
};

const LABELS = {
  doneness: {
    soft:   { name: "Всмятку",   image: "assets/soft_b.webp",   desc: "Жидкий желток, нежный белок" },
    medium: { name: "В мешочек", image: "assets/medium_b.webp", desc: "Мягкий желток, плотный белок" },
    hard:   { name: "Вкрутую",   image: "assets/hard_b.webp",   desc: "Полностью твёрдый желток" },
  },
  size: {
    sv: "СВ",
    s0: "С0",
    s1: "С1",
    s2: "С2",
    s3: "С3",
  },
  temp: {
    room:   { name: "Комнатная",    icon: "room",   desc: "Яйца при комнатной температуре" },
    fridge: { name: "Холодильник", icon: "fridge", desc: "Яйца прямо из холодильника" },
  },
};

function parseTime(timeStr) {
  const [min, sec] = timeStr.split(":").map(Number);
  return min * 60 + sec;
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function getCookTime(temp, doneness, size) {
  return COOK_TIMES[temp][doneness][size];
}
