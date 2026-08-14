// AruWorks — Win95-style pop-up window manager. No build step required.

(function windowManager() {
  const popups = Array.from(document.querySelectorAll("[data-popup]"));
  const byId = new Map(popups.map((el) => [el.id.replace("win-", ""), el]));
  let topZ = 100;
  let scrim = document.querySelector(".scrim");
  if (!scrim) {
    scrim = document.createElement("div");
    scrim.className = "scrim";
    document.body.appendChild(scrim);
  }

  function openWindow(key) {
    const el = byId.get(key);
    if (!el) return;
    popups.forEach((p) => p.classList.remove("is-open"));
    topZ += 1;
    el.style.zIndex = String(topZ);
    el.classList.add("is-open");
    scrim.classList.add("is-open");
    const closeBtn = el.querySelector("[data-close]");
    if (closeBtn) closeBtn.focus({ preventScroll: true });
  }

  function closeAll() {
    popups.forEach((p) => p.classList.remove("is-open"));
    scrim.classList.remove("is-open");
  }

  document.querySelectorAll("[data-open]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const key = trigger.getAttribute("data-open");
      if (key === "home-flash") {
        closeAll();
        return;
      }
      openWindow(key);
    });
  });

  document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", () => closeAll());
  });

  scrim.addEventListener("click", closeAll);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });

  // dragging
  popups.forEach((win) => {
    const handle = win.querySelector("[data-drag-handle]");
    if (!handle) return;
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let baseX = 0;
    let baseY = 0;

    function onPointerDown(e) {
      if (e.target.closest("[data-close]")) return;
      dragging = true;
      win.classList.add("is-dragging");
      const rect = win.getBoundingClientRect();
      startX = e.clientX;
      startY = e.clientY;
      baseX = rect.left;
      baseY = rect.top;
      win.style.left = baseX + "px";
      win.style.top = baseY + "px";
      win.style.transform = "none";
      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
    }
    function onPointerMove(e) {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      win.style.left = baseX + dx + "px";
      win.style.top = baseY + dy + "px";
    }
    function onPointerUp() {
      dragging = false;
      win.classList.remove("is-dragging");
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    }
    handle.addEventListener("pointerdown", onPointerDown);
  });
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
