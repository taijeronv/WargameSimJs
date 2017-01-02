var WarGame = WarGame || {};
WarGame.Teams = WarGame.Teams || {};
WarGame.Teams.AllTeamsCompletedEvent = function () {
  WarGame.Events.BaseEvent.call(this)
}

WarGame.Teams.AllTeamsCompletedEvent.prototype = Object.create(WarGame.Events.BaseEvent.prototype);
WarGame.Teams.AllTeamsCompletedEvent.prototype.constructor = WarGame.Teams.AllTeamsCompletedEvent;
