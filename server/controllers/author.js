const AuthorModel = require('./../models/Author');

module.exports = {
    createAuthor: async (req, res) => {
        try {
            let { author_name } = req.body;
            let resultCount = await AuthorModel.getAuthorByName(author_name);
            if(resultCount[0].count_name === 0) {
                let data = req.body;
                //data.is_deleted = 0;
                await AuthorModel.insertAuthor(data);
                return res.status(201).json({ success: true });
            } else {
                return res.json({
                    notification: `${author_name} already exist.`
                })
            }
        } catch (error) {
            next(error);
        }
    },
    deleteAuthor: async (req, res) => {
        try {
            let { id } = req.params;
            let data = {};
            data.is_deleted = 1;
            await AuthorModel.deleteAuthorById(data, id);
            return res.status(200).json({ success: true });
        } catch (error) {
            next(error);
        }
    },
    showAuthorById: async (req, res) => {
        try {
            let { id } = req.params;
            let author = await AuthorModel.getAuthorById(id);
            return res.status(200).json({
                author
            })
        } catch (error) {
            next(error);
        }
    },
    showSearchAuthor: async (req, res) => {
        try {
            let { author_name } = req.body;
            if(!author_name) {
                author_name = '';
            }
            let authors = await AuthorModel.searchAuthor(author_name.trim());
            return res.status(200).json({
                authors,
                search: {
                    author_name: author_name.trim()
                }
            });
        } catch (error) {
            next(error);
        }
    },
    updateAuthor: async (req, res) => {
        try {
            let { author_name } = req.body;
            let { id } = req.params;
            let resultCount = await AuthorModel.getAuthorByIdAndName(id, author_name);
            if(resultCount[0].count_id_name === 0) {
                let data = req.body;
                await AuthorModel.updateAuthorById(data, id);
                return res.status(200).json({ success: true });
            } else {
                res.json({
                    notification: `${author_name} already exist.`
                });
            }
        } catch (error) {
            next(error);
        }
    }
}