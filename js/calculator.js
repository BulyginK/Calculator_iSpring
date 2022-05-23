'use strict';
let command = document.querySelector('#command');
let input = document.querySelector('#input');
let output = document.querySelector('#output');
let btnAppend = document.querySelector('#append');

let commands = ['var', 'let', 'fn', 'print', 'printvars', 'printfns'];

class Vars {
    constructor() {
    }  
}

btnAppend.addEventListener('click', () => {
    let nameOperation = command.value.split(' ')[0];
    let bodyOperation = command.value.split(' ')[1];

    let operation = commands.find(item => nameOperation === item);

    if (operation === commands[0]) {
        vars[bodyOperation] = NaN
    } else if (operation === commands[1]) {
        let nameVar = bodyOperation.split('=')[0];
        let meaning = bodyOperation.split('=')[1];
        vars[nameVar] = +meaning
    }
    console.log(vars);
})

const vars = new Vars()