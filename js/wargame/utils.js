var WarGame = WarGame || {};
WarGame.Utils = {
    _counter: 0,

    boardLocToCoordinates: function (boardLocation, grid) {
        return new WarGame.BoardLocation(boardLocation.x, boardLocation.y, boardLocation.z, grid).toVector();
    },

    coordinatesToBoardLoc: function (coordinates, grid) {
        return new WarGame.BoardLocation(0, 0, 0, grid).setFromVector(coordinates);
    },

    diceRoll: function (numDice, sides) {
        var times = numDice || 1;
        var s = sides || 6;
        var results = [];
        for (var i=0; i<times; i++) {
            results.push(WarGame.Utils.getRandomInt(1, s));
        }

        return results;
    },

    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getMouseIntersects: function (event, objArray) {
        var dims = WarGame.UI.Plotter.getWidthHeight();
        var offset = WarGame.UI.Plotter.renderer.domElement.getBoundingClientRect();
        WarGame.UI.Plotter.mouse.x = ((event.clientX - offset.left) / dims.width) * 2 - 1;
        WarGame.UI.Plotter.mouse.y = - ((event.clientY - offset.top) / dims.height) * 2 + 1;

        WarGame.UI.Plotter.raycaster.setFromCamera(WarGame.UI.Plotter.mouse, WarGame.UI.Plotter.camera);
        var intersects = WarGame.UI.Plotter.raycaster.intersectObjects(objArray);
        return intersects;
    },

    newId: function () {
        return WarGame.Utils._counter++;
    },
};
