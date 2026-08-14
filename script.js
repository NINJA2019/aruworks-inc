// AruWorks small interaction layer, no build step required.

(function revealWindows() {
const targets = document.querySelectorAll("[data-reveal]");
if (!("IntersectionObserver" in window) || targets.length === 0) {
targets.forEach((el) => el.classList.add("is-open"));
return;
}
const io = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.classList.add("is-open");
io.unobserve(entry.target);
}
});
},
{ threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
);
targets.forEach((el) => io.observe(el));
})();

(function taskbarClock() {
const clockEl = document.getElementById("clock");
if (!clockEl) return;
function tick() {
const now = new Date();
const pad = (n) => String(n).padStart(2, "0");
clockEl.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}
tick();
setInterval(tick, 1000);
})();
