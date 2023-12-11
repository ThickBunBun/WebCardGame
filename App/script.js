// function countDown() {
//   let curval = document.getElementById('countdown').innerText
//   if (curval > 0) {
//     document.getElementById('countdown').innerHTML = Number(curval) - 1
//   }
// }
// reveals front of the crad and shows back and viceversa
function reveal() {
  // declaring elemet links
  const cardface = document.getElementById('cardface');
  const cardback = document.getElementById('cardback');
  console.log(cardface.style.display);

  if (cardface.style.display == '' || cardface.style.display == 'none') {
    cardback.style.display = 'none'
    cardface.style.display = 'block';
  }
  else {
    cardback.style.display = 'block';
    cardface.style.display = 'none';
  };
};

