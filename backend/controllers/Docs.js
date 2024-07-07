const Docs = require("../models/Docs")

const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

// Get all books
const getBooks = async (req, res) => {
    try {
        const { query } = req.query;
        
        const books = await Docs.find();
        var searchedBooks = []
        if(query){
            searchedBooks = await books.filter(book => book.book.toLowerCase().includes(query.toLowerCase()) || book?.author?.toLowerCase().includes(query.toLowerCase()) || book?.publisher?.toLowerCase().includes(query.toLowerCase()))
        }

        if(books.length < 1){
            res.status(200).json({msg: "There are no books at the moment"})
        }else{
            var bookDataArray = [];

            if(query){
                searchedBooks.forEach(book => {
                    bookDataArray = [...bookDataArray, {bookName: book.book, author: book.author, publisher: book.publisher, modified: book.modified}]
                });
                return res.status(200).json(bookDataArray);
            }else{
                books.forEach(book => {
                    bookDataArray = [...bookDataArray, {bookName: book.book, author: book.author, publisher: book.publisher, modified: book.modified}]
                });
                return res.status(200).json(bookDataArray);
            }
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
            res.status(400).json({msg: "Bad Request"})
        }else{
            const book = await Docs.findOne({
                book: bookData.name,
                author: bookData.author,
                publisher: bookData.publisher
            });
            if(book){
                res.status(200).json({msg: "Book Already Exists"})
            }else{
                const newBook = new Docs({
                    book: bookData.name,
                    author: bookData.author,
                    publisher: bookData.publisher,
                    modified: getFormattedDate()
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
            res.status(400).json({msg: "Bad Request"})
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
            res.status(400).json({msg: "Bad Request"})
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
        const { bookName, author, publisher, chapter } = req.body;

        if(!bookName || !author || !publisher || !chapter){
            res.status(400).json({msg: "Bad Request"});
        }else{
            const book = await Docs.findOne({
                book: bookName,
                author: author,
                publisher: publisher
            });
            if(!book){
                res.status(404).json({msg: "Book not found"});
            }else{
                const result = await Docs.updateOne(
                    {_id: book._id},
                    {$set: {
                        chapters: [...book.chapters, chapter],
                        modified: getFormattedDate()
                    }}
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