type Mapper = Map<number, number>
type Track = Array<Mapper>

export function solve(input: string): { 1: number, 2: number } {
  const [seeds, ...lines] = input.split('\n\n')

  const seedsNums = seeds!.split(': ')[1]!.split(' ').map((s) => Number(s))

  const maps: Array<Array<{ dist: number, source: number, len: number }>> = []

  for (const line of lines) {
    maps.push([])
    const [_, lines] = line.split(':\n') as [string, string]
    for (const line of lines.split('\n')) {
      const [dist, source, len] = line.split(' ') as [string, string, string]

      maps[maps.length - 1]!.push({ dist: Number(dist), source: Number(source), len: Number(len) })
    }
  }


  function findLock(seed: number) {
    let curNum = seed
    for (const map of maps) {
      for (const { dist, source, len } of map) {
        if (source <= curNum && curNum < source + len) {
          curNum = dist + (curNum - source)
          break
        }
      }
    }
    return curNum
  }

  const seedsRes = seedsNums.map((seed) => findLock(seed))
  const min = Math.min(...seedsRes)

  return { 1: min, 2: 0 }
}


// const res = solve(text.trim())
// const text = await Bun.file('./input.txt').text()
// await Bun.write('./result.txt', String(res['1']))
// await Bun.write('./result-2.txt', String(res['2']))
