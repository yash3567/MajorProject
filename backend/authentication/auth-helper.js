const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
    try {
        const salt = 8;
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    } catch (error) {
        console.log(error);
    }
};

const checkHashedPassword = async (password, hashedPassword) => {
    try {
        return bcrypt.compare(password, hashedPassword)
    } catch (error) {
        console.log(error);
    }
}
module.exports = { hashPassword, checkHashedPassword };