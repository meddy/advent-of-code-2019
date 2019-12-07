import readline from "readline";
import fs from "fs";

const calculateFuel = (mass: number): number =>
  Math.trunc(Number(mass) / 3) - 2;

const calculateTotalFuel = (mass: number): number => {
  let fuel = calculateFuel(mass);
  if (fuel > 0) {
    const additionalFuel = calculateTotalFuel(fuel);
    if (additionalFuel > 0) {
      fuel += additionalFuel;
    }
  }

  return fuel;
};

let totalFuel = 0;
let totalFuelFuel = 0;

readline
  .createInterface({
    input: fs.createReadStream(process.argv[2])
  })

  .on("line", line => {
    const mass = Number(line);
    totalFuel += calculateFuel(mass);
    totalFuelFuel += calculateTotalFuel(mass);
  })

  .on("close", () => {
    console.log(`Fuel: ${totalFuel}`);
    console.log(`Fuel plus more ${totalFuelFuel}`);
  });
