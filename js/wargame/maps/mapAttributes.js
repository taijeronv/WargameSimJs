var WarGame = WarGame || {};
WarGame.Maps = WarGame.Maps || {};
WarGame.Maps.MapAttributes = function (name, grid, texture) {
  this.name = name;
  this.grid = grid;
  this.texture = texture;
};

WarGame.Maps.MapAttributes.prototype.parse = function (json) {
  this.name = json.name;
  this.grid = json.grid;
  this.texture = json.texture;
};
