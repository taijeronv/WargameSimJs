WarGame.Players.HeroPlayer = function (location) {
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
    null       // effect
  );

  WarGame.Players.BasePlayer.call(this, heroAttributes, heroStats);
};

WarGame.Players.HeroPlayer.prototype = Object.create(WarGame.Players.BasePlayer.prototype);
WarGame.Players.HeroPlayer.prototype.constructor = WarGame.Players.HeroPlayer;
