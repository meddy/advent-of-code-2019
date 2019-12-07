import fs from "fs";

function run(program: number[], noun: number, verb: number): number {
  const result = [...program];
  result[1] = noun;
  result[2] = verb;

  for (let i = 0; i < program.length; i += 4) {
    const [opcode, param1, param2, param3] = program.slice(i, i + 4);

    if (opcode === 99) {
      return result[0];
    } else if (opcode === 1) {
      result[param3] = result[param1] + result[param2];
    } else if (opcode === 2) {
      result[param3] = result[param1] * result[param2];
    } else {
      throw new Error(`Unknown opcode ${opcode} encountered.`);
    }
  }

  return result[0];
}

function findResult(output: number, program: number[]): number {
  let noun = 0;
  let verb = 0;

  while (run(program, noun + 1, verb) <= output) {
    noun += 1;
  }

  while (run(program, noun, verb + 1) <= output) {
    verb += 1;
  }

  return 100 * noun + verb;
}

const [, , fileName, output] = process.argv;
const content = fs.readFileSync(fileName, "utf8");
const program = content.split(",").map(Number);

console.log(findResult(Number(output), program));
