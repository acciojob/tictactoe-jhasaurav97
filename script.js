//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("user-form");
  const userOne = document.getElementById("player1");
  const userTwo = document.getElementById("player2");
  const submitBtn = document.getElementById("submit");
  const userBoxes = document.getElementById("user-box");
  const message = document.querySelector(".message");
  const boxes = document.querySelectorAll(".box");

  let currentPlayer = "X";
  let selectedBox = null;
  let isGameOver = false;

  const winnerPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // row
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], //column
    [0, 4, 8],
    [2, 4, 6], // diagonal
  ];

  function checkWinner() {
    return winnerPattern.find((pattern) => {
      const [a, b, c] = pattern;
      return (
        boxes[a].textContent !== "" &&
        boxes[a].textContent === boxes[b].textContent &&
        boxes[b].textContent === boxes[c].textContent
      );
    });
  }

  submitBtn.addEventListener("click", () => {
    if (userOne.value && userTwo.value) {
      userForm.style.display = "none";
      userBoxes.style.display = "block";
      message.textContent = `${userOne.value}, you're up`;
    }
  });

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (isGameOver || box.textContent !== "") return;
      selectedBox = box;
    });
  });

  document.addEventListener("keydown", () => {
    if (isGameOver || !selectedBox) return;

    if (selectedBox.textContent === "") {
      selectedBox.textContent = currentPlayer;

      const winnerPattern = checkWinner();
      if (winnerPattern) {
        isGameOver = true;
        const winnerName =
          currentPlayer === "X" ? userOne.value : userTwo.value;
        message.textContent = `${winnerName}, congratulations you won!`;
        winnerPattern.forEach((index) => {
          boxes[index].style.backgroundColor = "green";
        });
        return;
      }

      const isDraw = [...boxes].every((box) => box.textContent !== "");
      if (isDraw) {
        isGameOver = true;
        message.textContent = `It's a draw`;
        return;
      }

      // Switch turn
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      const nextPlayerName =
        currentPlayer === "X" ? userOne.value : userTwo.value;
      message.textContent = `${nextPlayerName}, you're up`;
      selectedBox = null;
    }
  });
})