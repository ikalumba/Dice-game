'use strict';

// Selecting elements

const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const imgDice = document.querySelector('.dice');
const current0 = document.querySelector('#current--0').textContent;
const current1 = document.querySelector('#current--1').textContent;

// Starting conditions
document.querySelector(`#score--0`).textContent = 0;
document.querySelector(`#score--1`).textContent = 0;
document.querySelector('.dice').classList.add('hidden');

// Rolling the dice

let activePlayer = 0;
let currentScore = 0;

let totalScore0 = 0;
let totalScore1 = 0;

btnRoll.addEventListener('click', function () {
  const rolled = Math.trunc(Math.random() * 6 + 1);

  console.log(rolled);
  imgDice.src = `dice-${rolled}.png`;
  document.querySelector('.dice').classList.remove('hidden');

  if (rolled !== 1) {
    currentScore += rolled;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  }

  if (rolled === 1) {
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;

    console.log(`This is the active player - ${activePlayer}`);
  }
});

// Holding the score

btnHold.addEventListener('click', function () {
  // console.log(currentScore);

  if (activePlayer === 0) {
    totalScore0 += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = totalScore0;
  }

  if (activePlayer === 1) {
    totalScore1 += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = totalScore1;
  }
  currentScore = 0;
  // if (totalScore0 || totalScore1 > 100) {
  //   document.querySelector(`.player--${activePlayer}`).style.backgroundColor =
  //     '#003559';
  // }
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
});
