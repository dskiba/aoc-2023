import { expect, test } from 'bun:test'
import { solve } from './index'

const testInput = Bun.file('./test-input.txt')
//
// test("should solve 5 part 1 - test input", async () => {
//   const text = await testInput.text()
//   const res = solve(text.trim())['1']
//   expect(res).toBe(35);
// })
//
// test("should solve 5 part 2 - test input", async () => {
//   const text = await testInput.text()
//   const res = solve(text.trim())['2']
//   expect(res).toBe(46);
// })

const input = Bun.file('./input.txt')
// test("should solve 5 part 1", async () => {
//   const text = await input.text()
//   const res = solve(text.trim())['1']
//   expect(res).toBe(165788812);
// })
//
test("should solve 5 part 2", async () => {
  // const text = await input.text()
  const text = await testInput.text()
  const res = solve(text.trim())['2']
  expect(res).toBe(47);
})
