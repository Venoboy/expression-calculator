function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  let exprArr = expr.split('').filter(elem => elem !== ' '),
    exprNum = [],
    tempNum = '';
  exprArr.forEach(((value, index) => {
      if (/[0-9]/.test(value)) {
        if (index === exprArr.length - 1) {
          tempNum += value;
          exprNum.push(+tempNum);
          tempNum = '';
        }
        tempNum += value;
      } else {
        if (tempNum !== '') {
          exprNum.push(+tempNum);
          tempNum = '';
        }
        exprNum.push(value)
      }
    }
  ));
  const sum = (a, b) => a + b,
    minus = (a, b) => a - b,
    divide = (a, b) => {
      if (b === 0) throw Error("TypeError: Division by zero.");
      return a / b
    },
    multiply = (a, b) => a * b;
  //console.log(exprNum);

  const withoutBrackets = (exprNumPart) => {

    for (let index = 0; index < exprNumPart.length; index++) {
      let prev = exprNumPart[index - 1],
        next = exprNumPart[index + 1];

      if (exprNumPart[index] === '*' || exprNumPart[index] === '/') {
        if (exprNumPart[index] === '*' && /[0-9]/.test(prev) && /[0-9]/.test(next)) {
          exprNumPart[index - 1] = multiply(prev, next);
          exprNumPart.splice(index, 2);
          index -= 2;
        }
        if (exprNumPart[index] === '/' && /[0-9]/.test(prev) && /[0-9]/.test(next)) {
          exprNumPart[index - 1] = divide(prev, next);
          exprNumPart.splice(index, 2);
          index -= 2;
        }
      }
    }

    for (let index = 0; index < exprNumPart.length; index++) {
      let prev = exprNumPart[index - 1],
        next = exprNumPart[index + 1];

      if (exprNumPart[index] === '+' || exprNumPart[index] === '-') {
        if (exprNumPart[index] === '+' && /[0-9]/.test(prev) && /[0-9]/.test(next)) {
          exprNumPart[index - 1] = sum(prev, next);
          exprNumPart.splice(index, 2);
          index -= 2;
        }
        if (exprNumPart[index] === '-' && /[0-9]/.test(prev) && /[0-9]/.test(next)) {
          exprNumPart[index - 1] = minus(prev, next);
          exprNumPart.splice(index, 2);
          index -= 2;
        }
      }
    }
    return exprNumPart[0];
  };
  if (exprNum.filter(elem => elem === '(').length !== exprNum.filter(elem => elem === ')').length) {
      throw Error("ExpressionError: Brackets must be paired")
  }

  for (let i = 0; i < exprNum.length; i++) {
    if (exprNum[i] === ')') {
      let endBracket = i,
        startBracket;

      for (i; exprNum[i] !== '('; i--) {
        startBracket = i - 1;
      }
      exprNum[startBracket] = withoutBrackets(exprNum.slice(startBracket + 1, endBracket));
      exprNum.splice(startBracket + 1, endBracket - startBracket);
      i = 0;
    } else if (i === exprNum.length - 1) {
      return withoutBrackets(exprNum)
    }
  }
}

module.exports = {
    expressionCalculator
}