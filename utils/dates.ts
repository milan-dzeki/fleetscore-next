export const getDateLabel = (startDate: Date | string, endDate: Date | string) => {
  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);

  if (!(parsedStartDate instanceof Date) || !(parsedEndDate instanceof Date)) {
    return null;
  }

  const now = new Date(Date.now());

  if (now >= parsedEndDate) {
    return 'ended';
  }

  if (now >= parsedStartDate && now < parsedEndDate) {
    return 'inProgress';
  }

  return 'upcoming';
};