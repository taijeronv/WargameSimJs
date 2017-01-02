var WarGame = WarGame || {};
WarGame.Phases = WarGame.Phases || {};
WarGame.Phases.ShootPhase = {
    _intersected: null,
    _battle: null,
    _pickFromTeam: null,
    _opponentsInRange: null,
    _name: 'shooting',

    getName: function () {
      return WarGame.Phases.ShootPhase._name;
    },

    start: function () {
        var players = WarGame.Teams.getAllPlayers();
        for (var i=0; i<players.length; i++) {
            players[i].history[WarGame.Rounds.getCurrent()].shoot.wounds = players[i].getWounds();
        }

        WarGame.Phases.ShootPhase._battle = new WarGame.Battles.Ranged();
        // WarGame.UI.Plotter.addListener('mousemove', WarGame.Phases.ShootPhase.handleShootMouseMove);
        // WarGame.UI.Plotter.addListener('click', WarGame.Phases.ShootPhase.handleShootClick);
        // WarGame.UI.setContents('shootRow', '<button type="submit" onclick="WarGame.Phases.ShootPhase.WarGame.Phases.nextTeam();" class="btn btn-default">End Turn</button>');
    },

    end: function () {
        // WarGame.UI.setContents('shootRow', '');
        WarGame.Phases.ShootPhase._battle = null;
        // WarGame.UI.Plotter.removeListener('mousemove', WarGame.Phases.ShootPhase.handleShootMouseMove);
        // WarGame.UI.Plotter.removeListener('click', WarGame.Phases.ShootPhase.handleShootClick);
    },

    // /**
    //  * function will highlight the different _battles when the mouse hovers over them
    //  */
    // handleShootMouseMove: function (event) {
    //     event.preventDefault();
    //     var intersects, players;
    //
    //     if (WarGame.Phases.ShootPhase._battle.getPlayers().length === 0) {
    //         // pick attacker
    //         players = WarGame.Teams.getCurrent().getPlayers().filter(function (p) {
    //             return !p.isBattling() && !p.history[WarGame.Rounds.getCurrent()].shoot.done;
    //         });
    //         intersects = WarGame.Utils.getMouseIntersects(event, WarGame.Phases.getCurrentTeam().getPlayers().map(function (p) {
    //             return p.obj;
    //         }));
    //     } else {
    //         // pick opponents in range
    //         players = WarGame.Phases.ShootPhase.inRangeOpponents;
    //         intersects = WarGame.Utils.getMouseIntersects(event, WarGame.Phases.ShootPhase.inRangeOpponents.map(function (p) {
    //             return p.obj;
    //         }));
    //     }
    //
    //     if (WarGame.Phases.ShootPhase._intersected) {
    //         WarGame.Phases.ShootPhase._intersected.obj.material.emissive.setHex(WarGame.Phases.ShootPhase._intersected.currentHex);
    //         WarGame.Phases.ShootPhase._intersected = null;
    //     }
    //
    //     if (intersects.length > 0) {
    //         // get _battle group
    //         for (var j=0; j<players.length; j++) {
    //             if (players[j].obj === intersects[0].object) {
    //                 WarGame.Phases.ShootPhase._intersected = players[j];
    //                 WarGame.Phases.ShootPhase._intersected.currentHex = WarGame.Phases.ShootPhase._intersected.obj.material.emissive.getHex();
    //                 WarGame.Phases.ShootPhase._intersected.obj.material.emissive.setHex(0xff0000);
    //                 break;
    //             }
    //         }
    //     }
    // },
    //
    // handleShootClick: function (event) {
    //     event.preventDefault();
    //     var intersects, players;
    //
    //     if (WarGame.Phases.ShootPhase._battle.getPlayers().length === 0) {
    //         // pick attacker who is not already engaged in _battle
    //         players = WarGame.Teams.getCurrent().players.filter(function (p) {
    //             return !p.isBattling() && !p.history[WarGame.Rounds.getCurrent()].shoot.done;
    //         });
    //         intersects = WarGame.Utils.getMouseIntersects(event, WarGame.Teams.getCurrent().players.map(function (p) {
    //             return p.obj;
    //         }));
    //     } else {
    //         // pick opponents in range
    //         players = WarGame.Phases.ShootPhase.inRangeOpponents;
    //         intersects = WarGame.Utils.getMouseIntersects(event, WarGame.Phases.ShootPhase.inRangeOpponents.map(function (p) {
    //             return p.obj;
    //         }));
    //     }
    //
    //     if (intersects.length > 0) {
    //         // get _battle group
    //         /* jshint loopfunc: true */
    //         for (var j=0; j<players.length; j++) {
    //             if (players[j].obj === intersects[0].object) {
    //                 if (WarGame.Phases.ShootPhase._battle.getPlayers().length === 0) {
    //                     var inRange = players[j].getOpponentsInShootRange();
    //                     if (inRange.length === 0) {
    //                         // WarGame.UI.displayAlert('selected shooter has no opponents in range.', WarGame.UI.ALERT_INFO);
    //                     } else {
    //                         WarGame.Phases.ShootPhase._battle.addAttacker(players[j]);
    //                         WarGame.Phases.ShootPhase.inRangeOpponents = inRange;
    //                         players[j].history[WarGame.Rounds.getCurrent()].shoot.done = true;
    //                     }
    //                     break;
    //                 } else {
    //                     WarGame.Phases.ShootPhase._battle.attacksRemaining--;
    //                     WarGame.Phases.ShootPhase._battle.addOpponent(players[j]);
    //                     if (WarGame.Phases.ShootPhase._battle.attacksRemaining <= 0) {
    //                         WarGame.Phases.ShootPhase._battle.start();
    //                         WarGame.Phases.ShootPhase._battle = new WarGame.Battles.Ranged();
    //                     }
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    // },
};

WarGame.Phases._array[WarGame.Phases.SHOOTING] = WarGame.Phases.ShootPhase;
