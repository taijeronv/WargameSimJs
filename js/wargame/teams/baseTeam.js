var WarGame = WarGame || {};
WarGame.Teams = WarGame.Teams || {};
WarGame.Teams.BaseTeam = function (attributes) {
    if (!attributes.name || attributes.name === '' || !isNaN(attributes.name)) {
        throw 'name must be a non-empty string';
    }
    if (!attributes.colour || isNaN(attributes.colour)) {
        throw 'colour must be a valid hex number like: 0xa1b6ff';
    }
    if (!attributes.points || isNaN(attributes.points) || attributes.points < 1) {
        throw 'team must start with more than 0 points';
    }
    this._attributes = attributes;
    this._players = [];
    this._remainingPoints = this._attributes.points;
    this._score = 0;
};

WarGame.Teams.BaseTeam.prototype.addPlayer = function (player) {
    if (this._remainingPoints - player.getCost() >= 0) {
        this._remainingPoints -= player.getCost();
        player.setTeam(this);
        this._players.push(player);
    } else {
        throw "not enough points to add player.";
    }
};

WarGame.Teams.BaseTeam.prototype.removePlayer = function (player) {
    for (var plyr of this._players) {
      if (plyr === player) {
        this._remainingPoints += plyr.getCost();
        break;
      }
    }
    this._players = this._players.filter(function (p) {
        return p !== player;
    });
};

WarGame.Teams.BaseTeam.prototype.getPlayers = function () {
    return this._players;
};

WarGame.Teams.BaseTeam.prototype.getName = function () {
    return this._attributes.name;
};

WarGame.Teams.BaseTeam.prototype.getColour = function () {
    return this._attributes.colour;
};

WarGame.Teams.BaseTeam.prototype.getRemainingPoints = function () {
    return this._remainingPoints;
};

WarGame.Teams.BaseTeam.prototype.getScore = function () {
    return this._score;
};

WarGame.Teams.BaseTeam.prototype.reset = function () {
    this._players = [];
    this._score = 0;
    this._remainingPoints = this._attributes.points;
};
