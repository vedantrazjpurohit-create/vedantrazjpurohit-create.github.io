(function () {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if (!dot || !ring) return;

  document.body.classList.add("has-cursor");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let hovering = false;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function animate() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) scale(${hovering ? 1.55 : 1})`;
    requestAnimationFrame(animate);
  }

  animate();

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
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  });
})();