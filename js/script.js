'use strict';

let command = document.querySelector('#command');
let input = document.querySelector('#input');
let btnAppend = document.querySelector('#append');


let inputTotal= () => {
   input.value = command.value
}


btnAppend.addEventListener('click', inputTotal)