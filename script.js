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

    console.log(players[0].name);
    console.log(players[1].name);

    let round = 0;
    let win = 0;
    let board = gameboard();

    const cell = document.querySelectorAll('.cell')
    const display = document.querySelector('[data-display]')

    //TODO: add player's names to display
    const resetBoard = () => {
        round = 0;
        win = 0;
        activePlayer = 0;
        board = gameboard();

        cell.forEach(c => {
            c.textContent = '';
            c.disabled = false;
        });

        display.textContent = `Player ${players[activePlayer].marker}'s turn`;
    }

    const disableCells = () => {
        cell.forEach(c => {
            c.disabled = true;
        });
    }

    const checkWinner = () => {
        round++;
        // console.log(round);
        
        // Check rows
        for (let row = 0; row < 3; row++) {
            if (
                board[row][0] !== '-' &&
                board[row].every(cell => cell === board[row][0])
            ) {
                console.log("winner winner chicken dinner ROWS" + activePlayer);
                // display.textContent = `Player ${board[row][0]} has won!`;
                display.textContent = `${players[activePlayer].name} has won!`;
                win = 1;
                disableCells();
                // resetBoard();
                return board[row][0]; // Return 'X' or 'O'
            }
        }

        // checks columns
        for (let column = 0; column < 3; column++) {
            let first = board[0][column];

            if (
                first !== '-' &&
                first === board[1][column] &&
                first === board[2][column]
            ) {
                console.log("winner winner chicken dinner COLUMNS: " + board[0][column]);
                // display.textContent = `Player ${first} has won!`;
                display.textContent = `${players[activePlayer].name} has won!`;
                win = 1;
                disableCells();
                // resetBoard();
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
            // display.textContent = `Player ${board[0][0]} has won!`;
            display.textContent = `${players[activePlayer].name} has won!`;
            win = 1;
            disableCells();
            // resetBoard();
            return board[0][0]; // Return 'X' or 'O'
        }
        if (
            board[0][2] !== '-' &&
            board[0][2] === board[1][1] &&
            board[1][1] === board[2][0]
        ) {
            console.log("winner winner chicken dinner anti-main DIAGONAL: " + board[0][2]);
            // display.textContent = `Player ${board[0][2]} has won!`;
            display.textContent = `${players[activePlayer].name} has won!`;
            win = 1;
            disableCells();
            // resetBoard();
            return board[0][2]; // Return 'X' or 'O'
        }

        if (round === 9) {
            console.log("It's a TIE!!!!!");
            display.textContent = "It's a TIE!!!!!";
            // resetBoard();
        }
    }

    let activePlayer = 0;

    const makeMark = (row, column) => {
        if (board[row][column] === 'X' || board[row][column] === 'O') {
            console.log('ERROR: already marked square');
            return;
        }

        console.log(`${players[activePlayer].name} plays:`);
        board[row][column] = players[activePlayer].marker;

        console.log(board);

        checkWinner();

        activePlayer > 0 ? activePlayer-- : activePlayer++;


        if (win) return;
        display.textContent = `Player ${players[activePlayer].marker}'s turn`;

        // checkWinner();

    }

    display.textContent = `Player ${players[activePlayer].marker}'s turn`;
    // activePlayer === 0 ? 
    // display.textContent = `Player ${players[activePlayer].marker}'s turn` :
    // activePlayer++;

    // Fills cell
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('cell') && e.target.textContent === '') {
            e.target.textContent = players[activePlayer].marker

            const row = Number(e.target.dataset.row);
            const col = Number(e.target.dataset.col);

            makeMark(row, col);
        }
    });

    return {players, makeMark, resetBoard};
}

function initEventListeners() {
    // console.log("initEventListeners");
    const modal = document.querySelector("[data-modal]")
    const form = document.querySelector('form');
    const resetBtn = document.querySelector("[data-reset]")
    const cell = document.querySelectorAll('.cell')

    modal.showModal();

    resetBtn.addEventListener('click', () => {
        console.log("reset");
        game.resetBoard();
    })

    // Closes modal when clicked outside of the modal
    modal.addEventListener("click", e => {
        const dialogDimensions = modal.getBoundingClientRect()
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            game = gameController();
            modal.close();
        }
    })

    //TODO: move form listener here
    // form.addEventListener('submit', (e) => {
    //     e.preventDefault();
        
    //     // Get form input values
    //     const playerOne = document.getElementById('player-one').value;
    //     const playerTwo = document.getElementById('player-two').value;

    //     console.log(playerOne);
        
    //     modal.close();
    // })

}

initEventListeners();

let game; // Global variable
const modal = document.querySelector("[data-modal]")
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form input values
    const playerOne = document.getElementById('player-one').value;
    const playerTwo = document.getElementById('player-two').value;

    const playerOneName = playerOne.trim() || 'Player One';
    const playerTwoName = playerTwo.trim() || 'Player Two';

     // Animate modal closing
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.9)';

    // Animate backdrop blur removal
    modal.style.setProperty('--backdrop-blur', '0px');
    modal.style.setProperty('--backdrop-opacity', '0');
    
    // Wait for animation to finish, then close
    setTimeout(() => {
        modal.close();
        // Reset styles for next time
        modal.style.opacity = '1';
        modal.style.transform = 'scale(1)';

        modal.style.removeProperty('--backdrop-blur');
        modal.style.removeProperty('--backdrop-opacity');
        
        game = gameController(playerOneName, playerTwoName);
    }, 300); // Match your transition duration in CSS
})



// console.log("before gameController");
// const game = gameController();
// console.log("after gameController");

