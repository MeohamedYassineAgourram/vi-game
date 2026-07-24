/* Startup: sound, resume, dev shortcuts. Start on the globe. */
(() => {
  document.title = "The Hidden Horizon";

  const btn = document.getElementById("soundBtn");
  btn.onclick = () => {
    Game.muted = !Game.muted;
    btn.textContent = Game.muted ? "🔇" : "🔊";
    if (!Game.muted) { Game.audio(); Game.sfx("good"); }
  };

  const params = new URLSearchParams(location.search);

  // The landing page opens the very first playable realm directly.
  // This avoids an extra intro screen between the invitation and the game.
  const start = params.get("start");
  if (start && Game.order.includes(start)) return Game.go(start);

  // DEV ONLY: ?dev=japan jumps straight to a scene
  const dev = params.get("dev");
  if (dev && Game.order.includes(dev)) {
    // unlock everything up to the requested realm for testing
    const i = COUNTRIES.findIndex(c => c.id === dev);
    if (i > 0) COUNTRIES.slice(0, i).forEach(c => Game.done.add(c.id));
    if (dev === "france") COUNTRIES.slice(0, 4).forEach(c => Game.done.add(c.id));
    return Game.go(dev);
  }

  // resume progress
  try {
    const saved = JSON.parse(localStorage.getItem(Game.KEY) || "null");
    if (saved && Array.isArray(saved.done)) {
      saved.done.forEach(id => byId(id) && Game.done.add(id));
    }
  } catch (e) {}

  // The card deck is the journey's home screen. The old purple globe gate is retired.
  Game.go("journey");

  // DEV ONLY: Shift+N clears the current mission
  addEventListener("keydown", e => {
    if (e.shiftKey && e.key.toLowerCase() === "n" && Game.active) Game.win();
  });
})();
