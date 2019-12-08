import fs from "fs";

function run(initial: number[], input: number): void {
  const program = [...initial];

  let pointer = 0;
  while (pointer < program.length) {
    const opcodeValue = String(program[pointer]);
    const opcode = Number(opcodeValue.slice(-2));
    const modes = opcodeValue
      .slice(0, opcodeValue.length - 2)
      .split("")
      .reverse()
      .map(Number);

    switch (opcode) {
      case 1:
      case 2:
      case 7:
      case 8: {
        const params = program.slice(pointer + 1, pointer + 4);
        const value1 = modes[0] === 1 ? params[0] : program[params[0]];
        const value2 = modes[1] === 1 ? params[1] : program[params[1]];
        switch (opcode) {
          case 1:
            program[params[2]] = value1 + value2;
            break;
          case 2:
            program[params[2]] = value1 * value2;
            break;
          case 7:
            program[params[2]] = value1 < value2 ? 1 : 0;
            break;
          case 8:
            program[params[2]] = value1 === value2 ? 1 : 0;
            break;
        }
        pointer += 4;
        break;
      }

      case 3:
      case 4: {
        const param = program[pointer + 1];
        if (opcode === 3) {
          program[param] = input;
        } else {
          console.log(program[param]);
        }

        pointer += 2;
        break;
      }

      case 5:
      case 6: {
        const params = program.slice(pointer + 1, pointer + 3);
        const value1 = modes[0] === 1 ? params[0] : program[params[0]];
        const value2 = modes[1] === 1 ? params[1] : program[params[1]];
        if ((opcode === 5 && value1 !== 0) || (opcode === 6 && value1 === 0)) {
          pointer = value2;
        } else {
          pointer += 3;
        }
        break;
      }

      case 99:
        return;

      default:
        throw new Error(`Unknown opcode ${opcode}`);
    }
  }
}

const content = fs.readFileSync(process.argv[2], "utf8");
const program = content.split(",").map(Number);

console.log("Part 1");
run(program, 1);

console.log("Part 2");
run(program, 5);
