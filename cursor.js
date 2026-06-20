(function () {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const kitty = document.querySelector(".cursor-kitty");
  const trail = document.querySelector(".cursor-v");
  if (!kitty || !trail) return;

  document.body.classList.add("has-cursor");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let trailX = mouseX;
  let trailY = mouseY;
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
    kitty.style.transform = `translate(${mouseX}px, ${mouseY}px) rotate(${tilt * 0.2}deg) scale(${scale})`;
  });

  function animate() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    const trailScale = hovering ? 1.5 : 1;
    trail.style.transform = `translate(${trailX}px, ${trailY}px) scale(${trailScale})`;
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
    kitty.style.opacity = "0";
    trail.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    kitty.style.opacity = "1";
    trail.style.opacity = "1";
  });
})();