export const getMondaFromWeekDay = (date: Date) => {
  const result = new Date(date);
  const day = result.getDay() || 7;
  if (day !== 1) {
    result.setHours(-24 * (day - 1));
  }

  return result;
};

export const getSundayFromWeekDay = (date: Date) => {
  const result = new Date(date);
  const day = result.getDay() || 7;
  if (day !== 7) {
    result.setHours(24 * (7 - day));
  }

  return result;
};

export const groupByDate = <T>(
  objs: T[],
  getDate: (obj: T) => Date
): Map<string, T[]> => {
  const groupedObjs = new Map<string, T[]>();

  objs.forEach((obj) => {
    const key = new Date(getDate(obj)).toDateString();
    const group = groupedObjs.get(key) ?? [];
    group.push(obj);
    groupedObjs.set(key, group);
  });

  return groupedObjs;
};
