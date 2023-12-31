let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let againstBot = false;

function startGame(mode) {
    gameActive = true;
    currentPlayer = 'X';
    againstBot = mode === 'bot';
    board = ['', '', '', '', '', '', '', '', ''];
    document.getElementById('status').innerText = '';

    const boardContainer = document.getElementById('board');
    boardContainer.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', () => makeMove(i));
        boardContainer.appendChild(cell);
    }

    if (againstBot && currentPlayer === 'O') {
        makeBotMove();
    }
}

function makeMove(index) {
    if (!gameActive || board[index] !== '') return;

    board[index] = currentPlayer;
    const cell = document.querySelector(`[data-index="${index}"]`);
    cell.innerText = currentPlayer;

    if (checkWin()) {
        document.getElementById('status').innerText = `Player "${currentPlayer}" wins!`;
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        document.getElementById('status').innerText = 'It\'s a draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (againstBot && currentPlayer === 'O' && gameActive) {
            makeBotMove();
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    return winPatterns.some(pattern =>
        pattern.every(index => board[index] === currentPlayer)
    );
}

function makeBotMove() {
    const emptyCells = board.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    setTimeout(() => makeMove(randomIndex), 500);
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = false;
    againstBot = false;
    document.getElementById('status').innerText = '';
    startGame();
}
