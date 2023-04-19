const dayjs = require("dayjs");
const weekOfYear = require("dayjs/plugin/weekOfYear");
const utc = require("dayjs/plugin/utc");
const isoWeek = require("dayjs/plugin/isoWeek");
dayjs.extend(weekOfYear);
dayjs.extend(utc);
dayjs.extend(isoWeek);

const today = dayjs().format("dddd-YYYY-MM-DD");
const dateSplit = today.split("-");
const dateNum = `${dateSplit[2]}/${dateSplit[3]}`;

export default function getDate() {
  const today = (): string => {
    return dayjs().format("dddd-YYYY-MM-DD");
  };
  const taskDay = (date: string): string => {
    const dateSplit = date.split("-");
    return `${dateSplit[1]}-${dateSplit[2]}-${dateSplit[3]}`;
  };
  const day = (): string => {
    return dateSplit[0];
  };
  const dayNum = (): string => {
    return dayjs().day();
  };
  const dateNum = (): string => {
    return `${dateSplit[2]}/${dateSplit[3]}`;
  };

  const getWeek = (): string => {
    return dayjs(dayjs().format("YYYY-MM-DD")).isoWeek();
  };

  const compareDate = (date: string) => {
    const today = dayjs().format("YYYY-MM-DD");
    return dayjs(date).valueOf() - dayjs(today).valueOf();
  };

  const getDay = (date: string): string => {
    const dateSplit = date.split("-");
    return dayjs(
      `${dateSplit[1]}-${dateSplit[2]}-${dateSplit[3]}`
    ).isoWeekday();
  };

  const dayOfWeekFull = (day: string) => {
    const week = getWeek();
    return dayjs().isoWeek(week).isoWeekday(day).format("dddd-YYYY-MM-DD");
  };
  const dayOfWeek = (day: string, week: string) => {
    return dayjs().isoWeek(week).isoWeekday(day).format("MM-DD");
  };
  return {
    dayNum,
    today,
    day,
    dateNum,
    getWeek,
    getDay,
    compareDate,
    taskDay,
    dayOfWeekFull,
    dayOfWeek,
  };
}
