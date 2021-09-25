const HistoryModel = require('./../models/History');

module.exports = {
    createHistory: async (req, res) => {
        try {
            let { customer_id } = req.body;
            let resultCount = await HistoryModel.getHistoryByIdCustomer(customer_id);
            if(resultCount[0].count_id_customer == 0) {
                let data = req.body;
                data.is_deleted = 0;
                await HistoryModel.insertHistory(data);
                return res.status(201).json({
                    success: true
                });
            } else {
                return res.json({
                    notification: 'History already exist.'
                })
            }
        } catch (error) {
            next(error);
        }
    },
    deleteHistory: async (req, res) => {
        try {
            let { id } = req.params;
            let data = {};
            data.is_deleted = 1;
            await HistoryModel.deleteHistoryById(data, id);
            return res.status(200).json({
                success: true
            })
        } catch (error) {
            next(error);
        }
    },
    showCustomer: async (req, res) => {
        try {
            let customers = await HistoryModel.getCustomer();
            return res.status(200).json({
                customers
            })
        } catch (error) {
            next(error);
        }
    },
    showHistoryById: async (req, res) => {
        try {
            let { id } = req.params;
            let history = await HistoryModel.getHistoryById(id);
            return res.status(200).json({
                history
            })
        } catch (error) {
            next(error);
        }
    },
    showSearchHistory: async (req, res) => {
        try {
            let {
                 customer_name, 
                 customer_email, 
                 customer_number_phone 
            } = req.body;
            if(!customer_name) {
                customer_name = '';
            }
            if(!customer_email) {
                customer_email = '';
            }
            if(!customer_number_phone) {
                customer_number_phone = '';
            }
            let histories = await HistoryModel.searchHistory(
                customer_name.trim(),
                customer_email.trim(),
                customer_number_phone.trim()
            );
            return res.status(200).json({
                histories,
                search: {
                    customer_name: customer_name.trim(),
                    customer_email: customer_email.trim(),
                    customer_number_phone: customer_number_phone.trim()
                }
            })
        } catch (error) {
            next(error);
        }
    },
    updateHistory: async (req, res) => {
        try {
            let { id } = req.params;
            let { customer_id } = req.body;
            let resultCount = await HistoryModel.getHistoryByIdCustomerAndHistory(id, customer_id);
            if(resultCount[0].count_id === 0) {
                let data = req.body;
                await HistoryModel.updateHistoryById(data, id);
                return res.status(200).json({
                    success: true
                })
            } else {
                return res.json({
                    notification: 'History already exist.'
                })
            }
        } catch (error) {
            next(error);
        }
    },
}