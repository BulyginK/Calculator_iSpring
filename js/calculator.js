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

class Methods {
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
            if (methods.checkName(name, needless)) {
                methods.checkRepeat(vars, fns, name, meaning);
            }
        } else if (nameCommand === commands[1]) { //let
            if (methods.checkName(name, needless) && methods.checkLetNum(meaning)) {
                methods.add(vars, fns, name, meaning);
            }
        } else if (nameCommand === commands[2]) { //fn
            if (methods.checkName(name, needless)) {
                methods.checkRepeat(fns, vars, name, meaning);
            }
        } else if (nameCommand === commands[3]) { //print
            methods.output(Number(methods.computation(bodyOperation)));
            methods.input();
        } else if (nameOperation === commands[4]) { //printvars
            methods.printVars(vars);
            methods.input();
        } else if (nameOperation === commands[5]) { //printfns
            methods.printFns(fns);
            methods.input();
        } else {
            methods.output('Неверно задано условие!');
        }
    }

    checkName(name, needless) {
        if (/^[^0-9][0-9a-zA-Z\_]*$/g.test(name) && !needless) { // !needless - проверка чтобы не было еще данных после пробела
            return true
        } else {
            methods.output('Неверно задано имя идентификатора! Можно использовать буквы английского алфавита, цифры и символ подчеркивания. Идентификатор не может начинаться с цифры.');
            return false
        }
    }

    checkRepeat(objects, otherObjects, name, meaning) {
        for (let key in objects) { // поиск повторных идентификаторов среди переменных
            if (name == key) {
                return methods.output('Идентификатор с именем ' + name + ' уже существует!');
            }
        }
        for (let key in otherObjects) { // поиск повторных идентификаторов среди функций
            if (name == key) {
                return methods.output('Идентификатор с именем ' + name + ' уже существует!');
            }
        }
        methods.add(objects, otherObjects, name, meaning);
    }

    checkLetNum(meaning) { // проверка переменной на числовове значение
        if (String(parseFloat(meaning, 10)) === String(meaning)) {
            return true
        } else {
            methods.output('Задано не числовое значение!');
            return false
        }
    }

    checkLetLets(meaning) { // поиск значения среди уже объявленных переменных
        for (let key in vars) { 
            if (meaning == key) {
                return true;
            }
        }
    }

    add(objects, otherObjects, name, meaning) {
        if (!meaning && objects == vars) { // если значение не указано, то NaN
            methods.input();
            objects[name] = NaN;
        } else if (meaning) {
            methods.input();
            objects[name] = '';
            for (let key in objects) {
                if (meaning == key) {
                    return objects[name] = objects[key]; // если значение равно ранее объявленному идентификатору
                } else {
                    if (objects == vars) { // если задается значение let
                        for (let key in otherObjects) { // если переменная равна функции происходит ее расчет
                            if (meaning == key) {
                                return objects[name] = methods.computation(meaning);
                            }
                        }
                    }
                    objects[name] = meaning;
                }
            }
        } else {
            return methods.output('Неверно объявлена функция!');
        }
    }

    computation(name) {
        for (let key in vars) {  // поиск выводимого элемента в переменных
            if (key == name) {
                return vars[key]
            } else {
                for (let key in fns) {  // поиск выводимой функции в функциях
                    if (key == name) {
                        for (let i = 0; i < operations.length; i++) {
                            if (fns[key].includes(operations[i])) { // определение проводимой операции
                                fnOperations[key] = operations[i];
                                let argument01 = fns[key].split(operations[i])[0];
                                let argument02 = fns[key].split(operations[i])[1];

                                for (let key in vars) { // если первый аргумент является переменной
                                    if (key == argument01) {
                                        argument01 = vars[key];
                                    }
                                }
                                for (let key in fns) { // если первый аргумент является функцией уходит на новый расчет
                                    if (key == argument01) {
                                        argument01 = methods.computation(argument01);
                                    }
                                }
                                for (let key in vars) { // если второй аргумент является переменной
                                    if (key == argument02) {
                                        argument02 = vars[key];
                                    }
                                }
                                for (let key in fns) { // если второй аргумент является функцией уходит на новый расчет
                                    if (key == argument02) {
                                        argument02 = methods.computation(argument02);
                                    }
                                }
                                return methods.сalculationRun(fnOperations[key], +argument01, +argument02);
                            }
                        }
                        for (let keyVars in vars) {  // поиск элемента в переменных если функция равна переменной
                            if (keyVars == fns[key]) {
                                return +vars[keyVars]
                            }
                        }
                        return methods.output('Неверно указан вид операции в функции!');
                    }
                }
            }
        }
    }

    сalculationRun(operator, argument01, argument02) {
        if (operator == operations[0]) { // +
            return argument01 + argument02;
        } else if (operator == operations[1]) { // -
            return argument01 - argument02;
        } else if (operator == operations[2]) { // *
            return argument01 * argument02;
        } else if (operator == operations[3]) { // /
            return argument01 / argument02;
        }
    }

    printVars(vars) {
        for (let key in vars) {
            output.value += '' + key + ':' + Number(vars[key]).toFixed(2) + '\n';
        }
    }

    printFns(fns) {
        for (let key in fns) {
            output.value += '' + key + ':' + Number(methods.computation(key, fns[key])).toFixed(2) + '\n';
        }
    }

    input() {
        input.value += command.value + '\n';
        command.value = "";
    }

    output(message) {
        output.value = String(parseFloat(message, 10)) === String(message) ? message.toFixed(2) : message;  // проверка на число
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    methods.start([command.value]);

    console.log(vars);
    console.log(fns);
})

const vars = new Vars();
const fns = new Fns();
const fnOperations = new FnOperation();
const methods = new Methods();