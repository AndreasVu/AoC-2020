import * as fs from 'fs';
import * as path from 'path';

const inputFile = fs.readFileSync(path.resolve(__dirname, "input.txt"), 'utf-8').split("\n");

function runProgram(list: Array<string>): [boolean, number] {
    let index = 0;
    let usedIndecies = {};
    let accumulator = 0;
    while (usedIndecies[index] == null) {
        let opCode = list[index].split(" ");
        switch (opCode[0]) {
            case "acc": {
                accumulator += opCode[1].substr(0, 1) == "+" ? +opCode[1].substr(1, opCode[1].length - 1) : - +opCode[1].substr(1, opCode[1].length - 1);
                usedIndecies[index] = true;
                index++;
                break;
            }
            case "jmp": {
                usedIndecies[index] = true;
                index += opCode[1].substr(0, 1) == "+" ? +opCode[1].substr(1, opCode[1].length - 1) : - +opCode[1].substr(1, opCode[1].length - 1);
                break;
            }
            case "nop": {
                usedIndecies[index] = true;
                index++;
                break;
            }
        }
        if (index == list.length - 1) {
            return [true, accumulator];
        }
    }
    
    return [false, accumulator];
}

function solvePart1() {
    let result = runProgram(inputFile);
    console.log(result[1]);
}

function solvePart2() {
    inputFile.forEach((line, index) => {
        let newList: Array<string>;
        if (line.includes("nop")) {
            newList = Object.assign([], inputFile);
            newList[index] = "jmp " + line.split(" ")[1];
        } else if (line.includes("jmp")) {
            newList = Object.assign([], inputFile);
            newList[index] = "nop " + line.split(" ")[1];
        }

        if (newList != null) {
            let result = runProgram(newList);
            if (result[0]) {
                console.log(result[1]);
            }
        }
        
    })
}

solvePart1();
solvePart2();