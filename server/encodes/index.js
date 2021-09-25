const bcrypt = require('bcryptjs'); // dung de ma hoa

module.exports = {
    bcryptValue: async (value) => {
        try {
            //console.log('value', value);
            const salt = await bcrypt.genSalt(10);
            //console.log('salt', salt);
            const valueHashed = await bcrypt.hash(value, salt);
            //console.log('hash', valueHashed);
            return valueHashed;
        } catch (error) {
            next(error);
        }
    }
}