'use strict';
let command = document.querySelector('#command');
let input = document.querySelector('#input');
let output = document.querySelector('#output');
let btnAppend = document.querySelector('#append');

let commands = ['var', 'let', 'fn', 'print', 'printvars', 'printfns'];

class Elem {
    constructor() {
        this.vars = new Vars();
        this.fns = new Fns();
    }

    start() {
        let nameOperation = command.value.split(' ')[0];
        let bodyOperation = command.value.split(' ')[1];
        let operation = commands.find(item => nameOperation === item);
        let name = bodyOperation.split('=')[0];
        let meaning = bodyOperation.split('=')[1];

        if (operation === commands[0]) { //var
            console.log(nameOperation);
            console.log(bodyOperation);
        }
    }
}

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
        this.vars[name] = NaN;
    }
}

class Fns {
    constructor() {

    }
}

// class Vars extends Elem {
//     constructor() {
//     }

//     checkVar(name) {
//         for (let key in vars) {
//             if (name == key) {
//                 output.value = 'Такая переменная уже существует!';
//                 return
//             }
//         }
//         vars[name] = NaN;
//     }

//     addMeaning(nameVar, meaning) {
//         vars[nameVar] = +meaning;
//     }
// }

// class Fns extends Elem {
//     constructor() {
//     }

//     checkFn(name, meaning) {
//         for (let key in fns) {
//             if (name == key) {
//                 output.value = 'Такая функция уже существует!';
//                 return
//             }
//         }
//         addFn(name, meaning)
//     }

//     addFn(name, meaning) {
//         fns[name] = meaning;
//     }
// }

// btnAppend.addEventListener('click', () => {
//     let nameOperation = command.value.split(' ')[0];
//     let bodyOperation = command.value.split(' ')[1];
//     let operation = commands.find(item => nameOperation === item);
//     let name = bodyOperation.split('=')[0];
//     let meaning = bodyOperation.split('=')[1];

// if (operation === commands[0]) { //var
//     vars.checkVar(bodyOperation);
//     // } else if (operation === commands[1]) { //let
//     //     this.vars.addMeaning(name, meaning);
//     // } else if (operation === commands[2]) { //fn
//     //     this.fns.checkFn(name, meaning)
//     // } else if (operation === commands[3]) { //print
//     //     output.value = vars[nameVar];
//     // } else if (operation === commands[3]) { //printvars
//     //     output.value = vars[nameVar];
//     // } else if (operation === commands[3]) { //printfns
//     //     output.value = vars[nameVar];
//     // }

//     console.log(vars);
//     console.log(fns);
// })

// const vars = new Vars();
// const fns = new Fns();

btnAppend.addEventListener('click', () => {
    elem.start()
})

const elem = new Elem();
