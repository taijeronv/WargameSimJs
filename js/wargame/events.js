var WarGame = WarGame || {};
WarGame.Events = {
  _queue: []
};

WarGame.Events.enqueue = function (event) {
  if (event instanceof WarGame.Events.BaseEvent) {
    WarGame.Events._queue.push(event);
  } else {
    throw 'passed in event was not an instance of WarGame.Events.BaseEvent';
  }
};

WarGame.Events.dequeue = function () {
  return WarGame.Events._queue.shift();
}

WarGame.Events.reset = function () {
  WarGame.Events._queue = [];
}
