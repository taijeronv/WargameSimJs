var WarGame = WarGame || {};
WarGame.Maps = WarGame.Maps || {};
WarGame.Maps.Map10x10 = function() {
  var attributes = new WarGame.Maps.MapAttributes(
    '10x10', // name
    [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,3,3,2,1,0,0,0],
        [0,0,0,3,4,5,2,0,0,0],
        [0,0,0,2,5,4,3,0,0,0],
        [0,0,0,1,2,3,3,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ],
    'resources/sprites/grass-texture-2.jpg' // texture
  );

  WarGame.Maps.BaseMap.call(this, attributes);
};

WarGame.Maps.Map10x10.prototype = Object.create(WarGame.Maps.BaseMap.prototype);
WarGame.Maps.Map10x10.prototype.constructor = WarGame.Maps.Map10x10;
