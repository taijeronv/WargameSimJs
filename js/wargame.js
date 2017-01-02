var WarGame = WarGame || {};

WarGame.start = function () {
  WarGame._initialize(); // TODO: create menus for picking teams, etc.

  WarGame._animate(); // renders playing field

  WarGame.Phases.startCurrent();
};

WarGame.reset = function () {
    WarGame.Maps.reset();
    WarGame.Phases.reset();
    WarGame.Rounds.reset();
    WarGame.UI.reset();
    WarGame.Teams.reset();

    WarGame.start();
    // TODO: reset ALL THE THINGS!
};

WarGame._animate = function () {
    requestAnimationFrame(WarGame._animate);
    WarGame._processEventQueue();
    WarGame._render();
};

WarGame._render = function () {
    WarGame.UI.update();
};

WarGame._processEventQueue = function () {
  var evt = WarGame.Events.dequeue();
};

WarGame._initialize = function () {
  // TODO: select map through the UI
  var map = new WarGame.Maps.Map10x10();
  WarGame.Maps.set(map);

  // TODO: select teams through the UI
  var red = new WarGame.Teams.Red(100); // points
  var blue = new WarGame.Teams.Blue(100); // points

  /**
   * available players are:
   * - light: weak archers (-10 points)
   * - basic: standard warriors (-15 points)
   * - heavy: strong, slow warriors (-20 points)
   * - hero: powerful warriors with high cost (-50 points)
   */
  // TODO: handle player selection through UI
  red.addPlayer(new WarGame.Players.LightPlayer()); // -10 points
  red.addPlayer(new WarGame.Players.BasicPlayer()); // -15 points
  red.addPlayer(new WarGame.Players.BasicPlayer()); // -15 points
  red.addPlayer(new WarGame.Players.HeavyPlayer()); // -20 points
  red.addPlayer(new WarGame.Players.HeavyPlayer()); // -20 points
  red.addPlayer(new WarGame.Players.HeavyPlayer()); // -20 points

  blue.addPlayer(new WarGame.Players.HeavyPlayer()); // -20 points
  blue.addPlayer(new WarGame.Players.HeroPlayer());  // -50 points
  blue.addPlayer(new WarGame.Players.LightPlayer()); // -10 points
  blue.addPlayer(new WarGame.Players.BasicPlayer()); // -15 points

  WarGame.Teams.add(red);
  WarGame.Teams.add(blue);

  // TODO: handle placing players through UI
  var g = WarGame.Maps.get().getGrid();
  var players = WarGame.Teams.getAllPlayers();
  for (var z=0; z<g.length; z++) {
    for (var x=0; x<g[z].length; x++) {
      var p = players.pop();
      if (p) {
        map.placePlayer(p, new WarGame.Maps.MapLocation(x, z));
      }
    }
  }

  WarGame.UI.initialize();
};
