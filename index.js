'use strict';
//zobrazování kolečka a křížku
let naTahu = 'circle';
let zmenZnak = document.querySelector('.hrajeKolecko');

const hrajeme = (event) => {
  if (naTahu === 'circle') {
    event.target.classList.add('kolecko');
    naTahu = 'cross';
    zmenZnak.src = 'images/cross.svg';
    event.target.disabled = true;
    if (isWinningMove(event.target)) {
      const conf = confirm(`Vyhrálo kolečko.`);
      if (conf) {
        location.reload();
      }
    }
  } else {
    event.target.classList.add('krizek');
    naTahu = 'circle';
    zmenZnak.src = 'images/circle.svg';
    event.target.disabled = true;
    if (isWinningMove(event.target)) {
      const conf = confirm(`Vyhrál křížek.`);
      if (conf) {
        location.reload();
      }
    }
  }
};

let btnElm = document.querySelectorAll('#button');
for (let i = 0; i < btnElm.length; i++) {
  btnElm[i].addEventListener('click', hrajeme);
}

//pomocné funkce

const getSymbol = (field) => {
  if (field.classList.contains('kolecko')) {
    return 'circle';
  } else if (field.classList.contains('krizek')) {
    return 'cross';
  } else {
    return 'undefined';
  }
};

//fce row column
const boardSize = 10;
const fields = document.querySelectorAll('#button');
const getField = (row, column) => fields[row * boardSize + column];

//iii
const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

/// it's the final countdown
const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;
  let a;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  //diagonálně
  let diagonalneVlevo = 1;
  //vlevo nahoře
  i = origin.row;
  a = origin.column;
  while (i > 0 && a > 0 && symbol === getSymbol(getField(i - 1, a - 1))) {
    diagonalneVlevo++;
    i--;
    a--;
  }
  //vpravo dole
  i = origin.row;
  a = origin.column;
  while (
    i < boardSize - 1 &&
    a < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, a + 1))
  ) {
    diagonalneVlevo++;
    i++;
    a++;
  }
  if (diagonalneVlevo >= symbolsToWin) {
    return true;
  }

  let diagonalneVpravo = 1;
  //vpravo nahoře
  i = origin.row;
  a = origin.column;
  while (a > 0 && i > 0 && symbol === getSymbol(getField(i - 1, a + 1))) {
    diagonalneVpravo++;
    a++;
    i--;
  }
  //vlevo dole
  i = origin.row;
  a = origin.column;
  while (
    i < boardSize - 1 &&
    a < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, a - 1))
  ) {
    diagonalneVpravo++;
    i++;
    a--;
  }
  if (diagonalneVpravo >= symbolsToWin) {
    return true;
  }

  return false;
};
