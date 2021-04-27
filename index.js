'use strict';

let naTahu = 'circle';
let zmenZnak = document.querySelector('.hrajeKolecko');

const hrajeme = (event) => {
  if (naTahu === 'circle') {
    event.target.classList.add('kolecko');
    naTahu = 'cross';
    zmenZnak.src = 'images/cross.svg';
    event.target.disabled = true;
  } else {
    event.target.classList.add('krizek');
    naTahu = 'circle';
    zmenZnak.src = 'images/circle.svg';
    event.target.disabled = true;
  }
};

let btnElm = document.querySelectorAll('#button');
for (let i = 0; i < btnElm.length; i++) {
  btnElm[i].addEventListener('click', hrajeme);
}
