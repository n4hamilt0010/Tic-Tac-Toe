// get HTML objects
const gameStatus = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const divCells = document.querySelectorAll('.game-cell');

// define game symbols
const xSymbol = '×'
const oSymbol = '○';

// define game variables/constants
var gameOver = false;
var xIsNext = true;
const gridSize = 3; // our grid will be gridSize by gridSize, in this case 3x3
var symbolCounter = 0;
const numSquares = gridSize**2;

const handleReset = () => {
    gameOver = false;
    xIsNext = true;
    for(const divCell of divCells){
        divCell.classList.remove('x');
        divCell.classList.remove('o');
        divCell.classList.remove('won');
        divCell.classList.remove('deadCell');
    }
    gameStatus.innerHTML = '× is next';
    symbolCounter = 0;
  };

function endGame(winner){
    if(winner === 'x'){
        gameStatus.innerHTML = '× has won!';
    } else if(winner == 'o'){
        gameStatus.innerHTML = '<span>○ has won!</span>'
    } else{ // no winner
        gameStatus.innerHTML = 'Game is tied!';
    }// print the winner

    for(const divCell of divCells){
        divCell.classList.add('deadCell');
    } // set cells to inactive 
    gameOver = true;
} 

function checkRow(id, char){
    const row = Math.floor(id / gridSize);
    const start = (row*gridSize);
    const stop = (row*gridSize) + gridSize;
    for(var i = start; i < stop; ++i){
        if(divCells[i].classList[1] != char){  
            return false;
        }
    }
    
    for(var j = start; j < stop; ++j){
        divCells[j].classList.add('won');
    }
    return true;
}

function checkColumn(id, char){
    const col = id % gridSize; 
    let iterations = 0;
    for(var i = col; iterations < gridSize; i += gridSize, ++iterations){
        if(divCells[i].classList[1] != char){
            return false;
        }
    } 

    iterations = 0;
    for(var j = col; iterations < gridSize; j += gridSize, ++iterations){
        divCells[j].classList.add('won');
    }
    return true;
}

function checkLeftDiagonal(id, char){
    let iterations = 0;
    for(var i = 0; iterations < gridSize; i += (gridSize+1), ++iterations){
        if(divCells[i].classList[1] != char){
            return false;
        }
    } 

    iterations = 0;
    for(var j = 0; iterations < gridSize; j += (gridSize+1), ++iterations){
        divCells[j].classList.add('won');
    }
    return true;
}

function checkRightDiagonal(id, char){
    let iterations = 0;
    for(var i = gridSize-1; iterations < gridSize; i += (gridSize-1), ++iterations){
        if(divCells[i].classList[1] != char){
            return false;
        }
    }

    iterations = 0;
    for(var j = gridSize-1; iterations < gridSize; j += (gridSize-1), ++iterations){
        divCells[j].classList.add('won');
    }
    return true;
}

function checkForWinner(id, char){
    return checkColumn(id, char) || checkRow(id, char) || 
    checkLeftDiagonal(id, char) || checkRightDiagonal(id, char);
}

const handleCellClick = (e) => {
    const classList = e.target.classList;
    const id = e.target.id;
    if(classList.length > 1 || gameOver){
        return;
    } // if the cell is taken or the game is over then return 
    
    if(xIsNext){
        classList.add('x');
        gameStatus.innerHTML = '<span>○ is next</span>';
        if(checkForWinner(id, "x")){
            endGame("x");
        }
    } else{
        classList.add('o');
        gameStatus.innerHTML = '× is next';
        if(checkForWinner(id, "o")){
            endGame("o");
        }
    }
    ++symbolCounter;
    xIsNext = !xIsNext;
    if(symbolCounter == numSquares && !gameOver){
        endGame("none");
    }
}

// event listeners
resetDiv.addEventListener('click', handleReset);

for (const divCell of divCells) {
  divCell.addEventListener('click', handleCellClick);
}