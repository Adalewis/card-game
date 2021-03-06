/*
 * Create a list that holds all of your cards
 */
let card = document.querySelectorAll(".card");
let cards = [...card];
let move = 0;
const stars = document.querySelector(".stars");
const star = stars.querySelectorAll("LI");
const deck = document.querySelector(".deck");
const shownCards = [];
let matchedCard = document.querySelector(".match");
let timeStamp = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function start() {
    let deckOfCards = shuffle(cards);
    deckOfCards.forEach(function(a) {
        deck.appendChild(a);
    });
}
/*shuffles automatically when page loads*/
document.body.onload = start;
/*displays the card's symbol
pushes flipped cards into an array*/
var flipCard = function () {
    this.classList.toggle("open");
    const open = document.querySelectorAll(".open");
    if (open.length ==2) {
        let choice1 = open[0];
        let icon1 = choice1.querySelector("I");
        var card1 = icon1.classList;
        fafa1 = card1.value;
        shownCards.push(fafa1);
        let choice2 = open[1];
        let icon2 = choice2.querySelector("I");
        var card2 = icon2.classList;
        fafa2 = card2.value;
        shownCards.push(fafa2);
        move++
        match();
    }
        else {
            console.log("pick another card");
        }
    console.log(shownCards);
}
/*sets up the event listener for a card. If a card is clicked*/
for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", flipCard);
    card.addEventListener("click", moveCounter);
    card.addEventListener("click", startTime);

};
/*Checks to see if the two cards match.
If they match cards are locked in open position.
If the cards do not match, they are removed from
the list and the card's symbol is hidden.*/
function match() {
    const element = document.querySelectorAll(".open");
    if (fafa1 == fafa2) {
        console.log("true");
        element[0].classList.toggle("match");
        element[1].classList.toggle("match");
        element[0].classList.remove("open");
        element[1].classList.remove("open");
        element[0].classList.remove("unmatched");
        element[1].classList.remove("unmatched");
        win();
      } else {
          setTimeout(function() {
            element[0].classList.toggle("unmatched");
            element[1].classList.toggle("unmatched");
            element[0].classList.remove("open");
            element[1].classList.remove("open");
            shownCards.pop([0]);
            shownCards.pop([1]);
          }, 1000);
      }
}
/*Function to be called upon when repeat is clicked
to reset board, score, move count, and timer.*/
function restart() {
    move = 0;
    star[0].style.visibility = "visible";
    star[1].style.visibility = "visible";
    star[2].style.visibility = "visible";
    while (timeStamp.length > 0){
    timeStamp.pop();
    }
        for (var i = 0; i < cards.length; i++) {
            cards[i].classList.remove("match");
            cards[i].classList.remove("unmatched");
            cards[i].classList.remove("open");
        }
            while (shownCards.length > 0) {
              shownCards.pop();

            }
start();
moveCounter();
}
/*click eventlistener placed on repeat icon*/
const reset = document.querySelector(".restart");
reset.addEventListener("click", restart);
/*When all cards are matched modal is displayed width
score and time*/
function win() {
      let modal = document.querySelector(".modal");
      let h1 = modal.querySelector("h1");
      if (shownCards.length > 15){
            timer();
            rating();
            modal.style.display = "block";
            h1.innerHTML = "Congratulations, you have a score of " + score +
            " and with a time of " + time
            + " seconds, if you want to play again click the restart icon";
      } else {
          console.log("listening");
        }
}
/*inserts move count in score panel*/
function moveCounter() {
    let movesCount = document.querySelector(".moves");
    movesCount.innerHTML = move
    scorePanel();
}
/*Time taken on first click*/
function startTime() {
    beginTime = Date.now();
    timeStamp.push(beginTime);
}
/*Subtracting starting time from end
time to find total time it took to complete
game*/
function timer() {
    mill = Date.now() - timeStamp[0];
    time = Math.floor(mill/1000);
}
/*Reduces stars shown as move count increases*/
function scorePanel() {
    if (move == 10) {
      star[2].style.visibility = "hidden";
    } else if (move == 14) {
        star[1].style.visibility = "hidden";
      } else if (move == 18) {
          star[0].style.visibility = "hidden";
        } else {
            console.log("starpower");
          }
}

function rating() {
    if (move < 10) {
        score = "3 stars";
    } else if (move < 14 && move > 10) {
        score = "2 stars";
      } else if (move < 18 && move > 14) {
          score = "1 star";
        } else {
            score = "0 stars";
          }
}
/*Clicking on x in modal will cause it to close*/
const close = document.querySelector(".close");
close.addEventListener("click", function() {
    modal.style.display = "none";
});
