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

class FnOperation {
    constructor() {
    }
}

class Metods {
    constructor() {
    }

    checkName(name, needless) {
        if (/^[^0-9][0-9a-zA-Z\_]*$/g.test(name) && !needless) { // !needless - проверка чтобы не было еще данных после пробела
            return true
        } else {
            metods.output('Неверно задано имя идентификатора! Можно использовать буквы английского алфавита, цифры и символ подчеркивания. Идентификатор не может начинаться с цифры.');
            return false
        }
    }

    checkRepeat(objects, otherObjects, name, meaning) {
        for (let key in objects) { // поиск повторных идентификаторов
            if (name == key) {
                return metods.output('Идентификатор с именем ' + name + ' уже существует!');
            }
        }
        for (let key in otherObjects) { // поиск повторных идентификаторов
            if (name == key) {
                return metods.output('Идентификатор с именем ' + name + ' уже существует!');
            }
        }
        metods.add(objects, name, meaning);
    }

    add(objects, name, meaning) {
        if (!meaning) { // если значение не указано, то NaN
            objects[name] = NaN;
        } else if (meaning) {
            objects[name] = '';
            for (let key in objects) {
                if (meaning == key) {
                    return objects[name] = objects[key]; // если значение равно ранее объявленному идентификатору
                } else {
                    objects[name] = meaning;
                }
            }
        }
        metods.input();
    }

    printItems(objects) {
        metods.input();
        for (let key in objects) {
            output.value += '' + key + ':' + objects[key] + '\n';
        }
    }

    computation(name) {
        metods.input();
        for (let key in vars) {  // поиск выводимого элемента в переменных
            if (key == name) {
                return vars[key]
            }
        }
        for (let key in fns) {  // поиск выводимой функции в функциях
            if (key == name) {
                for (let i = 0; i < operations.length; i++) {
                    if (fns[key].includes(operations[i])) { // определение проводимой операции
                        fnOperations[key] = operations[i];
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
                        return metods.сalculationRun(fnOperations[key], argument01, argument02);
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

    input() {
        input.value += command.value + '\n';
        command.value = "";
    }

    output(message) {
        output.value = message;
    }
}

class Elem {
    constructor() {
    }

    start(arr) {
        let nameOperation = arr[0].split(' ')[0];
        let bodyOperation = arr[0].split(' ')[1];
        let needless = arr[0].split(' ')[2];

        let nameCommand = commands.find(item => nameOperation === item); // определение введенной команды

        let name = bodyOperation ? bodyOperation.split('=')[0] : '';
        let meaning = bodyOperation ? bodyOperation.split('=')[1] : '';

        output.value = "";

        if (nameCommand === commands[0]) { // var
            if (metods.checkName(name, needless)) {
                metods.checkRepeat(vars, fns, name, meaning);
            }
        } else if (nameCommand === commands[1]) { //let
            if (metods.checkName(name, needless)) {
                metods.add(vars, name, meaning);
            }
        } else if (nameCommand === commands[2]) { //fn
            if (metods.checkName(name, needless)) {
                metods.checkRepeat(fns, vars, name, meaning);
            }
        } else if (nameCommand === commands[3]) { //print
            output.value = metods.computation(bodyOperation, meaning);
        } else if (nameOperation === commands[4]) { //printvars
            metods.printItems(vars);
        } else if (nameOperation === commands[5]) { //printfns
            metods.printItems(fns);
        }
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    elem.start([command.value]);

    console.log(vars);
    console.log(fns);
})

const elem = new Elem();
const vars = new Vars();
const fns = new Fns();
const fnOperations = new FnOperation();
const metods = new Metods();