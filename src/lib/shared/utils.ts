export const toSlug = (text: string): string =>
  text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

export const isValueNullOrUndefined = (value: unknown): boolean => {
  return value === null || value === undefined || typeof value === "undefined" || (typeof value === "string" && value.trim() === "");
};

export const normalizePort = (val: number | string): false | number | string => {
  const port = parseInt(val.toString(), 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

export const getCurrentDateTime = (): string => {
  const currentDate = new Date();
  const day: string = String(currentDate.getDate()).padStart(2, "0");
  const month: string = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year: string = currentDate.getFullYear().toString();
  return `${year}-${month}-${day}`;
};
