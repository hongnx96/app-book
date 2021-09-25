const Joi = require('@hapi/joi');

const db = require('../../config/database');

const tables = {
    authorTable: Joi.object().keys({
        author_name: Joi.string().min(2).required(),
        author_day_of_birth: Joi.date().required(),
        is_deleted: Joi.number().required()
    }),
    authorUpdateTable: Joi.object().keys({
        author_name: Joi.string().min(2).required(),
        author_day_of_birth: Joi.date().required()
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

const validateParamsAuthor = (table, name) => {
    return (req, res, next) => {
        const validatorResult = table.validate({
            param: req.params[name]
        });
        if(validatorResult.error) {
            return res.json({ error: true });
        } else {
            req.params[name] = validatorResult.value.param;
            let query = `SELECT count(*) count_id ` +
                        `FROM author ` +
                        `WHERE is_deleted = 0 ` +
                        `AND author_id = '${parseInt(req.params[name])}'`;
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
    validateParamsAuthor
}