import { collections } from './dbconnect.js';

async function findDocument(name) {
  const document = await collections.findOne({ name });
  return document;
};

function updateDocument(name, text) { 
  return collections.updateOne(
    { name },
    { $set: { text } }
  );
}

export { findDocument, updateDocument };