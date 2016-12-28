var WarGame = WarGame || {};
WarGame.Players = WarGame.Players || {};
WarGame.Players.PlayerAttributes = function (name, cost, width, height, move, shoot, effect) {
  this.name = name;
  this.cost = cost;
  this.width = width;
  this.height = height;
  this.move = move;
  this.shoot = shoot;
  this.effect = effect;
};

WarGame.Players.PlayerAttributes.prototype.parse = function (json) {
  this.name = json.name;
  this.cost = json.cost;
  this.width = json.width;
  this.height = json.height;
  this.move = json.move;
  this.shoot = json.shoot;
  this.effect = json.effect;
};
