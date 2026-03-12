 export const convertTo24HourFormat = (time) => {
    if (!time) return "00:00";
    const cleaned = time.trim().toLowerCase();

    if (/^\d{1,2}:\d{2}$/.test(cleaned)) {
      const [h, m] = cleaned.split(":");
      return `${String(parseInt(h, 10)).padStart(2, "0")}:${m}`;
    }
    const match = cleaned.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/);
    if (!match) return "00:00";
    let hour = parseInt(match[1], 10);
    const minute = match[2] ? parseInt(match[2], 10) : 0;
    const period = match[3];
    if (period === "pm" && hour !== 12) hour += 12;
    if (period === "am" && hour === 12) hour = 0;
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  };