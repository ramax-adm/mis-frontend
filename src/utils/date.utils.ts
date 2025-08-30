import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getIso8601DateString = (date?: Date) =>
  date ? date.toISOString().split("T")[0] : null;

export const getDatetime = (date?: Date) => {
  if (!date) {
    return "";
  }
  return dayjs(date).tz("America/Sao_Paulo").format("DD/MM/YYYY");
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

export const formatSeconds = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m : ${seconds}s`;
};
