import { isNumber } from '../utils/isNumber.ts'

function isSpecialSymbol(char: string): boolean {
  return char !== '.' && /^[\W_]+$/.test(char)
}

export function solve(input: string): { 1: number, 2: number } {
  const lines = input.trim().split('\n')
  let res = 0

  let part2Map: Record<string, number[]> = {}
  let part2Res: number = 0

  lines.forEach((line, idx) => {
    line = line.trim()
    let num = ''
    let isAdjacent = false
    let multiplayerIdx = ''


    for (let i = 0; i < line.length; i++) {
      let currChar = line[i]!

      if (!isAdjacent && isNumber(currChar)) {
        let topChar = lines[idx - 1]?.[i]
        if (topChar && isSpecialSymbol(topChar)) {
          if (topChar === '*') multiplayerIdx = `${idx - 1},${i}`
          isAdjacent = true
        }

        const topLeftChar = lines[idx - 1]?.[i - 1]
        if (topLeftChar && isSpecialSymbol(topLeftChar)) {
          if (topLeftChar === '*') multiplayerIdx = `${idx - 1},${i - 1}`
          isAdjacent = true
        }

        const topRightChar = lines[idx - 1]?.[i + 1]
        if (topRightChar && isSpecialSymbol(topRightChar)) {
          if (topRightChar === '*') multiplayerIdx = `${idx - 1},${i + 1}`
          isAdjacent = true
        }

        const leftChar = line[i - 1]
        if (leftChar && isSpecialSymbol(leftChar)) {
          if (leftChar === '*') multiplayerIdx = `${idx},${i - 1}`
          isAdjacent = true
        }

        const rightChar = line[i + 1]
        if (rightChar && isSpecialSymbol(rightChar)) {
          if (rightChar === '*') multiplayerIdx = `${idx},${i + 1}`
          isAdjacent = true
        }

        const bottomChar = lines[idx + 1]?.[i]
        if (bottomChar && isSpecialSymbol(bottomChar)) {
          if (bottomChar === '*') multiplayerIdx = `${idx + 1},${i}`
          isAdjacent = true
        }

        const bottomLeftChar = lines[idx + 1]?.[i - 1]
        if (bottomLeftChar && isSpecialSymbol(bottomLeftChar)) {
          if (bottomLeftChar === '*') multiplayerIdx = `${idx + 1},${i - 1}`
          isAdjacent = true
        }

        const bottomRightChar = lines[idx + 1]?.[i + 1]
        if (bottomRightChar && isSpecialSymbol(bottomRightChar)) {
          if (bottomRightChar === '*') multiplayerIdx = `${idx + 1},${i + 1}`
          isAdjacent = true
        }
      }

      if (isNumber(currChar)) {
        num += currChar
      } else if (isAdjacent && (!isNumber(currChar))) {
        if (multiplayerIdx) {
          part2Map[multiplayerIdx]
            ? part2Map[multiplayerIdx]?.push(Number(num))
            : part2Map[multiplayerIdx] = [Number(num)]
          multiplayerIdx = ''
        }

        res += Number(num)
        num = ''
        isAdjacent = false

      } else {
        num = ''
        isAdjacent = false
        multiplayerIdx = ''
      }

      // if last line
      if (i === line.length - 1 && isAdjacent) {
        if (multiplayerIdx) {
          part2Map[multiplayerIdx]
            ? part2Map[multiplayerIdx]?.push(Number(num))
            : part2Map[multiplayerIdx] = [Number(num)]
          multiplayerIdx = ''
        }
        res += Number(num)
        num = ''
        isAdjacent = false
        multiplayerIdx = ''

      }


    }
  })



  Object.keys(part2Map).forEach((key) => {
    if (part2Map[key]?.length! >= 2) {
      part2Res += part2Map[key]![0]! * part2Map[key]![1]!
    }
  })

  return { 1: res, 2: part2Res }
}


const text = await Bun.file('./input.txt').text()

const mySolution = solve(text)

await Bun.write('./result.txt', `${mySolution['1']}`)
await Bun.write('./result-2.txt', `${mySolution['2']}`)

