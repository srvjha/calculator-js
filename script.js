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
    '^': (a, b) => Math.pow(a, b),
    '.':(a, b) => `${a}.${b}`,
    '%': (a, b) => (a / 100) * b
};

function mathOperator(operator) {
    //console.log("operator: ", operator)
    if (operator === "+") return "+"
    else if (operator === "-") return "-"
    else if (operator === "x") return "*"
    else if (operator === "➗") return "/"
    else if (operator === "^") return "^"
    else if (operator === ".") return "."
    else if (operator === "%") return "%"
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

        if (typeof expressionArray[i] === "number" || expressionArray[i] === ".") {
            numConcat += expressionArray[i];

            if ((num1 !== undefined && num2 === undefined) && (typeof expressionArray[i + 1] !== "number" && expressionArray[i + 1] !== ".")) {
                num2 = Number(numConcat);
                //console.log(operator)
                let op = mathOperator(operator)
               //console.log({ op, num1, num2 })
                numConcat = operators[op](num1, num2);
               // console.log({numConcat})
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
        //console.log("before: ",inputExpression)
        inputExpression.push(Number(number.innerText));
        //console.log("after: ",inputExpression)
        input.value = inputExpression.join("");
    })
});

operatorCollection.forEach(operator => {

    operator.addEventListener("click", () => {
        //console.log("idhr hai hum", inputExpression)

        if (inputExpression.length > 0 || inputExpression[1]!==(".")) {
            //console.log(inputExpression[1])


            if (typeof inputExpression[inputExpression.length - 1] === "number") {
                inputExpression.push(operator.innerText);
                input.value = inputExpression.join("")
                isResult = false
            }
            else {
                if(inputExpression[inputExpression.length - 1] !== "." ){
                    //console.log("input: ",inputExpression[inputExpression.length - 1])
                    inputExpression[inputExpression.length - 1] = operator.innerText
                    input.value = inputExpression.join("")
                }
              
            }

        }
    })
});

features.forEach((feature) => {
   
    feature.addEventListener("click", () => {
        //console.log(feature.value)
        if (feature.innerText === "AC") {
            inputExpression = [];
            input.value = ""
        }
        if (feature.value=== "back") {
            inputExpression.pop();
            input.value = inputExpression.join("")
        }
        if (feature.innerText === ".") {
            if (
                inputExpression.length === 0 || 
               ( typeof inputExpression[inputExpression.length - 1] !== "number" &&
                inputExpression[inputExpression.length - 1] !==".")
            ) {
                inputExpression.push(0, feature.innerText.trim());
            } else {
               
                let lastNum = "";
                for (let i = inputExpression.length - 1; i >= 0; i--) {
                    if (typeof inputExpression[i] !== "number" && inputExpression[i] !== ".") {
                        break;
                    }
                    lastNum = inputExpression[i] + lastNum;
                }
        
              
                if (!lastNum.includes(".")) {
                    inputExpression.push(feature.innerText.trim());
                }
            }
        
            input.value = inputExpression.join("");
        }
        
        if (feature.innerText === "=") {
            //console.log(inputExpression);
            const result = evaluateExpression(inputExpression);
            inputExpression = [];
            inputExpression.push(Number(result.toFixed(2)))
            //console.log(typeof result)
            input.value = inputExpression
            isResult = true;

        }
    })
})


