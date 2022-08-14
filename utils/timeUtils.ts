import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const secondsToMinutesSeconds = (value: string | number) => {
  const dur = dayjs.duration(
    typeof value === "number" ? value : Number.parseInt(value),
    "seconds"
  );
  return dur.format("m:ss");
};
