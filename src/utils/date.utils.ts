export const getIso8601DateString = (date?: Date) =>
  date ? date.toISOString().split("T")[0] : null;
