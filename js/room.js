// =========================================================
// room.js: the lights toggle
// (clicking room objects to open sections comes in Phase 5)
// =========================================================

// document.documentElement is the <html> element.
// The lights are "off" when it has data-lights="off".
const html = document.documentElement;
const lightsButton = document.getElementById("lights-toggle");

function lightsAreOff() {
  return html.getAttribute("data-lights") === "off";
}

// Make the button's text match the current state.
// The text says what clicking will DO, like a real light switch label.
function updateLightsButton() {
  lightsButton.textContent = lightsAreOff() ? "Lights on" : "Lights off";
}

function toggleLights() {
  if (lightsAreOff()) {
    html.removeAttribute("data-lights");
  } else {
    html.setAttribute("data-lights", "off");
  }
  updateLightsButton();

  // Remember the choice for next visit. try/catch because some
  // browsers (like private mode) don't allow localStorage.
  try {
    localStorage.setItem("lights", lightsAreOff() ? "off" : "on");
  } catch (error) {
    // Not saved; the toggle still works for this visit.
  }
}

// The <head> script may have already turned the lights off,
// so set the right button text as soon as this file runs.
updateLightsButton();
lightsButton.addEventListener("click", toggleLights);
