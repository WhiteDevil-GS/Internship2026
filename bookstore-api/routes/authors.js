const express = require('express');
const router = express.Router();

// Dummy data
let authors = [
    { id: 1, name: "Paulo Coelho" },
    { id: 2, name: "A.P.J Abdul Kalam" }
];

// GET all authors
router.get('/', (req, res) => {
    res.json(authors);
});

// GET single author
router.get('/:id', (req, res) => {
    const author = authors.find(a => a.id == req.params.id);
    if (!author) return res.status(404).send("Author not found");
    res.json(author);
});

// POST new author
router.post('/', (req, res) => {
    const newAuthor = {
        id: authors.length + 1,
        name: req.body.name
    };
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
});

// PUT update author
router.put('/:id', (req, res) => {
    const author = authors.find(a => a.id == req.params.id);
    if (!author) return res.status(404).send("Author not found");

    author.name = req.body.name || author.name;
    res.json(author);
});

// DELETE author
router.delete('/:id', (req, res) => {
    authors = authors.filter(a => a.id != req.params.id);
    res.send("Author deleted");
});

module.exports = router;