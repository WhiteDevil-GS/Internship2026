// Take user input
let num1 = Number(prompt("Enter first number:"));
let num2 = Number(prompt("Enter second number:"));
let operator = prompt("Enter operator (+, -, *, /, %):");

// Calculator logic
function calculate(a, b, op) {
    switch(op) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            if (b === 0) {
                return "Error: Division by zero is not allowed.";
            }
            return a / b;
        case "%":
            return a % b;
        default:
            return "Invalid operator!";
    }
}

// Display result
let result = calculate(num1, num2, operator);
console.log("Result:", result);