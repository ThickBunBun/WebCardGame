//game logic vars
var valuesofcards = [];
var idofcards = [];
var score = 0;
var paircount = 0;
var timerId;

let gameseconds;

let startbutton = htmlElemGen(`
      <button class="fieldbuttons" id="startbutton" onclick="start()">START</button>
`);

const timerEl = document.getElementById('timer');

function loading() {
  console.log('loading')
  stopTimer();
  document.getElementById('cardfield').innerHTML = ''
  document.getElementById('cardfield').appendChild(startbutton);
  timerEl.innerHTML = `1:30`;

};

function start() {
  score = 0;
  gameseconds = 90;
  cardGen();
  paircount = 0;
  document.getElementById('score_num').innerText = score;
  startTimer();
};

//card shuffling
function shuffle(arr) {
  let currentIndex = arr.length;
  let randomIndex = 0;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
  };

  return arr;
};


function htmlElemGen(html) {
  const template = document.createElement('template');

  template.innerHTML = html.trim();

  return template.content.firstElementChild;
};

//card generation
function cardGen() {
  document.getElementById('cardfield').innerHTML = ''

  card = htmlElemGen(`
        <div class="cardinstance" id="crd_#" onclick="reveal(this.id)">
          <div class="card">
            <div class="cardhead"></div>
            <div class="clickbody">
              <p class="cardback">:3</p>
              <p class="cardface">#</p>
            </div>
          </div>
        </div>
  `);

  let card_content = [];

  for (let index = 0; index <= 7; index++) {
    card_content.push(Math.floor(Math.random() * 20) + 1);
  }

  card_content = card_content.concat(card_content);
  card_content = shuffle(card_content)

  console.log(card_content);

  console.log(document.getElementById('cardfield'))

  for (let index = 0; index <= 15; index++) {
    // console.log(item);
    let card = htmlElemGen(`
      <div class="cardinstance" id="crd_${index}" onclick="reveal(this.id)">
        <div class="card">
          <div class="cardhead"></div>
          <div class="clickbody">
            <p class="cardback">:3</p>
            <p class="cardface">${card_content[index]}</p>
          </div>
        </div>
      </div>
    `);

    // console.log(index)
    document.getElementById('cardfield').appendChild(card);
  };
};

// function show() {
//   // document.getElementsByClassName("cardinstance").getElementsByClassName("cardface").style.display = "block"
//   // document.getElementsByClassName("cardinstance").getElementsByClassName("cardback").style.display = "block"
//   console.log('!');
//   let cardfaces = document.querySelectorAll('.cardface');
//   let cardbacks = document.querySelectorAll('.cardback');
//   cardfaces.forEach(el => {
//     el.style.display = 'block';
//   });
//   cardbacks.forEach(el => {
//     el.style.display = 'none';
//   });
//   setTimeout(() => {
//     cardfaces.forEach(el => {
//       el.style.display = 'none';
//     });
//     cardbacks.forEach(el => {
//       el.style.display = 'block';
//     });
//   }, 500);
// };


// refreshes the field
function refresh() {
  setTimeout(() => {
    cardGen();
  }, 500);
};


//reset button func
function reset() {
  loading()
};


//game timer

function startTimer() {
  let minutes = Math.floor(gameseconds / 60);
  let seconds = gameseconds % 60;
  timerId = setInterval(() => {
    gameseconds--;
    minutes = Math.floor(gameseconds / 60);
    seconds = gameseconds % 60;
    if (gameseconds <= 0) {
      clearInterval(timerId)
      document.getElementById('cardfield').innerHTML = ''
      document.getElementById('cardfield').appendChild(startbutton);
      minutes = Math.floor(gameseconds / 60);
      seconds = gameseconds % 60;
    };
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timerEl.innerHTML = `${minutes}:${seconds}`;
  }, 1000);

};
function stopTimer() {
  clearInterval(timerId)

};


// gamelogic
function reveal(id) {
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
          gameseconds += 10;
          refresh();
        };
        cardinstances.forEach(element => {
          element.setAttribute('onclick', "reveal(this.id)")
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
            element.setAttribute('onclick', "reveal(this.id)")
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


