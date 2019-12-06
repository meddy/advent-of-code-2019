import readline from "readline";
import fs from "fs";

let totalFuel = 0;

readline
  .createInterface({
    input: fs.createReadStream(process.argv[2])
  })

  .on("line", mass => {
    totalFuel += Math.trunc(Number(mass) / 3) - 2;
  })

  .on("close", () => {
    console.log(totalFuel);
  });
