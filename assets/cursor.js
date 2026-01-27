/* =========================================
   GYPSY CARTEL — CURSOR ENGINE (FINAL)
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // Stop cursor on touch devices
  const isTouch =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(hover: none)").matches;

  if (isTouch) return;

  // Create cursor elements
  const dot = document.createElement("div");
  dot.className = "cursor-dot";

  const outline = document.createElement("div");
  outline.className = "cursor-outline";

  document.body.appendChild(dot);
  document.body.appendChild(outline);

  // Mouse Move Tracking
  window.addEventListener("mousemove", (e) => {
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";

    outline.style.left = e.clientX + "px";
    outline.style.top = e.clientY + "px";
  });

  // Hover Zoom on Clickable Elements
  document.querySelectorAll("a, button, .btn, input, textarea").forEach(el => {

    el.addEventListener("mouseenter", () => {
      outline.classList.add("hover");
    });

    el.addEventListener("mouseleave", () => {
      outline.classList.remove("hover");
    });

  });

});
