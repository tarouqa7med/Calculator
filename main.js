// let coverBlur = document.getElementById("closure");
// let on = document.getElementById("on");
// let off = document.getElementById("off");
// let screen = document.getElementById("screen");
// let btnbtn = document.querySelectorAll(".table div button");

// let isOn = false;
// let ans = 0;
// let expression = "";

// // ----------- On / Off -----------

// function turnOff() {
//     isOn = false;
//     coverBlur.style.display = "flex";
//     on.style.cursor = "pointer";
//     on.style.opacity = "1";
//     off.style.cursor = "auto";
//     off.style.opacity = "0";
//     screen.value = "0";
//     screen.style.backgroundColor = "black";
//     document.querySelector("img").style.transform = "translate(50%, -50%)";
//     document.querySelector("input").style.transitionDelay = "0ms";
//     document.querySelector("img").style.transitionDelay = "250ms";
// }

// function turnOn() {
//     isOn = true;
//     coverBlur.style.display = "none";
//     on.style.cursor = "auto";
//     on.style.opacity = "0";
//     off.style.cursor = "pointer";
//     off.style.opacity = "1";
//     screen.value = "0";
//     screen.style.backgroundColor = "rgb(255, 238, 218)";
//     document.querySelector("img").style.transform = "translate(50%, 50%)";
//     document.querySelector("img").style.transitionDelay = "100ms";
//     document.getElementById("closure").style.transitionDelay = "500ms";
//     document.querySelector("input").style.transitionDelay = "850ms";
//     expression = "0";
// }

// // ----------- إدخال أرقام وحروف -----------

// function enterChar(char) {
//     if (!isOn) return;
//     if (screen.value === "0") {
//         screen.value = "";
//         expression = "";
//     }
//     screen.value += char;
//     expression += char;
// }

// function enterNum(insert) {
//     if (!isOn) return;
//     if (insert === "π") insert = "3.14";
//     if (screen.value === "0") {
//         screen.value = insert;
//         expression = insert;
//     } else {
//         screen.value += insert;
//         expression += insert;
//     }
// }

// function enterOperator(op) {
//     if (!isOn) return;
//     if (sؤreen.value === "" || screen.value === "0") return;
//     let lastChar = screen.value.slice(-1);
//     if ("+-*/^".includes(lastChar)) {
//         screen.value = screen.value.slice(0, -1) + op;
//         expression = expression.slice(0, -1) + op;
//     } else {
//         screen.value += op;
//         expression += op;
//     }
// }

// // ----------- Delete و Clear -----------

// function dElEtE() {
//     if (!isOn) return;
//     if (screen.value.length === 1) {
//         screen.value = "0";
//         expression = "0";
//     } else {
//         screen.value = screen.value.slice(0, -1);
//         expression = expression.slice(0, -1);
//         if (screen.value === "") {
//             screen.value = "0";
//             expression = "0";
//         }
//     }
// }

// function clearScreen() {
//     if (!isOn) return;
//     screen.value = "0";
//     expression = "0";
// }

// // ----------- Ans كضرب فوراً -----------

// function getAns() {
//     if (!isOn) return;
//     let current = Number(screen.value);
//     let result = current * ans; // multiply directly
//     screen.value = result;
//     expression = result.toString();
//     ans = result;
// }

// // ----------- Factorial -----------

// function factorial(n) {
//     if (n < 0 || !Number.isInteger(n)) return "undefined";
//     let f = 1;
//     for (let i = 1; i <= n; i++) f *= i;
//     return f;
// }

// function calcFactorial() {
//     if (!isOn) return;
//     let n = Number(screen.value);
//     let result = factorial(n);
//     screen.value = result;
//     expression = result.toString();
//     ans = result;
// }

// // ----------- الحساب -----------

// function calculate() {
//     if (!isOn) return;
//     try {
//         let exp = expression;

//         // رقم فقط
//         if (!/[+\-*/^]/.test(exp)) {
//             ans = Number(exp);
//             screen.value = ans;
//             return;
//         }

//         // تحويل ^ إلى **
//         exp = exp.replace(/\^/g, "**");

//         let result = eval(exp);

//         if (!isFinite(result)) {
//             screen.value = "undefined";
//             expression = "";
//             return;
//         }

//         ans = result;
//         screen.value = result;
//         expression = result.toString();
//     } catch {
//         screen.value = "undefined";
//         expression = "";
//     }
// }

// // ----------- Keyboard Support -----------

// document.addEventListener("keydown", function (e) {
//     if (!isOn) return;
//     if (!isNaN(e.key)) enterNum(e.key);
//     if ("+-*/^".includes(e.key)) enterOperator(e.key);
//     if (e.key === "Enter") calculate();
//     if (e.key === "Backspace") dElEtE();
//     if (e.key === ".") enterChar(".");
// });

let coverBlur = document.getElementById("closure");
let on = document.getElementById("on");
let off = document.getElementById("off");
let screen = document.getElementById("screen");
let btnbtn = document.querySelectorAll(".table div button");

let calcState = {
    operand1: null,
    operand2: null,
    operator: null,
    display: "0",
    lastPressedEquals: false,
    stack: [],
    ans: "0",
    modeENG: false,
    isOn: false,
};

// ----------- On / Off -----------
function turnOff() {
    calcState.isOn = false;
    coverBlur.style.display = "flex";
    on.style.cursor = "pointer";
    on.style.opacity = "1";
    off.style.cursor = "auto";
    off.style.opacity = "0";
    screen.value = "0";
    screen.style.backgroundColor = "black";
    document.querySelector("img").style.transform = "translate(50%, -50%)";
    document.querySelector("input").style.transitionDelay = "0ms";
    document.querySelector("img").style.transitionDelay = "250ms";
}

function turnOn() {
    calcState.isOn = true;
    coverBlur.style.display = "none";
    on.style.cursor = "auto";
    on.style.opacity = "0";
    off.style.cursor = "pointer";
    off.style.opacity = "1";
    screen.value = "0";
    screen.style.backgroundColor = "rgb(255, 238, 218)";
    document.querySelector("img").style.transform = "translate(50%, 50%)";
    document.querySelector("img").style.transitionDelay = "100ms";
    document.getElementById("closure").style.transitionDelay = "500ms";
    document.querySelector("input").style.transitionDelay = "850ms";
    calcState.operand1 = null;
    calcState.operand2 = null;
    calcState.operator = null;
    calcState.display = "0";
    calcState.lastPressedEquals = false;
    calcState.stack = [];
    calcState.ans = "0";
    calcState.modeENG = false;
}

// ----------- إدخال أرقام وحروف -----------
function enterChar(char) {
    if (!calcState.isOn) return;
    if (screen.value === "0") {
        screen.value = "";
        calcState.display = "";
        calcState.operand1 = null;
        calcState.operand2 = null;
        calcState.operator = null;
    }
    screen.value += char;
    if (calcState.operator === null) {
        calcState.operand1 = screen.value;
    } else {
        calcState.operand2 = screen.value;
    }
}

function enterNum(insert) {
    if (!calcState.isOn) return;
    if (insert === "π") insert = "3.14";
    if (screen.value === "0") {
        screen.value = insert;
        if (calcState.operator === null) calcState.operand1 = insert;
        else calcState.operand2 = insert;
    } else {
        screen.value += insert;
        if (calcState.operator === null) calcState.operand1 += insert;
        else calcState.operand2 += insert;
    }
}

function enterOperator(op) {
    if (!calcState.isOn) return;
    if (screen.value === "" || screen.value === "0") return;
    let lastChar = screen.value.slice(-1);
    if ("+-*/^".includes(lastChar)) {
        screen.value = screen.value.slice(0, -1) + op;
        if (calcState.operator) {
            calcState.operator = op;
        } else {
            calcState.operator = op;
        }
    } else {
        screen.value += op;
        calcState.operator = op;
    }
}

// ----------- Delete و Clear -----------
function dElEtE() {
    if (!calcState.isOn) return;
    if (screen.value.length === 1) {
        screen.value = "0";
        calcState.operand1 = null;
        calcState.operand2 = null;
        calcState.operator = null;
    } else {
        screen.value = screen.value.slice(0, -1);
        if (calcState.operator && calcState.operand2) {
            calcState.operand2 = screen.value;
        } else {
            calcState.operand1 = screen.value;
        }
    }
}

function clearScreen() {
    if (!calcState.isOn) return;
    screen.value = "0";
    calcState.operand1 = null;
    calcState.operand2 = null;
    calcState.operator = null;
    calcState.display = "0";
}

// ----------- Ans كضرب فوراً -----------
function getAns() {
    if (!calcState.isOn) return;
    let current = Number(screen.value);
    let result = current * Number(calcState.ans);
    screen.value = result;
    calcState.display = result.toString();
    if (calcState.operator === null) calcState.operand1 = result.toString();
    else calcState.operand2 = result.toString();
    calcState.ans = result.toString();
}

// ----------- Factorial -----------
function factorial(n) {
    if (n < 0 || !Number.isInteger(n)) return "undefined";
    let f = 1;
    for (let i = 1; i <= n; i++) f *= i;
    return f;
}

function calcFactorial() {
    if (!calcState.isOn) return;
    let n = Number(screen.value);
    let result = factorial(n);
    screen.value = result;
    calcState.display = result.toString();
    if (calcState.operator === null) calcState.operand1 = result.toString();
    else calcState.operand2 = result.toString();
    calcState.ans = result.toString();
}

// ----------- الحساب -----------
function calculate() {
    if (!calcState.isOn) return;
    let a = parseFloat(calcState.operand1);
    let b = parseFloat(calcState.operand2 || calcState.operand1);
    let result;
    switch (calcState.operator) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = a - b;
            break;
        case "*":
            result = a * b;
            break;
        case "/":
            if (b === 0) {
                screen.value = "Error";
                return;
            }
            result = a / b;
            break;
        case "^":
            result = Math.pow(a, b);
            break;
        case "!":
            result = calcFactorial();
        default:
            result = b;
            break;
    }
    screen.value = result;
    calcState.display = result.toString();
    calcState.ans = result.toString();
    calcState.operand1 = result.toString();
    calcState.operand2 = null;
    calcState.operator = null;
}

// ----------- Keyboard Support -----------
document.addEventListener("keydown", function (e) {
    if (!calcState.isOn) {
        return;
    }
    if (!isNaN(e.key)) enterNum(e.key);
    if ("+-*/^".includes(e.key)) enterOperator(e.key);
    if (e.key === "Enter") calculate();
    if (e.key === "Backspace") dElEtE();
    if (e.key === ".") enterChar(".");
});
