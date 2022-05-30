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

class Fns {
    constructor() {
    }

}

class Metods {
    constructor() {
    }

    check(obj, name, meaning) {
        for (let key in obj) {
            if (name == key) {
                output.value = 'Уже существует!';
                return
            }
        }
        metods.add(obj, name, meaning);
    }

    add(obj, name, meaning) {
        if (obj == vars) {
            !meaning ? obj[name] = NaN : obj[name] = +meaning;
        } else if (obj == fns) {
            obj[name] = meaning;
        }
    }

    print(obj, name) {
        obj == vars ? output.value = obj[name] : output.value = obj[name]
        // if (obj == vars) {
        //     output.value = obj[name];
        // } else if (obj == fns) {
        //     output.value = obj[name];
        // }

        // ;
    }

    printItems(obj) {
        for (let key in obj) {
            output.value += '' + key + ':' + obj[key] + '\n';
        }
    }
}

class Elem {
    constructor() {
    }

    start(arr) {
        let nameOperation = arr[0].split(' ')[0];
        let bodyOperation = arr[0].split(' ')[1];
        let operation = commands.find(item => nameOperation === item);

        let name = bodyOperation ? bodyOperation.split('=')[0] : '';
        let meaning = bodyOperation ? bodyOperation.split('=')[1] : '';

        input.value += command.value + '\n';
        output.value = "";

        if (operation === commands[0]) { //var
            metods.check(vars, name, meaning);
        } else if (operation === commands[1]) { //let
            metods.add(vars, name, meaning);
        } else if (operation === commands[2]) { //fn
            metods.check(fns, name, meaning)
        } else if (operation === commands[3]) { //print

            // вот тут
            metods.print(bodyOperation);
        } else if (nameOperation === commands[4]) { //printvars
            metods.printItems();
        } else if (nameOperation === commands[5]) { //printfns
            metods.printItems();
        }

        command.value = "";
        console.log(vars);
        console.log(fns);
    }
}

btnAppend.addEventListener('click', () => {
    let arr = [command.value];
    elem.start(arr);
})

const elem = new Elem();
const vars = new Vars();
const fns = new Fns();
const metods = new Metods();