var WarGame = WarGame || {};
WarGame.Battles = WarGame.Battles || {};
WarGame.Battles.RangedBattle = function () {
    WarGame.Battles.BaseBattle.call(this);

    this.attacksRemaining = 0;
};
WarGame.Battles.RangedBattle.prototype = Object.create(WarGame.Battles.BaseBattle.prototype);
WarGame.Battles.RangedBattle.prototype.constructor = WarGame.Battles.RangedBattle;

WarGame.Battles.RangedBattle.prototype.addAttacker = function (player) {
    if (this.getAttackers().length === 0) {
        this.attacksRemaining = player.getAttacks();
        this._addPlayerTo(player, this._attackers);
    } else {
        throw 'cannot add more than one attacker to a ranged battle.';
    }
};

WarGame.Battles.RangedBattle.prototype.start = function () {
    /* jshint loopfunc: true */
    for (var i=0; i<this._opponents.length; i++) {
        var roll = WarGame.Utils.diceRoll();
        if (roll >= this._attackers[0].getRanged()) {
            var success = WarGame.Battles.tryWound(this._attackers[0], this._opponents[0]);
            if (success) {
                // TODO: let winner pick who to wound
                this._opponents[0].inflictWound();
            }
        }
    }
};
