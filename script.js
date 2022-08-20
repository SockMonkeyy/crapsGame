const images = ["1.svg",
    "2.svg",
    "3.svg",
    "4.svg",
    "5.svg",
    "6.svg"];
let dice = document.querySelectorAll("img");
let total = 0;
let dice1 = 0;
let dice2 = 0;


document.getElementById("reset").disabled = true;
document.getElementById("roll").disabled = true;
document.getElementById("inputText").disabled = false;
document.getElementById('inputText').focus();
document.getElementById('inputText').select();
document.getElementById("submitBtn").disabled = false;
document.getElementById("letsPlay");

let outcome = document.getElementById('total');
let show = document.getElementById('show');
let showWins = document.getElementById('wins');
let showLosses = document.getElementById('losses');
let point = 0;
let wins = 0;
let losses = 0;
let bankRoll = 1000;
let playerInfo = {
    gamesPlayed: 0,
};
const highScores = [];
let maxBank = 0;



function setBet() {


    CurrentbetAmount = Number(document.getElementById('inputText').value);
    if (CurrentbetAmount > bankRoll || CurrentbetAmount == NaN || CurrentbetAmount < 1) {
        gameOver.textContent = `Please enter an amount above 0 and below ${bankRoll}`
        console.log(maxBank);
        return;
    }


    else {
        document.getElementById("roll").disabled = false;
        document.getElementById("reset").disabled = false;
        document.getElementById("roll").disabled = true;
        startNewRound()
        gameOver.textContent = ``

        return (CurrentbetAmount);
    }


}

let message = {
    natural: `That's a natural. You win!`,
    two: `That's snake eyes. You lose!`,
    three: `That's ace duece. You Lose!`,
    twelve: `That's box cars. You lose!`,
    point: `You hit your point. You win!`,
    seven: `That's a 7. Craps you lose!`,
};

// Betting script

let startNewRound = function () {

    playerInfo.point = 0;
    document.getElementById("submitBtn").disabled = true;
    document.getElementById("reset").disabled = false;
    document.getElementById("roll").disabled = false;
}

document.getElementById('roll').onclick = rollBoth;

//Returns Random Number Used for Each Die
function roll(dice) {
    random = Math.floor((Math.random() * 6) + 1);
    document.getElementById(dice).innerHTML = random;
    document.getElementById('inputText').focus();
    document.getElementById('inputText').select();
    return random;
}

function reset() {
    point = 0;
    wins = 0;
    losses = 0;
    show.innerHTML = "To start a game, roll the dice!";
    showWins.innerHTML = "0";
    showLosses.innerHTML = "0";
    document.getElementById("die1").innerHTML = "";
    document.getElementById("die2").innerHTML = "";
    outcome.innerHTML = "";
}

function rollBoth() {

    // Dice Roll Shake Function
    dice.forEach(function (die) {
        die.classList.add("shake");
    });
    setTimeout(function () {
        dice.forEach(function (die) {
            die.classList.remove("shake")
        });

        const dice1 = roll("die1");
        const dice2 = roll("die2");
        dieOneValue = dice1;
        dieTwoValue = dice2;
        const total = dice1 + dice2;
        outcome.innerHTML = total;

        // Dice Roll Image
        if (dice1 == 1) document.querySelector("#die-1").setAttribute('src', images[0]);
        if (dice1 == 2) document.querySelector("#die-1").setAttribute('src', images[1]);
        if (dice1 == 3) document.querySelector("#die-1").setAttribute('src', images[2]);
        if (dice1 == 4) document.querySelector("#die-1").setAttribute('src', images[3]);
        if (dice1 == 5) document.querySelector("#die-1").setAttribute('src', images[4]);
        if (dice1 == 6) document.querySelector("#die-1").setAttribute('src', images[5]);
        if (dice2 == 1) document.querySelector("#die-2").setAttribute('src', images[0]);
        if (dice2 == 2) document.querySelector("#die-2").setAttribute('src', images[1]);
        if (dice2 == 3) document.querySelector("#die-2").setAttribute('src', images[2]);
        if (dice2 == 4) document.querySelector("#die-2").setAttribute('src', images[3]);
        if (dice2 == 5) document.querySelector("#die-2").setAttribute('src', images[4]);
        else if (dice2 == 6) document.querySelector("#die-2").setAttribute('src', images[5]);
        determineOutcome(total);
        document.getElementById('inputText').focus();
        document.getElementById('inputText').select();
        document.getElementById("letsPlay").style.display = 'none';

    },
        500
    );
    return dice1, dice2;
}

function determineOutcome(total) {
    document.getElementById("inputText").disabled = true;
    const bankOutput = document.getElementById('bankRoll')
    if (point == 0) {
        if (total == 7 || total == 11) {
            bankRoll = bankRoll + CurrentbetAmount;
            wins++;
            // added betting code
            display("natural", showWins, wins, playerInfo.wins);
            playerInfo.gamesPlayed++;
            document.getElementById("submitBtn").disabled = false;
            document.getElementById("reset").disabled = true;
            document.getElementById("roll").disabled = true;
            document.getElementById("inputText").disabled = false;
            bankOutput.textContent = `Your Bank is $${bankRoll}`;
            document.getElementById('inputText').focus();
            document.getElementById('inputText').select();
            document.getElementById('show').classList.add('win');


        }
        else if (total == 2) {

            losses++;
            display("two", showLosses, losses);
            document.getElementById("submitBtn").disabled = false;
            document.getElementById("reset").disabled = true;
            document.getElementById("roll").disabled = true;
            document.getElementById("inputText").disabled = false;
            document.getElementById('inputText').focus();
            document.getElementById('inputText').select();
            document.getElementById('show').classList.remove('win');
            bankRoll = bankRoll - CurrentbetAmount;
            bankOutput.textContent = `Your Bank is $${bankRoll}`;


            if (bankRoll == 0) {
                document.getElementById("submitBtn").disabled = true;
                document.getElementById("reset").disabled = false;
                document.getElementById("roll").disabled = true;
                document.getElementById("inputText").disabled = true;
                bankOutput.textContent = `Your Bank is $${bankRoll}`;
                return window.location.assign("./endGameWin.html");

            }

        }
        else if (total == 3) {

            losses++;
            display("three", showLosses, losses);
            document.getElementById("submitBtn").disabled = false;
            document.getElementById("reset").disabled = true;
            document.getElementById("roll").disabled = true;
            document.getElementById("inputText").disabled = false;
            document.getElementById('inputText').focus();
            document.getElementById('inputText').select();
            document.getElementById('show').classList.remove('win');
            bankRoll = bankRoll - CurrentbetAmount;
            bankOutput.textContent = `Your Bank is $${bankRoll}`;

            if (bankRoll == 0) {
                document.getElementById("submitBtn").disabled = true;
                document.getElementById("reset").disabled = false;
                document.getElementById("roll").disabled = true;
                document.getElementById("inputText").disabled = true;
                bankOutput.textContent = `Your Bank is $${bankRoll}`;
                return window.location.assign("./endGameWin.html");
            }
            3000
        }

        else if (total == 12) {

            losses++;
            display("twelve", showLosses, losses);
            document.getElementById("submitBtn").disabled = false;
            document.getElementById("reset").disabled = true;
            document.getElementById("roll").disabled = true;
            document.getElementById("inputText").disabled = false;
            document.getElementById('inputText').focus();
            document.getElementById('inputText').select();
            document.getElementById('show').classList.remove('win');
            bankRoll = bankRoll - CurrentbetAmount;
            bankOutput.textContent = `Your Bank is $${bankRoll}`;

            if (bankRoll == 0) {
                document.getElementById("submitBtn").disabled = true;
                document.getElementById("reset").disabled = false;
                document.getElementById("roll").disabled = true;
                document.getElementById("inputText").disabled = true;
                bankOutput.textContent = `Your Bank is $${bankRoll}`;
                return window.location.assign("./endGameWin.html");
            } 3000



        }
        else if (bankRoll == 0) {
            document.getElementById("submitBtn").disabled = true;
            document.getElementById("reset").disabled = false;
            document.getElementById("roll").disabled = true;
            bankOutput.textContent = `Your Bank is $${bankRoll}`;
            return window.location.assign("./endGameWin.html");
        }

        else {

            point = total;
            inputText.value = '';
            document.getElementById('show').classList.add('win');
            show.innerHTML = "Your point is " + point;
            document.getElementById('inputText').focus();
            document.getElementById('inputText').select();
            
        }


    }
    else {

        if (total == point) {

            wins++;
            // added betting code
            display("point", showWins, wins, playerInfo.wins);
            playerInfo.gamesPlayed++;
            document.getElementById("submitBtn").disabled = false;
            document.getElementById("reset").disabled = true;
            document.getElementById("inputText").disabled = false;
            document.getElementById("roll").disabled = true;
            point = 0;
            bankRoll = bankRoll + CurrentbetAmount;
            document.getElementById('show').classList.add('win');
            bankOutput.textContent = `Your Bank is $${bankRoll}`;
            document.getElementById('inputText').focus();
            document.getElementById('inputText').select();


        }


        if (total == 7) {

            losses++;
            display("seven", showLosses, losses);
            playerInfo.losses = playerInfo.losses + playerInfo.amountBet;
            point = 0;
            bankRoll = bankRoll - CurrentbetAmount;
            document.getElementById("submitBtn").disabled = false;
            document.getElementById("reset").disabled = true;
            document.getElementById("roll").disabled = true;
            document.getElementById("inputText").disabled = false;
            document.getElementById('inputText').focus();
            document.getElementById('inputText').select();
            document.getElementById('show').classList.remove('win');
            bankOutput.textContent = `Your Bank is $${bankRoll}`;


        }
        if (bankRoll == 0) {
            document.getElementById("submitBtn").disabled = true;
            document.getElementById("reset").disabled = false;
            document.getElementById("roll").disabled = true;
            document.getElementById("inputText").disabled = false;
            document.getElementById('inputText').focus();
            document.getElementById('inputText').select();
            bankOutput.textContent = `Your Bank is $${bankRoll}`;
            return window.location.assign("./endGameWin.html");
        }
    }

    inputText.value = '';
    highScores.push(bankRoll)
    maxBank = Math.max(...highScores);
    console.log(maxBank);
    localStorage.setItem('maxBank', maxBank);

    return maxBank;
}

localStorage.setItem('maxBank', maxBank);

document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("roll").click();
    }
});


inputText.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("submitBtn").click();
    }

});

document.addEventListener("keypress", function (event) {
    if (event.key === "r") {
        event.preventDefault();
        document.getElementById("reset").click();
    }

});


function setGameOver() {
    document.getElementById('inputText').disabled = true;
    location.reload();

};



function display(msg, c, w) {
    show.innerHTML = message[msg];
    c.innerHTML = w;
}