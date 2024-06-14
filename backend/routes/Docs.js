const { getBooks, getBook, createBook, getChapters, getChapter } = require("../controllers/Docs");
const docsRouter = require("express")();

docsRouter.route("/books").get(getBooks)
docsRouter.route("/book").get(getBook).post(createBook)
docsRouter.route("/chapters").get(getChapters)
docsRouter.route("/chapter").get(getChapter)

module.exports = docsRouter;
