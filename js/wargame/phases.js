var WarGame = WarGame || {};
WarGame.Phases = {};

WarGame.Phases.PRIORITY = 0;
WarGame.Phases.MOVEMENT = 1;
WarGame.Phases.SHOOTING = 2;
WarGame.Phases.FIGHTING = 3;

WarGame.Phases.CURRENT_PHASE = WarGame.Phases.PRIORITY; // start at 0
WarGame.Phases.TEAMS_COMPLETED_PHASE = 0; // tracks number of teams who have completed current phase

WarGame.Phases._array = [];

WarGame.Phases.getCurrentPhase = function () {
    return WarGame.Phases._array[WarGame.Phases.CURRENT_PHASE];
};

WarGame.Phases.startCurrent = function () {
  WarGame.Phases.getCurrentPhase().start();
};

WarGame.Phases.endCurrent = function () {
   WarGame.Phases.getCurrentPhase().end();
};

WarGame.Phases.next = function () {
  WarGame.Phases.TEAMS_COMPLETED_PHASE = 0;
  // end phase
  WarGame.Phases.CURRENT_PHASE++;
  if (WarGame.Phases.CURRENT_PHASE >= WarGame.Phases.count()) {
      WarGame.Phases.CURRENT_PHASE = WarGame.Phases.PRIORITY;
      WarGame.Events.enqueue(new WarGame.Phases.AllPhasesCompletedEvent());
  }

  // start next phase
  WarGame.Phases.startCurrent();
};

WarGame.Phases.count = function () {
  return this._array.length;
};

WarGame.Phases.reset = function () {
    WarGame.Phases.CURRENT_PHASE = WarGame.Phases.PRIORITY;
    WarGame.Phases.TEAMS_COMPLETED_PHASE = 0;
};
