// let board = Array(Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0));

// let board = [
//     [0,0,0,0],
//     [0,0,0,0],
//     [0,0,0,0],
//     [0,0,0,0]
// ]

// let tableID = [
//   ["00","01","02","03"],
//   ["10","11","12","13"],
//   ["20","21","22","23"],
//   ["30","31","32","33"]
// ]
console.log('initializeBoard',initializeBoard(4,4)) // @ 왜 정의된 함수보다 상단에 있어야 제대로 출력되는지?

let fieldSize = 4;
const board = initializeBoard(fieldSize, fieldSize) // 그냥 0으로 된 배열 생성. // @ 나중에 다시 볼 부분 
const tableID = createTableID(fieldSize, fieldSize); // 00,01,02... 순으로 배열 생성
const initialFieldNumber = 2;
let score;

// --------------------------------------------------------------------------------------

// 초기 board배열 초기화
function initializeBoard(rows, cols) {
  let boardArray = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push(0);
    }
    boardArray.push(row);
  }
  return boardArray;
}

// 초기 테이블 아이디 부여
function createTableID(rows, cols) {
  let tableID = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push(`${i}${j}`);
    }
    tableID.push(row);
  }
  // console.log('tableID : ',tableID)
  return tableID;
}

// 테이블태그로 필드 생성 후 id부여
(function createField() {
  const fieldElement = document.getElementById("field");
  const tableElement = document.createElement("table");
  for (let i = 0; i <= fieldSize - 1; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j <= fieldSize - 1; j++) {
      let cell = document.createElement("td");
      cell.id = i + "" + j;
      row.appendChild(cell);
    }
    tableElement.appendChild(row);
  }
  fieldElement.appendChild(tableElement);
})();


// 초기값. 초기에 숫자가 생길 좌표선정, 스코어 초기화.
(function initializeGame(initialFieldNumber) {
  score = 0; // 왜 const,let,var 안붙여지는지..?
  // initializeBoard(4,4)
  for (let i = 0; i < initialFieldNumber; i++) {
    let x = Math.floor(Math.random() * fieldSize);
    let y = Math.floor(Math.random() * fieldSize);

    // 초기에 board를 모두 0으로 작성. 
    // getInitialNum으로 숫자를 부여하고 나면 0이 아니게 됨.
    // 0인 곳에 다시 getInitialNum로 숫자를 부여해서 같은 좌표에 숫자가 배정되는 것을 방지한다.
    if (board[x][y] === 0) 
    {board[x][y] = getInitialNum();}
    else 
    {i--} // @ 나중에 다시 볼 부분 
    // console.log('x:'+x+' y:'+y)
  }
  update();
})(initialFieldNumber);

// 확률적으로 초기숫자 부여
function getInitialNum() {
  if (controlProbability(10)) { 
    return 8;
  } else if (controlProbability(20)){ 
    return 4;
  } else { 
    return 2;
  }
}
// 확률 관리 함수. 예) controlProbability(10)이면 10% 확률로 true 반환.
function controlProbability(probability) {
  let randomNum = Math.round(Math.random() * 100);
  if (randomNum<=probability) {
    return true
  } else {
    return false
  }
}
// [임시] 확률 확인용
function countDuplicateValues(arr) {
  const countMap = {};
  for (const item of arr) {
    if (countMap[item]) {
      countMap[item]++;
    } else {
      countMap[item] = 1;
    }
  }
  return countMap;
}
const results = [];
for (let i = 0; i < 1000; i++) {
  const result = getInitialNum();
  results.push(result);
}
// console.log(countDuplicateValues(results));


// 게임 화면 업데이트
function update() {
  for (let i = 0; i < fieldSize; i++) {
    for (let j = 0; j < fieldSize; j++) {
      let cell = document.getElementById(tableID[i][j]);
      cell.innerHTML = (board[i][j] === 0 ? "" : board[i][j]); // @ false일때부여되는 board[i][j] 이란?
      coloring(cell);
    }
  }
  document.getElementById("score").innerHTML = score;
}

// 칸 색칠
function coloring(cell) {
  let cellNum = parseInt(cell.innerHTML);
  switch (cellNum) {
    case 0:
    case 2:
      cell.style.color = "#684A23";
      cell.style.background = "#dcf3fb";
      break;
    case 4:
      cell.style.color = "#684A23";
      cell.style.background = "#94e1fa";
      break;
    case 8:
      cell.style.color = "#684A23";
      cell.style.background = "#26c9ff";
      break;
    case 16:
      cell.style.color = "#684A23";
      cell.style.background = "#3b9aff";
      break;
    case 32:
      cell.style.color = "#684A23";
      cell.style.background = "#5064ff";
      break;
    case 64:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#391fff";
      break;
    case 128:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#9860ff";
      break;
    case 256:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#d560ff";
      break;
    case 512:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#ff1fff";
      break;
    case 1024:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#ff1170";
      break;
    case 2048:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#ffee00";
      break;
    default:
      if (cellNum > 2048) {
        cell.style.color = "#FFFFFF";
        cell.style.background = "#6aff00";
      } else {
        cell.style.color = "#684A23";
        cell.style.background = "#ffffff";
      }
      break;
  }
}

// 키보드 입력 처리
document.onkeydown = keyDownEventHandler;
function keyDownEventHandler(e) {
  switch (e.keyCode) {
    case 38:
      moveDir('up');
      break; //'up'
    case 40:
      moveDir('down');
      break; //down
    case 37:
      moveDir('left');
      break; //left
    case 39:
      moveDir('right');
      break; //right
  }
}

// 보드판 이동 방향에 따른 회전 컨트롤
// move() : 위로 올리기
// rotate(n) : 시계방향 90*n도 회전
function moveDir(opt) {
  switch (opt) {
    case 'up':
      move();
      break; 
    case 'down':
      rotate(2);
      move();
      rotate(2);
      break; 
    case 'left':
      rotate(1);
      move();
      rotate(3);
      break; 
    case 'right':
      rotate(3);
      move();
      rotate(1);
      break;
  }
  update();
}

// 보드판 이동
// move() 자체가 단순히 위로 올리는 기능.
function move() {
  let isMoved = false; // 이동추적. 
  // let isPlused = Array(Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0));
  let isPlused = initializeBoard(fieldSize, fieldSize);
  for (let i = 1; i < fieldSize; i++) {
    for (let j = 0; j < fieldSize; j++) {
      if (board[i][j] === 0) continue;
      let tempY = i - 1;
      while (tempY > 0 && board[tempY][j] == 0) tempY--;
      if (board[tempY][j] == 0) {
        board[tempY][j] = board[i][j];
        board[i][j] = 0;
        isMoved = true;
      } else if (board[tempY][j] != board[i][j]) {
        if (tempY + 1 == i) continue;
        board[tempY + 1][j] = board[i][j];
        board[i][j] = 0;
        isMoved = true;
      } else {
        if (isPlused[tempY][j] == 0) {
          board[tempY][j] *= 2; 
          score += board[tempY][j];
          board[i][j] = 0;
          isPlused[tempY][j] = 1;
          isMoved = true;
        } else {
          board[tempY + 1][j] = board[i][j];
          board[i][j] = 0;
          isMoved = true;
        }
      }
    }
  }
  if (isMoved) generate(); // 이동추적된 isMoved가 true일때 generate함수실행.
  else checkGameOver(); // 이동안되면 게임오버
}

// 보드판 회전
// rotate(n) : 시계방향 90*n도 회전
function rotate(n) {
  while (n--) { // while(n--)문 : n번만큼 실행. 그 이유는 JS는 0은 boolean 변환시 false취급하기 때문. 내 티스토리 확인하기.
    // let tempBoard = Array(Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0));
    let tempBoard = initializeBoard(fieldSize, fieldSize);
    for (let i = 0; i < fieldSize; i++)
      for (let j = 0; j < fieldSize; j++)
        tempBoard[i][j] = board[i][j];
    for (let i = 0; i < fieldSize; i++)
      for (let j = 0; j < fieldSize; j++)
        board[j][fieldSize - 1 - i] = tempBoard[i][j]; // @ fieldSize - 1 ?
  }
}

// 신규 숫자 생성
// 반복문, 조건문 다음의 한줄은 {} 생략가능. But 아직은 헷갈리니까 써주자.
function generate() { 
  let zeroNum = 0; // 빈셀의 개수 계산
  for (let i = 0; i < fieldSize; i++) {
    for (let j = 0; j < fieldSize; j++) {
      if (board[i][j] === 0) {
        zeroNum++;
      }
    }
  }
  while (true) { // @ return문이 실행되지 않는한 무한루프(무한실행)
    for (let i = 0; i < fieldSize; i++) {
      for (let j = 0; j < fieldSize; j++) {
        if (board[i][j] === 0) {
          let rand = parseInt(Math.random() * zeroNum);
          if (rand === 0) {
            board[i][j] = getInitialNum(); // @ 
            // return 문은 함수 실행을 종료하고, 주어진 값을 함수호출 지점(함수실행부분)으로 반환합니다.
            return; // 반환값 없이 return만 쓰면 그 지점에서 함수 중단. while문의 무한루프를 방지함.
          }
        }
      }
    }
  }
}

// 최대 점수 반환
function getMaxNum() {
  let ret = 0;
  for (let i = 0; i < fieldSize; i++)
    for (let j = 0; j < fieldSize; j++)
      if (board[i][j] > ret)
        ret = board[i][j];
  return ret;
}

// 게임오버 체크
function checkGameOver() {
  for (let i = 0; i < fieldSize; i++) {
    let colCheck = board[i][0];
    if (colCheck == 0) return;
    for (let j = 1; j < fieldSize; j++) {
      if (board[i][j] == colCheck || board[i][j] == 0) return;
      else colCheck = board[i][j];
    }
  }
  for (let i = 0; i < fieldSize; i++) {
    let rowCheck = board[0][i];
    if (rowCheck == 0) return;
    for (let j = 1; j < fieldSize; j++) {
      if (board[j][i] == rowCheck || board[j][i] == 0) return;
      else rowCheck = board[j][i];
    }
  }
  gameover();
}

// 게임오버 처리
function gameover() {
  alert("[Game Over]\nMaxNumber : " + getMaxNum() + "\nScore : " + score);
  init();
}

// 페이지 전체에서 마우스 드래그를 막기
document.addEventListener('mousedown', function (e) {
  e.preventDefault();
});

// 맵크기 선택
  // const mapSizeElement3 = document.querySelector(".map-size-3");
  // mapSizeElement3.addEventListener('click', function(){
  //   console.log(3)
  // })