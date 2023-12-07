export function isNumber(value: string | number | boolean): boolean {
  return !isNaN(Number(value))
}
