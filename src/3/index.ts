export function solve(input: string): {1: number, 2: number} {
  return {1: 0, 2: 0}
}


const text = await Bun.file('./input.txt').text()

const res = solve(text.trim())

await Bun.write('./result.txt', String(res['1']))
await Bun.write('./result-2.txt', String(res['2']))
