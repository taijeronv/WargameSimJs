var WarGame = WarGame || {};
WarGame.Teams = WarGame.Teams || {};
WarGame.Teams.Blue = function(points) {
  WarGame.Teams.BaseTeam.call(this, new WarGame.Teams.TeamAttributes(
    "BLUE", // name
    0x0044ff, // colour
    points));
};

WarGame.Teams.Blue.prototype = Object.create(WarGame.Teams.BaseTeam.prototype);
WarGame.Teams.Blue.prototype.constructor = WarGame.Teams.Blue;
