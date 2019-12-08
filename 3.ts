import fs from "fs";

type Coord = [number, number];
type CoordValue = {
  coord: Coord;
  distance: number;
};
type CoordMap = Map<string, CoordValue>;

function parseInput(content: string): string[][] {
  return content
    .split("\n")
    .filter(path => path.length)
    .map(line => line.split(","));
}

function getCoordinateMaps(path: string[]): CoordMap {
  const coordMap = new Map().set(`0,0`, { coord: [0, 0], steps: 0 });
  let x = 0;
  let y = 0;
  let totalDistance = 0;

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

      totalDistance++;
      coordMap.set(`${x},${y}`, { coord: [x, y], distance: totalDistance });
    }
  }

  return coordMap;
}

function getIntersections(mapA: CoordMap, mapB: CoordMap): Coord[] {
  const intersections: Coord[] = [];

  mapA.forEach((value, key) => {
    if (key === "0,0") {
      return;
    }

    if (mapB.has(key)) {
      intersections.push(value.coord);
    }
  });

  return intersections;
}

function findShortestDistance(coordValues: Coord[]): number {
  return coordValues
    .map(([x, y]) => Math.abs(x) + Math.abs(y))
    .reduce(
      (shortest, distance) => (distance < shortest ? distance : shortest),
      Infinity
    );
}

function findSmallestSteps(
  mapA: CoordMap,
  mapB: CoordMap,
  intersections: Coord[]
): number {
  const steps = [];

  for (const [intX, intY] of intersections) {
    const key = `${intX},${intY}`;
    const coordA = mapA.get(key);
    const coordB = mapB.get(key);
    if (coordA && coordB) {
      steps.push(coordA.distance + coordB.distance);
    }
  }

  return steps.sort((a, b) => a - b)[0];
}

const paths = parseInput(fs.readFileSync(process.argv[2], "utf8"));
const [mapA, mapB] = paths.map(getCoordinateMaps);
const intersections = getIntersections(mapA, mapB);
const distance = findShortestDistance(intersections);
const steps = findSmallestSteps(mapA, mapB, intersections);

console.log(`Shortest distance ${distance}`);
console.log(`Smallest steps ${steps}`);
