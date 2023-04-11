const dayjs = require("dayjs");
const weekOfYear = require("dayjs/plugin/weekOfYear");
const utc = require("dayjs/plugin/utc");
const isoWeek = require("dayjs/plugin/isoWeek");
dayjs.extend(weekOfYear);
dayjs.extend(utc);
dayjs.extend(isoWeek);

// console.log(dayjs().utc().local());

// returns new dayjs object
console.log(dayjs().format("dddd-YYYY-MM-DD"));

console.log(dayjs("2023-04-10").week());
console.log(dayjs("2023-04-11").isoWeek());
console.log(dayjs("2023-04-11").isoWeek());
