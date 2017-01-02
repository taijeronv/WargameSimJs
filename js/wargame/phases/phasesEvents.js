var WarGame = WarGame || {};
WarGame.Phases = WarGame.Phases || {};
WarGame.Phases.AllPhasesCompletedEvent = function () {
  WarGame.Events.BaseEvent.call(this)
}

WarGame.Phases.AllTeamsCompletedEvent.prototype = Object.create(WarGame.Events.BaseEvent.prototype);
WarGame.Phases.AllTeamsCompletedEvent.prototype.constructor = WarGame.Phases.AllTeamsCompletedEvent;
