const express = require('express');
const app = express();
app.use(express.json()); // Allows parsing JSON request bodies

let books = [];          // In-memory book list
let nextId = 1;          // To assign unique IDs

// GET /books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST /books
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'title and author are required' });
  }
  const book = { id: nextId++, title, author };
  books.push(book);
  res.status(201).json(book);
});

// PUT /books/:id
app.put('/books/:id', (req, res) => {
  const id = +req.params.id;
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// DELETE /books/:id
app.delete('/books/:id', (req, res) => {
  const id = +req.params.id;
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  const [removed] = books.splice(index, 1);
  res.json(removed);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
