import fs from "fs";

enum Opcode {
  Add = 1,
  Multiply = 2,
  Input = 3,
  Output = 4,
  JumpNoZero = 5,
  JumpZero = 6,
  LessThan = 7,
  Equals = 8,
  Halt = 99
}

enum Mode {
  position = 0,
  immediate = 1
}

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
      case Opcode.Add:
      case Opcode.Multiply:
      case Opcode.LessThan:
      case Opcode.Equals: {
        const params = program.slice(pointer + 1, pointer + 4);
        const value1 =
          modes[0] === Mode.immediate ? params[0] : program[params[0]];
        const value2 =
          modes[1] === Mode.immediate ? params[1] : program[params[1]];

        switch (opcode) {
          case Opcode.Add:
            program[params[2]] = value1 + value2;
            break;
          case Opcode.Multiply:
            program[params[2]] = value1 * value2;
            break;
          case Opcode.LessThan:
            program[params[2]] = value1 < value2 ? 1 : 0;
            break;
          case Opcode.Equals:
            program[params[2]] = value1 === value2 ? 1 : 0;
            break;
        }
        pointer += 4;
        break;
      }

      case Opcode.Input:
      case Opcode.Output: {
        const param = program[pointer + 1];
        if (opcode === Opcode.Input) {
          program[param] = input;
        } else {
          console.log(program[param]);
        }

        pointer += 2;
        break;
      }

      case Opcode.JumpNoZero:
      case Opcode.JumpZero: {
        const params = program.slice(pointer + 1, pointer + 3);
        const value1 =
          modes[0] === Mode.immediate ? params[0] : program[params[0]];
        const value2 =
          modes[1] === Mode.immediate ? params[1] : program[params[1]];

        if (
          (opcode === Opcode.JumpNoZero && value1 !== 0) ||
          (opcode === Opcode.JumpZero && value1 === 0)
        ) {
          pointer = value2;
        } else {
          pointer += 3;
        }
        break;
      }

      case Opcode.Halt:
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
