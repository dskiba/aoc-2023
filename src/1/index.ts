import { expect, test } from "bun:test";

function isNumber(value: string): boolean {
  return !isNaN(Number(value));
}

export function solve(input: string): number {
  let splitted = input.split("\n");
  const lines = splitted.map((line) => {
    let pair: [number, number] = [0,0];
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if(isNumber(char)) {
        let number = Number(char);
        if(pair[0]) {
          pair[1] = number
        } else {
          pair[0] = number
          pair[1] = number
        }
      }
    }
    return Number(`${pair[0]}${pair[1]}`);
  });

return lines.reduce((a, b) => a + b, 0);
}


const text = await Bun.file("./input.txt").text();

await Bun.write("./result.txt", String(solve(text.trim())));
