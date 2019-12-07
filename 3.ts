import fs from "fs";

type Coord = [number, number];
type CoordMap = Map<string, Coord>;

function parseInput(content: string): string[][] {
  return content
    .split("\n")
    .filter(path => path.length)
    .map(line => line.split(","));
}

function getCoordinates(path: string[]): CoordMap {
  const coordMap = new Map().set(`0,0`, [0, 0]);
  let x = 0;
  let y = 0;

  for (const instruction of path) {
    const direction = instruction.slice(0, 1);
    const distance = Number(instruction.slice(1));

    for (let i = 0; i < distance; i++) {
      switch (direction) {
        case "R":
          x++;
          break;
        case "L":
          x--;
          break;
        case "U":
          y++;
          break;
        case "D":
          y--;
          break;
      }

      coordMap.set(`${x},${y}`, [x, y]);
    }
  }

  return coordMap;
}

function getIntersections(pathA: CoordMap, pathB: CoordMap): Coord[] {
  const intersections: Coord[] = [];

  pathA.forEach((value, key) => {
    if (key === "0,0") {
      return;
    }

    if (pathB.has(key)) {
      intersections.push(value);
    }
  });

  return intersections;
}

function findShortestDistance(origin: number[], coords: number[][]): number {
  const [originX, originY] = origin;

  return coords
    .map(([x, y]) => Math.abs(x - originX) + Math.abs(y - originY))
    .reduce(
      (shortest, distance) => (distance < shortest ? distance : shortest),
      Infinity
    );
}

const paths = parseInput(fs.readFileSync(process.argv[2], "utf8"));
const coordinates = paths.map(getCoordinates);
const intersections = getIntersections(coordinates[0], coordinates[1]);
const distance = findShortestDistance([0, 0], intersections);

console.log(distance);
