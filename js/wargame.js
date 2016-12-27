var WarGame = WarGame || {};

WarGame.initialize = function () {
    WarGame.UI.initialize();

    WarGame.UI.addMesh(WarGame.Maps.get().getObj());
    for (var team of WarGame.Teams.get()) {
      for (var player of team.getPlayers()) {
        WarGame.UI.addMesh(player.getObj());
      }
    }
};

WarGame.render = function () {
    WarGame.UI.update();
};

WarGame.reset = function () {
    WarGame.Maps.reset();
    WarGame.Phases.reset();
    WarGame.Rounds.reset();
    WarGame.UI.reset();
    WarGame.Teams.reset();

    WarGame.initialize();
    // TODO: reset ALL THE THINGS!
};

WarGame.start = function () {
    // TODO: create menus for picking teams, etc.
    WarGame.Phases.doCurrent();
};

WarGame.onPlayerDefeated = function (player) {
    WarGame.UI.displayDefeatedAlert(player);
    WarGame.removePlayer(player);
};

WarGame.movePlayerTo = function (player, location, overrideLimit) {
    var height = this.attributes.grid[location.z][location.x];
    location.y = height;
    if (!WarGame.Maps.isLocationOccupied(location)) {
        try {
            player.moveTo(location, overrideLimit);
        } catch (e) {
            // alert and rollback changes
            this.players[location.toString()] = null;
            this.players[player.history[WarGame.CURRENT_ROUND].move.boardLoc.toString()] = player;
            WarGame.UI.displayAlert(e);
        }
    } else {
        WarGame.UI.displayAlert("space is occupied, please choose another.");
    }
};

WarGame.movePlayerTo = function (player, location, overrideLimit) {
    // ensure we can move this far by comparing location at start of round
    var coordinates = location.toVector();
    var dist = 0;
    if (!overrideLimit) {
        dist = WarGame.Utils.getDistanceBetweenTwoPoints(
            this.history[WarGame.Rounds.getCurrent()].move.loc,
            coordinates);
    }

    if (overrideLimit || dist <= player.attributes.move) {
        player.location = location.clone();
        if (player.obj) {
            player.obj.position.set(coordinates.x,coordinates.y,coordinates.z);
        }
    } else {
        throw "distance too far. player can only move: " + player.attributes.move;
    }
};

WarGame.playerIsBattling = function (player) {
    var opponents = WarGame.getOpponentsInMeleRangeOfPlayer(player);
    if (opponents.length > 0) {
        return true;
    }
    return false;
};

/**
 * function will check for opposing team players in the 8 spaces around the
 * passed in player (0 marks the player position below).
 * X X X
 * X 0 X
 * X X X
 * @param {WarGame.Players.Base} player - the attacker
 * @returns an array of opponent players in range of the attacker
 */
WarGame.getOpponentsInMeleRangeOfPlayer = function (player) {
    var centre = player.location.clone();
    var opponents = [];
    for (var z=centre.z-1; z<=centre.z+1; z++) {
        if (z >= 0 && z < WarGame.Maps.getCurrent().getGrid().length) {
            for (var x=centre.x-1; x<=centre.x+1; x++) {
                if (x >= 0 && x < WarGame.Maps.getCurrent().getGrid()[z].length) {
                    var y = WarGame.Maps.getCurrent().getGrid()[z][x];
                    var nearPlayer = WarGame.Maps.getCurrent().locationOccupied(new WarGame.Players.Location(x, y, z));
                    if (nearPlayer && nearPlayer.team.name !== player.team.name) {
                        opponents.push(nearPlayer);
                    }
                }
            }
        }
    }

    return opponents;
};
