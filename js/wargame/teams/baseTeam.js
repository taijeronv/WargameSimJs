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
    this.attributes = attributes;
    this.players = [];
    this.remainingPoints = this.attributes.points;
    this.score = 0;
};

WarGame.Teams.BaseTeam.prototype.addPlayer = function (player) {
    if (this.remainingPoints - player.getCost() >= 0) {
        this.remainingPoints -= player.getCost();
        player.setTeam(this);
        this.players.push(player);
    } else {
        throw "not enough points to add player.";
    }
};

WarGame.Teams.BaseTeam.prototype.removePlayer = function (player) {
    for (var plyr of this.players) {
      if (plyr === player) {
        this.remainingPoints += plyr.getCost();
        break;
      }
    }
    this.players = this.players.filter(function (p) {
        return p !== player;
    });
};

WarGame.Teams.BaseTeam.prototype.getPlayers = function () {
    return this.players;
};

WarGame.Teams.BaseTeam.prototype.getName = function () {
    return this.attributes.name;
};

WarGame.Teams.BaseTeam.prototype.getColour = function () {
    return this.attributes.colour;
};

WarGame.Teams.BaseTeam.prototype.getRemainingPoints = function () {
    return this.remainingPoints;
};

WarGame.Teams.BaseTeam.prototype.getScore = function () {
    return this.score;
};

WarGame.Teams.BaseTeam.prototype.reset = function () {
    this.players = [];
    this.score = 0;
    this.remainingPoints = this.attributes.points;
};
