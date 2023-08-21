export const formatToDate = (
  currentDate: any,
  hasMinutesAndHoursAndSecounds?: boolean,
): string => {
  const dateFormatter = new Intl.DateTimeFormat('pt-br', {
    year: 'numeric',
    day: '2-digit',
    month: '2-digit',
    minute: hasMinutesAndHoursAndSecounds ? '2-digit' : undefined,
    hour: hasMinutesAndHoursAndSecounds ? '2-digit' : undefined,
    second: hasMinutesAndHoursAndSecounds ? '2-digit' : undefined,
  });

  if (currentDate) return dateFormatter.format(new Date(currentDate));

  return '--/--/--';
};

export const formatRelativeTime = (
  value: number,
  formatType?: Intl.RelativeTimeFormatUnit,
): string => {
  const formater = new Intl.RelativeTimeFormat('pt-br', {
    numeric: 'auto',
  });

  return formater.format(value, formatType || 'day');
};

export const dateMath = (value: number, isSum?: boolean) => {
  const currentDate = new Date(Date.now());
  const dateOfDate = currentDate.getDate();

  if (isSum) return currentDate.setDate(dateOfDate + value);

  return currentDate.setDate(dateOfDate - value);
};
