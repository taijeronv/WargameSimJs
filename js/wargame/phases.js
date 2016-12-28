var WarGame = WarGame || {};
WarGame.Phases = {};

WarGame.Phases.PRIORITY = 0;
WarGame.Phases.MOVEMENT = 1;
WarGame.Phases.SHOOTING = 2;
WarGame.Phases.FIGHTING = 3;

WarGame.Phases.CURRENT_PHASE = WarGame.Phases.PRIORITY; // start at 0
WarGame.Phases.TEAMS_COMPLETED_PHASE = 0; // tracks number of teams who have completed current phase
WarGame.Phases._currentTeam = 0;

WarGame.Phases._array = [];

WarGame.Phases.getCurrentPhaseName = function () {
    switch (WarGame.Phases.CURRENT_PHASE) {
        case WarGame.Phases.PRIORITY:
            return 'PRIORITY';
        case WarGame.Phases.MOVEMENT:
            return 'MOVEMENT';
        case WarGame.Phases.SHOOTING:
            return 'SHOOTING';
        case WarGame.Phases.FIGHTING:
            return 'FIGHTING';
    }
};

WarGame.Phases.startCurrent = function () {
  WarGame.Phases._array[WarGame.Phases.CURRENT_PHASE].start();
};

WarGame.Phases.endCurrent = function () {
   WarGame.Phases._array[WarGame.Phases.CURRENT_PHASE].end();
};

WarGame.Phases.nextTeam = function () {
  var count = WarGame.Teams.get().length;
  WarGame.Phases.TEAMS_COMPLETED_PHASE++;
  WarGame.Phases._currentTeam++;
  if (WarGame.Phases._currentTeam >= count) {
    WarGame.Phases._currentTeam = 0;
    WarGame.Phases.endCurrent();
    WarGame.Phases.next();
  }
};

WarGame.Phases.getCurrentTeam = function () {
  return WarGame.Teams.get()[WarGame.Phases._currentTeam];
};

WarGame.Phases.next = function () {
  WarGame.Phases.TEAMS_COMPLETED_PHASE = 0;
  // end phase
  WarGame.Phases.CURRENT_PHASE++;
  if (WarGame.Phases.CURRENT_PHASE >= WarGame.Phases._array.length) {
      WarGame.Phases.CURRENT_PHASE = WarGame.Phases.PRIORITY;
      WarGame.Rounds.next();
  }

  // start next phase
  WarGame.Phases.startCurrent();
};

WarGame.Phases.reset = function () {
    WarGame.Phases.CURRENT_PHASE = WarGame.Phases.PRIORITY;
    WarGame.Phases.TEAMS_COMPLETED_PHASE = 0;
    WarGame.Phases._currentTeam = 0;
};
