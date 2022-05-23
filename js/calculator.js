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

btnAppend.addEventListener('click', () => {
    let nameOperation = command.value.split(' ')[0];
    let bodyOperation = command.value.split(' ')[1];
    let operation = commands.find(item => nameOperation === item);
    if (operation === commands[0]) {
        const newVar = new NewVar()
        newVar.nameVar = operation
        newVar.meaningVar = bodyOperation
    } else if (operation === commands[1]) {
        console.log(creatVars);
        let meaning = bodyOperation.split('=')[1];
        this.nameVar = operation;
        this.meaningVar = meaning;
    } 
})