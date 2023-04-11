export const counter = (seconds: number, action: string) => {
  let COUNT = seconds;

  switch (action) {
    case "add":
      if (COUNT < 3600) {
        return COUNT + 30;
      } else {
        return COUNT;
      }
    case "sub":
      if (COUNT > 0) {
        return COUNT - 30;
      } else {
        return COUNT;
      }
    case "res":
      COUNT = 0;
      return COUNT;
    default:
      return 0;
  }
};

export const displayCount = (seconds: number): string => {
  const str = seconds.toString();
  const s = parseInt(str.replace("0", ""));
  console.log(str);

  if (seconds === 0) {
    return `00:00`;
  }
  if (s % 2 === 0) {
    const t = s / 3;
    return `${t / 2}:00`;
  } else {
    const t = s / 3 - 1;

    return `${t / 2}:30`;
  }
};
