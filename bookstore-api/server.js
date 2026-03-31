const express = require('express');
const app = express();

const bookRoutes = require('./routes/books');
const authorRoutes = require('./routes/authors');

app.use(express.json());

// Routes
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('📚 Bookstore API is running...');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});