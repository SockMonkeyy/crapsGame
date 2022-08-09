document.getElementById("reset").disabled = true;
document.getElementById("roll").disabled = true;

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


function setBet() {
    CurrentbetAmount = Number(document.getElementById('inputText').value);
    if (CurrentbetAmount > bankRoll || CurrentbetAmount == NaN || CurrentbetAmount < 1) {
        alert(`Please enter an amount above 0 below ${bankRoll}`)
    }
    else {
        document.getElementById("roll").disabled = false;
        document.getElementById("reset").disabled = true;
        document.getElementById("roll").disabled = true;
        startNewRound()
        console.log(CurrentbetAmount);
        return (CurrentbetAmount);
    }
}
let message = {
    natural: `That's a natural. You win!`,
    two: `That's snake eyes. You lose!`,
    three: `That's ace duece. You Lose!`,
    twelve: `That's box cars. You lose!`,
    point: `You hit your point. You won!`,
    seven: `That's a 7. Craps you lose!`,
};

// Betting script

let startNewRound = function () {

    playerInfo.point = 0;
    // allow betting again
    //reset bet amount

    // clear betting area
    document.getElementById("submitBtn").disabled = true;
    document.getElementById("reset").disabled = false;
    document.getElementById("roll").disabled = false;

}

document.getElementById('roll').onclick = rollBoth;
document.getElementById('reset').onclick = reset;


function roll(dice) {
    var random = Math.floor((Math.random() * 6) + 1);
    document.getElementById(dice).innerHTML = random;
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
    let dice1 = roll("die1");
    let dice2 = roll("die2");
    let total = dice1 + dice2;
    outcome.innerHTML = total;
    determineOutcome(total);
}

function determineOutcome(total) {
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
            bankOutput.textContent = `Your Bank is $${bankRoll}`;
            console.log(bankRoll);


        }
        else if (total == 2) {

            losses++;
            display("two", showLosses, losses);
            document.getElementById("submitBtn").disabled = false;
            document.getElementById("reset").disabled = true;
            document.getElementById("roll").disabled = true;
            bankRoll = bankRoll - CurrentbetAmount;
            bankOutput.textContent = `Your Bank is $${bankRoll}`;
          

            if (bankRoll == 0) {
            document.getElementById("submitBtn").disabled = true;
            document.getElementById("reset").disabled = true;
            document.getElementById("roll").disabled = true;
            bankOutput.textContent = `Your Bank is $${bankRoll}`;
            alert("You Rolled 2 and have $0 . . . Game Over!!!! Please Refresh the page to Play Again")
        }
            console.log(bankRoll);

        }
        else if (total == 3) {

            losses++;
            display("three", showLosses, losses);
            document.getElementById("submitBtn").disabled = false;
            document.getElementById("reset").disabled = true;
            document.getElementById("roll").disabled = true;
            bankRoll = bankRoll - CurrentbetAmount;
            console.log(bankRoll);
            bankOutput.textContent = `Your Bank is $${bankRoll}`;

            if (bankRoll == 0) {
            document.getElementById("submitBtn").disabled = true;
            document.getElementById("reset").disabled = true;
            document.getElementById("roll").disabled = true;
            bankOutput.textContent = `Your Bank is $${bankRoll}`;
            alert("You Rolled 3 and have $0 . . . Game Over!!!! Please Refresh the page to Play Again")
        }



        }
        else if (total == 12) {

            losses++;
            display("twelve", showLosses, losses);
            document.getElementById("submitBtn").disabled = false;
            document.getElementById("reset").disabled = true;
            document.getElementById("roll").disabled = true;
            bankRoll = bankRoll - CurrentbetAmount;
            console.log(bankRoll);
            bankOutput.textContent = `Your Bank is $${bankRoll}`;

            if (bankRoll == 0) {
            document.getElementById("submitBtn").disabled = true;
            document.getElementById("reset").disabled = true;
            document.getElementById("roll").disabled = true;
            bankOutput.textContent = `Your Bank is $${bankRoll}`;
            alert("You Rolled 12 and have $0 . . . Game Over!!!! Please Refresh the page to Play Again")
        }



        }
        else if (bankRoll == 0) {
            alert("Your Broke!!! Game Over!!!! Please Refresh the page to Play Again")
            document.getElementById("submitBtn").disabled = true;
            document.getElementById("reset").disabled = true;
            document.getElementById("roll").disabled = true;
            bankOutput.textContent = `Your Bank is $${bankRoll}`;
        }

        else {

            point = total;

            show.innerHTML = "Your point is " + point;
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
            document.getElementById("roll").disabled = true;
            point = 0;
            bankRoll = bankRoll + CurrentbetAmount;
            bankOutput.textContent = `Your Bank is $${bankRoll}`;
            console.log(bankRoll);


        }


        if (total == 7) {

            losses++;
            display("seven", showLosses, losses);
            playerInfo.losses = playerInfo.losses + playerInfo.amountBet;
            point = 0;
            bankRoll = bankRoll - CurrentbetAmount;
            console.log(bankRoll);
            document.getElementById("submitBtn").disabled = false;
            document.getElementById("reset").disabled = true;
            document.getElementById("roll").disabled = true;
            bankOutput.textContent = `Your Bank is $${bankRoll}`;


        }
         if (bankRoll == 0) {
            alert("Thats Craps!!! Your Broke!!! Game Over!!!! Please Refresh the page to Play Again")
            document.getElementById("submitBtn").disabled = true;
            document.getElementById("reset").disabled = true;
            document.getElementById("roll").disabled = true;
            bankOutput.textContent = `Your Bank is $${bankRoll}`;
        }
    }

}




function display(msg, c, w) {
    show.innerHTML = message[msg];
    c.innerHTML = w;
}