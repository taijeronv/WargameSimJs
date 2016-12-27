var WarGame = WarGame || {};
WarGame.Phases = WarGame.Phases || {};
WarGame.Phases.Priority = {};

WarGame.Phases.Priority.index = -1;

WarGame.Phases.Priority.start = function () {
    // roll dice for each team
    var one = WarGame.Utils.diceRoll()[0];
    var two = WarGame.Utils.diceRoll()[0];
    if (one === two) {
      // retry if equal
        WarGame.Phases.Priority.start();
        return;
    }
    if (one > two) {
        WarGame.Phases.Priority.index = 0;
    } else {
        WarGame.Phases.Priority.index = 1;
    }

    WarGame.Phases.Priority.end();
};

WarGame.Phases.Priority.end = function () {
    // move to next phase
    WarGame.Phases.next();
};
