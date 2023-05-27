let x;
let y;
let operator;

let display = document.querySelector('.display');
let numbers = document.querySelectorAll('.number');
numbers.forEach((number) => number.addEventListener('click', displayNumber));

let operators = document.querySelectorAll('.operator');
operators.forEach((operator) => operator.addEventListener('click', firstStep));

let clear = document.querySelector('#clear');
clear.addEventListener('click', clearFunction);

let equal = document.querySelector('#equal');

let backspace = document.querySelector('.backspace');
backspace.addEventListener('click', backspaceFunction);

function backspaceFunction() {
    if(display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0,-1)
    } else {
        display.textContent = '0';
    }
}

function clearFunction() {
    display.textContent = '0';
    x = undefined;
    y = undefined;
    operator = undefined;
    numbers.forEach((number) => number.removeEventListener('click', turnOnOperators));
    equal.removeEventListener('click', equalFunction);
    equal.removeEventListener('click', pressEqualContinuous);
    operators.forEach((operator) => operator.removeEventListener('click', storeOperator));
    numbers.forEach((number) => number.removeEventListener('click', removeEventListenerEqual));
    equal.removeEventListener('click', equalFunction);
    numbers.forEach((number) => number.removeEventListener('click', turnOffOperators));
    operators.forEach((operator) => operator.removeEventListener('click', secondStep));
    operators.forEach((operator) => operator.addEventListener('click', firstStep));
}


function displayNumber(e) {
    return (display.textContent === '0' || display.textContent == x) ? (display.textContent = e.target.value) : (display.textContent += e.target.value);  
}

function firstStep(e) {
    x = display.textContent;
    operator = e.target.value;
    numbers.forEach((number) => number.addEventListener('click', turnOnOperators));
 

}

function turnOnOperators() {
    operators.forEach((operator) => operator.addEventListener('click', secondStep));
    equal.addEventListener('click', equalFunction);
    numbers.forEach((number) => number.removeEventListener('click', turnOnOperators));
    operators.forEach((operator) => operator.removeEventListener('click', firstStep));
}

function equalFunction() {
    operators.forEach((operator) => operator.removeEventListener('click', secondStep));
    equal.removeEventListener('click', equalFunction);
    y = display.textContent;
    x = operate(parseInt(x), parseInt(y),operator);
    display.textContent = x;
    equal.addEventListener('click', pressEqualContinuous);
    operators.forEach((operator) => operator.addEventListener('click', storeOperator));
    numbers.forEach((number) => number.addEventListener('click', removeEventListenerEqual));
}

function pressEqualContinuous() {
    x = operate(parseInt(x), parseInt(y), operator);
    display.textContent = x;
}

function removeEventListenerEqual() {
    operators.forEach((operator) => operator.removeEventListener('click', storeOperator));
    operators.forEach((operator) => operator.addEventListener('click', secondStep));
    numbers.forEach((number) => number.removeEventListener('click', removeEventListenerEqual));
    equal.addEventListener('click', equalFunction);
}

function secondStep(e) {
    operators.forEach((operator) => operator.removeEventListener('click', secondStep));
    y = display.textContent;
    display.textContent = operate(parseInt(x), parseInt(y),operator);
    operator = e.target.value;
    x = display.textContent;
    operators.forEach(operator => operator.addEventListener('click', storeOperator));
    numbers.forEach((number) => number.addEventListener('click', turnOffOperators));
}

function storeOperator(e) {
    operator = e.target.value;
    x = display.textContent;
    equal.removeEventListener('click', pressEqualContinuous);
}

function turnOffOperators() {
    operators.forEach((operator) => operator.removeEventListener('click', (e) => operator = e.target.value));
    numbers.forEach((number) => number.removeEventListener('click', turnOffOperators));
    operators.forEach((operator) => operator.addEventListener('click', secondStep));
}

function add(x,y) {
    return x+y;
}

function substract(x,y) {
    return x-y;
}

function multiply(x,y) {
    return x*y;
}

function divide(x,y) {
    return x/y;
}

function operate(x,y,operator) {
    if(operator === 'add') {
        return add(x,y);
    } 
    else if(operator === 'substract') {
        return substract(x,y);
    }
    else if(operator === 'multiply') {
        return multiply(x,y);
    }
    else if(operator === 'divide') {
        if(y === 0) {
            return 'error';
        }
        else {
            return divide(x,y);
        }
    }
}
