export default (data: object) => {
  const map = new Map<string, any>();

  for (const key in data) {
    map.set(key, data[key as keyof typeof data]);
  }

  return map;
};
