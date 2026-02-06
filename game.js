let random = parseInt(Math.random() * 100 + 1);
const submit = document.querySelector('#sub');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remainingGuess = document.querySelector('.lastrel')
const loworhi = document.querySelector('.loworhi')
const startOver = document.querySelector('.guessParas')
const p = document.createElement('p')
let prevGuess = []
let numGuess = 1
let playGame = true;
if (playGame) {
    submit.addEventListener('click', function (e){
        e.preventDefault();
        
        const temp = parseInt(userInput.value);
        console.log(temp);
        validateGuess(temp);

    });
}
function validateGuess(temp) {
    if (isNaN(temp)) {
        alert(`please enter a valid number`);
    }
    else if (temp < 1) {
        alert(`please enter a more than 1`);
    }
    else if (temp > 100) {
        alert(`please enter a less than 100`);
    }
    else {
        prevGuess.push(temp);
        if (numGuess > 10) {
            displayGuess(temp);
            displayMessage(`Game Over. Random number was ${random}`)
            endGame();
        }
        else {
            displayGuess(temp)
            checkGuess(temp)
        }
    }


}
function checkGuess(temp) {
    if(temp=== random){
        displayMessage(`you guessed it right`)
        endGame()
    }
    else if(temp<random){
        displayMessage(`number is too low`)
    }
    else{
        displayMessage(`number is too high`)
    }

}
function displayGuess(temp) {
   userInput.value=''
   guessSlot.innerHTML+=`${temp}, `
   numGuess++;
   remainingGuess.innerHTML=`${11-numGuess}`
}
function displayMessage(message) {
    loworhi.innerHTML=`<h2>${message}</h2>`
}
function endGame() {
userInput.value=''
userInput.setAttribute('disabled','')
p.classList.add('button')
p.innerHTML=`<h2 id="newGame">Start new Game</h2>`;

startOver.appendChild(p);
document.querySelector('#newGame').style.color='green'
playGame=false;
newGame()

}
function newGame() {
const newgameButton=document.querySelector('#newGame')
newgameButton.addEventListener('click',function(e){
    random = parseInt(Math.random() * 100 + 1);
    prevGuess=[]
    numGuess=1
    guessSlot.innerHTML=''
   remainingGuess.innerHTML=`${11-numGuess}`
   userInput.removeAttribute('disabled')
   startOver.removeChild(p)
   playGame=true;
});
}

