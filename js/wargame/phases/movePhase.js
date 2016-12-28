var WarGame = WarGame || {};
WarGame.Phases = WarGame.Phases || {};
WarGame.Phases.MovePhase = {
  start: function () {
      var players = WarGame.Teams.getAllPlayers();
      // for (var i=0; i<players.length; i++) {
      //     players[i].history[WarGame.Rounds.getCurrent()].move.loc = new THREE.Vector3().copy(players[i].getObj().position);
      //     players[i].history[WarGame.Rounds.getCurrent()].move.boardLoc = players[i].location.clone();
      // }

      // WarGame.UI.Plotter.addListener('mousemove', WarGame.Phases.MovePhase.handleMoveMouseMove);
      // WarGame.UI.Plotter.addListener('click', WarGame.Phases.MovePhase.handleMoveClick);
      // WarGame.UI.setContents('moveRow', '<button type="submit" onclick="WarGame.Phases.nextTeam();" class="btn btn-default">End Turn</button>');
  },

  end: function () {
      // WarGame.UI.setContents('moveRow', '');
      // WarGame.UI.Plotter.removeListener('mousemove', WarGame.Phases.MovePhase.handleMoveMouseMove);
      // WarGame.UI.Plotter.removeListener('click', WarGame.Phases.MovePhase.handleMoveClick);
  },

//   handleMoveMouseMove: function (event) {
//       event.preventDefault();
//
//       var players = WarGame.Teams.getCurrent().getPlayers().filter(function (p) {
//           return !p.isBattling();
//       });
//       var intersects = WarGame.Utils.getMouseIntersects(event, players.map(function (p) {
//           return p.obj;
//       }));
//
//       if (WarGame.Phases.MovePhase.INTERSECTED) {
//           WarGame.Phases.MovePhase.INTERSECTED.material.emissive.setHex(WarGame.Phases.MovePhase.INTERSECTED.currentHex);
//           WarGame.Phases.MovePhase.INTERSECTED = null;
//       }
//       if (intersects.length > 0) {
//           WarGame.Phases.MovePhase.INTERSECTED = intersects[0].object;
//           WarGame.Phases.MovePhase.INTERSECTED.currentHex = WarGame.Phases.MovePhase.INTERSECTED.material.emissive.getHex();
//           WarGame.Phases.MovePhase.INTERSECTED.material.emissive.setHex(0xff0000);
//       }
//   },
//
//   handleMoveClick: function (event) {
//       event.preventDefault();
//       var team = WarGame.Teams.getCurrent();
//       // get all players for team
//       if (team) {
//         var players = team.getPlayers().filter(function (p) {
//             return !p.isBattling();
//         });
//         var intersects = WarGame.Utils.getMouseIntersects(event, players.map(function (p) { return p.obj; }));
//         if (intersects.length > 0) {
//             for (var i=0; i<players.length; i++) {
//                 if (intersects[0].object === players[i].obj) {
//                     var html = '' +
// '<div class="panel panel-default">' +
// '<div class="panel-heading">' +
// '<h5 class="panel-title">' + team.name + ' Player, Type: ' + players[i].attributes.name + '</h5>' +
// '<br>' + players[i].stats.toString() +
// '</div>' +
// '<div class="panel-body">' +
// '<div class="form-group form-horizontal">' +
// '<label for="horizontalLocation">Horizontal Location: ' + "(1-" + WarGame.Maps.getCurrent().getGrid()[0].length + ")" + '</label>' +
// '<input id="x" type="text" value="' + players[i].location.x + '">' +
// '<label for="verticalLocation">Vertical Location: ' + "(1-" + WarGame.Maps.getCurrent().getGrid().length + ")" + '</label>' +
// '<input id="z" type="text" value="' + players[i].location.z + '">' +
// '<button type="submit" onclick="WarGame.Phases.MovePhase.movePlayer(\'' + team.name + '\',' + players[i].id + ');" class="btn btn-default">Move</button>' +
// '</div>' +
// '</div>' +
// '</div>' +
// '<button type="submit" onclick="WarGame.Phases.nextTeam();" class="btn btn-default">End Turn</button>';
//                     WarGame.UI.setContents('moveRow', html);
//                     break;
//                 }
//             }
//         }
//     }
//   },
};

WarGame.Phases._array[WarGame.Phases.MOVEMENT] = WarGame.Phases.MovePhase;
