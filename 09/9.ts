import * as fs from 'fs';
import * as path from 'path';

const inputFile = fs.readFileSync(path.resolve(__dirname, "input.txt"), 'utf-8').split("\n");



function solvePart1() {
    let index = 25;
    while (index < inputFile.length) {
        const goal = +inputFile[index];
        const slicedArray = inputFile.slice(index - 25, index)
        let sum = slicedArray.filter(a => +a  + +slicedArray.find(b => +b + +a == goal) == goal);
        if (sum.length < 2) {
            return goal;
        }
        index++;
    }
}

function solvePart2(goal: number) {
    for (let i = 0; i < inputFile.length; i++) {
        let sum = new Array<number>();
        for (let z = i; z < inputFile.length; z++) {
            sum.push(+inputFile[z]);
        }
        while (sum.length != 0) {
            if (sum.reduce((prev, cur) => prev + cur) == goal) {
                let sorted = sum.sort((a, b) => a - b);
                return sorted[0] + sorted[sorted.length - 1];
            } else {
                sum.pop();
            }
        }
    }
}

console.log(solvePart1());
console.log(solvePart2(solvePart1()));