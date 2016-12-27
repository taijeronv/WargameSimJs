var WarGame = WarGame || {};
WarGame.Players = WarGame.Players || {};
WarGame.Players.BasePlayer = function (attributes) {
    this.id = WarGame.Utils.newId();
    this.attributes = attributes;
    this.obj = null;
    this.team = null;
};

WarGame.Players.BasePlayer.prototype.setColour = function (colour) {
    // this.obj.material.color.setHex(colour);
};

WarGame.Players.BasePlayer.prototype.setTeam = function (team) {
    this.team = team;
    this.setColour(this.team.colour);
};

WarGame.Players.BasePlayer.prototype.wound = function () {
    this.attributes.stats.wounds--;
};

WarGame.Players.BasePlayer.prototype.getName = function () {
    return this.attributes.name;
};

WarGame.Players.BasePlayer.prototype.getCost = function () {
    return this.attributes.cost;
};

WarGame.Players.BasePlayer.prototype.getWounds = function () {
    return this.attributes.stats.wounds;
};

WarGame.Players.BasePlayer.prototype.getShoot = function () {
    return this.attributes.shoot;
};

WarGame.Players.BasePlayer.prototype.getObj = function () {
  if (!this.obj) {
    this.obj = generateObj();
  }
  return this.obj;
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
        this.attributes.width / 2, // top radius
        0.1, // bottom radius
        this.attributes.height, // length
        6,  // circle segments
        1,   // length segments
        false); // open
    matrix.makeTranslation(0, (this.attributes.height / 2) + 0.1, 0);
    playerGeometry.merge(geometry, matrix);

    // head
    var headRadius = (this.attributes.width / 2) - 0.1;
    geometry = new THREE.SphereGeometry(
        headRadius, // radius
        6,  // width segments
        6); // height segments
    matrix.makeTranslation(0, (this.attributes.height / 2) + 0.1 + ((this.attributes.height / 2) + (this.attributes.width / 2)), 0);
    playerGeometry.merge(geometry, matrix);

    var playerMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 }); // gray (set later)
    var playerObj = new THREE.Mesh(playerGeometry, playerMaterial);
    playerObj.castShadow = true;

    this.obj = playerObj;

    // move to current location
    this.moveTo(this.location, true);

    if (this.team && this.team.colour) {
        this.setColour(this.team.colour);
    }
};
