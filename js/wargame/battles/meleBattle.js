var WarGame = WarGame || {};
WarGame.Battles = WarGame.Battles || {};
WarGame.Battles.MeleBattle = function () {
    WarGame.Battles.BaseBattle.call(this);
};
WarGame.Battles.MeleBattle.prototype = Object.create(WarGame.Battles.BaseBattle.prototype);
WarGame.Battles.MeleBattle.prototype.constructor = WarGame.Battles.MeleBattle;

WarGame.Battles.MeleBattle.prototype.start = function () {
    // roll to determine which side wins the attack
    var attackScores = WarGame.Utils.diceRoll(this.getTotalAttackPoints(this.attackers));
    var opponentScores = WarGame.Utils.diceRoll(this.getTotalAttackPoints(this.opponents));
    var i, atkTopScore = 0;
    for (i=0; i<attackScores.length; i++) {
        if (attackScores[i] > atkTopScore) {
            atkTopScore = attackScores[i];
        }
    }
    var oppTopScore = 0;
    for (i=0; i<opponentScores.length; i++) {
        if (opponentScores[i] > oppTopScore) {
            oppTopScore = opponentScores[i];
        }
    }
    // handle a tie
    if (atkTopScore === oppTopScore) {
        // compare highest fight values
        var atkF = this.getHighestMeleValue(this.attackers);
        var oppF = this.getHighestMeleValue(this.opponents);
        // handle matching fight values
        if (atkF === oppF) {
            // reroll to decide winner
            var roll = WarGame.Utils.diceRoll()[0];
            if (roll > 3) {
                atkTopScore++;
            } else {
                oppTopScore++;
            }
        } else if (atkF > oppF) {
            atkTopScore++;
        } else {
            oppTopScore++;
        }
    }
    // TODO: move loser back 1 space or handle trapped condition
    var winner, loser, attacks;
    if (atkTopScore > oppTopScore) {
        // TODO: highlight winners
        winner = this.attackers;
        loser = this.opponents;
        attacks = attackScores;
    } else {
        // TODO: highlight winners
        winner = this.opponents;
        loser = this.attackers;
        attacks = opponentScores;
    }

    /* jshint loopfunc: true */
    for (i=0; i<winner.length; i++) {
        var success = WarGame.Battles.tryWound(winner[i], loser[0]);
        if (success) {
            // TODO: let winner pick who to wound
            loser[0].inflictWound();
            if (loser[0].getWounds() < 1) {
                loser.shift();
                if (loser.length < 1) {
                    break;
                }
            }
        }
    }
};

WarGame.Battles.MeleBattle.prototype.getTotalAttackPoints = function (playerArray) {
    var points = 0;
    for (var i=0; i<playerArray.length; i++) {
        points += playerArray[i].getAttacks();
    }

    return points;
};

WarGame.Battles.MeleBattle.prototype.getHighestMeleValue = function (playerArray) {
    var highest = 0;
    for (var i=0; i<playerArray.length; i++) {
        if (playerArray[i].getMele() > highest) {
            highest = playerArray[i].getMele();
        }
    }

    return highest;
};
