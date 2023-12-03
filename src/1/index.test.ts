import { expect, test } from 'bun:test'
import { solve } from './index'

const input = Bun.file('./test-input.txt')
test("should solve 1", async () => {
  const text = await input.text()
  const res = solve(text.trim())
  expect(res).toBe(142);
})
