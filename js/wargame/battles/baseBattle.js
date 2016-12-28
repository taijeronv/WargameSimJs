var WarGame = WarGame || {};
WarGame.Battles = WarGame.Battles || {};
WarGame.Battles.BaseBattle = function () {
    this._attackers = [];
    this._opponents = [];
};

WarGame.Battles.BaseBattle.prototype.addAttacker = function (player) {
    this._addPlayerTo(player, this._attackers);
};

WarGame.Battles.BaseBattle.prototype.getAttackers = function () {
  return this._attackers;
};

WarGame.Battles.BaseBattle.prototype.addOpponent = function (player) {
    this._addPlayerTo(player, this._opponents);
};

WarGame.Battles.BaseBattle.prototype.getOpponents = function () {
  return this._opponents;
};

WarGame.Battles.BaseBattle.prototype.addOpponents = function (playerArray) {
    for (var i=0; i<playerArray.length; i++) {
        this.addOpponent(playerArray[i]);
    }
};

WarGame.Battles.BaseBattle.prototype.addOpponent = function (player) {
    this._addPlayerTo(player, this._opponents);
};

WarGame.Battles.BaseBattle.prototype.hasAttacker = function (player) {
    return this._hasPlayerIn(player, this._attackers);
};

WarGame.Battles.BaseBattle.prototype.hasOpponent = function (player) {
    return this._hasPlayerIn(player, this._opponents);
};

WarGame.Battles.BaseBattle.prototype.hasPlayer = function (player) {
    var hasAtk = this.hasAttacker(player);
    if (hasAtk) {
        return true;
    } else {
        return this.hasOpponent(player);
    }
};

WarGame.Battles.BaseBattle.prototype.getPlayers = function () {
    var players = [], i;
    for (i=0; i<this._attackers.length; i++) {
        players.push(this._attackers[i]);
    }
    for (i=0; i<this._opponents.length; i++) {
        players.push(this._opponents[i]);
    }

    return players;
};

WarGame.Battles.BaseBattle.prototype.start = function () {
    throw 'abstract base method cannot be called. please use concrete class.';
};

WarGame.Battles.BaseBattle.prototype._addPlayerTo = function (player, array) {
    // ensure not already here
    var alreadyExists = false;
    for (var i=0; i<array.length; i++) {
        if (player === array[i]) {
            alreadyExists = true;
            break;
        }
    }
    if (!alreadyExists) {
        array.push(player);
    }
};

WarGame.Battles.BaseBattle.prototype._hasPlayerIn = function (player, array) {
    for (var i=0; i<array.length; i++) {
        if (player === array[i]) {
            return true;
        }
    }
    return false;
};
