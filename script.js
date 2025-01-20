function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Cannot divide by zero";
    }
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '/':
            return divide(a, b);
        case '*':
            return multiply(a, b);
        default:
            return "Invalid operator";
    }
}

class Calculator {
    constructor(displayElement) {
        this.display = displayElement;
        this.firstNumber = '';
        this.operator = '';
        this.secondNumber = '';
        this.isResultDisplayed = false;
    }

    updateDisplay(value) {
        this.display.value = value;
    }

    handleNumberClick(number) {
        if (this.isResultDisplayed) {
            this.firstNumber = '';
            this.isResultDisplayed = false;
        }

        if (!this.operator) {
            this.firstNumber += number;
            this.updateDisplay(this.firstNumber);
        } else {
            this.secondNumber += number;
            this.updateDisplay(this.secondNumber);
        }
    }

    handleOperatorClick(op) {
        if (this.firstNumber && !this.secondNumber) {
            this.operator = op;
        } else if (this.firstNumber && this.secondNumber) {
            this.calculateResult();
            this.operator = op;
        }
    }

    handleDecimalClick() {
        if (this.isResultDisplayed) {
            this.firstNumber = '0';
            this.isResultDisplayed = false;
        }

        const currentNumber = !this.operator ? this.firstNumber : this.secondNumber;
        if (!currentNumber.includes('.')) {
            const numberToUpdate = !this.operator ? 'firstNumber' : 'secondNumber';
            this[numberToUpdate] = currentNumber === '' ? '0.' : currentNumber + '.';
            this.updateDisplay(this[numberToUpdate]);
        }
    }

    calculateResult() {
        if (this.firstNumber && this.secondNumber && this.operator) {
            const result = operate(this.operator, parseFloat(this.firstNumber), parseFloat(this.secondNumber));
            this.updateDisplay(result);
            this.firstNumber = result.toString();
            this.secondNumber = '';
            this.operator = '';
            this.isResultDisplayed = true;
        }
    }

    clear() {
        this.firstNumber = '';
        this.secondNumber = '';
        this.operator = '';
        this.updateDisplay('0');
        this.isResultDisplayed = false;
    }
}

// Initialize calculator
const calculator = new Calculator(document.getElementById('display'));

// Event listeners
document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;
        
        if (/\d/.test(buttonText)) {
            calculator.handleNumberClick(buttonText);
        } else if (['+', '-', '*', '/'].includes(buttonText)) {
            calculator.handleOperatorClick(buttonText);
        } else if (buttonText === '.') {
            calculator.handleDecimalClick();
        } else if (buttonText === '=') {
            calculator.calculateResult();
        } else if (buttonText === 'C') {
            calculator.clear();
        }
    });
});