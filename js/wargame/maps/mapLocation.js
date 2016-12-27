var WarGame = WarGame || {};
WarGame.Maps = WarGame.Maps || {};
WarGame.Maps.MapLocation = function (x, z) {
  this.x = x;
  this.y = 0;
  this.z = z;
};

WarGame.Maps.MapLocation.prototype.clone = function () {
    var bl = new WarGame.Players.MapLocation(this.x, this.z);
    bl.y = this.y;
    return bl;
};

WarGame.Maps.MapLocation.prototype.equals = function (location) {
    if (this.x === location.x &&
        this.y === location.y) {
        return true;
    } else {
        return false;
    }
};

WarGame.Maps.MapLocation.prototype.toString = function () {
    return this.x + ':' + this.y;
};
