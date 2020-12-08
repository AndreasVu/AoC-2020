import * as fs from 'fs';
import * as path from 'path';

const inputFile = fs.readFileSync(path.resolve(__dirname, "input.txt"), 'utf-8').split("\n");
const bagContainRegEx = new RegExp("([0-9]+|no) ([a-z]+ [a-z]+ bags?.?)*", 'g');


function containsGoldBag(bag: string, bagList: Object): boolean {
    if (bagList[bag] != false) {
        if (String(bagList[bag]).match(/shiny gold bag/) != null) {
            return true;
        } else {
            let containedBags: Array<[number, string]> = Object.assign([], bagList[bag]);
            for (let bagInBag of containedBags) {
                if (containsGoldBag(bagInBag[1], bagList)) {
                    return true;
                }
            }
        }
    } else {
        return false;
    }
}

function findNumberOfBags(bag: string, bagList: Object): number {
    let total = 1;

    if (bagList[bag] != false) {
        let containedBags: Array<[number, string]> = Object.assign([], bagList[bag]);

        for (let bagInBag of containedBags) {
            total += bagInBag[0] * findNumberOfBags(bagInBag[1], bagList);
        }
        return total;
    } else {
        return 1;
    }
}

function solvePart1() {
    let count = 0;
    let bagDict = {};
    inputFile.forEach(line => {
        let bag = line.match(/([a-z]+ [a-z]+ bag)s/)[1]
        let otherBags: RegExpExecArray;

        while (otherBags = bagContainRegEx.exec(line)) {
            if (otherBags != null) {
                if (otherBags[0].includes("no")) {
                    bagDict[bag] = false;
                } else {
                    let newEntryName = otherBags[2].match(/([a-z]+ [a-z]+ bag)/)[1];
                    if (bagDict[bag] != null) {
                        bagDict[bag].push([otherBags[1], newEntryName]);
                    } else {
                        bagDict[bag] = [[otherBags[1], newEntryName]];
                    }
                }
            }
        }
    })
    
    for (let [key, value] of Object.entries(bagDict)) {
        if (value != false) {
            if (containsGoldBag(String(key), bagDict)) {
                count++;
            }
        }
    }
    console.log(count);
}

function solvePart2() {
    let bagDict = {};
    inputFile.forEach(line => {
        let bag = line.match(/([a-z]+ [a-z]+ bag)s/)[1]
        let otherBags: RegExpExecArray;

        while (otherBags = bagContainRegEx.exec(line)) {
            if (otherBags != null) {
                if (otherBags[0].includes("no")) {
                    bagDict[bag] = false;
                } else {
                    let newEntryName = otherBags[2].match(/([a-z]+ [a-z]+ bag)/)[1];
                    if (bagDict[bag] != null) {
                        bagDict[bag].push([otherBags[1], newEntryName]);
                    } else {
                        bagDict[bag] = [[otherBags[1], newEntryName]];
                    }
                }
            }
        }
    })

    console.log(findNumberOfBags("shiny gold bag", bagDict) - 1);
}

solvePart2();