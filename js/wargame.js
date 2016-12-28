var WarGame = WarGame || {};

WarGame.initialize = function () {
    WarGame.UI.initialize();

    WarGame.UI.addMesh(WarGame.Maps.get().getObj());
    for (var team of WarGame.Teams.get()) {
      for (var player of team.getPlayers()) {
        WarGame.UI.addMesh(player.getObj());
      }
    }
};

WarGame.render = function () {
    WarGame.UI.update();
};

WarGame.reset = function () {
    WarGame.Maps.reset();
    WarGame.Phases.reset();
    WarGame.Rounds.reset();
    WarGame.UI.reset();
    WarGame.Teams.reset();

    WarGame.initialize();
    // TODO: reset ALL THE THINGS!
};

WarGame.start = function () {
    // TODO: create menus for picking teams, etc.
    WarGame.Phases.doCurrent();
};
