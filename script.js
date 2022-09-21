const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = "0";
let firstValue = null;
let operator = null;
let percent = "%";
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay() {
  display.value = displayValue;
}

keys.addEventListener("click", function (e) {
  const element = e.target;
  if (!element.matches("button")) return;
  if (element.classList.contains("operator")) {
    //console.log("operator", element.value);
    handleOperator(element.value);
    updateDisplay();
    return;
  }
  if (element.classList.contains("decimal")) {
    //console.log("decimal", element.value);
    inputDecimal();
    updateDisplay();
    return;
  }
  if (element.classList.contains("clear")) {
    //console.log("clear", element.value);
    clear();
    updateDisplay();
    return;
  }
  if (element.classList.contains("percent")) {
    //console.log("percent", element.value);
    calcPercent();
    console.log("test");
    updateDisplay();
    return;
  }

  //console.log("number", element.value);
  inputNumber(element.value);
  updateDisplay();
});
function handleOperator(nextOperator) {
  const value = parseFloat(displayValue);
  if (operator && waitingForSecondValue) {
    operator = nextOperator;
    return;
  }
  if (firstValue === null) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);

    displayValue = `${parseFloat(result.toFixed(7))}`;

    firstValue = result;
  }
  waitingForSecondValue = true;
  operator = nextOperator;
  //console.log(displayValue, firstValue, waitingForSecondValue, operator);
}
function calcPercent(first, second) {
  return (first / 100) * second;
}

function calculate(first, second, operator) {
  if (operator === "+") {
    return first + second;
  } else if (operator === "-") {
    return first - second;
  } else if (operator === "*") return first * second;
  else if (operator === "/") {
    return first / second;
  } else if (operator === "%") {
    return (first / 100) * second;
  } else return second;
}

function inputNumber(num) {
  if (waitingForSecondValue) {
    displayValue = num;
    waitingForSecondValue = false;
  } else {
    displayValue = displayValue === "0" ? num : displayValue + num;
  }
}
function inputDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}
function clear() {
  displayValue = "0";
}
