const Joi = require('@hapi/joi');

const db = require('./../../config/database');

const tables = {
    bookTable: Joi.object().keys({
        book_name: Joi.string().min(2).required(),
        author_id: Joi.number().required(),
        book_type_id: Joi.number().required(),
        book_publishing_house: Joi.string().min(3).required(),
        book_publishing_date: Joi.date().required(),
        is_deleted: Joi.number().required()
    }),
    bookUpdateTable: Joi.object().keys({
        book_name: Joi.string().min(2).required(),
        author_id: Joi.number().required(),
        book_type_id: Joi.number().required(),
        book_publishing_house: Joi.string().min(3).required(),
        book_publishing_date: Joi.date().required()
    }),
    idTable: Joi.object().keys({
        param: Joi.string().regex(/^\d+$/).required()
    })
}

const validateBody = (table) => {
    //console.log('validateBody');
    return (req, res, next) => {
        const validatorResult = table.validate(req.body);
        
        //console.log(validatorResult);
        if(validatorResult.error) {
            return res.json(validatorResult.error);
        } else {
            req.body = validatorResult.value;
            //console.log('helper', req.body);
            next();
        }
    }
}

const validateParamsBook = (table, name) => {
    return (req, res, next) => {
        const validatorResult = table.validate({
            param: req.params[name]
        });
        if(validatorResult.error) {
            return res.json({ error: true });
        } else {
            req.params[name] = validatorResult.value.param;
            let query = `SELECT count(*) count_id ` +
                        `FROM book ` +
                        `WHERE is_deleted = 0 ` +
                        `AND book_id = '${parseInt(req.params[name])}'`;
            db.query(query,(err, results) => {
                if(err) console.log(err);
                if(results[0].count_id === 0) {
                    return res.json({ 
                        error: true 
                    });
                } else {
                    next();
                }
            });
        }
    }
}

module.exports = {
    tables,
    validateBody,
    validateParamsBook
}