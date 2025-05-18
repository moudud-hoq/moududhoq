function calculate() {
    // Get the input values
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;
    let output;

    // Condition message
    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('output').textContent = "Please enter your accurate number";
        return;
    }

    // Calculation based on operation
    switch (operation) {
        case "add":
            output = num1 + num2;
            break;

        case "subtract":
            output = num1 - num2;
            break;

        case "multiply":
            output = num1 * num2;
            break;

        case "divide":
            if (num2 === 0) {
                document.getElementById('output').textContent = "Cannot divide by zero";
                return;
            }

            output = num1 / num2;
            break;
        default:

            // Handle invalid operation
            output = "Invalid";
    }

    // Display the result
    document.getElementById('output').textContent = `Output: ${output}`;

}