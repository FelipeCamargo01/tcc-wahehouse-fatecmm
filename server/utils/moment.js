const moment = require ('moment');

function getMondayDayOfWeek() {
    var day = moment().startOf('week').format('dddd') === 'Sunday' ?     
    moment().startOf('week').add('d',1).format('dddd DD-MM-YYYY') : 
    moment().startOf('week').format('dddd DD-MM-YYYY');

    return day;
}

function getSundayDayOfWeek() {
    var day = moment().startOf('week').format('dddd') === 'Sunday' ?     
    moment().startOf('week').add('d',7).format('dddd DD-MM-YYYY') : 
    moment().startOf('week').format('dddd DD-MM-YYYY');

    return day;
}

module.exports = {
    getMondayDayOfWeek,
    getSundayDayOfWeek
}