const grid = document.getElementById("grid");
let myArray = Array.from({length: 9409}, () => Math.random() < 0.33); // start with 33 % living cells
let tempArray = Array(9409).fill(false);

// CREATING THE GRID IN HTML

const createGrid = function () {
  let i = 0;
  while (i < 9409) {
    let gridItem = document.createElement("div");
    grid.appendChild(gridItem);
    gridItem.id = i++;
}};

createGrid();

// MARK CELLS

const mark = function () {
  myArray.forEach((value, i) => {
    if (value) {
      document.getElementById(i).style.setProperty("background-color", "black");
    }
    else {
      document.getElementById(i).style.setProperty("background-color", "white");
    }
  });
};

mark();

// MARK CELLS WITH MOUSE

grid.addEventListener("click", function(e) {
  e.preventDefault();
  let targetId = Number(e.target.id);
  if (!myArray[targetId]) {
    myArray[targetId] = true
    e.target.style.setProperty("background-color", "black");
  }
  else {
    myArray[targetId] = false
    e.target.style.setProperty("background-color", "white");
  }
});

// LOOP

const rules = function (summary, index) {
  if (myArray[index] && (summary == 2 || summary == 3)) {
    tempArray[index] = true;
  }
  if (!myArray[index] && (summary == 3)) {
    tempArray[index] = true;
  }
  else {
    tempArray[index] == false;
  }
};

const getSummary = function (a, b, c, d, e, f, g, h, x) { // "bitwise AND" operator converts true and false to 1 and 0
  sum = (a & 1) + (b & 1) + (c & 1) + (d & 1) + (e & 1) + (f & 1) + (g & 1) + (h & 1);
  rules(sum, x);
};

const loop = function () {
  for (i = 0; i < 9409; i++) { // neighbors are found by their indexes, borders and corners have their own rules
    if (i == 0) { // upper L corner
      getSummary (myArray[i+1], myArray[i+96], myArray[i+97], myArray[i+98], myArray[i+193], myArray[i+9312], myArray[i+9313], myArray[i+9408], i);
    }
    else if (i == 96) { // upper R corner
      getSummary (myArray[i-96], myArray[i-1], myArray[i+1], myArray[i+96], myArray[i+97], myArray[i+9216], myArray[i+9311], myArray[i+9312], i);
    }
    else if (i == 9312) { // bottom L corner
      getSummary (myArray[i-9312], myArray[i-9311], myArray[i-9216], myArray[i-97], myArray[i-96], myArray[i-1], myArray[i+1], myArray[i+96], i);
    }
    else if (i == 9408) { // bottom R corner
      getSummary (myArray[i-9408], myArray[i-9313], myArray[i-9312], myArray[i-193], myArray[i-98], myArray[i-97], myArray[i-96], myArray[i-1], i);
    }
    else if ((i % 97) == 0) { // L column
      getSummary (myArray[i-97], myArray[i-96], myArray[i-1], myArray[i+1], myArray[i+96], myArray[i+97], myArray[i+98], myArray[i+193], i);
    }
    else if (((i+1) % 97) == 0) { // R column
      getSummary (myArray[i-193], myArray[i-98], myArray[i-97], myArray[i-96], myArray[i-1], myArray[i+1], myArray[i+96], myArray[i+97], i);
    }
    else if (i > 0 && i < 96) { // upper row
      getSummary (myArray[i-1], myArray[i+1], myArray[i+96], myArray[i+97], myArray[i+98], myArray[i+9311], myArray[i+9312], myArray[i+9313], i);
    }
    else if (i > 9312 && i < 9408) { // bottom row
      getSummary (myArray[i-9313], myArray[i-9312], myArray[i-9311], myArray[i-98], myArray[i-97], myArray[i-96], myArray[i-1], myArray[i+1], i);
    }
    else { // cells in the middle
      getSummary (myArray[i-98], myArray[i-97], myArray[i-96], myArray[i-1], myArray[i+1], myArray[i+96], myArray[i+97], myArray[i+98], i);
    }
  }
  myArray = tempArray;
  tempArray = Array(9409).fill(false);
  mark();
};

//BUTTONS

const btnCtrl = document.querySelector(".btn-ctrl");
const btnRandom = document.querySelector(".btn-random");
const btnClear = document.querySelector(".btn-clear");

btnCtrl.onclick = function() {
  if (btnCtrl.classList.contains ("passive")) {
    btnCtrl.classList.replace ("passive", "active");
    btnCtrl.innerText = ("Stop");
    myVar = setInterval(loop, 60);
  }
  else {
    clearInterval(myVar);
    btnCtrl.classList.replace ("active", "passive");
    btnCtrl.innerText = ("Start");
  }
}

// stop function for Randomize and Clear buttons
const stop = function () {
  if (btnCtrl.classList.contains ("active")) {
    btnCtrl.classList.replace ("active", "passive");
    btnCtrl.innerText = ("Start");
    clearInterval(myVar);
  }
};

btnRandom.onclick = function() {
  stop();
  myArray = Array.from({length: 9409}, () => Math.random() < 0.21);
  mark();
}

btnClear.onclick = function() {
  stop();
  myArray = Array(9409).fill(false);
  mark();
}