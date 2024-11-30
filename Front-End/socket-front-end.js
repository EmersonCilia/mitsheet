import { updateTab } from './index.js'; // Adjust the path if necessary

const socket = io("https://mitsheet.onrender.com", {
  withCredentials: true}); // Initialize the socket connection


function emitData(data) {
  socket.emit('update', data);
}


function selectTab(tabName) {
  socket.emit("select_tab", tabName, (tabText) => {
    updateTab(tabName, tabText); // Pass tabName (id) and tabText to updateTab
  });
}


socket.on('update_client', (data) => {
  const targetTextarea = document.getElementById(data.id);
  targetTextarea.value = data.value;
});

export { emitData, selectTab };
