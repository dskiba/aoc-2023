import { expect, test } from 'bun:test'
import { solve } from './index'

const testInput = Bun.file('./test-input.txt')
const input = Bun.file('./input.txt')

test("solve 3 part 1 - test input", async () => {
  const text = await testInput.text()
  const myRes = solve(text.trim())['1']
  expect(myRes).toBe(4361);
})

test("solve 3 part 1", async () => {
  const text = await input.text()
  const myRes = solve(text.trim())['1']
  expect(myRes).toBe(538046);
})

test("solve 3 part 2 - test input", async () => {
  const text = await testInput.text()
  const myRes = solve(text.trim())['2']
  expect(myRes).toBe(467835);
})

test("solve 3 part 2", async () => {
  const text = await input.text()
  const myRes = solve(text.trim())
  expect(myRes['2']).toBe(81709807);
})
