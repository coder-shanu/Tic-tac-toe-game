const gameinfo = document.querySelector('.cont1');
const buttonclick = document.querySelector('.btn');
const boxes = document.querySelectorAll('.cont2');
const winning_positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

let currentplayer;
let Gamegrid;

function initGame() {
    currentplayer = "X";
    Gamegrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.style.backgroundColor = ""; // Reset background color
    });
    gameinfo.innerText = `Current Player - ${currentplayer}`;
}

initGame();

function handleclick(index) {
    if (Gamegrid[index] === "") {
        Gamegrid[index] = currentplayer;
        boxes[index].innerText = currentplayer;
        // Check if game is over
        if (!checkgameover()) {
            // Swap turn if game is not over
            swapturn();
        }
    }
}

function swapturn() {
    currentplayer = currentplayer === "X" ? "O" : "X";
    gameinfo.innerText = `Current Player - ${currentplayer}`;
}

function checkgameover() {
    let isGameOver = false;
    winning_positions.forEach((position) => {
        const [a, b, c] = position;
        if (Gamegrid[a] && Gamegrid[a] === Gamegrid[b] && Gamegrid[a] === Gamegrid[c]) {
            isGameOver = true;
            boxes[a].style.backgroundColor = boxes[b].style.backgroundColor = boxes[c].style.backgroundColor = 'lightgreen';
            gameinfo.innerText = `Winner - ${Gamegrid[a]}`;
            boxes.forEach(box => box.style.pointerEvents = 'none');
        }
    });
    
    if (!isGameOver && Gamegrid.every(box => box !== "")) {
        gameinfo.innerText = 'Draw!';
        isGameOver = true;
    }

    return isGameOver;
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => handleclick(index));
});

buttonclick.addEventListener('click', initGame);
