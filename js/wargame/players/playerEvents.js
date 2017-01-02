var WarGame = WarGame || {};
WarGame.Players = WarGame.Players || {};
WarGame.Players.PlayerDefeatedEvent = function (player) {
  this.player = player;
  WarGame.Events.BaseEvent.call(this)
}

WarGame.Players.PlayerDefeatedEvent.prototype = Object.create(WarGame.Events.BaseEvent.prototype);
WarGame.Players.PlayerDefeatedEvent.prototype.constructor = WarGame.Players.PlayerDefeatedEvent;
