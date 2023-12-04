import { expect, test } from 'bun:test'
import { solve } from './index'

const input = Bun.file('./test-input.txt')
test("should solve 2 part 1", async () => {
  const text = await input.text()
  const res = solve(text.trim())['1']
  expect(res).toBe(8);
})

const input2 = Bun.file('./test-input.txt')
test("should solve 2 part 2", async () => {
  const text = await input2.text()
  const res = solve(text.trim())['1']
  console.log({ res })
  expect(res).toBe(33);
})
