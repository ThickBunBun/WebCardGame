import htmlElemGen from "./htmlElemGen.js";

let timerId;
//game timer


const startbutton = htmlElemGen(`
      <button class="fieldbuttons" id="startbutton" onclick="start(0,0,90)">Play</button>
`);

export function startTimer(gameseconds, timerEl) {
  let minutes = Math.floor(gameseconds / 60);
  let seconds = gameseconds % 60;
  timerId = setInterval(() => {
    gameseconds--;
    minutes = Math.floor(gameseconds / 60);
    seconds = gameseconds % 60;
    if (gameseconds <= 0) {
      clearInterval(timerId)
      document.getElementById('cardfield').innerHTML = '';
      document.getElementById('cardfield').appendChild(startbutton);
      document.getElementById('score_num').innerText = `Your final score is ${document.getElementById('score_num').innerText}`
      minutes = Math.floor(gameseconds / 60);
      seconds = gameseconds % 60;
    };
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timerEl.innerHTML = `${minutes}:${seconds}`;
  }, 1000);

};
export function stopTimer() {
  clearInterval(timerId)

};
