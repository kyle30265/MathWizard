function convertToBinary() {
  var decimal = document.getElementById('decimalInput').value;
  var binary = (decimal >>> 0).toString(2);
  document.getElementById('binaryOutput').innerText = `Binary: ${binary}`;
}

function convertToDecimal() {
  var binary = document.getElementById('binaryInput').value;
  var decimal = parseInt(binary, 2);
  document.getElementById('decimalOutput').innerText = `Decimal: ${decimal}`;
}


function calculate() {
  var n = parseInt(document.getElementById('sampleSize').value, 10);
  var r = parseInt(document.getElementById('itemsToChoose').value, 10);
  var repetition = document.getElementById('isRepetitionAllowed').checked;
  var order = document.getElementById('isOrderImportant').checked;
  
  var result;
  
  if (isNaN(n) || isNaN(r)) {
    result = "Please enter valid numbers for n and r.";
  } else if (n < 0 || r < 0) {
    result = "Please enter non-negative numbers for n and r.";
  } else if (n < r && !repetition) {
    result = "n must be greater than or equal to r for combinations without repetition.";
  } else {
    // Permutations with repetition: n^r
    if (order && repetition) {
      result = Math.pow(n, r);
    }
    // Permutations without repetition: n! / (n-r)!
    else if (order && !repetition) {
      result = permutations(n, r);
    }
    // Combinations with repetition: (n+r-1)! / (r!(n-1)!)
    else if (!order && repetition) {
      result = combinationsWithRepetition(n, r);
    }
    // Combinations without repetition: n! / (r!(n-r)!)
    else {
      result = combinations(n, r);
    }
  }

  document.getElementById('resultOutput').innerText = `Result: ${result}`;
}

function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function permutations(n, r) {
  return factorial(n) / factorial(n - r);
}

function combinations(n, r) {
  if (n === r || r === 0) {
    return 1;
  }
  if (r > n / 2) {
    r = n - r;
  }
  let result = 1;
  for (let i = 0; i < r; i++) {
    result *= (n - i);
    result /= (i + 1);
  }
  return result;
}

function combinationsWithRepetition(n, r) {
  return combinations(n + r - 1, r);
}

function checkPrime() {
  var num = parseInt(document.getElementById('primeInput').value, 10);
  var primeOutput = document.getElementById('primeOutput');
  
  if (isNaN(num) || num < 2) {
    primeOutput.innerText = "Please enter a number greater than 1.";
    return;
  }

  for (var i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      primeOutput.innerText = `${num} is not a prime number.`;
      return;
    }
  }
  primeOutput.innerText = `${num} is a prime number.`;
}

function primeFactorization() {
  var num = parseInt(document.getElementById('factorInput').value, 10);
  var factorOutput = document.getElementById('factorOutput');

  if (isNaN(num) || num < 2) {
    factorOutput.innerText = "Please enter a number greater than 1.";
    return;
  }

  var factors = [];
  for (var i = 2; i <= num; i++) {
    while (num % i === 0) {
      factors.push(i);
      num /= i;
    }
  }
  factorOutput.innerText = `Prime factors: ${factors.join(' × ')}`;
}