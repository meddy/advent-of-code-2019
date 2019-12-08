import fs from "fs";

const ID = 5;

function run(initial: number[]): void {
  const program = [...initial];

  let i = 0;
  while (i < program.length) {
    let opcode = program[i];
    if (opcode === 3) {
      const parameter = program[i + 1];
      program[parameter] = ID;
      i += 2;
    } else {
      const value = String(opcode);
      opcode = Number(value.slice(-2));
      const modes = value
        .slice(0, value.length - 2)
        .split("")
        .reverse()
        .map(Number);

      switch (opcode) {
        case 99:
          return;
        case 1: {
          const parameters = program.slice(i + 1, i + 4);
          const value1 =
            modes[0] === 1 ? parameters[0] : program[parameters[0]];
          const value2 =
            modes[1] === 1 ? parameters[1] : program[parameters[1]];
          program[parameters[2]] = value1 + value2;
          i += 4;
          break;
        }
        case 2: {
          const parameters = program.slice(i + 1, i + 4);
          const value1 =
            modes[0] === 1 ? parameters[0] : program[parameters[0]];
          const value2 =
            modes[1] === 1 ? parameters[1] : program[parameters[1]];
          program[parameters[2]] = value1 * value2;
          i += 4;
          break;
        }
        case 4: {
          const parameter = program[i + 1];
          console.log(program[parameter]);
          i += 2;
          break;
        }
        case 5: {
          const parameters = program.slice(i + 1, i + 3);
          const value1 =
            modes[0] === 1 ? parameters[0] : program[parameters[0]];
          const value2 =
            modes[1] === 1 ? parameters[1] : program[parameters[1]];
          if (value1 !== 0) {
            i = value2;
          } else {
            i += 3;
          }
          break;
        }
        case 6: {
          const parameters = program.slice(i + 1, i + 3);
          const value1 =
            modes[0] === 1 ? parameters[0] : program[parameters[0]];
          const value2 =
            modes[1] === 1 ? parameters[1] : program[parameters[1]];
          if (value1 === 0) {
            i = value2;
          } else {
            i += 3;
          }
          break;
        }
        case 7: {
          const parameters = program.slice(i + 1, i + 4);
          const value1 =
            modes[0] === 1 ? parameters[0] : program[parameters[0]];
          const value2 =
            modes[1] === 1 ? parameters[1] : program[parameters[1]];
          program[parameters[2]] = value1 < value2 ? 1 : 0;
          i += 4;
          break;
        }
        case 8: {
          const parameters = program.slice(i + 1, i + 4);
          const value1 =
            modes[0] === 1 ? parameters[0] : program[parameters[0]];
          const value2 =
            modes[1] === 1 ? parameters[1] : program[parameters[1]];
          program[parameters[2]] = value1 === value2 ? 1 : 0;
          i += 4;
          break;
        }
        default:
          throw new Error(`Unknown opcode ${opcode}`);
      }
    }
  }
}

const content = fs.readFileSync(process.argv[2], "utf8");
const program = content.split(",").map(Number);
run(program);
