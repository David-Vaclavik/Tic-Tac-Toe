// console.log('connected to script.js');

/*
const rows = 3;
const columns = 3;
let board = [];

for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < columns; j++) {
        board[i].push('-');
    }
}
*/

function gameboard() {
    const rows = 3;
    const columns = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board.push([]);
        for (let j = 0; j < columns; j++) {
            board[i].push('-');
        }
    }
    return board;
}

//you’re probably going to want an object to control the flow of the game itself.
function gameController(
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {
    // Your players are also going to be stored in objects
    const players = [
        {
            name: playerOneName,
            marker: 'X'
        },
        {
            name: playerTwoName,
            marker: 'O'
        }
    ];

    let round = 0;
    let board = gameboard();

    const checkWinner = () => {
        round++;
        // console.log(round);
        
        // Check rows
        for (let row = 0; row < 3; row++) {
            if (
                board[row][0] !== '-' &&
                board[row].every(cell => cell === board[row][0])
            ) {
                console.log("winner winner chicken dinner ROWS");
                return board[row][0]; // Return 'X' or 'O'
            }
        }

        // checks columns
        for (let column = 0; column < 3; column++) {
            let first = board[0][column];

            if (
                first !== '-' &&
                first === board[0][column] &&
                first === board[1][column] &&
                first === board[2][column]
            ) {
                console.log("winner winner chicken dinner COLUMNS: " + board[0][column]);
                return board[0][column]; // Return 'X' or 'O'
            }
        }

        // checks diagonal
        if (
            board[0][0] !== '-' &&
            board[0][0] === board[1][1] &&
            board[1][1] === board[2][2]
        ) {
            console.log("winner winner chicken dinner main DIAGONAL: " + board[0][0]);
            return board[0][0]; // Return 'X' or 'O'
        }
        if (
            board[0][2] !== '-' &&
            board[0][2] === board[1][1] &&
            board[1][1] === board[2][0]
        ) {
            console.log("winner winner chicken dinner anti-main DIAGONAL: " + board[0][2]);
            return board[0][2]; // Return 'X' or 'O'
        }

        if (round === 9) {
            console.log("It's a TIE!!!!!");
            round = 0;
            turn = 1; // set turn to 1 so next play on new board will also be player 1

            //: Reset board
            board = gameboard();
        }
    }

    let turn = 0;

    const makeMark = (row, column) => {
        if (board[row][column] === 'X' || board[row][column] === 'O') {
            console.log('ERROR: already marked square');
            return;
        }

        console.log(`${players[turn].name} plays:`);
        board[row][column] = players[turn].marker;

        console.log(board);

        checkWinner();

        turn > 0 ? turn-- : turn++;
    }

    return {players, makeMark};

}

const game = gameController();


/** ROWS win X
game.makeMark(0, 0);
game.makeMark(1, 0);
game.makeMark(0, 1);
game.makeMark(1, 1);
game.makeMark(0, 2);
*/
/**  COLUMNS win X
game.makeMark(0, 0);
game.makeMark(0, 1);
game.makeMark(1, 0);
game.makeMark(1, 1);
game.makeMark(2, 0);
*/
/* // DIAGONAL win X 
game.makeMark(0, 0);
game.makeMark(0, 1);
game.makeMark(1, 1);
game.makeMark(0, 2);
game.makeMark(2, 2);
*/
//  ANTI-DIAGONAL win O
// game.makeMark(0, 0);
// game.makeMark(0, 2);
// game.makeMark(0, 1);
// game.makeMark(1, 1);
// game.makeMark(2, 2);
// game.makeMark(2, 0);

// TIE
game.makeMark(0, 0);
game.makeMark(0, 2);
game.makeMark(0, 1);

game.makeMark(1, 1);
game.makeMark(2, 2);
game.makeMark(1, 0);

game.makeMark(1, 2);
game.makeMark(2, 1);
game.makeMark(2, 0);




/*
function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}

console.log(arraysEqual([1, 1, 1], [1, 1, 1])); // true
console.log(arraysEqual([1, 2, 3], [1, 2, 4])); // false
*/











/*
** The Gameboard represents the state of the board
** Each square holds a Cell (defined later)
** and we expose a dropToken method to be able to add Cells to squares
*/

// function Gameboard() {
//   const rows = 6;
//   const columns = 7;
//   const board = [];

//   // Create a 2d array that will represent the state of the game board
//   // For this 2d array, row 0 will represent the top row and
//   // column 0 will represent the left-most column.
//   // This nested-loop technique is a simple and common way to create a 2d array.
//   for (let i = 0; i < rows; i++) {
//     board[i] = [];
//     for (let j = 0; j < columns; j++) {
//       board[i].push(Cell());
//     }
//   }

//   // This will be the method of getting the entire board that our
//   // UI will eventually need to render it.
//   const getBoard = () => board;

//   // In order to drop a token, we need to find what the lowest point of the
//   // selected column is, *then* change that cell's value to the player number
//   const dropToken = (column, player) => {
//     // Our board's outermost array represents the row,
//     // so we need to loop through the rows, starting at row 0,
//     // find all the rows that don't have a token, then take the
//     // last one, which will represent the bottom-most empty cell
//     const availableCells = board.filter((row) => row[column].getValue() === 0).map(row => row[column]);

//     // If no cells make it through the filter, 
//     // the move is invalid. Stop execution.
//     if (!availableCells.length) return;

//     // Otherwise, I have a valid cell, the last one in the filtered array
//     const lowestRow = availableCells.length - 1;
//     board[lowestRow][column].addToken(player);
//   };

//   // This method will be used to print our board to the console.
//   // It is helpful to see what the board looks like after each turn as we play,
//   // but we won't need it after we build our UI
//   const printBoard = () => {
//     const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
//     console.log(boardWithCellValues);
//   };

//   // Here, we provide an interface for the rest of our
//   // application to interact with the board
//   return { getBoard, dropToken, printBoard };
// }

// /*
// ** A Cell represents one "square" on the board and can have one of
// ** 0: no token is in the square,
// ** 1: Player One's token,
// ** 2: Player 2's token
// */

// function Cell() {
//   let value = 0;

//   // Accept a player's token to change the value of the cell
//   const addToken = (player) => {
//     value = player;
//   };

//   // How we will retrieve the current value of this cell through closure
//   const getValue = () => value;

//   return {
//     addToken,
//     getValue
//   };
// }

// /* 
// ** The GameController will be responsible for controlling the 
// ** flow and state of the game's turns, as well as whether
// ** anybody has won the game
// */
// function GameController(
//   playerOneName = "Player One",
//   playerTwoName = "Player Two"
// ) {
//   const board = Gameboard();

//   const players = [
//     {
//       name: playerOneName,
//       token: 1
//     },
//     {
//       name: playerTwoName,
//       token: 2
//     }
//   ];

//   let activePlayer = players[0];

//   const switchPlayerTurn = () => {
//     activePlayer = activePlayer === players[0] ? players[1] : players[0];
//   };
//   const getActivePlayer = () => activePlayer;

//   const printNewRound = () => {
//     board.printBoard();
//     console.log(`${getActivePlayer().name}'s turn.`);
//   };

//   const playRound = (column) => {
//     // Drop a token for the current player
//     console.log(
//       `Dropping ${getActivePlayer().name}'s token into column ${column}...`
//     );
//     board.dropToken(column, getActivePlayer().token);

//     /*  This is where we would check for a winner and handle that logic,
//         such as a win message. */

//     // Switch player turn
//     switchPlayerTurn();
//     printNewRound();
//   };

//   // Initial play game message
//   printNewRound();

//   // For the console version, we will only use playRound, but we will need
//   // getActivePlayer for the UI version, so I'm revealing it now
//   return {
//     playRound,
//     getActivePlayer
//   };
// }

// const game = GameController();

// below what to put into console to play:
// game.playRound(0);


