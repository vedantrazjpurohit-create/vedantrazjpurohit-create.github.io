(function () {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const bow = document.querySelector(".cursor-bow");
  if (!bow) return;

  document.body.classList.add("has-cursor");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let prevX = mouseX;
  let prevY = mouseY;
  let tilt = 0;
  let hovering = false;

  document.addEventListener("mousemove", (e) => {
    const dx = e.clientX - prevX;
    const dy = e.clientY - prevY;
    tilt += (Math.atan2(dy, dx) * (180 / Math.PI) + 90 - tilt) * 0.18;

    prevX = e.clientX;
    prevY = e.clientY;
    mouseX = e.clientX;
    mouseY = e.clientY;

    const scale = hovering ? 1.35 : 1;
    bow.style.transform = `translate(${mouseX}px, ${mouseY}px) rotate(${tilt * 0.35}deg) scale(${scale})`;
  });

  const hoverTargets = "a, button, .project-card, .tech-logo, .loader-letter";
  document.querySelectorAll(hoverTargets).forEach((el) => {
    el.addEventListener("mouseenter", () => {
      hovering = true;
      document.body.classList.add("cursor-hover");
    });
    el.addEventListener("mouseleave", () => {
      hovering = false;
      document.body.classList.remove("cursor-hover");
    });
  });

  document.addEventListener("mouseleave", () => {
    bow.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    bow.style.opacity = "1";
  });
})();