import moment, { Moment } from 'moment';

export const TimeFormat = {
  ONLY_DATE: 'YYYY-MM-DD',
  ONLY_TIME: 'hh:mm',
  STANDARD_WITHOUT_SECOND: 'YYYY-MM-DD hh:mm',
  STANDARD: 'YYYY-MM-DD hh:mm:ss',
  STANDARD_WITH_TIMEZONE: 'z YYYY-MM-DD hh:mm A',
};

export const useTimeFormatter = () => {
  const formatting = (date?: Moment | Date, format?: string) => {
    if (!date) return date;
    const instance = moment(date);
    return instance.format(format);
  };
};
