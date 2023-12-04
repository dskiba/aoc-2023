const CUBES = {
  RED: 'red',
  BLUE: 'blue',
  GREEN: 'green',
} as const

const MAX = {
  [CUBES.RED]: 12,
  [CUBES.BLUE]: 14,
  [CUBES.GREEN]: 13,
}

export function solve(input: string): {1: number, 2: number} {
  const games = count(input.split('\n'))
  const filtered = filterSets(games)
  const total = calculateResult(filtered)

  return {1: total, 2: total}
}

function filterSets(sets: Set[]): Set[] {
  return sets.filter(set => {
    return Object.entries(set.cubes).every(([color, num]) => {
      console.log({ num, color, max: MAX[color as keyof typeof MAX] })
      return num <= MAX[color as keyof typeof MAX]
    })
  })

}

type Set = {
  id: number
  cubes: {
    [key in typeof CUBES[keyof typeof CUBES]]: number
  }
}

function count(games: string[]): Set[] {
  return games.map(line => {
    const { 0: game, 1: rest } = line.split(': ')

    const gameId = game.replace('Game ', '')
    const gameSet: Set = { id: Number(gameId), cubes: { blue: 0, red: 0, green: 0 } }

    rest.split('; ').forEach(set => {
      const cubes = set.split(', ')
      cubes.forEach(cube => {
        const [num, color] = cube.split(' ')
        gameSet.cubes[color] = Math.max(gameSet.cubes[color], Number(num))
      })
    })

    return gameSet
  })
}

function calculateResult(sets: Set[]): number {
  return sets.reduce((acc, set) => {
    return acc + set.id
  }, 0)
}


const text = await Bun.file('./input.txt').text()
const res1 = solve(text.trim())['1']
await Bun.write('./result.txt', String(res1))
// await Bun.write('./result-2.txt', String(solve(text.trim(), true)))
