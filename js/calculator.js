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

        let name = bodyOperation ? bodyOperation.split('=')[0] : ''; // имя
        let meaning = bodyOperation ? bodyOperation.split('=')[1] : ''; // значение

        output.value = "";

        if (nameCommand === commands[0]) { // введено var
            if (methods.checkName(name, needless) && methods.checkVar(meaning)) { // проверка имени переменной
                if (methods.searchRepeat(vars, name) && methods.searchRepeat(fns, name)) { // поиск среди имеющихся идентификаторов
                    methods.add(vars, fns, name, meaning); // добавление переменной
                } else {
                    methods.output('Переменная с таким идетификатором уже объявлена!');
                }
            }

        } else if (nameCommand === commands[1]) { // введено let
            if (methods.checkName(name, needless)) {  // проверка имени переменной
                if (methods.searchRepeat(fns, name)) { // должна отсутствовать среди функций
                    if (methods.checkLetNum(meaning) || !methods.searchRepeat(vars, meaning) || !methods.searchRepeat(fns, meaning)) { // должно быть числом || равно уже имеющейся переменной
                        methods.add(vars, fns, name, meaning); // добавление переменной
                    } else {
                        methods.output('Неверно задано значение let!');
                    }
                } else {
                    methods.output('Переменная с таким идетификатором уже объявлена!');
                }
            }

        } else if (nameCommand === commands[2]) { // введено fn
            if (methods.checkName(name, needless) && methods.checkFn(meaning)) { // проверка имени функции, и ее значения
                if (methods.searchRepeat(vars, name) && methods.searchRepeat(fns, name)) { // поиск среди имеющихся идентификаторов
                    methods.add(fns, vars, name, meaning); // добавление функции
                } else {
                    methods.output('Переменная с таким идетификатором уже объявлена!');
                }
            }

        } else if (nameCommand === commands[3]) { // введено print
            methods.output(Number(methods.computation(bodyOperation)));
            methods.input();

        } else if (nameOperation === commands[4]) { // введено printvars
            if (Object.getOwnPropertyNames(vars).length !== 0) {
                methods.printVars(vars);
                methods.input();
            } else {
                methods.output('Ни одна переменная не объявлена!');
            }
            
        } else if (nameOperation === commands[5]) { // введено printfns
            if (Object.getOwnPropertyNames(fns).length !== 0) {
                methods.printFns(fns);
                methods.input();
            } else {
                methods.output('Ни одна функция не объявлена!');
            }

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

    checkVar(meaning) {
        if (typeof meaning === "string") {
            methods.output('Неверно введено значение var!');
            return false
        }
        return true
    }

    checkLetNum(meaning) { // проверка переменной на числовове значение
        if (String(parseFloat(meaning, 10)) === String(meaning)) {
            return true
        } else {
            return false
        }
    }

    searchRepeat(objects, name) { // поиск значения среди уже объявленных переменных
        for (let key in objects) {
            if (name == key) {
                return false;
            }
        }
        
        return true
    }

    checkFn(meaning) {
        if (!methods.searchRepeat(vars, meaning)) { // проверка функции на приравненности к одной из переменных
            return true
        } else {
            if (meaning) {
                for (let i = 0; i < operations.length; i++) {
                    if (meaning.includes(operations[i])) { // проверка функции на правильность использованных идентификаторов в функции
                        let argument01 = meaning.split(operations[i])[0];
                        let argument02 = meaning.split(operations[i])[1];
                        if (!methods.searchRepeat(vars, argument01) || !methods.searchRepeat(fns, argument01)) { // проверка наличия операнда01 среди идентифиакаторов
                            if (!methods.searchRepeat(vars, argument02) || !methods.searchRepeat(fns, argument02)) { // проверка наличия операнда01 среди идентифиакаторов
                                return true
                            }
                        }
                    }
                }
            }
            methods.output('Неверно введено значение fn!');
            return false
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
        let sortVars = methods.sort(vars); // сортировка по алфавиту
        for (let key in sortVars) {
            output.value += '' + key + ':' + Number(sortVars[key]).toFixed(2) + '\n';
        }
    }

    printFns(fns) {
        let sortFns = methods.sort(fns); // сортировка по алфавиту
        for (let key in sortFns) {
            output.value += '' + key + ':' + Number(methods.computation(key, sortFns[key])).toFixed(2) + '\n';
        }
    }

    input() {
        input.value += command.value + '\n';
        command.value = "";
    }

    output(message) {
        output.value = String(parseFloat(message, 10)) === String(message) ? message.toFixed(2) : message;  // проверка на число
    }

    sort(objects) {
        return Object.fromEntries( // запись в новый объект
            Object.entries(objects).sort((a,b) => { // преобразование в массив и сортировка
                if (a > b) return 1;
                if (a < b) return -1;
            })
        )
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    methods.start([command.value]);
})

const vars = new Vars();
const fns = new Fns();
const fnOperations = new FnOperation();
const methods = new Methods();