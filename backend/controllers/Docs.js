const Docs = require("../models/Docs")

// Get all books
const getBooks = async (req, res) => {
    try {
        const books = await Docs.find();

        if(books.length < 1){
            res.status(403).json({msg: "There are no books at the moment"})
        }else{
            var bookDataArray = [];

            books.forEach(book => {
                bookDataArray = [...bookDataArray, {bookName: book.book, author: book.author}]
            });
            res.status(200).json(bookDataArray);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Error has Occured"})
    }
}

// Create a new book
const createBook = async (req, res) => {
    try {
        const { bookData } = req.body;
        
        if(!bookData){
            res.status(403).json({msg: "Bad Request"})
        }else{
            const book = await Docs.findOne({
                book: bookData.name,
                author: bookData.author
            });
            if(!book){
                res.status(200).json({msg: "Book Already Exists"})
            }else{
                const newBook = new Docs({
                    book: bookData.name,
                    author: bookData.author
                });
                newBook.save();
                res.status(200).json(newBook)
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Error has Occured"})
    }
}

// Get all chapters of a book
const getChapters = async (req, res) => {
    try {
        const { bookName, author } = req.query;

        if(!bookName || !author){
            res.status(403).json({msg: "Bad Request"})
        }else{
            const book = await Docs.findOne({
                book: bookName,
                author: author
            });

            if(book.chapters.length < 1){
                res.status(200).json({msg: "More Chapters are coming soon"})
            }else{
                const chapters = book.chapters.map(chapter => chapter.name)
                res.status(200).json(chapters);
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Error has Occured"})
    }
}

// Get questions of the chapter
const getChapter = async (req, res) => {
    try {
        const { bookName, author, chapterIndex } = req.query

        if(!bookName || !author || !chapterIndex){
            res.status(403).json({msg: "Bad Request"})
        }else{
            const book = await Docs.findOne({
                book: bookName,
                author: author
            });

            if(!book){
                res.status(404).json({msg: "Book not found"})
            }else{
                const chapter = book.chapters[chapterIndex]

                if(!chapter){
                    res.status(404).json({msg: "Chapter not found"})
                }else{
                    res.status(200).json(chapter);
                }
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Error has Occured"})
    }
}

// Insert a new Chapter
const insertChapter = async (req, res) => {
    try {
        const { bookName, author, chapter } = req.body;

        if(!bookName || !author || !chapter){
            res.status(403).json({msg: "Bad Request"});
        }else{
            const book = await Docs.findOne({
                book: bookName,
                author: author
            });
            if(!book){
                res.status(404).json({msg: "Book not found"});
            }else{
                const result = await Docs.updateOne(
                    {_id: book._id},
                    {$set: {chapters: [...book.chapters, chapter]}}
                );
                res.status(200).json(result);
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Error has Occured"})
    }
}

module.exports = {
    getBooks,
    createBook,
    getChapters,
    getChapter,
    insertChapter
}