import { emitData, selectTab } from "./socket-front-end.js";

const textareas = document.querySelectorAll('textarea');
const ids = Array.from(textareas).map(textarea => textarea.id);
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    toggleButton.textContent = 'Switch to Light Mode';
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    toggleButton.textContent = 'Switch to Dark Mode';
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
