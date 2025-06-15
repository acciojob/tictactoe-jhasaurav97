//your JS code here. If required.
 const userForm = document.getElementById("user-form");
    const userOne = document.getElementById("player1");
    const userTwo = document.getElementById("player2");
    const submitBtn = document.getElementById("submit");
    const userBoxes = document.getElementById("user-box");
    const message = document.querySelector(".message");
    const boxes = document.querySelectorAll(".box");

    let currentPlayer = "x";
    let player1 = "";
    let player2 = "";
    let gameOver = false;
    const board = Array(9).fill("");

    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    function checkWinner() {
      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
          gameOver = true;
          const winnerName = currentPlayer === "x" ? player1 : player2;
          message.textContent = `${winnerName} congratulations you won!`;
          return;
        }
      }
    }

    function switchTurn() {
      currentPlayer = currentPlayer === "x" ? "o" : "x";
      const nextPlayer = currentPlayer === "x" ? player1 : player2;
      message.textContent = `${nextPlayer}, you're up`;
    }

    submitBtn.addEventListener("click", () => {
      player1 = userOne.value.trim();
      player2 = userTwo.value.trim();

      if (!player1 || !player2) {
        alert("Please enter names for both players.");
        return;
      }

      userForm.style.display = "none";
      userBoxes.style.display = "block";
      message.textContent = `${player1}, you're up`;
    });

    boxes.forEach((box, index) => {
      box.addEventListener("click", () => {
        if (box.textContent || gameOver) return;

        board[index] = currentPlayer;
        box.textContent = currentPlayer;

        checkWinner();
        if (!gameOver) switchTurn();
      });
    });