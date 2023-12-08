import { expect, test } from 'bun:test'
import { solve } from './index'

const testInput = Bun.file('./test-input.txt')

test("should solve 5 part 1 - test input", async () => {
  const text = await testInput.text()
  const res = solve(text.trim())['1']
  expect(res).toBe(35);
})

// const input = Bun.file('./input.txt')
// test("should solve 5 part 1", async () => {
//   const text = await input.text()
//   console.log('asd')
//   const res = solve(text.trim())['1']
//   console.log({ res })
//   expect(res).toBe(3588);
// })

// test("should solve X part 2", async () => {
//   const text = await input2.text()
//   const res = solve(text.trim())['2']
//   expect(res).toBe(0);
// })
