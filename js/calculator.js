'use strict';
let command = document.querySelector('#command');
let input = document.querySelector('#input');
let output = document.querySelector('#output');
let btnAppend = document.querySelector('#append');

let commands = ['var', 'let', 'fn', 'print', 'printvars', 'printfns'];

class Vars {
    constructor() {
    }

    checkVar(name) {
        for (let key in vars) {
            if (name == key) {
                output.value = 'Такая переменная уже существует!';
                return
            }
        }
        vars[name] = NaN;
    }

    addMeaning(nameVar, meaning) {
        vars[nameVar] = +meaning;
    }

    print(name) {
        output.value = vars[name];
    }
}

class Fns {
    constructor() {
    }

    checkFn(name, meaning) {
        for (let key in fns) {
            if (name == key) {
                output.value = 'Такая функция уже существует!';
                return
            }
        }
        fns.addFn(name, meaning);
    }

    addFn(name, meaning) {
        fns[name] = meaning;
    }
}

class Elem {
    constructor() {
    }

    start() {
        let nameOperation = command.value.split(' ')[0];
        let bodyOperation = command.value.split(' ')[1];
        let operation = commands.find(item => nameOperation === item);
        let name = bodyOperation.split('=')[0];
        let meaning = bodyOperation.split('=')[1];

        input.value += command.value + '\n';

        if (operation === commands[0]) { //var
            vars.checkVar(bodyOperation);
        } else if (operation === commands[1]) { //let
            vars.addMeaning(name, meaning);
        } else if (operation === commands[2]) { //fn
            fns.checkFn(name, meaning)
        } else if (operation === commands[3]) { //print
            vars.print(bodyOperation)
        } else if (operation === commands[3]) { //printvars
            output.value = vars[nameVar];
        } else if (operation === commands[3]) { //printfns
            output.value = vars[nameVar];
        }
        command.value = "";
        console.log(vars);
        console.log(fns);
    }
}

btnAppend.addEventListener('click', () => {
    elem.start()
})

const elem = new Elem();
const vars = new Vars();
const fns = new Fns();
