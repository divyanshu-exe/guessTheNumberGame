let random = Math.floor(Math.random() * 100) + 1;

const submit = document.querySelector('#sub');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remainingGuess = document.querySelector('.lastrel');
const loworhi = document.querySelector('.loworhi');
const startOver = document.querySelector('.guessParas');

let prevGuess = [];
let numGuess = 0;
let playGame = true;

const MAX_GUESSES = 10;

// Submit handler
submit.addEventListener('click', function (e) {
    e.preventDefault();
    if (!playGame) return;

    const guess = Number(userInput.value);
    validateGuess(guess);
});

// Validation
function validateGuess(guess) {
    if (!Number.isInteger(guess)) {
        alert('Please enter a valid number');
        return;
    }
    if (guess < 1 || guess > 100) {
        alert('Please enter a number between 1 and 100');
        return;
    }

    prevGuess.push(guess);
    displayGuess(guess);
    checkGuess(guess);
}

// Compare guess
function checkGuess(guess) {
    if (guess === random) {
        displayMessage('🎉 You guessed it right!');
        endGame();
        return;
    }

    if (numGuess >= MAX_GUESSES) {
        displayMessage(`Game Over! Random number was ${random}`);
        endGame();
        return;
    }

    displayMessage(guess < random ? '📉 Number is too low' : '📈 Number is too high');
}

// Update UI
function displayGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess}, `;
    numGuess++;
    remainingGuess.textContent = MAX_GUESSES - numGuess;
}

function displayMessage(msg) {
    loworhi.innerHTML = `<h2>${msg}</h2>`;
}

// End game
function endGame() {
    playGame = false;
    userInput.setAttribute('disabled', '');

    const p = document.createElement('p');
    p.innerHTML = `<h2 id="newGame" style="color:green; cursor:pointer;">Start New Game</h2>`;
    startOver.appendChild(p);

    document.querySelector('#newGame').addEventListener('click', newGame);
}

// Restart game
function newGame() {
    random = Math.floor(Math.random() * 100) + 1;
    prevGuess = [];
    numGuess = 0;
    playGame = true;

    guessSlot.innerHTML = '';
    remainingGuess.textContent = MAX_GUESSES;
    loworhi.innerHTML = '';
    userInput.removeAttribute('disabled');
    userInput.value = '';

    const newGameBtn = document.querySelector('#newGame');
    if (newGameBtn) newGameBtn.parentElement.remove();
}