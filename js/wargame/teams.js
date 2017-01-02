var WarGame = WarGame || {};
WarGame.Teams = {};

WarGame.Teams._array = [];
WarGame.Teams._curentTeam = null;

WarGame.Teams.get = function () {
  return WarGame.Teams._array;
};

WarGame.Teams.add = function (team) {
  // if 'team' is of correct type and doesn't already exist
  if (team instanceof WarGame.Teams.BaseTeam && WarGame.Teams._array.indexOf(team) < 0) {
      WarGame.Teams._array.push(team);
  }
};

WarGame.Teams.nextTeam = function () {
  var count = WarGame.Teams.get().length;
  WarGame.Phases.TEAMS_COMPLETED_PHASE++;
  WarGame.Teams._currentTeam++;
  if (WarGame.Teams.getCurrentTeam() >= count) {
    WarGame.Teams._currentTeam = 0;
    WarGame.Events.enqueue(new WarGame.Teams.AllTeamsCompletedEvent());
  }
};

WarGame.Phases.getCurrentTeam = function () {
  return WarGame.Teams.get()[WarGame.Teams._currentTeam];
};

WarGame.Teams.getTeamIndexByName = function (name) {
    var teams = WarGame.Teams.get();
    for (var i=0; i<teams.length; i++) {
        if (teams[i].getName().toLowerCase() === name.toLowerCase()) {
            return i;
        }
    }

    throw "unable to locate team with name: " + name;
};

WarGame.Teams.getTeamByName = function (name) {
    var teams = WarGame.Teams.get();
    for (var i=0; i<teams.length; i++) {
        if (teams[i].getName().toLowerCase() === name.toLowerCase()) {
            return teams[i];
        }
    }

    throw "unable to locate team with name: " + name;
};

WarGame.Teams.getAllPlayers = function () {
  var players = [];
  for (var team of WarGame.Teams.get()) {
    players = players.concat(team.getPlayers());
  }
  return players;
};

WarGame.Teams.getOpponentsOfPlayer = function (player) {
  var teamName = player.getTeam().getName();
  var opponents = WarGame.Teams.getAllPlayers().filter(function (p) {
      return p.getTeam().getName() !== teamName;
  });
  return opponents;
};

WarGame.Teams.reset = function () {
    WarGame.Teams._array = [];
};
