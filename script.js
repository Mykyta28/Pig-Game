'use strict'

const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Elemrnt = document.getElementById('current--0');
const current1Elemrnt = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

score0Element.textContent = 0;
score1Element.textContent = 0;

diceElement.classList.add('hidden');

const totalScore = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let isPlay = true;

const switchActivePlayer = () => {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
}

btnRoll.addEventListener("click", () => {
    if(isPlay){
        const diceNum = Math.trunc(Math.random() * 6) + 1;
    diceElement.classList.remove('hidden');
    diceElement.src = `images/${diceNum}.jpg`

    if(diceNum !== 1){
        currentScore += diceNum;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }else {
        switchActivePlayer();
    }
    }
})

btnHold.addEventListener('click', () => {
    
    if(isPlay){
        totalScore[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = totalScore[activePlayer];
        diceElement.classList.add('hidden');
        
        if(totalScore[activePlayer] >= 100){
            isPlay = false;
            btnHold.classList.add('disabled');
            btnRoll.classList.add('disabled');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }else{
            switchActivePlayer();
        }
    }
})


btnNew.addEventListener('click', () => {
    current0Elemrnt.textContent = 0;
    current1Elemrnt.textContent = 0;
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    player1.classList.remove('player--active');
    player2.classList.remove('player--active');
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
    player1.classList.add('player--active');
    diceElement.classList.add('hidden');
    btnHold.classList.remove('disabled');
    btnRoll.classList.remove('disabled')
    isPlay = true;
})