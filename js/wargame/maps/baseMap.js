var WarGame = WarGame || {};
WarGame.Maps = WarGame.Maps || {};
WarGame.Maps.BaseMap = function (attributes) {
    this._obj = null;
    this._attributes = attributes;
    this._locations = [];
    for (var z=0; z<this._attributes.grid.length; z++) {
      this._locations.push([]);
      for (var x=0; x<this._attributes.grid[z].length; x++) {
        this._locations[z].push(null);
      }
    }
};

WarGame.Maps.BaseMap.prototype.getGrid = function () {
  return this._attributes.grid;
};

WarGame.Maps.BaseMap.prototype.placePlayer = function(player, boardLoc) {
  if (!this.isLocationOccupied(boardLoc)) {
    try {
      this.removePlayer(player);
    } catch (e) { /* user doesn't exist */ }
    this._locations[boardLoc.z][boardLoc.x] = player;
    boardLoc.y = this.getGrid()[boardLoc.z][boardLoc.x];
    var coords = this.getVectorFromMapLocation(boardLoc)
    player.getObj().position.set(coords.x,coords.y,coords.z);
  } else {
    throw "location is already occupied; please choose another.";
  }
};

WarGame.Maps.BaseMap.prototype.removePlayer = function (player) {
  var loc = this.getPlayerLocation(player);
  this._locations[loc.z][loc.x] = null;
};

WarGame.Maps.BaseMap.prototype.movePlayerTo = function (player, boardLoc) {
  var playerLoc = this.getPlayerLocation(player);
  var dist = this.getDistanceBetweenTwoLocations(playerLoc, boardLoc);
  if (player.getMove() >= dist) {
    this.placePlayer(player, boardLoc);
  } else {
    throw "player can only move a distance of: '" + player.getMove() + "' and the selected space is: " + dist;
  }
};

/**
 * function will check for opposing team players within range of the passed in
 * player.stats.shoot value
 * @param {WarGame.Player} player - the attacker
 * @returns an array of opponent players in range of the attacker
 */
WarGame.Maps.BaseMap.prototype.getOpponentsInShootRangeOfPlayer = function (player) {
    var loc = this.getPlayerLocation(player);
    var opponents = WarGame.Teams.getOpponentsOfPlayer(player);
    var filtered = [];
    for (var i=0; i<opponents.length; i++) {
        var oppLoc = this.getPlayerLocation(opponents[i]);
        var dist = this.getDistanceBetweenTwoLocations(loc, oppLoc);
        if (dist <= player.getShoot()) {
            // only allow shots at players not already engaged in battle
            if (!opponents[i].isBattling()) {
                filtered.push(opponents[i]);
            }
        }
    }

    return filtered;
};

WarGame.Maps.BaseMap.prototype.isPlayerBattling = function (player) {
  if (this.getOpponentsInMeleRangeOfPlayer(player).length > 0) {
    return true;
  }
  return false;
};

WarGame.Maps.BaseMap.prototype.getOpponentsInMeleRangeOfPlayer = function (player) {
  var loc = this.getPlayerLocation(player);
  var opponents = WarGame.Teams.getOpponentsOfPlayer(player);
  var filtered = [];
  for (var i=0; i<opponents.length; i++) {
      var oppLoc = this.getPlayerLocation(opponents[i]);
      var dist = this.getDistanceBetweenTwoLocations(loc, oppLoc);
      if (dist < 2) {
          // only if players are touching
          filtered.push(opponents[i]);
      }
  }

  return filtered;
};

WarGame.Maps.BaseMap.prototype.playerHasUnobstructedView = function (player) {
    // don't allow shooting when player is battling
    if (this.isPlayerBattling(player)) {
      return false;
    }
    // TODO: cast a ray from this player's head to the base of the passed in player
    return true;
};

WarGame.Maps.BaseMap.prototype.getObj = function () {
    if (!this._obj) {
        this.generateObj();
    }
    return this._obj;
};

WarGame.Maps.BaseMap.prototype.getGrid = function () {
    return this._attributes.grid;
};

WarGame.Maps.BaseMap.prototype.reset = function () {
  this._obj = null;
};

WarGame.Maps.BaseMap.prototype.getPlayerLocation = function(player) {
  for (var z=0; z<this._locations.length; z++) {
    for (var x=0; x<this._locations[z].length; x++) {
      if (this._locations[z][x] === player) {
        return new WarGame.Maps.MapLocation(x, z);
      }
    }
  }
  throw "specified player not found.";
};

WarGame.Maps.BaseMap.prototype.isLocationOccupied = function (boardLoc) {
  if ((this._locations.length > boardLoc.z && boardLoc.z >= 0) &&
    (this._locations[0].length > boardLoc.x && boardLoc.x >= 0)) {
    if (this._locations[boardLoc.z][boardLoc.x]) {
      return true;
    }
    return false;
  }
  throw "invalid location specified: " + boardLoc.toString();
};

WarGame.Maps.BaseMap.prototype.getDistanceBetweenTwoLocations = function (loc1, loc2) {
  var horizDist = 0;
  var vertDist = 0;
  if (loc1.x > loc2.x) {
    horizDist = loc1.x - loc2.x;
  } else {
    horizDist = loc2.x - loc1.x;
  }
  if (loc1.z > loc2.z) {
    vertDist = loc1.z - loc2.z;
  } else {
    vertDist = loc2.z - loc1.z;
  }
  return Math.sqrt(Math.pow(horizDist, 2) + Math.pow(vertDist, 2));
};

WarGame.Maps.BaseMap.prototype.getMapLocationFromVector = function (vector) {
    var zLength = this._attributes.grid.length;
    var xLength = this._attributes.grid[0].length;
    var actualX = vector.x;
    var actualY = vector.y;
    var actualZ = vector.z;
    var boardX = (xLength / 2) + actualX;
    var boardY = actualY / WarGame.Maps.STEP_OFFSET;
    var boardZ = (zLength / 2) + actualZ;

    var bl = new WarGame.Maps.MapLocation(boardX, boardY);
    bl.z = boardZ;

    return bl;
};

WarGame.Maps.BaseMap.prototype.getVectorFromMapLocation = function (boardLoc) {
    var zLength = this._attributes.grid.length;
    var xLength = this._attributes.grid[0].length;
    var boardX = boardLoc.x;
    var boardZ = boardLoc.z;
    var boardY = boardLoc.y;
    var actualX = -(xLength / 2) + boardX;
    var actualZ = -(zLength / 2) + boardZ;
    var actualY = (boardY * WarGame.Maps.STEP_OFFSET);

    return new THREE.Vector3(actualX, actualY, actualZ);
};

WarGame.Maps.BaseMap.prototype.generateObj = function () {
    var mapGeometry = new THREE.Geometry();
    var matrix = new THREE.Matrix4();

    for (var z=0; z<this._attributes.grid.length; z++) {
        for (var x=0; x<this._attributes.grid[z].length; x++) {
            var boxGeometry = new THREE.BoxGeometry(1, WarGame.Maps.MAX_BLOCK_HEIGHT, 1);
            var y = -(WarGame.Maps.MAX_BLOCK_HEIGHT) + this._attributes.grid[z][x];
            var loc = new WarGame.Maps.MapLocation(x, z);
            loc.y = y;
            var coordinates = this.getVectorFromMapLocation(loc);
            matrix.makeTranslation(
                coordinates.x,
                coordinates.y,
                coordinates.z
            );
            mapGeometry.merge(boxGeometry, matrix);
        }
    }

    var mapMaterial = new THREE.MeshLambertMaterial({
        color: 0x44ff44,
        // wireframe: true
    });
    var mapObj = new THREE.Mesh(mapGeometry, mapMaterial);
    mapObj.receiveShadow = true;
    mapObj.castShadow = true;

    this._obj = mapObj;
};
