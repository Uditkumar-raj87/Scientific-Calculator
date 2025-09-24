const display = document.getElementById('display');
const buttonsContainer = document.querySelector('.buttons');

const buttons = [
  '7', '8', '9', '/', 'sin',
  '4', '5', '6', '*', 'cos',
  '1', '2', '3', '-', 'tan',
  '0', '.', '+', '(', ')',
  'sqrt', 'log', 'ln', '^', 'exp',
  'C', '=',
];

function createButton(label) {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.classList.add('button');
  if (["sin","cos","tan","sqrt","log","ln","^","exp"].includes(label)) {
    btn.classList.add('scientific');
  }
  if (label === '=') btn.classList.add('equal');
  if (label === 'C') btn.classList.add('clear');
  btn.addEventListener('click', () => handleButton(label));
  return btn;
}

buttons.forEach(label => {
  buttonsContainer.appendChild(createButton(label));
});

let current = '';

function handleButton(label) {
  if (label === 'C') {
    current = '';
    display.value = '';
    return;
  }
  if (label === '=') {
    try {
      display.value = calculate(current);
      current = display.value;
    } catch {
      display.value = 'Error';
      current = '';
    }
    return;
  }
  if (["sin","cos","tan","sqrt","log","ln","exp"].includes(label)) {
    current += label + '(';
    display.value = current;
    return;
  }
  if (label === '^') {
    current += '**';
    display.value = current;
    return;
  }
  current += label;
  display.value = current;
}

function calculate(expr) {
  // Replace scientific functions with JS Math equivalents
  let jsExpr = expr
    .replace(/sin\(/g, 'Math.sin(')
    .replace(/cos\(/g, 'Math.cos(')
    .replace(/tan\(/g, 'Math.tan(')
    .replace(/sqrt\(/g, 'Math.sqrt(')
    .replace(/log\(/g, 'Math.log10(')
    .replace(/ln\(/g, 'Math.log(')
    .replace(/exp\(/g, 'Math.exp(');
  return Function('return ' + jsExpr)();
}
