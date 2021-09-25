const BookModel = require('./../models/Book');

module.exports = {
    createBook: async (req, res) => {
        try {
            let { book_name } = req.body;
            let resultCount = await BookModel.getBookByName(book_name);
            if(resultCount[0].count_name === 0) {
                let data = req.body;
                data.is_deleted = 0;
                await BookModel.insertBook(data);
                return res.status(201).json({
                    success: true
                });
            } else {
                return res.json({
                    notification: `${book_name} already exist.`
                });
            }
        } catch (error) {
            next(error);
        }
    }, 
    deleteBook: async (req, res) => {
        try {
            let { id } = req.params;
            let data = {};
            data.is_deleted = 1;
            await BookModel.deleteBook(data, id);
            return res.status(200).json({
                success: true
            });
        } catch (error) {
            next(error);
        }
    },
    showAuthor: async (req, res) => {
        try {
            let authors = await BookModel.getAuthor();
            //console.log(authors);
            return res.status(200).json({
                authors
            });
        } catch (error) {
            next(error);
        }
    },
    showBookById: async (req, res) => {
        try {
            let { id } = req.params;
            //console.log('id', id);
            let book = await BookModel.getBookById(id);
            return res.status(200).json({
                book
            });
        } catch (error) {
            next(error)
        }
    },
    showBookType: async (req, res) => {
        try {
            let bookTypes = await BookModel.getBookType();
            return res.status(200).json({
                bookTypes
            });
        } catch (error) {
            next(error);
        }
    },
    showSearchBook: async (req, res) => {
        try {
            let {
                book_name,
                author_id,
                book_type_id
            } = req.body;
            if(!book_name) {
                book_name = '';
            }
            if(!author_id) {
                author_id = '';
            }
            if(!book_type_id) {
                book_type_id = '';
            }
            //console.log('id', typeof book_type_id.trim());
            let books = await BookModel.searchBook(
                book_name.trim(),
                author_id.trim(),
                book_type_id.trim()
            );
            /* let author = await BookModel.getAuthorById(author_id.trim());
            let author_name = null;
            if(author.length === 0) {
                author_name = '';
            } else {
                author_name = author[0].author_name;
            }
            let book_type = await BookModel.getBookTypeById(book_type_id.trim());
            let book_type_name = null;
            if(book_type.length === 0) {
                book_type_name = '';
            } else {
                book_type_name = book_type[0].book_type_name;
            } */
            return res.status(200).json({
                books,
                search: {
                    book_name: book_name.trim(),
                    author_id: author_id.trim(),
                    book_type_id: book_type_id.trim()
                    /* author_name: author[0].author_name || '',
                    book_type_name: book_type[0].book_type_name || '' */
                }
            });
        } catch (error) {
            next(error);
        }
    },
    updateBook: async (req, res) => {
        try {
            let { id } = req.params;
            let { book_name } = req.body;
            let resultCount = await BookModel.getBookByIdAndName(id, book_name);
            if(resultCount[0].count_id_name === 0) {
                let data = req.body;
                await BookModel.updateBookById(data, id);
                return res.status(200).json({
                    success: true
                });
            } else {
                return res.json({
                    notification: `${book_name} already exist.`
                });
            }
        } catch (error) {
            next(error);
        }
    },
}