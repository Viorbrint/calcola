let btns = document.querySelectorAll(".calc-btn");

let operandChars = "1234567890.";

let numsBtns = Array.from(btns).filter(btn => operandChars.includes(btn.textContent));

let operatorChars = "+-x/";

let operatorBtns = Array.from(btns).filter(btn => operatorChars.includes(btn.textContent));

let equalBtn = Array.from(btns).find(btn => btn.textContent === "=");

let cancelBtn = Array.from(btns).find(btn => btn.textContent === "AC");

let displayBtn = Array.from(btns).find(btn => btn.textContent === "#");

let display = displayBtn.children[0];

let displayWidth = display.offsetWidth;

const LENGTH_DIVIDE = 14;
const MAX_LENGTH = Math.floor(displayWidth / LENGTH_DIVIDE);

let a;
let opClicked;
let operator;

reset("0");
cancelBtn.onclick = reset.bind(null, "0");

numsBtns.forEach(btn => btn.onclick = () => {
  if(display.textContent === "0" || opClicked) {
    display.textContent = "";
  }

  let num = btn.textContent;
  opClicked = false;

  if(display.textContent.length < MAX_LENGTH) {
    display.textContent += num;
  }
});

operatorBtns.forEach(btn => btn.onclick = () => {
  if(opClicked) {
    operator = btn.textContent;
    return;
  }
  
  calculate();

  operator = btn.textContent;
});

equalBtn.onclick = () => {
  calculate();
}

displayBtn.onclick = () => {
  if(isFinite(+display.textContent)) {
    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
    if(display.textContent == "") {
      display.textContent = "0";
    }
  }
}

function reset(message) {
  display.textContent = message;

  a = 0;
  opClicked = true;
  operator = "+";
}

function calculate() {
  opClicked = true;
  let b = +display.textContent;
  
  switch (operator) {
    case "+":
      display.textContent = a + b;
      a += b;
      break;
    case "-":
      display.textContent = a - b;
      a -= b;
      break;
    case "x":
      display.textContent = a * b;
      a *= b;
      break;
    case "/":
      if(b == 0) {
        reset("Error");
        return;
      }
      display.textContent = a / b;
      a /= b;
      break;
  }
  display.textContent = limitNumber(display.textContent);
}

function limitNumber(num) {
  if(num.length <= MAX_LENGTH) {
    return num;
  }
  let intLen = num.indexOf('.');
  let realLen = num.length - intLen - 1;
  if(intLen === -1) {
    intLen = num.length;
    realLen = 0;
  }

  if((intLen > MAX_LENGTH - 2 && realLen > 0) || intLen > MAX_LENGTH && realLen == 0) {
    reset("Num is too big!");
    return "Num is too big!";
  }
  else {
    return (+num).toFixed(MAX_LENGTH - intLen - 1);
  }
}