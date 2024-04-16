import shuffle from "./shuffle.js";
import htmlElemGen from "./htmlElemGen.js";

export function cardGen() {
  document.getElementById('cardfield').innerHTML = ''

  let card_content = [];

  for (let index = 0; index <= 7; index++) {
    card_content.push(Math.floor(Math.random() * 20) + 1);
  }

  card_content = card_content.concat(card_content);
  card_content = shuffle(card_content)

  // console.log(card_content);
  // console.log(document.getElementById('cardfield'))

  for (let index = 0; index <= 15; index++) {
    // console.log(item);
    let card = htmlElemGen(`
      <div class="cardinstance" id="crd_${index}" onclick="revealing(this.id)">
        <div class="card">
          <div class="cardhead"></div>
          <div class="clickbody">
            <p class="cardback"></p>
            <p class="cardface">${card_content[index]}</p>
          </div>
        </div>
      </div>
    `);

    // console.log(index)
    document.getElementById('cardfield').appendChild(card);
  };
};
