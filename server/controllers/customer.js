const CustomerModel = require('./../models/Customer');

module.exports = {
    createCustomer: async (req, res) => {
        try {
            let { customer_name } = req.body;
            let resultCount = await CustomerModel.getCustomerByName(customer_name);
            if(resultCount[0].count_name === 0) {
                let data = req.body;
                data.is_deleted = 0;
                await CustomerModel.insertCustomer(data);
                return res.status(201).json({
                    success: true
                }); 
            } else {
                return res.json({
                    notification: `${customer_name} already exist.`
                });
            }
        } catch (error) {
            next(error);
        }
    },
    deleteCustomer: async (req, res) => {
        try {
            let { id } = req.params;
            let data = {};
            data.is_deleted = 1;
            await CustomerModel.deleteCustomerById(data, id);
            return res.status(200).json({
                success: true
            });
        } catch (error) {
            next(error);
        }
    },
    showCustomerById: async (req, res) => {
        try {
            let { id } = req.params;
            let customer = await CustomerModel.getCustomerById(id);
            return res.status(200).json({
                customer
            })
        } catch (error) {
            next(error);
        }
    },
    showSearchCustomer: async (req, res) => {
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
            let customers = await CustomerModel.searchCustomer(
                customer_name.trim(), 
                customer_email.trim(), 
                customer_number_phone.trim()
            );
            return res.status(200).json({
                customers,
                search: {
                    customer_name: customer_name.trim(),
                    customer_email: customer_email.trim(),
                    customer_number_phone: customer_number_phone.trim()
                }
            });
        } catch (error) {
            next(error);
        }
    },
    updateCustomer: async (req, res) => {
        try {
            let { customer_name } = req.body;
            let { id } = req.params;
            let resultCount = await CustomerModel.getCustomerByIdAndName(id, customer_name);
            if(resultCount[0].count_id_name === 0) {
                let data = req.body;
                await CustomerModel.updateCustomerById(data, id);
                return res.status(200).json({
                    success: true
                });
            } else {
                return res.json({
                    notification: `${customer_name} already exist.`
                });
            }
        } catch (error) {
            next(error);
        }
    },
}