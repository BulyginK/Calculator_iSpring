'use strict';
const command = document.querySelector('#command');
const input = document.querySelector('#input');
const output = document.querySelector('#output');
const btnAppend = document.querySelector('#append');

const commands = ['var', 'let', 'fn', 'print', 'printvars', 'printfns'];
const operations = ['+', '-', '*', '/']

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

    computation() {

    }

    print(name) {
        for (let key in vars) {
            if (key == name) {
                output.value = vars[name]
            }
        }
        for (let key in fns) {
            if (key == name) {
                output.value = fns[name]
            }
        }
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
        let nameCommand = commands.find(item => nameOperation === item);

        let name = bodyOperation ? bodyOperation.split('=')[0] : '';
        let meaning = bodyOperation ? bodyOperation.split('=')[1] : '';




        input.value += command.value + '\n';
        output.value = "";

        if (nameCommand === commands[0]) { //var
            metods.check(vars, name, meaning);
        } else if (nameCommand === commands[1]) { //let
            metods.add(vars, name, meaning);
        } else if (nameCommand === commands[2]) { //fn
            metods.check(fns, name, meaning)
            for (let i = 0; i < operations.length; i++) {
                if (meaning.includes(operations[i])) {
                    let argument01 = meaning.split(operations[i])[0];
                    let argument02 = meaning.split(operations[i])[1];
                    console.log(argument01);
                    console.log(argument02);
                }
            }

            // console.log(operations.some(item => meaning.includes(item)));
        } else if (nameCommand === commands[3]) { //print
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