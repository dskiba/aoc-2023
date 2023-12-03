import { expect, test } from 'bun:test'
import { solve } from './index'

const input = Bun.file('./test-input.txt')
test("should solve part 1", async () => {
  const text = await input.text()
  const res = solve(text.trim(), false)
  expect(res).toBe(142);
})

const input2 = Bun.file('./test-input-2.txt')
test("should solve part 2", async () => {
  const text = await input2.text()
  const res = solve(text.trim(), true)
  expect(res).toBe(281);
})
