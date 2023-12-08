type Mapper = Map<number, number>
type Track = Array<Mapper>

export function solve(input: string): { 1: number, 2: number } {
  const [seeds, ...maps] = input.split('\n\n')

  const seedsNums = seeds!.split(': ')[1]!.split(' ').map((s) => Number(s))

  const track: Track = []

  // const first = maps[0]!
  for (const map of maps) {
    const mapper: Mapper = new Map()
    const [title, lines] = map.split(':\n') as [string, string]
    for (const line of lines.split('\n')) {
      const [dist, source, len] = line.split(' ')

      for (let i = 0; i < Number(len); i++) {
        mapper.set(Number(source) + i, Number(dist) + i)
      }
    }
    track.push(mapper)
  }


  const tracks: Array<Array<number>> = []
  for (let i = 0; i < seedsNums.length; i++) {
    const seed = seedsNums[i]!
    const transition: Array<number> = [seed]
    tracks.push(transition)
    let trackedItem = seed
    for (const mapper of track) {
      trackedItem = mapper.get(trackedItem) || trackedItem
      tracks[i]!.push(trackedItem)
    }
  }

  const part1 = tracks.reduce((acc, track) => {
    const last = track[track.length - 1]!
    return Math.min(acc, last)
  }, Infinity)

  return { 1: part1, 2: 0 }
}


// const res = solve(text.trim())
// const text = await Bun.file('./input.txt').text()
// await Bun.write('./result.txt', String(res['1']))
// await Bun.write('./result-2.txt', String(res['2']))
