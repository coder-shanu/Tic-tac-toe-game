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
        boxes[index].style.pointerEvents = "all";
    });
    gameinfo.innerText = `Current player - ${currentplayer}`;
}

initGame();

function handleclick(index) {
    if (Gamegrid[index] == "") {
        Gamegrid[index] = currentplayer;
        boxes[index].innerText = currentplayer;
        // Swap turn
        swapturn();
        // Check if any player won
        checkgameover();
    }
}

function swapturn() {
    if (currentplayer == "X") {
        currentplayer = "O";
    } else {
        currentplayer = "X";
    }
    gameinfo.innerText = `Current player - ${currentplayer}`;
}

function checkgameover() {
    let winner = null;
    winning_positions.forEach((position) => {
        const [a, b, c] = position;
        if (Gamegrid[a] && Gamegrid[a] === Gamegrid[b] && Gamegrid[a] === Gamegrid[c]) {
            winner = Gamegrid[a];
        }
    });

    if (winner) {
        gameinfo.innerText = `Winner - ${winner}`;
        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        });
    } else if (!Gamegrid.includes("")) {
        gameinfo.innerText = "Draw!";
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => handleclick(index));
});

buttonclick.addEventListener('click', initGame);
