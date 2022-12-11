const moment = require ('moment');

function getMondayDayOfWeek() {
    var day = moment().startOf('week').format('dddd') === 'Sunday' ?     
    moment().startOf('week') : 
    moment().startOf('week').remove('d',1);

    console.log('getMondayDayOfWeek', day);

    return day;
}

function getSundayDayOfWeek() {
    var day = moment().startOf('week').format('dddd') === 'Sunday' ?     
    moment().startOf('week').add('d',6) : 
    moment().startOf('week');

    console.log('getSundayDayOfWeek', day);

    return day;
}

module.exports = {
    getMondayDayOfWeek,
    getSundayDayOfWeek
}