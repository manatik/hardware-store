export const isTrue = (value: string | boolean) => {
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  return value;
};
