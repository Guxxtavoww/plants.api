export const isUUID = (str: string): boolean => {
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return !!str.toLowerCase().match(regex);
};

export const isStringEmpty = (string: string): boolean => {
  switch (string) {
    case undefined:
    case null:
    case 'undefined':
    case 'null':
    case '':
      return false;
    default:
      return string.trim() !== '';
  }
};
