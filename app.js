 document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll(".box");
    const resetBtn = document.querySelector("#reset-btn");

    let turnO = true; // true => O's turn, false => X's turn

    const winPatterns = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];

    const handleClick = (e) => {
        const box = e.target; //By storing it in a variable called box, the function can now interact with that specific clicked button.

        if (box.innerText !== "") return; // it checks whethr its empty or Already clicked , if not empty it returns

        box.innerText = turnO ? "O" : "X"; // ternery oprtr, So if turnO is true, it puts "O" in the box. Otherwise, it puts "X".
        box.disabled = true; // Disable that box so it can't be clicked again
        turnO = !turnO; //or viceversa to flip the player

        checkWinner();
    };

    const checkWinner = () => {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;//e.g., a=0, b=1, c=2

            const val1 = boxes[a].innerText;
            const val2 = boxes[b].innerText;
            const val3 = boxes[c].innerText;//gets the symbols ("O" or "X") from the corresponding boxes

            if (val1 !== "" && val1 === val2 && val2 === val3) { 
                //If none of the values are empty and all three are the same, we have a winner → call showWinner
                showWinner(val1);
                return;
            }
        }

        // Check for draw
        const allFilled = [...boxes].every(box => box.innerText !== "");
        if (allFilled) {
            showWinner("Draw");
        }
    };

    const showWinner = (winner) => {
        setTimeout(() => {
            if (winner === "Draw") {
                alert("It's a Draw!");
            } else {
                alert(`Winner is ${winner}!`);
            }
            disableAllBoxes();
        }, 100); // Slight delay to show the final move
    };

    const disableAllBoxes = () => {
        boxes.forEach(box => box.disabled = true);//Disables all boxes so that no one can make a move after the game is over.
    };

    const enableAllBoxes = () => {//Re-enables all buttons for a new game.


        boxes.forEach(box => {
            box.innerText = "";
            box.disabled = false;
        });
        turnO = true;//Sets the turn back to player "O".


    };

    boxes.forEach(box => {
    box.addEventListener("click", handleClick);
    //Adds a click listener to each box to trigger the game logic.


    });

    resetBtn.addEventListener("click", enableAllBoxes);//enablle all box logic after reset
});