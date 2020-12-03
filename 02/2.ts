// Day 2 of AoC
import { match } from 'assert';
import * as fs from 'fs';
import * as path from 'path';

let inputs: Array<{min: number, max: number, character: string, text: string}> = [];
const inputFile = fs.readFileSync(path.resolve(__dirname, "day2input.txt"), 'utf-8').split("\n");
const splittetRegExp = new RegExp("([0-9]+)-([0-9]+) ([a-z]): ([a-z]*)");

for (const line of inputFile) {
    let matches = line.match(splittetRegExp);
    const min = +matches[1];
    const max = +matches[2];
    const char = matches[3];
    const text = matches[4];
    inputs.push({min: min, max: max, character: char, text: text});
}

console.log(solvePart1(inputs));
console.log(solvePart2(inputs));

function solvePart1(inputs: Array<{min: number, max: number, character: string, text: string}>): number {
    let answer = 0;

    for (const input of inputs) {
        const match = input.text.match(new RegExp(`${input.character}{1}`, 'g'));
        if (match != null) {
            if (match.length <= input.max && match.length >= input.min) 
                answer++;
        }
    }

    return answer;
}

function solvePart2(inputs: Array<{min: number, max: number, character: string, text: string}>): number {
    let answer = 0;

    for (const input of inputs) {
        if ((input.text[input.min - 1] == input.character) != (input.text[input.max - 1] == input.character)) 
            answer++;
    }

    return answer;
}
