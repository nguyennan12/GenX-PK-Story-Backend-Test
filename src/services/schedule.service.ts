import { addOneDay, formatDate, parseDate, toProjectWeekday } from '../utils/date.utils.js';
import type { ScheduleGenerateRequest } from '../validators/schedule.validator.js';

export interface ScheduleGenerateResponse {
  endDate: string;
  fullSchedule: string[];
}

function isInHolidayRange(dateString: string,holidayRanges: Array<[string, string]>): boolean {
  return holidayRanges.some(([start, end]) => dateString >= start && dateString <= end);
}

const generate = (request: ScheduleGenerateRequest): ScheduleGenerateResponse => {
  const normalizedWeekdays = [... new Set(request.classWeekdays)].sort((a,b) => a - b);
  const holidaySet = new Set(request.holidays);

  const fullSchedule: string[] = [];
  let currentDate = parseDate(request.startDate);

  while(fullSchedule.length < request.totalClasses){
    const currentDateString = formatDate(currentDate);
    const weekday = toProjectWeekday(currentDate.getUTCDay());

    const isClassDay = normalizedWeekdays.includes(weekday);
    const isHoliday = holidaySet.has(currentDateString);
    const isRangeHoliday = isInHolidayRange(currentDateString, request.holidayRanges);

    if (isClassDay && !isHoliday && !isRangeHoliday) {
      fullSchedule.push(currentDateString);
    }
    currentDate = addOneDay(currentDate);
  }
  return {
    endDate: fullSchedule[fullSchedule.length - 1],
    fullSchedule,
  };
}

export const ScheduleService = { generate };
