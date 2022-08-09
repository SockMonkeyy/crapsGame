let outcome = document.getElementById('total');
let show = document.getElementById('show');
let showWins = document.getElementById('wins');
let showLosses = document.getElementById('losses');
let point = 0;
let wins = 0;
let losses = 0;
let betDefault = 25;
let currentBet = document.getElementById('currentBet').value;

//Player info
let playerInfo = {
	startBank: 1000,
	gamesPlayed: 0,
	
};

let message = {
    natural: "That's a natural. You win!",
    two: "That's snake eyes. You lose.",
    three: "That's ace duece. You Lose.",
    twelve: "That's box cars. You lose.",
    point: "You hit your point. You win!",
    seven: "That's a 7. Craps you lose.",
};

let startNewRound = function () {
	showPlayerInfo();
	playerInfo.point = 0;
	// allow betting again
	//reset bet amount
	enableButtons();
	// clear betting area
	playerInfo.amountBet = 0;


}
function currentBet() {
    currentBet = document.getElementById('currentBet').value;
    document.getElementById("currentBet").innerHTML = currentBet;
    console.log(currentBet);
    return currentBet;

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
    if (point == 0) {
        if (total == 7 || total == 11) {

            wins++;
           
            display("natural", showWins, wins);
            playerInfo.gamesPlayed++;
            document.getElementById("gamesPlayed").innerHTML = "";
            playerInfo.wins = playerData.wins + playerData.amountBet;
            startNewRound()
			return true;
        }
        else if (total == 2) {

            losses++;
            display("two", showLosses, losses);
        }
        else if (total == 3) {

            losses++;
            display("three", showLosses, losses);
        }
        else if (total == 12) {

            losses++;
            display("twelve", showLosses, losses);
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
			player.bankroll = playerInfo.amountBet + playerInfo.bankroll;
			playerInfo.gamesPlayed++;
			playerInfo.wins = playerData.wins + playerData.amountBet;
			startNewRound()
			point = 0;
			return true;
        }


        if (total == 7) {

            losses++;
            display("seven", showLosses, losses);
            point = 0;
        }
    }

}


function display(msg, c, w) {
    show.innerHTML = message[msg];
    c.innerHTML = w;
}