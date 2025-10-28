export async function getDaysBetweenDateTimes({
  startDate: startDateTime,
  endDate: endDateTime,
}: {
  startDate: string;
  endDate: string;
}): Promise<{ dayNumber: number; date: string; dayName: string; dateTimeString: string }[]> {
  return new Promise((resolve, reject) => {
    try {
      const start = new Date(startDateTime);
      const end = new Date(endDateTime);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error('Invalid datetime(s) provided');
      }

      if (end < start) {
        throw new Error('End datetime must be after or equal to start datetime');
      }

      const startDateOnly = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const endDateOnly = new Date(end.getFullYear(), end.getMonth(), end.getDate());

      // ✅ If both dates are same — return one
      if (startDateOnly.getTime() === endDateOnly.getTime()) {
        const iso = new Date(startDateOnly).toISOString();
        return resolve([
          {
            dayNumber: 1,
            date: startDateOnly.toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }),
            dayName: startDateOnly.toLocaleDateString('en-IN', { weekday: 'long' }),
            dateTimeString: iso,
          },
        ]);
      }

      const result: {
        dayNumber: number;
        date: string;
        dayName: string;
        dateTimeString: string;
      }[] = [];

      let currentDate = new Date(startDateOnly);
      let dayNumber = 1;

      const loopChunk = () => {
        const CHUNK_SIZE = 200;
        let count = 0;

        while (currentDate <= endDateOnly && count < CHUNK_SIZE) {
          const isoString = new Date(currentDate).toISOString();

          result.push({
            dayNumber,
            date: currentDate.toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }),
            dayName: currentDate.toLocaleDateString('en-IN', { weekday: 'long' }),
            dateTimeString: isoString,
          });

          currentDate.setDate(currentDate.getDate() + 1);
          dayNumber++;
          count++;
        }

        if (currentDate <= endDateOnly) {
          setTimeout(loopChunk, 0);
        } else {
          resolve(result);
        }
      };

      loopChunk();
    } catch (error) {
      reject(error);
    }
  });
}

export const formatToIndianCurrency = (value: number) => {
  const hasDecimal = value % 1 !== 0;
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: hasDecimal ? 2 : 0,
    maximumFractionDigits: hasDecimal ? 2 : 0,
  });
};
