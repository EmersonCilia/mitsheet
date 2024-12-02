import { emitData, selectTab } from "./socket-front-end.js";

const textareas = document.querySelectorAll('textarea');
const ids = Array.from(textareas).map(textarea => textarea.id);
const temaSwitch = document.getElementById("theme-switch");
const body = document.body;

temaSwitch.addEventListener("change", () => {
  if (temaSwitch.checked) {
      body.setAttribute("data-bs-theme", "light");
      temaSwitch.nextElementSibling.textContent = "Modo Escuro";
    } else {
      body.setAttribute("data-bs-theme", "dark");
      temaSwitch.nextElementSibling.textContent = "Modo Claro";
  }
});


window.addEventListener('load', () => {
  ids.forEach(id => {
    selectTab(id);
  });
});

// Emit changes to server when text is updated in any textarea
textareas.forEach(textarea => {
  textarea.addEventListener('keyup', (event) => {
    event.preventDefault();
    const data = {
      id: textarea.id, 
      value: textarea.value
    };
    emitData(data);
  });
});
        
// Select the tab to load its content from the database when the page loads
export function updateTab(id, text) {
  const textarea = document.getElementById(id);
  if (textarea) {
    textarea.value = text;
  }
}
