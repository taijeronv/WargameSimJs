var WarGame = WarGame || {};
WarGame.Players = WarGame.Players || {};
WarGame.Players.Light = function () {
  var lightStats = new WarGame.Players.PlayerStats(
    1, // mele
    1, // ranged
    2, // strength
    2, // defense
    1, // attacks
    1, // wounds
    1, // courage
    0, // might
    0, // will
    0  // fate
  );

  var lightAttributes = new WarGame.Players.PlayerAttributes(
    'light',    // name
    10,         // cost
    0.5,        // width
    1.2,        // height
    7,          // move
    14,         // shoot
    null,       // effect
    lightStats  // stats
  );

  WarGame.Players.BasePlayer.call(this, lightAttributes);
};

WarGame.Players.Light.prototype = Object.create(WarGame.Players.BasePlayer.prototype);
WarGame.Players.Light.prototype.constructor = WarGame.Players.Light;
