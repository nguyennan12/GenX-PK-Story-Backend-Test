export const APP_TIMEZONE = 'Asia/Ho_Chi_Minh';

const DATE_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function isValidDateString(value: string): boolean {
  if (!DATE_FORMAT_REGEX.test(value)) {
    return false;
  }

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function toProjectWeekday(jsWeekday: number): number {
  return (jsWeekday + 6) % 7;
}

 // convert String to Date Type
export function parseDate(dateString: string): Date {
  return new Date(`${dateString}T00:00:00.000Z`);
}
// convert Date Type to String
export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function addOneDay(date: Date): Date {
  const nextDate = new Date(date);
  nextDate.setUTCDate(nextDate.getUTCDate() + 1);
  return nextDate;
}