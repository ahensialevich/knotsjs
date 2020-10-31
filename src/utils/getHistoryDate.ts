import { format, subMonths, subWeeks, subYears } from 'date-fns';

export const dateFormat = 'yyyy-MM-dd';

export const getHistoryDate = (today: Date, value: string) => {
  switch (value) {
    case 'year': {
      return format(subYears(today, 1), dateFormat);
    }
    case 'month': {
      return format(subMonths(today, 1), dateFormat);
    }
    default: {
      return format(subWeeks(today, 1), dateFormat);
    }
  }
};
