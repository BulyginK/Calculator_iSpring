'use strict';
const command = document.querySelector('#command');
const input = document.querySelector('#input');
const output = document.querySelector('#output');
const btnAppend = document.querySelector('#append');

const commands = ['var', 'let', 'fn', 'print', 'printvars', 'printfns'];
const operations = ['+', '-', '*', '/']

class Objects {
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
        if (!meaning) {
            obj[name] = NaN
        } else {
            for (let key in obj) {
                if (meaning == key) {
                    obj[name] = obj[key]
                    return
                } else {
                    obj[name] = meaning
                }
            }
        }
        console.log(name);
    }

    print(name) {
        for (let key in objects) {
            if (key == name) {
                output.value = objects[name]
            }
        }
    }

    printItems(obj) {
        for (let key in obj) {
            output.value += '' + key + ':' + obj[key] + '\n';
        }
    }

    computation(meaning) {
        for (let i = 0; i < operations.length; i++) {
            if (meaning.includes(operations[i])) {
                let argument01 = meaning.split(operations[i])[0];
                let argument02 = meaning.split(operations[i])[1];
                for (let key in objects) {
                    if (key == argument01) {
                        let key01 = +objects[key];
                        for (let key in objects) {
                            if (key == argument02) {
                                let key02 = +objects[key];
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
            metods.check(objects, name, meaning);
        } else if (nameCommand === commands[1]) { //let
            metods.add(objects, name, meaning);
        } else if (nameCommand === commands[2]) { //fn
            metods.check(objects, name, meaning);
            metods.computation(meaning);
        } else if (nameCommand === commands[3]) { //print
            metods.print(bodyOperation);
        } else if (nameOperation === commands[4]) { //printvars
            metods.printItems();
        } else if (nameOperation === commands[5]) { //printfns
            metods.printItems();
        }

        command.value = "";
        console.log(objects);
    }
}

btnAppend.addEventListener('click', () => {
    let arr = [command.value];
    elem.start(arr);
})

const elem = new Elem();
const objects = new Objects();
const metods = new Metods();