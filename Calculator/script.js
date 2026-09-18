
// --------------------
// Math functions
// --------------------

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
    return a / b;
}


// --------------------
// Operate function
// --------------------

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);

        case "-":
            return subtract(a, b);

        case "*":
            return multiply(a, b);

        case "/":
            return divide(a, b);
    }
}


// --------------------
// Variables
// --------------------

let firstNumber = null;
let secondNumber = null;
let operator = null;

let currentNumber = "";

let shouldResetDisplay = false;


// --------------------
// DOM elements
// --------------------

const display = document.querySelector("#display");

const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");

const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector("#clear");


// --------------------
// Display function
// --------------------

function updateDisplay() {
    if (firstNumber !== null && operator !== null) {
        display.textContent = `${firstNumber} ${operator} ${currentNumber}`;
    } else {
        display.textContent = currentNumber || "0";
    }
}


// --------------------
// Digit buttons
// --------------------

digitButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // If a result was just displayed,
        // start a new calculation
        if (shouldResetDisplay) {
            currentNumber = "";
            shouldResetDisplay = false;
        }

        currentNumber += button.textContent;

        updateDisplay();

    });

});


// --------------------
// Operator buttons
// --------------------

operatorButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedOperator = button.textContent;

        // Convert display symbols into
        // the symbols used by operate()
        let actualOperator;

        if (selectedOperator === "×") {
            actualOperator = "*";
        } else if (selectedOperator === "÷") {
            actualOperator = "/";
        } else if (selectedOperator === "−") {
            actualOperator = "-";
        } else {
            actualOperator = selectedOperator;
        }


        // If no number has been entered,
        // don't do anything
        if (currentNumber === "" && firstNumber === null) {
            return;
        }


        // If a result was just displayed,
        // allow the user to continue with it
        if (shouldResetDisplay) {
            shouldResetDisplay = false;
        }


        // If an operator already exists
        // AND a second number has been entered,
        // calculate the previous operation
        if (operator !== null && currentNumber !== "") {

            secondNumber = Number(currentNumber);

            firstNumber = operate(
                operator,
                firstNumber,
                secondNumber
            );

            // Round long decimals
            firstNumber = Math.round(firstNumber * 100000000) / 100000000;

            currentNumber = String(firstNumber);
        }


        // Store the first number
        if (firstNumber === null) {
            firstNumber = Number(currentNumber);
        }


        // Store the selected operator
        operator = actualOperator;

        // Prepare for the next number
        currentNumber = "";

        // Show the equation
        updateDisplay();

    });

});


// --------------------
// Equals button
// --------------------

equalsButton.addEventListener("click", function () {

    // Make sure we have all three values
    if (
        firstNumber === null ||
        operator === null ||
        currentNumber === ""
    ) {
        return;
    }


    secondNumber = Number(currentNumber);


    // Divide by zero
    if (operator === "/" && secondNumber === 0) {
        currentNumber = "Nice try 😏";

        // Clear the equation
        firstNumber = null;
        secondNumber = null;
        operator = null;

        updateDisplay();

        return;
    }


    // Perform the calculation
    let result = operate(
        operator,
        firstNumber,
        secondNumber
    );


    // Round long decimals
    result = Math.round(result * 100000000) / 100000000;


    // Display ONLY the result
    currentNumber = String(result);

    // Clear the equation BEFORE updating the display
    firstNumber = null;
    secondNumber = null;
    operator = null;

    updateDisplay();

    // Next digit starts a new calculation
    shouldResetDisplay = true;

});


// --------------------
// Clear button
// --------------------

clearButton.addEventListener("click", function () {

    firstNumber = null;
    secondNumber = null;
    operator = null;

    currentNumber = "";

    shouldResetDisplay = false;

    updateDisplay();

});

