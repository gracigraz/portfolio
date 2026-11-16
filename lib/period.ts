const MONTH_YEAR = /^([A-Za-z]{3}) (\d{4})$/;
const YEAR = /^\d{4}$/;

export function periodLines(period: string): string[] {
  const [start, end] = period.split(" to ");
  if (!start || !end) return [period];

  const startParts = MONTH_YEAR.exec(start);
  const endParts = MONTH_YEAR.exec(end);

  if (startParts && endParts && startParts[2] === endParts[2]) {
    return [`${startParts[1]} to ${endParts[1]}`];
  }
  if (YEAR.test(start) && YEAR.test(end)) {
    return [`to ${end}`];
  }
  return [`${start} to ${end}`];
}
