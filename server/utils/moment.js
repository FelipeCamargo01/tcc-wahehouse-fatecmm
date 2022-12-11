const moment = require ('moment');

function getMondayDayOfWeek() {
    var day = moment().startOf('week').format('dddd') === 'Sunday' ?     
    moment().startOf('week').add('d',1).format('dddd DD-MM-YYYY') : 
    moment().startOf('week').format('dddd DD-MM-YYYY');

    day = day.subtract(1, 'd')

    console.log('getMondayDayOfWeek', day);

    return day;
}

function getSundayDayOfWeek() {
    var day = moment().startOf('week').format('dddd') === 'Sunday' ?     
    moment().startOf('week').add('d',7).format('dddd DD-MM-YYYY') : 
    moment().startOf('week').format('dddd DD-MM-YYYY');

    day = day.subtract(1, 'd')

    console.log('getSundayDayOfWeek', day);

    return day;
}

module.exports = {
    getMondayDayOfWeek,
    getSundayDayOfWeek
}