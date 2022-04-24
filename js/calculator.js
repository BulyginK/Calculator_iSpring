'use strict';
let command = document.querySelector('#command');
let input = document.querySelector('#input');
let output = document.querySelector('#output');
let btnAppend = document.querySelector('#append');

let commands = ['var', 'let', 'fn', 'print', 'printvars', 'printfns'];


class NewVar {
    constructor(name, meaning) {
        this.nameVar = name;
        this.meaningVar = meaning;
    }
    
}

class CreatVars extends NewVar {
    check() {
        let nameOperation = command.value.split(' ')[0];
        let bodyOperation = command.value.split(' ')[1];
        let operation = commands.find(item => nameOperation === item);
        if (operation === commands[0]) {
        } else if (operation === commands[1]) {
            console.log(creatVars);
            let meaning = bodyOperation.split('=')[1];
            this.nameVar = operation;
            this.meaningVar = meaning;
        }
    }
}

const newVar = new NewVar()
const creatVars = new CreatVars()
btnAppend.addEventListener('click', creatVars.check)