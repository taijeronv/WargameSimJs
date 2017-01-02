var WarGame = WarGame || {};
WarGame.Maps = WarGame.Maps || {};
WarGame.Maps.MapAttributes = function (name, grid, texture, spawnPoints) {
  this.name = name;
  this.grid = grid || [[]]; // 2D array
  this.texture = texture;
  this.spawnPoints = spawnPoints || [];
};

WarGame.Maps.MapAttributes.prototype.parse = function (json) {
  this.name = json.name;
  this.grid = json.grid;
  this.texture = json.texture;
  this.spawnPoints = json.spawnPoints;
};
