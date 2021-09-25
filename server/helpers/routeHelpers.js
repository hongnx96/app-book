const Joi = require('@hapi/joi');

const db = require('./../config/database');

const tables = {
    idTable: Joi.object().keys({
        param: Joi.string().regex(/^\d+$/).required()
    }),
    // authorTable: Joi.object().keys({
    //     author_name: Joi.string().min(2).required(),
    //     author_day_of_birth: Joi.date().required(),
    //     is_deleted: Joi.number().required()
    // }),
    // authorUpdateTable: Joi.object().keys({
    //     author_name: Joi.string().min(2).required(),
    //     author_day_of_birth: Joi.date().required()
    // }),
    // bookTable: Joi.object().keys({
    //     book_name: Joi.string().min(2).required(),
    //     author_id: Joi.number().required(),
    //     book_type_id: Joi.number().required(),
    //     book_publishing_house: Joi.string().min(3).required(),
    //     book_publishing_date: Joi.date().required(),
    //     is_deleted: Joi.number().required()
    // }),
    // bookUpdateTable: Joi.object().keys({
    //     book_name: Joi.string().min(2).required(),
    //     author_id: Joi.number().required(),
    //     book_type_id: Joi.number().required(),
    //     book_publishing_house: Joi.string().min(3).required(),
    //     book_publishing_date: Joi.date().required()
    // }),
    bookTypeTable: Joi.object().keys({
        book_type_name: Joi.string().min(2).required(),
        is_deleted: Joi.number().required()
    }),
    bookTypeUpdateTable: Joi.object().keys({
        book_type_name: Joi.string().min(2).required()
    }),
    bookStockTable: Joi.object().keys({
        book_id: Joi.number().required(),
        instock: Joi.number().required(),
        rending: Joi.number().required(),
        quantity: Joi.number().required(),
        is_deleted: Joi.number().required()
    }),
    bookStockUpdateTable: Joi.object().keys({
        book_id: Joi.number().required(),
        instock: Joi.number().required(),
        rending: Joi.number().required(),
        quantity: Joi.number().required(),
    }),
    customerTable: Joi.object().keys({
        customer_name: Joi.string().min(2).required(),
        customer_email: Joi.string().email().required(),
        customer_number_phone: Joi.string().length(10).pattern(/^[0-9]+$/),
        is_deleted: Joi.number().required()
    }),
    customerUpdateTable: Joi.object().keys({
        customer_name: Joi.string().min(2).required(),
        customer_email: Joi.string().email().required(),
        customer_number_phone: Joi.string().length(10).pattern(/^[0-9]+$/)
    }),
    historyTable: Joi.object().keys({
        customer_id: Joi.number().required(),
        is_deleted: Joi.number().required()
    }),
    historyUpdateTable: Joi.object().keys({
        customer_id: Joi.number().required(),
    }),
    historyDetailTable: Joi.object().keys({
        history_id: Joi.number().required(),
        book_id: Joi.number().required(),
        quantity: Joi.number().integer().positive().required(),
        borrowed_book_date: Joi.string().regex(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/).required(),
        pay_book_date: Joi.string().regex(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/).required(),
        status: Joi.string().required(),
        is_deleted: Joi.number().required(),
        book_name: Joi.string().required()
    }),
    historyDetailUpdateTable: Joi.object().keys({
        history_id: Joi.number().required(),
        book_id: Joi.number().required(),
        quantity: Joi.number().integer().positive().required(),
        borrowed_book_date: Joi.string().regex(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/).required(),
        pay_book_date: Joi.string().regex(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/).required()
    }),
    historyDetailPayBookTable: Joi.object().keys({
        status: Joi.string().required()
    }),
    historyDetailBookStockUpdatePayBookTable: Joi.object().keys({
        book_id: Joi.number().required(),
        quantity: Joi.number().required(),
    }),
    roleTable: Joi.object().keys({
        role_name: Joi.string().min(3).required(),
        is_deleted: Joi.number().required()
    }),
    roleUpdateTable: Joi.object().keys({
        role_name: Joi.string().min(3).required()
    }),
    userTable: Joi.object().keys({
        user_name: Joi.string().min(2).required(),
        user_password: Joi.string().min(6).required(),
        role_id: Joi.number().required(),
        user_age: Joi.number().required(),
        user_email: Joi.string().email().required(),
        is_deleted: Joi.number().required()
    }),
    userSignInTable: Joi.object().keys({
        user_password: Joi.string().min(6).required(),
        user_email: Joi.string().email().required()
    }),
    userUpdateTable: Joi.object().keys({
        user_name: Joi.string().min(2).required(),
        role_id: Joi.number().required(),
        user_age: Joi.number().required(),
        user_email: Joi.string().email().required()
    }),
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

// const validateParamsAuthor = (table, name) => {
//     return (req, res, next) => {
//         const validatorResult = table.validate({
//             param: req.params[name]
//         });
//         if(validatorResult.error) {
//             return res.json({ error: true });
//         } else {
//             req.params[name] = validatorResult.value.param;
//             let query = `SELECT count(*) count_id ` +
//                         `FROM author ` +
//                         `WHERE is_deleted = 0 ` +
//                         `AND author_id = '${parseInt(req.params[name])}'`;
//             db.query(query,(err, results) => {
//                 if(err) console.log(err);
//                 if(results[0].count_id === 0) {
//                     return res.json({ 
//                         error: true 
//                     });
//                 } else {
//                     next();
//                 }
//             });
//         }
//     }
// }

// const validateParamsBook = (table, name) => {
//     return (req, res, next) => {
//         const validatorResult = table.validate({
//             param: req.params[name]
//         });
//         if(validatorResult.error) {
//             return res.json({ error: true });
//         } else {
//             req.params[name] = validatorResult.value.param;
//             let query = `SELECT count(*) count_id ` +
//                         `FROM book ` +
//                         `WHERE is_deleted = 0 ` +
//                         `AND book_id = '${parseInt(req.params[name])}'`;
//             db.query(query,(err, results) => {
//                 if(err) console.log(err);
//                 if(results[0].count_id === 0) {
//                     return res.json({ 
//                         error: true 
//                     });
//                 } else {
//                     next();
//                 }
//             });
//         }
//     }
// }

const validateParamsBookStock = (table, name) => {
    return (req, res, next) => {
        const validatorResult = table.validate({
            param: req.params[name]
        });
        if(validatorResult.error) {
            return res.json({ error: true });
        } else {
            req.params[name] = validatorResult.value.param;
            let query = `SELECT count(*) count_id ` +
                        `FROM book_stock ` +
                        `WHERE is_deleted = 0 ` +
                        `AND book_stock_id = '${parseInt(req.params[name])}'`;
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

const validateParamsBookType = (table, name) => {
    return (req, res, next) => {
        const validatorResult = table.validate({
            param: req.params[name]
        });
        if(validatorResult.error) {
            return res.json({ error: true });
        } else {
            db.query('SELECT book_type_id FROM book_type WHERE is_deleted = 0',
            (err, results) => {
                if(err) console.log(err);
                req.params[name] = validatorResult.value.param;
                let dataId = JSON.parse(JSON.stringify(results));
                let paramsId = [];
                for(let i = 0; i< dataId.length; i++) {
                    paramsId.push(dataId[i].book_type_id);
                }
                if(paramsId.indexOf(parseInt(req.params[name])) === -1) {
                    return res.json({ error: true });
                } else {
                    next();
                }
            });
        }
    }
}

const validateParamsCustomer = (table, name) => {
    return (req, res, next) => {
        const validatorResult = table.validate({
            param: req.params[name]
        });
        if(validatorResult.error) {
            return res.json({
                error: true
            });
        } else {
            req.params[name] = validatorResult.value.param;
            let query = `SELECT count(*) count_id ` +
                        `FROM customer ` +
                        `WHERE is_deleted = 0 ` +
                        `AND customer_id = '${parseInt(req.params[name])}'`;
            db.query(query,
                (err, result) => {
                    if (err) console.log(err);
                    if(result[0].count_id === 0) {
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

const validateParamsHistory = (table, name) => {
    return (req, res, next) => {
        const validatorResult = table.validate({
            param: req.params[name]
        });
        if(validatorResult.error) {
            return res.json({
                error: true
            });
        } else {
            req.params[name] = validatorResult.value.param;
            let query = `SELECT count(*) count_id ` +
                        `FROM history ` +
                        `WHERE is_deleted = 0 ` +
                        `AND history_id = '${parseInt(req.params[name])}'`;
            db.query(query,
                (err, result) => {
                    if (err) console.log(err);
                    if(result[0].count_id === 0) {
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

const validateParamsHistoryDetail = (table, name) => {
    return (req, res, next) => {
        const validatorResult = table.validate({
            param: req.params[name]
        });
        if(validatorResult.error) {
            return res.json({
                error: true
            });
        } else {
            req.params[name] = validatorResult.value.param;
            let query = `SELECT count(*) count_id ` +
                        `FROM history_detail ` +
                        `WHERE is_deleted = 0 ` +
                        `AND history_detail_id = '${parseInt(req.params[name])}'`;
            db.query(query,
                (err, result) => {
                    if (err) console.log(err);
                    if(result[0].count_id === 0) {
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

const validateParamsRole = (table, name) => {
    return (req, res, next) => {
        const validatorResult = table.validate({
            param: req.params[name]
        });
        if(validatorResult.error) {
            return res.json({
                error: true
            });
        } else {
            req.params[name] = validatorResult.value.param;
            let query = `SELECT count(*) count_id ` + 
                        `FROM role ` + 
                        `WHERE is_deleted = 0 ` + 
                        `AND role_id = '${parseInt(req.params[name])}'`;
            db.query(query,(err, result) => {
                if(err) console.log(err);
                if(result[0].count_id === 0) {
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

const validateParamsUser = (table, name) => {
    return (req, res, next) => {
        const validatorResult = table.validate({
            param: req.params[name]
        });
        if(validatorResult.error) {
            return res.json({
                error: true
            });
        } else {
            req.params[name] = validatorResult.value.param;
            let query = `SELECT count(*) count_id ` + 
                        `FROM user ` + 
                        `WHERE is_deleted = 0 ` + 
                        `AND user_id = '${parseInt(req.params[name])}'`;
            db.query(query,(err, result) => {
                if(err) console.log(err);
                if(result[0].count_id === 0) {
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
    //validateParamsAuthor,
    //validateParamsBook,
    validateParamsBookStock,
    validateParamsBookType,
    validateParamsCustomer,
    validateParamsHistory,
    validateParamsHistoryDetail,
    validateParamsRole,
    validateParamsUser
}