const min = 347312;
const max = 805915;

function verify(password: number, check2Adjacent: boolean): boolean {
  const exploded = String(password).split("");
  const sorted = [...exploded].sort();
  if (JSON.stringify(exploded) !== JSON.stringify(sorted)) {
    return false;
  }

  const distinct = exploded.filter(
    (value, index, self) => self.indexOf(value) === index
  );

  if (check2Adjacent) {
    return (
      distinct.find(
        digit => exploded.filter(value => value === digit).length === 2
      ) !== undefined
    );
  }

  return distinct.length !== exploded.length;
}

const possiblePartOne = [];
const possiblePartTwo = [];

for (let password = min; password <= max; password++) {
  if (verify(password, false)) {
    possiblePartOne.push(password);
  }
  if (verify(password, true)) {
    possiblePartTwo.push(password);
  }
}

console.log(`Part one: ${possiblePartOne.length}`);
console.log(`Part two: ${possiblePartTwo.length}`);
