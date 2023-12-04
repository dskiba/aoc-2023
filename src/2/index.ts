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

  const part1 = calculateResult(filterSets(games))

  const part2 = multiplyCubes(games)


  return {1: part1, 2: part2}
}

function filterSets(sets: Set[]): Set[] {
  return sets.filter(set => {
    return Object.entries(set.cubes).every(([color, num]) => {
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


function multiplyCubes(sets: Set[]): number {
  return sets.reduce((acc, set) => {
    const res = set.cubes.blue * set.cubes.red * set.cubes.green
    return acc + res
  }, 0)
}

const text = await Bun.file('./input.txt').text()
const res1 = solve(text.trim())['1']
const res2 = solve(text.trim())['2']
await Bun.write('./result.txt', String(res1))
await Bun.write('./result-2.txt', String(res2))
