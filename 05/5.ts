import * as fs from 'fs';
import * as path from 'path';

const inputFile = fs.readFileSync(path.resolve(__dirname, "input.txt"), 'utf-8').split("\n");

function findSeatID(str: string, index: number, row: Array<number>, column: Array<number>): number {
    if (str.length > index + 1) {
        switch (str[index]) {
            case "F": {
                if (index < 6) {
                    row[1] -= Math.ceil(((row[1] - row[0]) / 2));
                    return findSeatID(str, index + 1, row, column);
                }
                return findSeatID(str, index + 1, row, column);
            }
            case "B": {
                if (index < 6) {
                    row[0] += Math.ceil(((row[1] - row[0]) / 2));
                    return findSeatID(str, index + 1, row, column);
                }
                return findSeatID(str, index + 1, row, column);
            }
            case "R": {
                column[0] += Math.ceil(((column[1] - column[0]) / 2));
                return findSeatID(str, index + 1, row, column);
            }
            case "L": {
                column[1] -= Math.ceil(((column[1] - column[0]) / 2));
                return findSeatID(str, index + 1, row, column);
            }
            default: {
                break;
            }
        }
    } else {
        if(str[index - 3] == "F") {
            return str[index] == "L" ? ((row[0] * 8) + column[0]) : ((row[0] * 8) + column[1]);
        } else {
            return str[index] == "L" ? (row[1] * 8) + column[0] : ((row[1] * 8) + column[1]);
        }
    }
}

function solvePart1() {
    let highestNumber = 0;
    inputFile.forEach(line => {
        let seatID = findSeatID(line, 0, [0, 127], [0,7]);
        if (seatID > highestNumber) {
            highestNumber = seatID;
        }
    })
    console.log(highestNumber);
}

function solvePart2() {
    let seatIDs = Array<number>();
    inputFile.forEach(line => {
        seatIDs.push(findSeatID(line, 0, [0, 127], [0, 7]))
    })
    seatIDs = seatIDs.sort((a, b) => a - b);
    let prev = 0;
    seatIDs.forEach(seat => {
        if (seat - prev == 2) {
            console.log(prev + 1);
            prev = seat;
        } else {
            prev = seat;
        }
    })
}

solvePart1();
solvePart2();
