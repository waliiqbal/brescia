// Sample-data helpers. This whole `src/data/` folder is removed in Phases 8-9
// when the services start reading from MongoDB.

const ROME = "Europe/Rome";

function romeHour(date: Date) {
  return Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      hourCycle: "h23",
      timeZone: ROME,
    }).format(date),
  );
}

/** ISO date `days` from today, at the given local Rome time. */
export function relativeDate(days: number, hour = 12, minute = 0) {
  const now = new Date();
  let date = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + days,
      hour,
      minute,
    ),
  );
  date = new Date(date.getTime() - (romeHour(date) - hour) * 3_600_000);
  return date.toISOString();
}

export const sample = (id: string) => `/images/sample/${id}.jpg`;
