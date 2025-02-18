const input = document.getElementById("calc-input");
const operatorCollection = document.querySelectorAll(".operator-feat");
const numberCollection = document.querySelectorAll(".number-feat");
const features = document.querySelectorAll(".adv-feat");


let inputExpression = [];
let isResult = false;
const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '^': (a, b) => a ^ b
};

function mathOperator(operator) {
    console.log("operator: ", operator)
    if (operator === "+") return "+"
    else if (operator === "-") return "-"
    else if (operator === "x") return "*"
    else if (operator === "➗") return "/"
    else if (operator === "^") return "^"
}

function evaluateExpression(expressionArray) {
    if (typeof expressionArray[evaluateExpression.length - 1] !== "number") {
        expressionArray = expressionArray[evaluateExpression.length - 2]
    }
    let num1;
    let num2;
    let operator = "";
    let numConcat = ""
    for (let i = 0; i < expressionArray.length; i++) {

        if (typeof expressionArray[i] === "number") {
            numConcat += expressionArray[i];

            if (num1 !== undefined && num2 === undefined && typeof expressionArray[i + 1] !== "number") {
                num2 = Number(numConcat);
                console.log(operator)
                let op = mathOperator(operator)
                console.log({ op, num1, num2 })
                numConcat = operators[op](num1, num2);
                operator = "";
                num2 = undefined
            }
        }
        else if ((typeof expressionArray[expressionArray.length - 1] === "number") && typeof expressionArray[i] !== "number") {
            num1 = Number(numConcat);
            operator += expressionArray[i];
            numConcat = "";
        }

    }
    return Number(numConcat)
}

numberCollection.forEach(number => {
    number.addEventListener("click", () => {
      
        if (isResult) {
            inputExpression = [];
            input.value = inputExpression.join("");
            isResult = false
        }

        inputExpression.push(Number(number.innerText));
        input.value = inputExpression.join("");
    })
});

operatorCollection.forEach(operator => {

    operator.addEventListener("click", () => {

        if (inputExpression.length > 0) {


            isResult = false

            if (typeof inputExpression[inputExpression.length - 1] === "number") {
                inputExpression.push(operator.innerText);
                input.value = inputExpression.join("")
            }
            else {
                inputExpression[inputExpression.length - 1] = operator.innerText
                input.value = inputExpression.join("")
            }

        }
    })
});

features.forEach((feature) => {
    feature.addEventListener("click", () => {
        if (feature.innerText === "AC") {
            inputExpression = [];
            input.value = ""
        }
        if (feature.innerText === "Back") {
            inputExpression.pop();
            input.value = inputExpression.join("")
        }
        if (feature.innerText === ".") {
            inputExpression.push(feature.innerText.trim());
            input.value = inputExpression.join("")
        }
        if (feature.innerText === "=") {
            console.log(inputExpression);
            const result = evaluateExpression(inputExpression);
            inputExpression = [];
            inputExpression.push(result)
            input.value = inputExpression
            isResult = true;

        }
    })
})


