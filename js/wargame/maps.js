var WarGame = WarGame || {};
WarGame.Maps = {
  _map : null
};

WarGame.Maps.MAX_BLOCK_HEIGHT = 5;
WarGame.Maps.STEP_OFFSET = 0.5;

WarGame.Maps.set = function (map) {
  WarGame.Maps._map = map;
};

WarGame.Maps.get = function () {
  return WarGame.Maps._map;
};

WarGame.Maps.reset = function () {
  if (WarGame.Maps._map) {
    WarGame.Maps._map.reset();
  }
};
