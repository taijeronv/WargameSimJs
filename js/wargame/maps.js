var WarGame = WarGame || {};
WarGame.Maps = {
  _map : null
};

WarGame.Maps.MAX_BLOCK_HEIGHT = 5;
WarGame.Maps.STEP_OFFSET = 0.5;

WarGame.Maps.set = function (map) {
  _map = map;
};

WarGame.Maps.get = function () {
  return _map;
};

WarGame.Maps.reset = function () {
  _map.reset();
};
