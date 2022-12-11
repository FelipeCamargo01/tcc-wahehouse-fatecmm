const moment = require ('moment');

function getMondayDayOfWeek() {
    var day = moment().startOf('week').format('dddd') === 'Sunday' ?     
    moment().startOf('week').format('dddd DD-MM-YYYY') : 
    moment().startOf('week').format('dddd DD-MM-YYYY');

    console.log('getMondayDayOfWeek', day);

    return day;
}

function getSundayDayOfWeek() {
    var day = moment().startOf('week').format('dddd') === 'Sunday' ?     
    moment().startOf('week').add('d',6).format('dddd DD-MM-YYYY') : 
    moment().startOf('week').format('dddd DD-MM-YYYY');

    console.log('getSundayDayOfWeek', day);

    return day;
}

module.exports = {
    getMondayDayOfWeek,
    getSundayDayOfWeek
}