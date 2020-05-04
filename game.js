const xClass = "x";
const circleClass = "circle";
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const winMessage = document.querySelector("[data-winning-message-text]");
const winMessageElement = document.getElementById("gameover");
const restartButton = document.getElementById("restart");
const playersButton = document.getElementById("onePlayer");
const colorButton = document.getElementById('color');
let onePlayer = false;
let color = false;
let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);
playersButton.addEventListener("click", setPlayers)
colorButton.addEventListener("click", setColors)
function setPlayers() {
    onePlayer = !onePlayer
    onePlayer? playersButton.innerText ="One player mode": playersButton.innerText ="Two player mode"
    startGame()
}
function setColors(){
    color = !color
    color? colorButton.innerText = "Red & Blue" : colorButton.innerText = "Black "
    color?  cellElements.forEach((cell) => {
        cell.classList.add('color')
    })
    : cellElements.forEach((cell) => {
        cell.classList.remove('color')
    })
}
function startGame() {
  winMessageElement.classList.remove("show");
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(xClass);
    cell.classList.remove(circleClass);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHover();  
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? circleClass : xClass;
  if (onePlayer) {
    playerGo(cell);

    if (checkWin(currentClass)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
      // } else if (cpuWin(circleClass)){
      //     endGame(false)
    } else {
      swapTurns();
      // setBoardHover()
      computerTurn();
    }
  } else {
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
      endGame(false);
    } else if (isDraw()) {
      endGame(true);
    } else {
      swapTurns();
      setBoardHover();
    }
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function swapTurns() {
  circleTurn = !circleTurn;
}
function setBoardHover() {
  board.classList.remove(xClass);
  board.classList.remove(circleClass);
  if (circleTurn) {
    board.classList.add(circleClass);
  } else {
    board.classList.add(xClass);
  }
}
function checkWin(currentClass) {
  return winningCombos.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
function endGame(draw) {
  if (draw) {
    winMessage.innerText = "Draw!";
  } else {
    winMessage.innerText = `${circleTurn ? "O's" : "X's"} Win!`;
  }
  winMessageElement.classList.add("show");
}
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(xClass) || cell.classList.contains(circleClass)
    );
  });
}

function computerTurn() {
  if (circleTurn == true) {
    //available spaces
    allSpace = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    //find free space
    space = (index) => {
      return (
        !cellElements[index].classList.contains(xClass) &&
        !cellElements[index].classList.contains(circleClass)
      );
    };
    availSpace = allSpace.filter(space);
    //get random number
    random = Math.floor(Math.random() * availSpace.length);
    //get the index value
    index = availSpace[random];
    //the computers choice
    cpuMove = cellElements[index];
    cpuMove.classList.add("circle");
    cpuWin();
    swapTurns();
  }
}

function cpuWin() {
  if (
    winningCombos.some((combination) => {
      return combination.every((index) => {
        return cellElements[index].classList.contains(circleClass);
      });
    })
  ) {
    winMessage.innerText = "Better luck next time";
    winMessageElement.classList.add("show");
  }
}
function playerGo(cell) {
  cell.classList.add(xClass);
}
