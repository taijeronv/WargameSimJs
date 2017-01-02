var WarGame = WarGame || {};
WarGame.UI = WarGame.UI || {};
WarGame.UI.TeamsUi = {};

WarGame.UI.TeamsUi.setCurrentTeamText = function (teamName) {
  WarGame.UI.setContents('currentTeam', teamName);
};
