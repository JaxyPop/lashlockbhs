const WHITE_KING = '♔';
const WHITE_QUEEN = '♕';
const WHITE_ROOK = '♖';
const WHITE_BISHOP = '♗';
const WHITE_KNIGHT = '♘';
const WHITE_PAWN = '♙';
const BLACK_KING = '♚';
const BLACK_QUEEN = '♛';
const BLACK_ROOK = '♜';
const BLACK_BISHOP = '♝';
const BLACK_KNIGHT = '♞';
const BLACK_PAWN = '♟';

const startBoard = [
  [WHITE_ROOK, WHITE_KNIGHT, WHITE_BISHOP, WHITE_KING, WHITE_QUEEN, WHITE_BISHOP, WHITE_KNIGHT, WHITE_ROOK],
  [WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN],
  [],
  [],
  [],
  [],
  [BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN],
  [BLACK_ROOK, BLACK_KNIGHT, BLACK_BISHOP, BLACK_KING, BLACK_QUEEN, BLACK_BISHOP, BLACK_KNIGHT, BLACK_ROOK],
]
const drawBoard = (board) => {
  for (let yAr = 0; yAr < 8; yAr++) {
    for (let xAr = 0; xAr < board[yAr].length; xAr++) {
      if (board[yAr][xAr] != undefined) {
        drawText(board[yAr][xAr], 40 * xAr, 50 + 40 * yAr, 'black', 64);
      }
    }
  }
}


//drawBoard(startBoard)
/*
const checkMove = (board, piecex, piecey, targetx, targety, mode) => {
  drawBoard(board)
  const piece = board[piecex][piecey]
  const targetEmpty = board[targetx][targety] === undefined
  const targetFriendly = board[targetx][targety]
  if (piece === BLACK_PAWN || WHITE_PAWN) {
    if (piecex - targetx === 1 || piecey - targety === 1){
      
    }
  }
}
checkMove(startBoard, 0, 1, 6, 0, null)
*/



//sudoku

let sudostart = [
  ['5','3','','','7','','','',''],
  ['6','','','1','9','5','','',''],
  ['','9','8','','','','','6',''],
  ['8','','','','6','','','','3'],
  ['4','','','8','','3','','','1'],
  ['7','','','','2','','','','6'],
  ['','6','','','','','2','8',''],
  ['','','','4','1','9','','','5'],
  ['','','','','8','','','7','9'],
]

const delay = (num) => {
  while(num>0){
    num--;
  }
}

const canBePlaced = (ay, ax, sudostart1, placement) => {
  const box_x = Math.floor(ax/3)
  const box_y = Math.floor(ay/3)
  for(let y = box_y*3;  y < box_y*3+3; y++){
    for(let x = box_x*3;  x < box_x*3+3; x++){
      //console.log("box x, y: " + box_x + ", " + box_y + " | check x, y: "+ sudostart1[x][y] + " : " + x + ", " + y + " | placement x, y: " + placement + " : " + ax + " ," + ay)
      if((sudostart1[x][y]+"")===(placement+"")&&!((ay===y)&&(ax===x))){
        //console.log("in box")
        return false
      }
    }
  }

  for(let i = 0; i<sudostart1[0].length; i++){
    if((sudostart1[i][ay]+"")===(placement+"")&&i!=ax){
      //console.log("in vert")
      return false
    }
  }
  for(let i = 0; i<sudostart1[0].length; i++){
    if((sudostart1[ax][i]+"")===(placement+"")&&i!=ay){
      //console.log("in hort")
      return false
    }
  }
  return true
}


const drawSudo = (array) => {
  let thickness = 3;
  const spacing = height < width ? height / 9 : width / 9;
  for (let i = 0; i < 10; i++) {
    thickness = i % 3 === 0 ? 3 : 1;
    drawLine(0, spacing * (i), height, spacing * (i), 'black', thickness)
  }
  for (let i = 0; i < 10; i++) {
    thickness = i % 3 === 0 ? 3 : 1;
    drawLine(spacing * (i), 0, spacing * (i), width, 'black', thickness)
  }
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (array[y][x] != undefined) {
        drawText(array[y][x], (x * spacing), (y * spacing) + spacing, 'black', spacing)
      }
    }
  }
}

const printSudo = (array) => {
  let str = "";
  let line = "-----------------"

  for (let y = 0; y < 9; y++) {

    if (y % 3 === 0 && y != 0) {
      str += line + "\n"
    }

    for (let x = 0; x < 9; x++) {

      if ((x) % 3 === 0) {
        str += "|"
      }
      else {
        str += " "
      }
      if (array[y][x][0] === "") {
        str = (str + "-")
      }
      else {
        str = (str + array[y][x])
      }
    }
    str = (str + "|" + "\n")
  }
  console.log(str)
}


const filled = (array) => {
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (array[y][x]=== "") {
        return [x, y]
      }
    }
  }
  return 'fill'
}

const solve = (array) => {

  const find = filled(array)
  let x;
  let y;
  if (find === 'fill') {
    return true
  }
  else {

    x = find[0]
    y = find[1]
  }

  for (let i = 1; i <= 9; i++) {
    let canbeplaced = canBePlaced(x, y, array, i)
    if (canbeplaced) {
      clear();
      array[y][x] = i
      drawSudo(array)
      if (solve(array)) {
        return true
      }
      clear();
      array[y][x] = ''
      drawSudo(array)
    }
    delay(10000)
  }
  return false
}

solve(sudostart)
