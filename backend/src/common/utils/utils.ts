export const isTrue = (value: string | boolean) => {
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  return value;
};

export const idsArrayToArrayObjects = (ids: number[]) => (ids?.length ? ids.map((id) => ({ id })) : []);
