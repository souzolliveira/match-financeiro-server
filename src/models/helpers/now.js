const moment = require("moment");

exports.now = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  return moment(date).subtract(offset, "minutes");
};
