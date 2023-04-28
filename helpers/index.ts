export function copyObject<T> (o: T): T {
  return JSON.parse(JSON.stringify(o));
}
export const debounce = (fn: any, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
