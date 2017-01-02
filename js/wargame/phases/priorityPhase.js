var WarGame = WarGame || {};
WarGame.Phases = WarGame.Phases || {};
WarGame.Phases.PriorityPhase = {};

WarGame.Phases.PriorityPhase._index = 0;

WarGame.Phases.PriorityPhase._name = 'priority';

WarGame.Phases.PriorityPhase.getName = function () {
  return WarGame.Phases.PriorityPhase._name;
};

/**
 * this phase is responsible for selecting which team goes
 * first in each subsequent phase of the current round
 */
WarGame.Phases.PriorityPhase.start = function () {
  // TODO: handle more than 2 teams
  // roll dice for each team
  var one = WarGame.Utils.diceRoll()[0];
  var two = WarGame.Utils.diceRoll()[0];
  if (one === two) {
    // retry if equal
    WarGame.Phases.PriorityPhase.start();
    return;
  }
  if (one > two) {
    WarGame.Phases.PriorityPhase._index = 0;
  } else {
    WarGame.Phases.PriorityPhase._index = 1;
  }
  WarGame.Phases._currentTeam = WarGame.Phases.PriorityPhase._index;

  WarGame.Phases.PriorityPhase.end();
};

WarGame.Phases.PriorityPhase.end = function () {
  WarGame.Phases.next();
};

WarGame.Phases.PriorityPhase.getPriorityTeam = function () {
  return WarGame.Teams.get()[WarGame.Phases.PriorityPhase._index];
};

WarGame.Phases._array[WarGame.Phases.PRIORITY] = WarGame.Phases.PriorityPhase;
