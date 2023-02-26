var dateFormat = require('dateformat');

const Utility = {
  formatDate: function(date:any) {
    let d = new Date(date);
    return dateFormat(d, "dd/mm/yyyy HH:MM");
  },
  formatDate1: function (date:any) {
    let d = new Date(date);
    return dateFormat(d, "dd/mm/yyyy");
  },
  formatHour: function(date:any) {
    let d = new Date(date);
    return dateFormat(d, "HH:MM");
  },
  formatDay: function(date:any) {
    let d = new Date(date);
    return dateFormat(d, "d/mm/yyyy");
  },
  formatNumber: function(number:any, float = 2) {
    return (parseFloat(number) || 0).toFixed(float).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  formatTime: function (date:any) {
    let d = new Date(date);
    return dateFormat(d, "HH:MM");
  },
  priceFormat: function (amount:any) {
    if(amount==null || amount=='' || isNaN(Number(amount)))
      return '0.00'

    try {
      return amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } catch (e) {
      return parseFloat(amount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  numberFormat: function (number:any) {
    try {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } catch (e) {
    return parseInt(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  formatDate2: function (date:any) {

    let d = new Date(date);
    return dateFormat(d, "yyyy-mm-dd");
  },

};

export default Utility;