WarGame.Players.Hero = function (location) {
  var heroStats = new WarGame.Players.PlayerStats(
    6, // mele
    3, // ranged
    5, // strength
    7, // defense
    2, // attacks
    3, // wounds
    6, // courage
    2, // might
    2, // will
    2  // fate
  );

  var heroAttributes = new WarGame.Players.PlayerAttributes(
    'hero',    // name
    50,         // cost
    0.9,        // width
    1.2,          // height
    6,          // move
    15,         // shoot
    null,       // effect
    heroStats  // stats
  );

  WarGame.Players.BasePlayer.call(this, heroAttributes, location);
};

WarGame.Players.Hero.prototype = Object.create(WarGame.Players.BasePlayer.prototype);
WarGame.Players.Hero.prototype.constructor = WarGame.Players.Hero;
