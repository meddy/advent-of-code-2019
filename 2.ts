import fs from "fs";

function run(program: number[]): number[] {
  const result = [...program];
  for (let i = 0; i < program.length; i += 4) {
    const [opcode, input1, input2, output] = program.slice(i, i + 4);

    if (opcode === 99) {
      return result;
    } else if (opcode === 1) {
      result[output] = result[input1] + result[input2];
    } else if (opcode === 2) {
      result[output] = result[input1] * result[input2];
    } else {
      throw new Error(`Unknown opcode ${opcode} encountered.`);
    }
  }

  return result;
}

const content = fs.readFileSync(process.argv[2], "utf8");
const program = content.split(",").map(Number);

program[1] = 12;
program[2] = 2;

const result = run(program);
console.log(result[0]);
