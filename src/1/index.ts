function isNumber(value: string | number | boolean): boolean {
  return !isNaN(Number(value))
}

export function solve(input: string, withSubstr: boolean): number {
  let splitted = input.split('\n')
  const lines = splitted.map((lineStr): number => {
    let pair: [number, number] = [0, 0]

    for (let i = 0; i < lineStr.length; i++) {
      const char = lineStr[i]
      if (isNumber(char)) {
        let number = Number(char)
        if (pair[0]) {
          pair[1] = number
        } else {
          pair[0] = number
          pair[1] = number
        }
        continue
      }
      if (withSubstr) {
        const subStr = includesStrNum(lineStr, i)
        if (subStr) {
          if (pair[0]) {
            pair[1] = subStr
          } else {
            pair[0] = subStr
            pair[1] = subStr
          }
        }
      }
    }

    return Number(`${pair[0]}${pair[1]}`)
  })
  return lines.reduce((a, b) => a + b, 0)
}

const NUM_MAP = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9
} as const

const keys = Object.keys(NUM_MAP) as (keyof typeof NUM_MAP)[]

function includesStrNum(str: string, idx: number): number {
  for (const key of keys) {
    if (key === str.substring(idx, idx + key.length)) {
      return NUM_MAP[key]
    }
  }
  return 0
}


const text = await Bun.file('./input.txt').text()

await Bun.write('./result.txt', String(solve(text.trim(), false)))
await Bun.write('./result-2.txt', String(solve(text.trim(), true)))
