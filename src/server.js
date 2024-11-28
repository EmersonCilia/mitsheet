import { createServer } from 'http';
import { readFile } from 'fs';
import { extname as _extname, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Server as socketIo } from 'socket.io';
import { findDocument, updateDocument } from './controller.js';
import { collections } from './dbconnect.js';
import "./dbconnect.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = createServer((req, res) => {
  const filePath = req.url === '/' ? '/index.html' : req.url;
  const extname = _extname(filePath);

  let contentType = 'text/html';
  if (extname === '.css') {
    contentType = 'text/css';
  }
  if (extname === '.js') {
    contentType = 'text/javascript';
  }

  const fileLocation = join(__dirname, '../Front-End', filePath);
  
  readFile(fileLocation, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error reading file');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});

const io = new socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);


  socket.on("select_tab", async (tabName, tabTextCallback) => {
    const document = await findDocument (tabName);
    if (!document) {
      // Create a new document if one doesn't exist
      const defaultText = "";
      const createFile = await collections.insertOne({ name: tabName, text: defaultText });
      const document = { name: tabName, text: defaultText }; // Simulate the newly created document
    }
    if (document){
      tabTextCallback(document.text)
    }
    
  
  })
  socket.on('update', async (data) => {
    const update = await updateDocument(data.id, data.value)

    socket.broadcast.emit('update_client', data);
  });

  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});