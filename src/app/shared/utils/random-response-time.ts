export function randomResponseTime(min = 200, max = 300) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
