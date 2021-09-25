const BookTypeModel = require('./../models/BookType');

module.exports = {
    createBookType: async (req, res) => {
        try {
            let { book_type_name } = req.body;
            let resultCount = await BookTypeModel.getBookTypeByName(book_type_name);
            if(resultCount[0].count_name === 0) {
                let data = req.body;
                data.is_deleted = 0;
                await BookTypeModel.insertBookType(data);
                return res.status(201).json({ success: true });
            } else {
                return res.json({
                    notification: `${book_type_name} already exist.`
                })
            }
        } catch (error) {
            next(error);
        }
    },
    deleteBookType: async(req, res) => {
        try {
            let { id } = req.params;
            let data = {};
            data.is_deleted = 1;
            await BookTypeModel.deleteBookTypeById(data, id);
            return res.status(200).json({ success: true });
        } catch (error) {
            next(error);
        }
    },
    showBookTypeById: async (req, res) => {
        try {
            let { id } = req.params;
            let bookType = await BookTypeModel.getBookTypeById(id);
            return res.status(200).json({ bookType });
        } catch (error) {
            next(error);
        }
    },
    showSearchBookType: async (req, res) => {
        try {
            let { book_type_name } = req.body;
            if(!book_type_name) {
                book_type_name = '';
            }
            let bookTypes = await BookTypeModel.searchBookType(book_type_name.trim());
            return res.status(200).json({
                bookTypes,
                search: {
                    book_type_name: book_type_name.trim()
                }
            })
        } catch (error) {
            next(error);
        }
    },
    updateBookType: async (req, res) => {
        try {
            let { id } = req.params;
            let { book_type_name } = req.body;
            let resultsCount = await BookTypeModel.getBookTypeByIdAndName(id, book_type_name);
            if(resultsCount[0].count_id_name === 0) {
                let data = req.body;
                await BookTypeModel.updateBookTypeById(data, id);
                return res.status(200).json({ success: true });
            } else {
                return res.json({
                    notification: `${book_type_name} already exist.`
                })
            }
        } catch (error) {
            next(error);
        }
    },
}