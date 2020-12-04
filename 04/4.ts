import * as fs from 'fs';
import * as path from 'path';

const inputFile = fs.readFileSync(path.resolve(__dirname, "input.txt"), 'utf-8').split("\n");
const attRegEx = new RegExp("([a-z]+):(#?([a-z]|[0-9])+)+", 'g')

export interface PassPort {
    byr: string,
    iyr: string, 
    eyr: string, 
    hgt: string, 
    hcl: string, 
    ecl: string, 
    pid: string, 
    cid: string
}

function validate1(passport: PassPort): boolean {
    let validEntries = 0;
    const length = Object.keys(passport).length;
    for (const [key, value] of Object.entries(passport)) {
        if (value != "") {
            validEntries++;
        } else {
            if (key == "cid")
                validEntries++;
        }
    }
    return validEntries == length;
}

// Scuffed
function validate2(passport: PassPort): boolean {
    let validEntries = 0;
    const length = Object.keys(passport).length;

    for (const [key, value] of Object.entries(passport)) {
        switch (key) {
            case "byr": {
                if (+value >= 1920 && +value <= 2002 ) validEntries++;
                break;
            }
            case "iyr": {
                if (+value >= 2010 && +value <= 2020 ) validEntries++;
                break;
            }
            case "eyr": {
                if (+value >= 2020 && +value <= 2030 ) validEntries++;
                break;
            }
            case "hgt": {
                let stringValue = String(value);
                if (stringValue.includes("cm")) {
                    let match = stringValue.match(/^([0-9]+)cm$/);
                    if (+match[1] >= 150 && +match[1] <= 193) validEntries++;
                    break;
                } else if (stringValue.includes("in")) {
                    let match = stringValue.match(/^([0-9]+)in$/);
                    if (+match[1] >= 59 && +match[1] <= 76) validEntries++;
                    break;
                }
            }
            case "hcl": {
                if (String(value).match(/^#([a-z]|[0-9]){6}$/) != null) {
                    validEntries++;
                }
                break;
            }
            case "ecl": {
                const colors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
                let isValidColor: boolean = false;
                colors.forEach(color => {
                    if (String(value) == color)
                        isValidColor = true;
                })
                if (isValidColor){
                    validEntries++;
                }
                break;
            }

            case "pid": {
                if (String(value).match(/^[0-9]{9}$/) != null) {
                    console.log(value);
                    validEntries++;
                }
                break;
            }
            default: {
                validEntries++;
            }
        }
    }
    return validEntries == length;
}

function solvePart1() {
    const defaultPassPort = {byr: "", iyr: "", eyr: "", hgt: "", hcl: "", ecl: "", pid: "", cid: ""};
    let tempPassPort: PassPort = Object.assign([], defaultPassPort);
    let counter1 = 0;
    let counter2 = 0;

    for (const line of inputFile) {
        let atts = line.split(" ");
        let group: any;
        if (line != "") {
            while (group = attRegEx.exec(line) ) {
                tempPassPort[group[1]] = group[2];
            }
        } else {
            if (validate1(tempPassPort)) counter1++;
            if (validate2(tempPassPort)) counter2++;
            tempPassPort = Object.assign([], defaultPassPort);
        }
    }
    console.log(counter1);
    console.log(counter2);
}
solvePart1();