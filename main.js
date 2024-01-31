let btns = document.querySelectorAll(".calc-btn");

let operandChars = "1234567890.";

let numsBtns = Array.from(btns).filter(btn => operandChars.includes(btn.textContent));

let operatorChars = "+-x/";

let operatorBtns = Array.from(btns).filter(btn => operatorChars.includes(btn.textContent));

let equalBtn = Array.from(btns).find(btn => btn.textContent === "=");

let cancelBtn = Array.from(btns).find(btn => btn.textContent === "AC");

let display = Array.from(btns).find(btn => btn.textContent === "#");

display = display.children[0];


display.textContent = "0";
let a = 0;
let opClicked = true;
let operator = "+";

numsBtns.forEach(btn => btn.onclick = () => {
  if(display.textContent === "0" || opClicked) {
    display.textContent = "";
  }
  let num = btn.textContent;
  display.textContent += num;
  opClicked = false;
});

cancelBtn.onclick = () => {
  display.textContent = "0";
}


operatorBtns.forEach(btn => btn.onclick = () => {
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
    case "*":
      display.textContent = a * b;
      a *= b;
      break;
    case "/":
      display.textContent = a / b;
      a /= b;
      break;
    default:
      break;
  }

  operator = btn.textContent;
});

equalBtn.onclick = () => {
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
    case "*":
      display.textContent = a * b;
      a *= b;
      break;
    case "/":
      display.textContent = a / b;
      a /= b;
      break;
    default:
      break;
  }
}

cancelBtn.onclick = () => {
  display.textContent = "0";
  a = 0;
  opClicked = true;
  operator = "+";
}

/*function calc(a, operator, b) {

}*/