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

function createMatrixInput() {
    const size = document.getElementById('size').value;
    const matrixSection = document.getElementById('matrixSection');
    matrixSection.innerHTML = ''; // Clear previous matrix

    for (let i = 0; i < size; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'matrix-row';
        for (let j = 0; j < size; j++) {
            const input = document.createElement('input');
			input.className = 'g-input';
            input.type = 'number';
            input.min = '0';
            input.max = '1';
            input.value = '0';
            input.id = `matrix-${i}-${j}`;
            rowDiv.appendChild(input);
        }
        matrixSection.appendChild(rowDiv);
    }

    document.getElementById('drawGraphButton').style.display = 'block';
}

function drawGraph() {
    const size = parseInt(document.getElementById('size').value);
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous graph
    const radius = 20; // Radius of the circles representing the vertices
    const angleIncrement = 2 * Math.PI / size; // Angle increment for placing vertices in a circle

    let positions = []; // Store positions of each vertex

    // Draw vertices
    for (let i = 0; i < size; i++) {
        const x = canvas.width / 2 + Math.cos(i * angleIncrement) * 100; // Adjust 100 for distance from center
        const y = canvas.height / 2 + Math.sin(i * angleIncrement) * 100;
        positions.push([x, y]);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillText(i, x-5, y+5); // Label vertices
        ctx.stroke();
    }

    // Draw edges
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const val = document.getElementById(`matrix-${i}-${j}`).value;
            if (val == '1') { // There is an edge
                ctx.beginPath();
                ctx.moveTo(positions[i][0], positions[i][1]);
                ctx.lineTo(positions[j][0], positions[j][1]);
                ctx.stroke();
            }
        }
    }
}
