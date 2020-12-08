import * as fs from 'fs';
import * as path from 'path';

const inputFile = fs.readFileSync(path.resolve(__dirname, "input.txt"), 'utf-8').split("\n");

function findGroups() {
    let groups = Array<string>();
    let group = "";
    inputFile.forEach(line => {
        if (line != "") {
            group += line;
        } else {
            groups.push(group);
            group = "";
        }
    })

    return groups;
}

function findGroups2() {
    let groups = Array<Array<string>>();
    let group  = Array<string>();
    inputFile.forEach(line => {
        if (line != "") {
            group.push (line);
        } else {
            groups.push(group);
            group = Array<string>();
        }
    })

    return groups;
}


function solvePart1() {
    let groups = findGroups();
    let sum = 0;

    groups.forEach(group => {
        let yes = 0;
        let index = 0;
        let usedCharacters = {};

        while (index < group.length) {
            if (usedCharacters[group[index]] == null) {
                yes++;
                usedCharacters[group[index]] = true;
            }
            index++;
        }
        sum += yes;
    })
    console.log(sum);
}

function solvePart2() {
    let groups = findGroups2();
    let sum = 0;
    groups.forEach(group => {
        let groupYes = {};
        let yes = 0;

        group.forEach(person => {
            let index = 0;
            let usedCharacters = {};

            while (index < person.length) {
                if (usedCharacters[person[index]] == null) {
                    usedCharacters[person[index]] = true;
                }
                index++;
            }

            for (let key of Object.keys(usedCharacters)) {
                if (groupYes[key] == null) {
                    groupYes[key] = 1;
                } else {
                    groupYes[key]++;
                }
            }
        })

        for (let value of Object.values(groupYes)) {
            if (value == group.length) {
                yes++;
            }
        }
        sum += yes;
    });
    console.log(sum);
}
solvePart2();