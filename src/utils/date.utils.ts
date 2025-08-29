import dayjs from "dayjs";

export const getIso8601DateString = (date?: Date) =>
  date ? date.toISOString().split("T")[0] : null;

export const getDatetime = (date?: Date) => {
  if (!date) {
    return "";
  }
  return dayjs(date).format("DD/MM/YYYY HH:mm");
};

export const getDiffBetweenDates = (
  startDate: Date,
  endDate: Date,
  unit: dayjs.QUnitType
) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  // diferença em segundos
  return end.diff(start, unit);
};
