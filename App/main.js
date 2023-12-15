import { stopTimer, startTimer } from './timer.js';
import cardGen from './cardgen.js';
import htmlElemGen from './htmlElemGen.js';
//game logic vars
let valuesofcards = [];
let idofcards = [];
let score = 0;
let paircount = 0;

let gameseconds = 0;

const timerEl = document.getElementById('timer');

let startbutton = htmlElemGen(`
      <button class="fieldbuttons" id="startbutton" onclick="start()">START</button>
`);

window.cardGen = cardGen()

window.loading = function loading() {
  score = 0
  document.getElementById('score_num').innerText = score;
  console.log('loading')
  stopTimer();
  document.getElementById('cardfield').innerHTML = ''
  document.getElementById('cardfield').appendChild(startbutton);
  timerEl.innerHTML = `1:30`;

};

window.start = function start() {
  score = 0;
  gameseconds = 90;
  cardGen();
  paircount = 0;
  document.getElementById('score_num').innerText = score;
  startTimer(gameseconds, timerEl);
};


// refreshes the field
function refresh() {
  setTimeout(() => {
    cardGen();
  }, 500);
};


//reset button func
window.reseting = function reset() {
  loading()
};




// gamelogic
window.revealing = function reveal(id) {
  // declaring elemet links
  const cardface = document.getElementById(id).getElementsByClassName("cardface");
  const cardback = document.getElementById(id).getElementsByClassName("cardback");
  // console.log(cardface[0].style.display = 'block');

  if (cardface[0].style.display == '' || cardface[0].style.display == 'none') {
    cardback[0].style.display = 'none';
    cardface[0].style.display = 'block';
    if (valuesofcards.length <= 2) {
      valuesofcards.push(cardface[0].innerText);
      idofcards.push(document.getElementById(id).id);
    };
    //checking the amoung of cards that've been clicked, if 2, compare the values 
    if (valuesofcards.length == 2) {
      let cardinstances = document.querySelectorAll('.cardinstance')
      cardinstances.forEach(element => {
        element.removeAttribute('onclick');
      });
      if (valuesofcards[0] === valuesofcards[1]) {
        document.getElementById(idofcards[0]).style.border = "green 5px solid";
        document.getElementById(idofcards[0]).getElementsByClassName("cardhead")[0].style.backgroundColor = "green";
        document.getElementById(idofcards[1]).style.border = "green 5px solid";
        document.getElementById(idofcards[1]).getElementsByClassName("cardhead")[0].style.backgroundColor = "green";
        idofcards = [];
        valuesofcards = [];
        score++;
        paircount++;
        console.log(paircount)
        if (paircount == 8) {
          paircount = 0;
          refresh();
        };
        cardinstances.forEach(element => {
          element.setAttribute('onclick', "revealing(this.id)")
        });

        document.getElementById('score_num').innerText = score;
      }
      else {
        setTimeout(() => {
          document.getElementById(idofcards[0]).getElementsByClassName("cardback")[0].style.display = 'block'
          document.getElementById(idofcards[0]).getElementsByClassName("cardface")[0].style.display = 'none'
          document.getElementById(idofcards[1]).getElementsByClassName("cardback")[0].style.display = 'block'
          document.getElementById(idofcards[1]).getElementsByClassName("cardface")[0].style.display = 'none'
          idofcards = [];
          valuesofcards = [];
          cardinstances.forEach(element => {
            element.setAttribute('onclick', "revealing(this.id)")
          });
        }, 300);

      };
    };
    //debuggin section
    console.log(valuesofcards);
    console.log(idofcards);
    return cardface.innerText;
  };
  // else {
  //   cardback[0].style.display = 'block';
  //   cardface[0].style.display = 'none';
  // };
};


