var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');

//Connect to mongoose
mongoose.connect('mongodb://localhost/bookstore', { useNewUrlParser: true });
var db = mongoose.connection;

app.get('/', (req, res) => {
    res.send('Please use /api/books or /api/genres');
});

//Get Genres
app.get('/api/genres', (req, res) => {
    Genre.getGenres((err, genres) => {
        if(err){
            throw err;
        }
        res.json(genres);
    });
});

//Add Genres
app.post('/api/genres', (req, res) => {
    var genre = req.body;
    Genre.addGenre(genre, (err, genre) => {
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

//Update Genre
app.put('/api/genres/:_id', (req, res) => {
    var id = req.params._id;
    var genre = req.body;
    Genre.updateGenre(id, genre, {}, (err, genre) => {
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

//Delete Genre
app.delete('/api/genres/:_id', (req, res) => {
    var id = req.params._id;
    Genre.removeGenre(id, (err, genre) => {
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

//Get Books
app.get('/api/books', (req, res) => {
    Book.getBooks((err, books) => {
        if(err){
            throw err;
        }
        res.json(books);
    });
});

//Get Book
app.get('/api/books/:_id', (req, res) => {
    Book.getBookById(req.params._id, (err, book) => {
        if(err){
            throw err;
        }
        res.json(book);
    });
});

//Add Book
app.post('/api/books', (req, res) => {
    var book = req.body;
    Book.addBook(book, (err, book) => {
        if(err){
            throw err;
        }
        res.json(book);
    });
});

//Update Book
app.put('/api/books/:_id', (req, res) => {
    var id = req.params._id;
    var book = req.body;
    Book.updateBook(id, book, {}, (err, book) => {
        if(err){
            throw err;
        }
        res.json(book);
    });
});

//Delete Book
app.delete('/api/books/:_id', (req, res) => {
    var id = req.params._id;
    Book.removeBook(id, (err, book) => {
        if(err){
            throw err;
        }
        res.json(book);
    });
});

app.listen(3000);
console.log('Running on port 3000...');