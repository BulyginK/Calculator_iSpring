'use strict';

let command = document.querySelector('#command');
let input = document.querySelector('#input');
let output = document.querySelector('#output');
let btnAppend = document.querySelector('#append');

let commands = ['var', 'let', 'fn', 'print', 'printvars', 'printfns'];

let vars = []
let lets = {}

const split = () => {
   let nameOperation = command.value.split(' ')[0];
   let bodyOperation = command.value.split(' ')[1];
   let operation = commands.find(item => nameOperation === item);
   if (operation === commands[0]) {
      vars.push(bodyOperation)
   } else if (operation === commands[1]) {
      
   }
}

// const check = () => {
//    if (commands.some(item => command.value === item)) {
//       console.log('find');
//    } else {
//       console.log('no find');
//    }
// }

// const operationVar= () => {
//    let a = 
// }

const inputCommand = () => {
   input.value = command.value
}

const start = () => {
   inputCommand();
   split();
}

btnAppend.addEventListener('click', start);
command.addEventListener('input', check)