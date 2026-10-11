const coverageAreas = ["English Level", "Vocabulary", "Comprehension", "Expression", "Pronunciation", "Inflections & Tone", "Native Speech Technique"];
const coverageText = document.getElementById("coverage-text");
const coverageToggle = document.getElementById("coverage-toggle");
const coverageTag = document.querySelector(".coverage-tag");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const rotationMs = Number(coverageTag.dataset.rotationMs) || 4000;
let coverageIndex = 0;
let rotationTimer;
let transitionTimer;
let paused = reducedMotion.matches;
function stopRotation() {
  clearInterval(rotationTimer);
  clearTimeout(transitionTimer);
  coverageText.classList.remove("is-changing");
}
function rotateCoverage() {
  coverageText.classList.add("is-changing");
  transitionTimer = setTimeout(() => {
    coverageIndex = (coverageIndex + 1) % coverageAreas.length;
    coverageText.textContent = coverageAreas[coverageIndex];
    coverageText.classList.remove("is-changing");
  }, reducedMotion.matches ? 0 : 160);
}
function syncRotation() {
  stopRotation();
  coverageToggle.classList.toggle("is-paused", paused);
  const label = paused ? "Resume coverage rotation" : "Pause coverage rotation";
  coverageToggle.setAttribute("aria-label", label);
  coverageToggle.title = label;
  if (!paused && !document.hidden) rotationTimer = setInterval(rotateCoverage, rotationMs);
}
coverageToggle.hidden = false;
coverageToggle.addEventListener("click", () => {
  paused = !paused;
  syncRotation();
});
document.addEventListener("visibilitychange", syncRotation);
reducedMotion.addEventListener("change", () => {
  paused = reducedMotion.matches;
  syncRotation();
});
syncRotation();
