const bcrypt = require('bcryptjs');

module.exports = {
    isCompare: async (newValue, oldValue) => {
        try {
            //console.log('newValue', newValue);
            //console.log('oldValue', oldValue);
            return await bcrypt.compare(newValue, oldValue);
        } catch (error) {
            throw new Error(error)
        }
    }
}