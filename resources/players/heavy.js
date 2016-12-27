WarGame.Players.Heavy = function (location) {
  var heavyStats = new WarGame.Players.PlayerStats(
    5, // mele
    5, // ranged
    5, // strength
    7, // defense
    1, // attacks
    3, // wounds
    5, // courage
    1, // might
    1, // will
    0  // fate
  );

  var heavyAttributes = new WarGame.Players.PlayerAttributes(
    'heavy',    // name
    20,         // cost
    1,        // width
    0.8,          // height
    3,          // move
    6,         // shoot
    null,       // effect
    heavyStats  // stats
  );

  WarGame.Players.BasePlayer.call(this, heavyAttributes, location);
};

WarGame.Players.Heavy.prototype = Object.create(WarGame.Players.BasePlayer.prototype);
WarGame.Players.Heavy.prototype.constructor = WarGame.Players.Heavy;
