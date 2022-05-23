'use strict';
let command = document.querySelector('#command');
let input = document.querySelector('#input');
let output = document.querySelector('#output');
let btnAppend = document.querySelector('#append');

let commands = ['var', 'let', 'fn', 'print', 'printvars', 'printfns'];


class Vars {
    checkVar(nameVar) {
        for (let key in vars) {
            if (nameVar == key) {
                alert('Такая переменная уже существует!')
                return
            }
        }
        vars[nameVar] = NaN;
    }

    addMeaning(nameVar, meaning) {
        vars[nameVar] = +meaning;
    }
}

btnAppend.addEventListener('click', () => {
    let nameOperation = command.value.split(' ')[0];
    let bodyOperation = command.value.split(' ')[1];
    let operation = commands.find(item => nameOperation === item);
    let nameVar = bodyOperation.split('=')[0];
    let meaning = bodyOperation.split('=')[1];

    if (operation === commands[0]) {
        vars.checkVar(bodyOperation)
    } else if (operation === commands[1]) {
        vars.addMeaning(nameVar, meaning);
    }

    console.log(vars);
})

const vars = new Vars()
