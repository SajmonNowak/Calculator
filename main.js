const lowDisplay = document.getElementById('lowerDisplay');
const upDisplay = document.getElementById('upperDisplay');
const buttons = document.querySelectorAll('.button');
const communicationPanel = document.getElementById('communicationPanel')
const numberRegExp = /[\s]?(\-?)[\d]+(\.?)[\d]*[\s]?/g;
const plusOrMinusRegExp = /[\s][\+|\-][\s]/;
const multiplyOrDivideRegExp = /[\s][\x|\÷][\s]/;
const exponentRegExp = /[\^]/;
const factorialRegExp = /[\!]/
const operatorArray = ['addBtn', 'multiplyBtn', 'divideBtn', 'subtractBtn' ];
const otherOperatorArray = ['powerOfBtn', 'pointBtn', 'changeSignBtn', 'factorialBtn']
let displayNumber = '';
let rawData = '';
let rawDataResult = null;
let inputVariable = '';
let predecessor = false;

function Input (){
    communicationPanel.textContent ='';
    inputVariable = this.id;
    checkResult();
    
    if (checkFactorial() == true && this.id !== 'resultBtn' && this.id !== 'ACBtn'){
        if (operatorArray.includes(this.id) == false) {
        communicationPanel.textContent ='You must use an operator after factorial';
        return;
        }
    }
    else if (checkPredecessor() == false && (operatorArray.includes(this.id)|| this.id == 'factorialBtn' || this.id == 'powerOfBtn')) {
        communicationPanel.textContent ='You must first put a number before Operator';
        return;
    }


    switch (this.id){
        case 'Btn1':
        displayNumber += '1';
        break;
        case 'Btn2':
        displayNumber += '2';
        break;
        case 'Btn3':
        displayNumber += '3';
        break;
        case 'Btn4':
        displayNumber += '4';
        break;
        case 'Btn5':
        displayNumber += '5';
        break;
        case 'Btn6':
        displayNumber += '6';
        break;
        case 'Btn7':
        displayNumber += '7';
        break;
        case 'Btn8':
        displayNumber += '8';
        break;
        case 'Btn9':
        displayNumber += '9';
        break;
        case 'Btn0':
        displayNumber += '0';
        break;
        case 'cancel':
        backspaceFunction();
        break;
        case 'pointBtn':
        if (checkDecimal() == true){
            return;
        }
        displayNumber += '.';
        break;
        case 'addBtn':
        displayNumber += ' + ';
        rawData += displayNumber;
        resetDisplay();
        break;
        case 'subtractBtn':
        displayNumber += ' - ';
        rawData += displayNumber;
        resetDisplay();
        break;
        case 'multiplyBtn':
        displayNumber += ' x ';
        rawData += displayNumber;
        resetDisplay();
        break;
        case 'divideBtn':
        displayNumber += ' ÷ ';
        rawData += displayNumber;
        resetDisplay();
        break;
        case 'powerOfBtn':
        if (checkPredecessorOperator() == true ) {
            return;
        }
        displayNumber += '^';
        break;
        case 'factorialBtn':
        if (checkPredecessorOperator() == true || checkDecimal() == true ) {
            return;
        }
        displayNumber += '!';
        rawData += displayNumber;
        resetDisplay();
        break;
        case 'changeSignBtn' :
        changeSign();
        break;
        case 'resultBtn':
        if (checkValidEquation()== false){
            return;
        }
        rawData += displayNumber;
        copyRawData();
        break;
        case 'ACBtn':
        reset();
        break;
        
    }
    
    displayInput();
    displayRawData();
}

function checkFactorial () {
    let rawDataArray = rawData.split('');
    lastItem = rawDataArray.pop('') ;
    if (lastItem == '!'){
        return true;
    } else {
        return false;
    }
}

function checkPredecessor() {
    if (lowDisplay.textContent.length > 0) {
        return true;
    } else {
        return false;
    }

}

function checkValidEquation(){
    let displayNumberArray = displayNumber.split('');
    let lastItem = displayNumberArray.pop();

    if (operatorArray.includes(lastItem) || lastItem == '^') {
        communicationPanel.textContent = "No valid equation";
        return false;
    }
}

function checkPredecessorOperator() {

    let displayNumberArray = displayNumber.split('');
    let lastItem = displayNumberArray.pop();
    if (lastItem == '!' || lastItem == '^') {
        communicationPanel.textContent ='You must first put a number before factorial / exponent';
        return true;
    }
}

function checkDecimal () {
    
    let displayNumberArray = displayNumber.split('');
    
    if (displayNumberArray.includes('.')){
        communicationPanel.textContent = 'You cannot have 2 decimalpoints or a decimal and factorial'
        return true;
    }
}


function changeSign() {

    if(displayNumber.match(/\-/)){
        let displayArray = displayNumber.split('');
        displayArray.shift();
        displayNumber = displayArray.join('');
    } else {
        let displayArray = displayNumber.split('');
        displayArray.unshift('-');
        displayNumber = displayArray.join('');
    }

}

function backspaceFunction() {
    if (displayNumber.length >= 1) {
        let displayArray = displayNumber.split('');
        displayArray.pop();
        displayNumber = displayArray.join('');
        
    } else {
        let rawDataArray = rawData.split('');
        if (rawDataArray.length >= 1 && rawDataArray[rawDataArray.length-1].match(/\s/)) {
            rawDataArray.pop();
            rawDataArray.pop();
            rawDataArray.pop();
        } else {
            rawDataArray.pop();
        }
        rawData = rawDataArray.join('');
    }
}

function checkResult () {
    if (lowDisplay.textContent == rawDataResult){
        if (operatorArray.includes(inputVariable)) {
        
        rawData = rawDataResult;
        rawDataResult = null;
         resetDisplay();
        } else if (otherOperatorArray.includes(inputVariable)) {
        displayNumber = rawDataResult;
        rawDataResult = null;
        } else {
        rawDataResult = null;
        rawData = '';
        resetDisplay();
        }   
}
}

function copyRawData () {
    rawDataResult = rawData;
    rawDataOld = rawData;
    rawData = '';
    calculateResult();
}

function calculateResult () {
   
    if (rawDataResult.match(factorialRegExp)){
        rawDataFactorial();
    }
    else if (rawDataResult.match (exponentRegExp)){
        rawDataPowerOf();
    }
    else if (rawDataResult.match (multiplyOrDivideRegExp)) {
        rawDataMultiplyOrDivide();
    } 
    else if ( rawDataResult.match (plusOrMinusRegExp)) {
        rawDataAddOrSubtract();
    } 
    else {
    displayNumber = rawDataResult;
    return rawDataResult;
    }
}

function rawDataFactorial() {
    let factorialRegExp2 = /[\d]+(\.?)[\d]*[\!]/;
    let factorialMatch = rawDataResult.match(factorialRegExp2)[0];
    let factorialNumber = Number(factorialMatch.match(numberRegExp)[0]);
    let factorialResult = factorial(factorialNumber);
    rawDataResult = factorialRegExp2[Symbol.replace](rawDataResult, factorialResult);
    calculateResult();
}

function rawDataPowerOf () {
    let powerOfRegExp = /(\-?)[\d]+(\.?)[\d]*[\^][\d]+(\.?)[\d]*/;
    let powerOfMatch = rawDataResult.match(powerOfRegExp)[0];
    let firstNumber = Number(powerOfMatch.match(numberRegExp)[0]);
    let secondNumber = Number(powerOfMatch.match(numberRegExp)[1]);

    let ExponantiationResult = Exponentiation(firstNumber, secondNumber);
    rawDataResult = powerOfRegExp[Symbol.replace](rawDataResult, ExponantiationResult);
    calculateResult();
}

function rawDataMultiplyOrDivide () {
    let multiplicationDivisionRegExp = /(\-?)[\d]+(\.?)[\d]*[\s][\x|\÷][\s](\-?)[\d]+(\.?)[\d]*/;
    let multiplicationDivisionMatch = rawDataResult.match (multiplicationDivisionRegExp)[0];
    let isMultiplicationOrDivision = multiplicationDivisionMatch.match(multiplyOrDivideRegExp)[0];
    let firstNumber = Number(multiplicationDivisionMatch.match(numberRegExp)[0]);
    let secondNumber = Number(multiplicationDivisionMatch.match(numberRegExp)[1]);

    if (isMultiplicationOrDivision == ' x ') {
        let MultiplicationResult = multiply(firstNumber, secondNumber);
        rawDataResult = multiplicationDivisionRegExp[Symbol.replace](rawDataResult, MultiplicationResult);
    } else if (isMultiplicationOrDivision == ' ÷ ') {
        let DivisionResult = divide(firstNumber, secondNumber);
        rawDataResult = multiplicationDivisionRegExp[Symbol.replace](rawDataResult, DivisionResult);
    }
     calculateResult();
}

function rawDataAddOrSubtract () {
    const AdditionOrSubtractionRegExp = /(\-?)[\d]+(\.?)[\d]*[\s][\+|\-][\s](\-?)[\d]+(\.?)[\d]*/;
    let AdditionOrSubtractionMatch = rawDataResult.match(AdditionOrSubtractionRegExp)[0];
    let isPlusOrMinusSign = AdditionOrSubtractionMatch.match(plusOrMinusRegExp)[0];
    let firstNumber = Number(AdditionOrSubtractionMatch.match(numberRegExp)[0]);
    let secondNumber = Number(AdditionOrSubtractionMatch.match(numberRegExp)[1]);
    if (isPlusOrMinusSign == ' + ' ) {
        let additionResult = add(firstNumber, secondNumber);
        rawDataResult = AdditionOrSubtractionRegExp[Symbol.replace](rawDataResult, additionResult);
        
    } else if (isPlusOrMinusSign == ' - ') {
        let subtractionResult = subtract(firstNumber, secondNumber);
        rawDataResult = AdditionOrSubtractionRegExp[Symbol.replace](rawDataResult, subtractionResult);
    }
    calculateResult();
}

function displayInput () {
    if (rawDataResult != null) {
        lowDisplay.textContent = rawDataResult;
        displayNumber = rawDataResult;
    } else {
        lowDisplay.textContent = displayNumber;
    }
}

function displayRawData() {
    if (rawDataResult != null){
    upDisplay.textContent = rawDataOld;}
    else {
        upDisplay.textContent = rawData;
    }


}

function resetDisplay () {
    displayNumber = '';
}

function reset () {
    displayNumber = '';
    rawData = '';
    rawDataResult = null;
}

function add (Augend, Addend) {
    return Augend+Addend;
}

function subtract (Minuend, Subtrahend) {
    return Minuend-Subtrahend;
}

function multiply (Multiplicand, Multiplier) {
    return Multiplicand*Multiplier; 
}

function divide (Dividend, Divisor) {
    return Dividend / Divisor;
}

function Exponentiation (Base, Exponent) {
    
    let firstNumber = Base;
    let result = 0
    let x = Base;

    for (let i = 1; i < Exponent; i++ ){
        x  = x*Base;
        result = x; 
    }

    return result;
}

function factorial (number) {
let x = number; 
let result = 0;

if (number == 1){
    result = 1;
}
    else for (let i=1; i < number; i++){
        x = x*(number-i);
        result = x;
    }

    return result;
}


// Evenet Listener
buttons.forEach ( button => 
    button.addEventListener ('click', Input));
