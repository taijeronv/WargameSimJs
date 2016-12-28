var WarGame = WarGame || {};
WarGame.Phases = WarGame.Phases || {};
WarGame.Phases.FightPhase = {
    _intersected: null,
    _battles: null,

    start: function () {
        // WarGame.UI.setCurrentPhaseText('FIGHTING');

        var players = WarGame.Teams.getAllPlayers();
        for (var i=0; i<players.length; i++) {
            players[i].history[WarGame.Rounds.getCurrent()].fight.wounds = players[i].stats.wounds;
        }

        WarGame.Phases.FightPhase._battles = WarGame.Phases.FightPhase.getBattleGroups();
        // WarGame.UI.Plotter.addListener('mousemove', WarGame.Phases.FightPhase.handleFightMouseMove);
        // WarGame.UI.Plotter.addListener('click', WarGame.Phases.FightPhase.handleFightClick);
    },

    end: function () {
        // WarGame.UI.setCurrentPhaseText('');
        WarGame.Phases.FightPhase._battles = null;
        // WarGame.UI.Plotter.removeListener('mousemove', WarGame.Phases.FightPhase.handleFightMouseMove);
        // WarGame.UI.Plotter.removeListener('click', WarGame.Phases.FightPhase.handleFightClick);
    },

    getBattleGroups: function () {
        var _battles = [];
        var pTeamPlayers = WarGame.Teams.PriorityPhase.getPriorityTeam().getPlayers();
        for (var i=0; i<pTeamPlayers.length; i++) {
            var player = pTeamPlayers[i];
            var opponents = WarGame.Maps.get().getOpponentsInMeleRangeOfPlayer(player);
            if (opponents.length > 0) {
                // see if this player's opponents are already in battle
                var inBattle = false;
                for (var j=0; j<_battles.length; j++) {
                    for (var k=0; k<opponents.length; k++) {
                        if (_battles[j].hasOpponent(opponents[k])) {
                            _battles[j].addAttacker(player);
                            _battles[j].addOpponents(opponents);
                            inBattle = true;
                            break;
                        }
                    }
                    if (inBattle) {
                        break;
                    }
                }
                if (!inBattle) {
                    var battle = new WarGame.Battles.Mele();
                    battle.addAttacker(player);
                    battle.addOpponents(opponents);
                    _battles.push(battle);
                }
            }
        }

        return _battles;
    },

    // /**
    //  * function will highlight the different _battles when the mouse hovers over them
    //  */
    // handleFightMouseMove: function (event) {
    //     event.preventDefault();
    //     var intersects = WarGame.Utils.getMouseIntersects(event, WarGame.getPlayers().map(function (p) {
    //         return p.obj;
    //     }));
    //
    //     if (WarGame.Phases.FightPhase._intersected && WarGame.Phases.FightPhase._intersected.length > 0) {
    //         for (i=0; i<WarGame.Phases.FightPhase._intersected.length; i++) {
    //             WarGame.Phases.FightPhase._intersected[i].obj.material.emissive.setHex(WarGame.Phases.FightPhase._intersected.currentHex);
    //         }
    //         WarGame.Phases.FightPhase._intersected = null;
    //     }
    //
    //     var i;
    //     if (intersects.length > 0) {
    //         // get battle group
    //         for (i=0; i<WarGame.Phases.FightPhase._battles.length; i++) {
    //             var players = WarGame.Phases.FightPhase._battles[i].getPlayers();
    //             for (var j=0; j<players.length; j++) {
    //                 if (players[j].obj === intersects[0].object) {
    //                     WarGame.Phases.FightPhase._intersected = players;
    //                     break;
    //                 }
    //             }
    //             if (WarGame.Phases.FightPhase._intersected) {
    //                 break;
    //             }
    //         }
    //
    //         if (WarGame.Phases.FightPhase._intersected && WarGame.Phases.FightPhase._intersected.length > 0) {
    //             for (i=0; i<WarGame.Phases.FightPhase._intersected.length; i++) {
    //                 WarGame.Phases.FightPhase._intersected[i].obj.currentHex = WarGame.Phases.FightPhase._intersected[i].obj.material.emissive.getHex();
    //                 WarGame.Phases.FightPhase._intersected[i].obj.material.emissive.setHex(0xff0000);
    //             }
    //         }
    //     }
    // },
    //
    // handleFightClick: function (event) {
    //     event.preventDefault();
    //     var intersects = WarGame.Utils.getMouseIntersects(event, WarGame.getPlayers().map(function (p) {
    //         return p.obj;
    //     }));
    //
    //     var i;
    //     if (intersects.length > 0) {
    //         // get battle group
    //         var started = false;
    //         for (i=0; i<WarGame.Phases.FightPhase._battles.length; i++) {
    //             var players = WarGame.Phases.FightPhase._battles[i].getPlayers();
    //             for (var j=0; j<players.length; j++) {
    //                 if (players[j].obj === intersects[0].object) {
    //                     started = true;
    //                     var b = WarGame.Phases.FightPhase._battles[i];
    //                     WarGame.Phases.FightPhase._battles.splice(i, 1); // remove this battle
    //                     b.start();
    //                     break;
    //                 }
    //             }
    //         }
    //
    //         // end phase if no more _battles exist
    //         if (WarGame.Phases.FightPhase._battles.length < 1) {
    //             WarGame.Phases.FightPhase.end();
    //         }
    //     }
    // },
};

WarGame.Phases._array[WarGame.Phases.FIGHTING] = WarGame.Phases.FightPhase;
