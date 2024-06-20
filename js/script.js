const Gameboard = () => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;

  const makeMove = (index, mark) => {
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }
    return false;
  };
  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { getBoard, makeMove, resetBoard };
};

const Player = (name, mark) => {
  return { name, mark };
};

const GameController = () => {
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");
  const gameboard = Gameboard();
  let currentPlayer = player1;
  let gameActive = true;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const checkWin = () => {
    const board = gameboard.getBoard();
    console.log(board);
    const winConditions = [
      [0, 1, 2], //rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], //columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], //diagnols
      [2, 4, 6],
    ];
    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] !== "" && board[a] === board[b] && board[b] === board[c])
        return board[a];
    }
    return board.includes("") ? null : "Tie";
  };
  const makeMove = (index) => {
    if (!gameActive) return;
    if (gameboard.makeMove(index, currentPlayer.mark)) {
      const winner = checkWin();
      if (winner) {
        gameActive = false;
        console.log(
          `Game Over! ${
            winner === "Tie" ? "It's a Tie!" : `${currentPlayer.name} Wins!`
          }`
        );
      } else {
        switchPlayer();
      }
    }
  };
  const resetGame = () => {
    gameboard.resetBoard();
    currentPlayer = player1;
    gameActive = true;
  };

  return { makeMove, resetGame, getCurrentPlayer: () => currentPlayer };
};

const game = GameController();
