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
    console.log('curNum', curNum)
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

  const part2Seeds = []
  for (let i = 0; i < seedsNums.length; i++) {

    const seed = seedsNums[i]!
    if ((i+1)% 2 === 1) {
      part2Seeds.push([])
      for (let j = 0; j < seedsNums[i + 1]!; j++) {
        part2Seeds[part2Seeds.length - 1].push(seed + j)
      }
    }
  }
  const part2seedRes = part2Seeds.map((seed) => {
    const res = seed.map((s) => findLock(s))
    console.log({ res })
    return Math.min(...res)
  })
  const part2min = Math.min(...part2seedRes)
  return { 1: min, 2: part2min }
}




// const text = await Bun.file('./test-input.txt').text()
const text = await Bun.file('./input.txt').text()
const res = solve(text.trim())
console.log({ res })
// await Bun.write('./result.txt', String(res['1']))
// await Bun.write('./result-2.txt', String(res['2']))
