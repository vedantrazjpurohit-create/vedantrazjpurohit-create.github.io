(function () {
  const FONTS = [
    '"Syne", sans-serif',
    '"Playfair Display", serif',
    '"Bebas Neue", sans-serif',
    '"JetBrains Mono", monospace',
    '"Oswald", sans-serif',
    '"Space Grotesk", sans-serif',
    '"Archivo Black", sans-serif',
    '"IBM Plex Mono", monospace',
    '"Italiana", serif',
    '"Rubik Mono One", monospace',
  ];

  const FINAL_FONT = '"Space Grotesk", sans-serif';
  const LOADER_MS = 2800;
  const SKIP_KEY = "vedant-loader-done";

  const loader = document.getElementById("loader");
  if (!loader) return;

  const letters = loader.querySelectorAll(".loader-letter");
  const fill = loader.querySelector(".loader-bar-fill");
  const caption = loader.querySelector(".loader-caption");

  let frame = 0;
  let rafId = null;
  let startTime = null;

  function cycleFonts() {
    letters.forEach((el, i) => {
      el.style.fontFamily = FONTS[(frame + i * 3) % FONTS.length];
    });
    frame += 1;
  }

  function finish() {
    cancelAnimationFrame(rafId);
    letters.forEach((el) => {
      el.style.fontFamily = FINAL_FONT;
    });
    if (caption) caption.textContent = "enter";
    loader.classList.add("loader--out");
    document.body.classList.remove("is-loading");
    sessionStorage.setItem(SKIP_KEY, "1");
    setTimeout(() => loader.remove(), 900);
  }

  function tick(now) {
    if (!startTime) startTime = now;
    const elapsed = now - startTime;

    if (elapsed < LOADER_MS) {
      if (elapsed % 110 < 20) cycleFonts();
      if (fill) fill.style.width = Math.min(100, (elapsed / LOADER_MS) * 100) + "%";
      rafId = requestAnimationFrame(tick);
      return;
    }

    if (fill) fill.style.width = "100%";
    finish();
  }

  if (sessionStorage.getItem(SKIP_KEY) === "1") {
    loader.remove();
    document.body.classList.remove("is-loading");
    return;
  }

  document.body.classList.add("is-loading");
  cycleFonts();
  rafId = requestAnimationFrame(tick);
})();