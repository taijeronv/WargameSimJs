var WarGame = WarGame || {};
WarGame.Players = WarGame.Players || {};
WarGame.Players.BasicPlayer = function () {
  var basicStats = new WarGame.Players.PlayerStats(
    3, // mele
    5, // ranged
    3, // strength
    5, // defense
    1, // attacks
    2, // wounds
    3, // courage
    0, // might
    0, // will
    0  // fate
  );

  var basicAttributes = new WarGame.Players.PlayerAttributes(
    'basic',    // name
    15,         // cost
    0.8,        // width
    1,          // height
    5,          // move
    10,         // shoot
    null       // effect
  );

  WarGame.Players.BasePlayer.call(this, basicAttributes, basicStats);
};

WarGame.Players.BasicPlayer.prototype = Object.create(WarGame.Players.BasePlayer.prototype);
WarGame.Players.BasicPlayer.prototype.constructor = WarGame.Players.BasicPlayer;
