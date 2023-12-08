type CardWin = Array<number>
type CardWins = Array<CardWin>


export function solve(input: string): { 1: number, 2: number } {
  const cards = input.split('\n')

  const wins: CardWins = []


  function splitLine(str: string) {
    return str.trim().split(/\s+/).map(Number)
  }

  for (const card of cards) {
    const [_, rest] = card.split(': ') as [string, string]
    if (rest) {
      const [winNumStr, playerNumStr] = rest.split(' | ') as [string, string]
      const map = new Map()
      const winNums: CardWin = []


      for (const winNum of splitLine(winNumStr)) {
        map.set(Number(winNum), 1)
      }

      for (const playerNum of splitLine(playerNumStr)) {
        const n = Number(playerNum)
        if (map.has(n)) {
          winNums.push(n)
        }
      }

      wins.push(winNums)
    }


  }

  const res1 = calculateRes(wins)
  const res2 = calculateCopies(wins)

  return { 1: res1, 2: res2 }
}

function calculateRes(wins: CardWins): number {
  // console.log({ wins })
  let res = 0
  for (const win of wins) {
    if (win.length > 0) {
      res += 2 ** (win.length - 1)
    }
  }
  return res
}

function calculateCopies(wins: CardWins): number {
  const map = new Map<number, number>()

  for (let i = 0; i < wins.length; i++) {
    map.set(i, 1)
  }

  for (let i = 0; i < wins.length; i++) {
    const win = wins[i]!
    for (let j = 0; j < win.length; j++) {
      const idx = i + (j + 1)
      const curr = map.get(idx)!
      map.set(idx, curr + map.get(i)!)
    }
  }

  return Array.from(map.values()).reduce((a, b) => a + b, 0)
}


const text = await Bun.file('./input.txt').text()

const res = solve(text.trim())

await Bun.write('./result.txt', String(res['1']))
await Bun.write('./result-2.txt', String(res['2']))
