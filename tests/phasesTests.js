WarGame.Phases.TestTemp = [];

QUnit.module('WarGame.Phases', {
  setup: function () {
    WarGame.Teams.reset();
    WarGame.Phases.reset();
    WarGame.Phases.TestTemp.push(WarGame.Phases.PriorityPhase.start);
    WarGame.Phases.TestTemp.push(WarGame.Phases.MovePhase.start);
    WarGame.Phases.TestTemp.push(WarGame.Phases.ShootPhase.start);
    WarGame.Phases.TestTemp.push(WarGame.Phases.FightPhase.start);
  },
  teardown: function () {
    WarGame.Phases.PriorityPhase.start = WarGame.Phases.TestTemp[0];
    WarGame.Phases.MovePhase.start = WarGame.Phases.TestTemp[1];
    WarGame.Phases.ShootPhase.start = WarGame.Phases.TestTemp[2];
    WarGame.Phases.FightPhase.start = WarGame.Phases.TestTemp[3];

    WarGame.Phases.TestTemp = [];
  }
});

QUnit.test('calling startCurrent will execute the start method for the current phase', function (assert) {
    expect(4);

    WarGame.Phases.PriorityPhase.start = function () { assert.ok(true, 'expected WarGame.Phases.PriorityPhase.start'); };
    WarGame.Phases.MovePhase.start = function () { assert.ok(true, 'expected WarGame.Phases.MovePhase.start'); };
    WarGame.Phases.ShootPhase.start = function () { assert.ok(true, 'expected WarGame.Phases.ShootPhase.start'); };
    WarGame.Phases.FightPhase.start = function () { assert.ok(true, 'expected WarGame.Phases.FightPhase.start'); };

    var phase = 0;
    while (phase < 4) {
        WarGame.Phases.CURRENT_PHASE = phase;
        WarGame.Phases.startCurrent();
        phase++;
    }
});

QUnit.test('calling next will execute the start method of the next phase', function (assert) {
    expect(4);
    var num = 0;
    WarGame.Phases.PriorityPhase.start = function () { assert.equal(num, 3, 'expected WarGame.Phases.PriorityPhase.start called last'); };
    WarGame.Phases.MovePhase.start = function () { assert.equal(num, 0, 'expected WarGame.Phases.MovePhase.start called third'); };
    WarGame.Phases.ShootPhase.start = function () { assert.equal(num, 1, 'expected WarGame.Phases.ShootPhase.start called second'); };
    WarGame.Phases.FightPhase.start = function () { assert.equal(num, 2, 'expected WarGame.Phases.FightPhase.start called first'); };

    while (num < 4) {
        WarGame.Phases.next();
        num++;
    }
});

QUnit.test('current phase name can be returned', function (assert) {
    expect(4);

    WarGame.Phases.PriorityPhase.start = function () { assert.equal(WarGame.Phases.getCurrentPhaseName(), 'PRIORITY'); };
    WarGame.Phases.MovePhase.start = function () { assert.equal(WarGame.Phases.getCurrentPhaseName(), 'MOVEMENT'); };
    WarGame.Phases.ShootPhase.start = function () { assert.equal(WarGame.Phases.getCurrentPhaseName(), 'SHOOTING'); };
    WarGame.Phases.FightPhase.start = function () { assert.equal(WarGame.Phases.getCurrentPhaseName(), 'FIGHTING'); };

    var phase = 0;
    while (phase < 4) {
        WarGame.Phases.CURRENT_PHASE = phase;
        WarGame.Phases.startCurrent();
        phase++;
    }
});
