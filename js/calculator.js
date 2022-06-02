'use strict';
const command = document.querySelector('#command');
const input = document.querySelector('#input');
const output = document.querySelector('#output');
const btnAppend = document.querySelector('#append');

const commands = ['var', 'let', 'fn', 'print', 'printvars', 'printfns'];
const operations = ['+', '-', '*', '/']

// class Objects {
//     constructor() {
//     }
// }

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

    check(objects, name, meaning) {
        for (let key in objects) {
            if (name == key) {
                output.value = 'Уже существует!';
                return
            }
        }
        metods.add(objects, name, meaning);
    }

    add(objects, name, meaning) {
        if (!meaning) {
            objects[name] = NaN
            console.log(objects);
        } else {
            objects[name] = '';
            for (let key in objects) {
                if (meaning == key) {
                    objects[name] = objects[key]
                    console.log(objects);
                    return
                } else {
                    objects[name] = meaning
                    console.log(objects);
                }
            }
        }
    }

    print(objects, name) {
        for (let key in objects) {
            if (key == name) {
                output.value = objects[name]
            }
        }
    }

    printItems(objects) {
        for (let key in objects) {
            output.value += '' + key + ':' + objects[key] + '\n';
        }
    }

    computation(meaning) {
        for (let i = 0; i < operations.length; i++) {
            if (meaning.includes(operations[i])) { // определение проводимой операции
                let argument01 = meaning.split(operations[i])[0];
                let argument02 = meaning.split(operations[i])[1];
                for (let key in vars) {
                    if (key == argument01) {
                        let key01 = +vars[key];
                        for (let key in vars) {
                            if (key == argument02) {
                                let key02 = +vars[key];
                                if (operations[i] == operations[0]) { // +
                                    let sum = key01 + key02;
                                    console.log(sum);
                                } else if (operations[i] == operations[1]) { // -
                                    let sum = key01 - key02;
                                    console.log(sum);
                                } else if (operations[i] == operations[2]) { // *
                                    let sum = key01 * key02;
                                    console.log(sum);
                                } else if (operations[i] == operations[3]) { // /
                                    let sum = key01 / key02;
                                    console.log(sum);
                                }
                            }
                        }
                    }
                }
            }
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
            metods.check(fns, name, meaning);
            metods.computation(meaning);
        } else if (nameCommand === commands[3]) { //print
            metods.print(vars, bodyOperation);
            metods.print(fns, bodyOperation);
        } else if (nameOperation === commands[4]) { //printvars
            metods.printItems(vars);
        } else if (nameOperation === commands[5]) { //printfns
            metods.printItems(fns);
        }

        command.value = "";
        // console.log(vars);
        // console.log(fns);
    }
}

btnAppend.addEventListener('click', () => {
    let arr = [command.value];
    elem.start(arr);
})

const elem = new Elem();
// const objects = new Objects();
const vars = new Vars();
const fns = new Fns();
const metods = new Metods();