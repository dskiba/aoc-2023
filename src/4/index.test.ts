import { expect, test } from 'bun:test'
import { solve } from './index'

const testInput = Bun.file('./test-input.txt')
test("should solve 4 part 1 - test input", async () => {
  const text = await testInput.text()
  const res = solve(text.trim())['1']
  expect(res).toBe(13);
})

test("should solve 4 part 2 - test input", async () => {
  const text = await testInput.text()
  const res = solve(text.trim())['2']
  expect(res).toBe(30);
})

const input = Bun.file('./input.txt')
test("should solve 4 part 1", async () => {
  const text = await input.text()
  const res = solve(text.trim())['1']
  expect(res).toBe(28750);
})

test("should solve 4 part 2", async () => {
  const text = await input.text()
  const res = solve(text.trim())['2']
  expect(res).toBe(10212704);
})
