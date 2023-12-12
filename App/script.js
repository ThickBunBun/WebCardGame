// function countDown() {
//   let curval = document.getElementById('countdown').innerText
//   if (curval > 0) {
//     document.getElementById('countdown').innerHTML = Number(curval) - 1
//   }
// }
// reveals front of the crad and shows back and viceversa

var valuesofcards = [];
var idofcards = []


function reveal(id) {
  // declaring elemet links
  const cardface = document.getElementById(id).getElementsByClassName("cardface");
  const cardback = document.getElementById(id).getElementsByClassName("cardback");
  // console.log(cardface[0].style.display = 'block');

  if (cardface[0].style.display == '' || cardface[0].style.display == 'none') {
    cardback[0].style.display = 'none';
    cardface[0].style.display = 'block';
    if (valuesofcards.length < 2) {
      valuesofcards.push(cardface[0].innerText);
      idofcards.push(document.getElementById(id).id);
    };
    if (valuesofcards.length == 2) {
      if (valuesofcards[0] === valuesofcards[1]) {
        document.getElementById(idofcards[0]).style.border = "green 5px solid";
        document.getElementById(idofcards[0]).getElementsByClassName("cardhead")[0].style.backgroundColor = "green";
        document.getElementById(idofcards[1]).style.border = "green 5px solid";
        document.getElementById(idofcards[1]).getElementsByClassName("cardhead")[0].style.backgroundColor = "green";
        idofcards = [];
        valuesofcards = [];
      }
      else {
        setTimeout(() => {
          document.getElementById(idofcards[0]).getElementsByClassName("cardback")[0].style.display = 'block'
          document.getElementById(idofcards[0]).getElementsByClassName("cardface")[0].style.display = 'none'
          document.getElementById(idofcards[1]).getElementsByClassName("cardback")[0].style.display = 'block'
          document.getElementById(idofcards[1]).getElementsByClassName("cardface")[0].style.display = 'none'
          idofcards = [];
          valuesofcards = [];
        }, 500);

      };
    };
    console.log(valuesofcards);
    console.log(idofcards)
    return cardface.innerText;
  }
  // else {
  //   cardback[0].style.display = 'block';
  //   cardface[0].style.display = 'none';
  // };
};

