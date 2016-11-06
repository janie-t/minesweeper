document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
// var board = {
//   cells: [
//     {row:0, col:0, isMine:true, hidden:true},
//     {row:0, col:1, isMine:false, hidden:true},
//     {row:0, col:2, isMine:false, hidden:true},
//     {row:1, col:0, isMine:true, hidden:true},
//     {row:1, col:1, isMine:false, hidden:true},
//     {row:1, col:2, isMine:true, hidden:true},
//     {row:2, col:0, isMine:false, hidden:true},
//     {row:2, col:1, isMine:true, hidden:true},
//     {row:2, col:2, isMine:false, hidden:true},
//   ]
// }

var board = {};
board.cells = makeBoard(5);

function makeBoard (size) {
  var cells = new Array();
  for (var x=0; x<size; x++) {
    for (var y=0; y<size; y++) {
      cells.push(new newCells(x, y));
    }
  } return cells;
}

function newCells (row, col) {
  this.row=row;
  this.col=col;
  this.isMine=makeMines();
  this.isMarked=false;
  this.hidden=true;
}

function makeMines(){
  var mineMake = Math.random()+0.3;
  if (mineMake<0.5){
    return true;
  } return false;
}

function resetBoard (){
  location.reload();
  board.cells = makeBoard();
}

function startGame () {

  for (var i =0; i < board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
    document.addEventListener("click", checkForWin);
    document.addEventListener("contextmenu", checkForWin);
  }
  lib.initBoard();
}

function checkForWin () {
  for (var i =0; i < board.cells.length; i++){
    if (board.cells[i].isMine && !board.cells[i].isMarked) {
      return;
    }
    if (board.cells[i].isMine && !board.cells[i].hidden) {
      return ;
    }
  }  lib.displayMessage('You win!');
}

function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  var count = 0;
  for (var y = 0; y < surrounding.length; y++){
    if (surrounding[y].isMine){
    count++;
    }
}
  return count;
}
