import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getCurrentDateTimeUTC = (): Dayjs => {
  return dayjs.utc();
};

export const getSetUTCDateTime = (
  config?: string | number | Date | dayjs.Dayjs | null | undefined,
  format?: string | undefined,
  strict?: boolean | undefined
): Dayjs => {
  return dayjs.utc(config, format, strict);
};

export const formatDateLocal = (date: Dayjs | undefined | null): string => {
  if (date) {
    return dayjs.utc(date).tz(dayjs.tz.guess()).format("dddd, MMMM DD, YYYY");
  } else {
    return "";
  }
};

export const formatTimeLocal = (date: Dayjs | undefined | null): string => {
  if (date) {
    return dayjs.utc(date).tz(dayjs.tz.guess()).format("HH:mm");
  } else {
    return "";
  }
};
