var WarGame = WarGame || {};
WarGame.Players = WarGame.Players || {};
WarGame.Players.PlayerStats = function (mele, ranged, strength, defense, attacks, wounds, courage, might, will, fate) {
    this.mele = mele;
    this.ranged = ranged;
    this.strength = strength;
    this.defense = defense;
    this.attacks = attacks;
    this.wounds = wounds;
    this.courage = courage;
    this.might = might;
    this.will = will;
    this.fate = fate;
};

WarGame.Players.PlayerStats.prototype.parse = function (json) {
    this.mele = json.mele;
    this.ranged = json.ranged;
    this.strength = json.strength;
    this.defense = json.defense;
    this.attacks = json.attacks;
    this.wounds = json.wounds;
    this.courage = json.courage;
    this.might = json.might;
    this.will = json.will;
    this.fate = json.fate;
};

WarGame.Players.PlayerStats.prototype.toString = function () {
    return 'F: ' + this.mele + '/' + this.ranged + '+, ' +
        'S: ' + this.strength + ', ' +
        'D: ' + this.defense + ', ' +
        'A: ' + this.attacks + ', ' +
        'W: ' + this.wounds + ', ' +
        'C: ' + this.courage + ', ' +
        'Might: ' + this.might + ', ' +
        'Will: ' + this.will + ', ' +
        'Fate: ' + this.fate + ', ';
};
