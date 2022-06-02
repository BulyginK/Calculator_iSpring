'use strict';
const form = document.querySelector('#form');
const command = document.querySelector('#command');
const input = document.querySelector('#input');
const output = document.querySelector('#output');

const commands = ['var', 'let', 'fn', 'print', 'printvars', 'printfns'];
const operations = ['+', '-', '*', '/'];

class Vars {
    constructor() {
    }
}

class Fns {
    constructor() {
    }
}

class Arguments {
    constructor(argumen01, argumen02) {
        this.argumen01 = argumen01;
        this.argumen02 = argumen02;
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
        } else {
            objects[name] = '';
            for (let key in objects) {
                if (meaning == key) {
                    objects[name] = objects[key];
                    return
                } else {
                    objects[name] = meaning;
                }
            }
        }
    }

    printItems(objects) {
        for (let key in objects) {
            output.value += '' + key + ':' + objects[key] + '\n';
        }
    }

    computation(name) {
        for (let key in vars) {  // поиск выводимого элемента в переменных
            if (key == name) {
                output.value = objects[name]
                return
            }
        }
        for (let key in fns) {  // поиск выводимой функции в функциях
            if (key == name) {
                for (let i = 0; i < operations.length; i++) {
                    if (fns[key].includes(operations[i])) { // определение проводимой операции
                        let argument01 = fns[key].split(operations[i])[0];
                        let argument02 = fns[key].split(operations[i])[1];

                        for (let key in vars) {
                            if (key == argument01) {
                                argument01 = +vars[key];
                            }
                        }
                        for (let key in fns) {
                            if (key == argument01) {
                                argument01 = metods.computation(argument01);
                            }
                        }
                        for (let key in vars) {
                            if (key == argument02) {
                                argument02 = +vars[key];
                            }
                        }
                        for (let key in fns) {
                            if (key == argument02) {
                                argument02 = metods.computation(argument02);
                            }
                        }
                        return metods.сalculationRun(operations[i], argument01, argument02);
                    }
                }
            }
        }
    }

    сalculationRun(operator, argument01, argument02) {
        let total
        if (operator == operations[0]) { // +
            total = argument01 + argument02;
        } else if (operator == operations[1]) { // -
            total = argument01 - argument02;
        } else if (operator == operations[2]) { // *
            total = argument01 * argument02;
        } else if (operator == operations[3]) { // /
            total = argument01 / argument02;
        }
        return total
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
        } else if (nameCommand === commands[3]) { //print
            output.value = metods.computation(bodyOperation);
        } else if (nameOperation === commands[4]) { //printvars
            metods.printItems(vars);
        } else if (nameOperation === commands[5]) { //printfns
            metods.printItems(fns);
        }

        command.value = "";
        console.log(vars);
        console.log(fns);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    elem.start([command.value]);
})

const elem = new Elem();
const vars = new Vars();
const fns = new Fns();
const argumens = new Arguments();
const metods = new Metods();