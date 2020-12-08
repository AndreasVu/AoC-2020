import * as fs from 'fs';
import * as path from 'path';

const inputFile = fs.readFileSync(path.resolve(__dirname, "input.txt"), 'utf-8').split("\n");
const attRegEx = new RegExp("([a-z]+):(#?([a-z]|[0-9])+)+", 'g')

function validate1(passport: any): boolean {
    let validValues = 0;
    const length = Object.keys(passport).length;
    for (const [key, value] of Object.entries(passport)) {
        if (value != "") {
            validValues++;
        } else {
            if (key == "cid")
                validValues++;
        }
    }
    return validValues == length;
}

// Scuffed
function validate2(passport: any): boolean {
    let validValues = 0;
    const length = Object.keys(passport).length;

    for (const [key, value] of Object.entries(passport)) {
        switch (key) {
            case "byr": {
                validValues += +(+value >= 1920 && +value <= 2002 );
                break;
            }
            case "iyr": {
                validValues += +(+value >= 2010 && +value <= 2020 );
                break;
            }
            case "eyr": {
                validValues += +(+value >= 2020 && +value <= 2030 );
                break;
            }
            case "hgt": {
                let stringValue = String(value);
                if (stringValue.includes("cm")) {
                    let match = stringValue.match(/^([0-9]+)cm$/);
                    validValues += +(+match[1] >= 150 && +match[1] <= 193);
                    break;
                } else if (stringValue.includes("in")) {
                    let match = stringValue.match(/^([0-9]+)in$/);
                    validValues += +(+match[1] >= 59 && +match[1] <= 76);
                    break;
                }
            }
            case "hcl": {
                validValues += +(String(value).match(/^#([a-z]|[0-9]){6}$/) != null);
                break;
            }
            case "ecl": {
                const colors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
                let isValidColor: boolean = false;
                colors.forEach(color => {
                    if (String(value) == color)
                        isValidColor = true;
                })
                validValues += +(isValidColor);
                break;
            }
            case "pid": {
                validValues += +(String(value).match(/^[0-9]{9}$/) != null);
                break;
            }
            default: {
                validValues++;
            }
        }
    }
    return validValues == length;
}

function solve() {
    const defaultPassPort = {byr: "", iyr: "", eyr: "", hgt: "", hcl: "", ecl: "", pid: "", cid: ""};
    let tempPassPort = Object.assign([], defaultPassPort);
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
            counter1 += +(validate1(tempPassPort));
            counter2 += +(validate2(tempPassPort));
            tempPassPort = Object.assign([], defaultPassPort);
        }
    }
    console.log(counter1);
    console.log(counter2);
}
solve();