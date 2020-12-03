import * as fs from 'fs';
import * as path from 'path';

const grid = fs.readFileSync(path.resolve(__dirname, "input.txt"), 'utf-8').split("\n");

function findTreesInSlope(map: Array<string>, right: number, down: number): number {
    let trees = 0;
    const gridLength = map[0].length;
    let horizontal = 0;
    let vertical = 0;

    while ((vertical += down) < map.length) {
        horizontal += right;
        if (map[vertical][horizontal % gridLength] == '#') {
            trees++;
        }
    }

    return trees;
}

function solvePart2(map: Array<string>, slopes: Array<Array<number>>): number {
    let trees = [];

    slopes.forEach(slope => {
        trees.push(findTreesInSlope(map, slope[0], slope[1]))
    })
    
    return trees.reduce((prev, current) => prev * current);
}

console.log(findTreesInSlope(grid, 3, 1));
console.log(solvePart2(grid, [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]))