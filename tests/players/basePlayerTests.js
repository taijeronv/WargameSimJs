QUnit.module('WarGame.Players.BasePlayer', {
    setup: function () {
        WarGame.Maps.set(new WarGame.Maps.Map10x10());
    }
});

QUnit.test('constructor can be called with no arguments', function (assert) {
    var done = assert.async();
    expect(1);
    var p = new WarGame.Players.BasePlayer();
    assert.ok(true, 'constructor called with no arguments');
    done();
});

QUnit.test('wound method subtracts from wounds stat', function (assert) {
    var done = assert.async();
    expect(2);

    var s = new WarGame.Players.PlayerStats();
    var a = new WarGame.Players.PlayerAttributes();
    a.stats = s;
    var p = new WarGame.Players.BasePlayer(a);
    p.attributes.stats.wounds = 2;
    assert.equal(p.attributes.stats.wounds, 2, 'expected to have 2 wound points');
    p.wound();
    assert.equal(p.attributes.stats.wounds, 1, 'expected to have 1 wound remaining');
    done();
});
