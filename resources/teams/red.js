var WarGame = WarGame || {};
WarGame.Teams = WarGame.Teams || {};
WarGame.Teams.Red = function(points) {
  WarGame.Teams.BaseTeam.call(this, new WarGame.Teams.TeamAttributes(
    "RED", // name
    0xff0000, // colour
    points));
};

WarGame.Teams.Red.prototype = Object.create(WarGame.Teams.BaseTeam.prototype);
WarGame.Teams.Red.prototype.constructor = WarGame.Teams.Red;
