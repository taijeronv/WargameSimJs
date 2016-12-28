var WarGame = WarGame || {};
WarGame.Players = WarGame.Players || {};
WarGame.Players.BasePlayer = function (attributes, stats) {
    this._id = WarGame.Utils.newId();
    this._attributes = attributes;
    this._stats = stats;
    this._obj = null;
    this._team = null;
};

WarGame.Players.BasePlayer.prototype.getId = function () {
  return this._id;
};

WarGame.Players.BasePlayer.prototype.setTeam = function (team) {
  this._team = team;
  this._obj = null;
};

WarGame.Players.BasePlayer.prototype.getTeam = function () {
  return this._team;
}

WarGame.Players.BasePlayer.prototype.getName = function () {
  return this._attributes.name;
};

WarGame.Players.BasePlayer.prototype.getCost = function () {
  return this._attributes.cost;
};

WarGame.Players.BasePlayer.prototype.getShoot = function () {
  return this._attributes.shoot;
};

WarGame.Players.BasePlayer.prototype.inflictWound = function () {
    this._stats.wounds--;
};

WarGame.Players.BasePlayer.prototype.getWounds = function () {
    return this._stats.wounds;
};

WarGame.Players.BasePlayer.prototype.getAttacks = function () {
  return this._stats.attacks;
};

WarGame.Players.BasePlayer.prototype.getRanged = function () {
  return this._stats.ranged;
};

WarGame.Players.BasePlayer.prototype.getMele = function () {
  return this._stats.mele;
};

WarGame.Players.BasePlayer.prototype.getMove = function () {
  return this._attributes.move;
}

WarGame.Players.BasePlayer.prototype.getObj = function () {
  if (!this._obj) {
    this._obj = this.generateObj();
  }
  return this._obj;
}

WarGame.Players.BasePlayer.prototype.generateObj = function () {
    var playerGeometry = new THREE.Geometry();
    var matrix = new THREE.Matrix4();

    // base
    var geometry = new THREE.CylinderGeometry(
        0.4, // top radius
        0.5, // bottom radius
        0.2, // length
        4,  // circle segments
        1,   // length segments
        false); // open
    matrix.makeTranslation(0, 0.1, 0);
    playerGeometry.merge(geometry, matrix);

    // body
    geometry = new THREE.CylinderGeometry(
        this._attributes.width / 2, // top radius
        0.1, // bottom radius
        this._attributes.height, // length
        6,  // circle segments
        1,   // length segments
        false); // open
    matrix.makeTranslation(0, (this._attributes.height / 2) + 0.1, 0);
    playerGeometry.merge(geometry, matrix);

    // head
    var headRadius = (this._attributes.width / 2) - 0.1;
    geometry = new THREE.SphereGeometry(
        headRadius, // radius
        6,  // width segments
        6); // height segments
    matrix.makeTranslation(0, (this._attributes.height / 2) + 0.1 + ((this._attributes.height / 2) + (this._attributes.width / 2)), 0);
    playerGeometry.merge(geometry, matrix);

    var playerMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 }); // gray (set later)
    var playerObj = new THREE.Mesh(playerGeometry, playerMaterial);
    playerObj.castShadow = true;

    if (this.getTeam()) {
      playerObj.material.color.setHex(this.getTeam().getColour());
    }
    return playerObj;
};
