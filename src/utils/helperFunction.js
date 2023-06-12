const bcrypt = require("bcrypt");
const { func } = require("joi");

const comparePassword = async (hash, password) => {
    return await bcrypt.compare(password, hash)
}


function getDateRange(dateStr) {
    const date = new Date(dateStr);
    const lte = new Date(date.getTime() + 24 * 60 * 60 * 1000); // Adding 1 day in milliseconds
    const gte = new Date(date.getTime() - 24 * 60 * 60 * 1000); // Subtracting 1 day in milliseconds

    return {
        gte: date,
        lte
    };
}


const getDateRangeObj = () => { };



module.exports = { comparePassword, getDateRange }