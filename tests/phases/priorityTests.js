var tmp = [];
QUnit.module('WarGame.Phases.Priority', {
  setup: function () {
    WarGame.Teams.add(new WarGame.Teams.Blue(1));
    WarGame.Teams.add(new WarGame.Teams.Red(1));
  },
  teardown: function () {
    WarGame.Teams.reset();
  }
});

QUnit.test('calling start will determine a random team has priority', function (assert) {
    expect(3);
    tmp.push(WarGame.Phases.next);
    WarGame.Phases.next = function () {};

    var teamResults = [0, 0];
    for (var i=0; i<100; i++) {
        WarGame.Phases.Priority.start();
        var index = WarGame.Teams.getTeamIndexByName(WarGame.Teams.get()[WarGame.Phases.Priority.index].getName());
        teamResults[index]++;
    }
    assert.equal(teamResults[0] + teamResults[1], 100, 'expected 100 results');
    assert.ok(teamResults[0] > 10, 'expected at least 10 results for team 0');
    assert.ok(teamResults[1] > 10, 'expected at least 10 results for team 1');

    WarGame.Phases.next = tmp[0];
    tmp = [];
});

QUnit.test('calling start will call end when done', function (assert) {
    expect(1);
    tmp.push(WarGame.Phases.next);
    WarGame.Phases.next = function () { assert.ok(true, 'expected WarGame.Phases.next to be called'); };

    WarGame.Phases.Priority.start();

    WarGame.Phases.next = tmp[0];
    tmp = [];
});
