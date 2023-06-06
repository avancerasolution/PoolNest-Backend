function getWeeksInRange(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the difference in days between the start and end dates
    const diffDays = Math.round(Math.abs((start - end) / oneDay));

    // Calculate the number of weeks
    const weeks = Math.floor(diffDays / 7);

    return weeks;
}


const getNumberForFrequency = (key) => {
    let obj = {
        WEEKLY: 4,
        EVERY_TWO_WEEKS: 2,
        EVERY_THREE_WEEKS: 1,
        EVERY_FOUR_WEEKS: 1,
    }
    return obj[key]
}



function addDays(date, days) {
    var newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

module.exports = { getWeeksInRange, getNumberForFrequency, addDays }