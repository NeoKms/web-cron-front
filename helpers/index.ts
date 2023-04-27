export function copyObject<T> (o: T): T {
  return JSON.parse(JSON.stringify(o));
}
