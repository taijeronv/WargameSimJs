QUnit.module('WarGame.Maps.BaseMap');

QUnit.test('constuctor can be called with no arguments', function (assert) {
    expect(1);
    var done = assert.async();
    var actual = new WarGame.Maps.Map10x10();
    assert.ok(actual, 'map object created');
    done();
});

QUnit.test('can add a player at a location', function (assert) {
    expect(3);
    var done = assert.async();
    var m = new WarGame.Maps.Map10x10();
    var p = new WarGame.Players.BasePlayer();
    try {
      m.getPlayerLocation(p);
      assert.ok(false, 'expected player not found');
    } catch (e) {}
    var loc = new WarGame.Maps.MapLocation(4, 6);
    m.placePlayer(p, loc);
    var actualLoc = m.getPlayerLocation(p);
    assert.ok(actualLoc.equals(loc), 'expected player location found');
    assert.equal(actualLoc.x, 4, 'expected player at x = 4');
    assert.equal(actualLoc.z, 6, 'expected player at z = 6');
    done();
});

QUnit.test('can remove a player', function (assert) {
    expect(2);
    var done = assert.async();
    var m = new WarGame.Maps.Map10x10();
    var p = new WarGame.Players.BasePlayer();
    try {
      m.getPlayerLocation(p);
      assert.ok(false, 'expected player not found');
    } catch (e) {}
    var loc = new WarGame.Maps.MapLocation(4, 6);
    m.placePlayer(p, loc);
    var actualLoc = m.getPlayerLocation(p);
    assert.ok(actualLoc.equals(loc), 'expected player location found');
    m.removePlayer(p);
    try {
      m.getPlayerLocation(p);
      assert.ok(false, 'expected player not found');
    } catch (e) {
      assert.ok(true, 'no player found');
    }
    done();
});

QUnit.test('movePlayerTo method moves MapLocation', function (assert) {
    var done = assert.async();
    expect(2);
    var m = new WarGame.Maps.Map10x10();
    var p = new WarGame.Players.Light();
    var loc = new WarGame.Maps.MapLocation(0, 0);
    m.placePlayer(p, loc);
    var actualLoc = m.getPlayerLocation(p);
    assert.ok(actualLoc.equals(loc), 'expected player location found');
    var moveLoc = new WarGame.Maps.MapLocation(2, 2);
    m.movePlayerTo(p, moveLoc);
    var moveActualLoc = m.getPlayerLocation(p);
    assert.ok(moveActualLoc.equals(moveLoc), 'expected to end at 2, 2');
    done();
});

QUnit.test('isPlayerBattling method is false when no opponents in mele range', function (assert) {
    var done = assert.async();
    expect(1);

    var m = new WarGame.Maps.Map10x10();
    var p1 = new WarGame.Players.Basic();
    var t1 = new WarGame.Teams.Blue(100);
    var t2 = new WarGame.Teams.Red(10000);
    t1.addPlayer(p1);
    WarGame.Teams.reset();
    WarGame.Teams.add(t1);

    m.placePlayer(p1, new WarGame.Maps.MapLocation(5, 5));

    // add opponents in all map spaces except those 8 around player
    for (var z=0; z<=9; z++) {
      for (var x=0; x<=9; x++) {
        if ((z<4 || z>6) && (x<4 || x>6)) {
          var p = new WarGame.Players.Basic();
          t2.addPlayer(p);
          m.placePlayer(p, new WarGame.Maps.MapLocation(x, z));
        }
      }
    }
    WarGame.Teams.add(t2);

    assert.ok(!m.isPlayerBattling(p1), 'expected to not be battling');
    done();
});

/* jshint loopfunc: true */
for (var z=4; z<=6; z++) {
    for (var x=4; x<=6; x++) {
        if (!(z === 5 && x === 5)) {
            (function (loc) {

QUnit.test('isPlayerBattling method is false when team nearby: ' + JSON.stringify(loc), function (assert) {
    var done = assert.async();
    expect(1);
    var m = new WarGame.Maps.Map10x10();
    var p1 = new WarGame.Players.Basic();
    var p2 = new WarGame.Players.Basic();
    var t = new WarGame.Teams.Blue(1000);
    t.addPlayer(p1);
    t.addPlayer(p2);
    WarGame.Teams.reset();
    WarGame.Teams.add(t);

    m.placePlayer(p1, new WarGame.Maps.MapLocation(5, 5));
    m.placePlayer(p2, new WarGame.Maps.MapLocation(loc.x, loc.z));

    assert.ok(!m.isPlayerBattling(p1), 'expected to not be battling');
    done();
});

QUnit.test('isPlayerBattling method is true when opponents nearby: ' + JSON.stringify(loc), function (assert) {
    var done = assert.async();
    expect(1);
    var m = new WarGame.Maps.Map10x10();
    var p1 = new WarGame.Players.Basic();
    var p2 = new WarGame.Players.Basic();
    var t1 = new WarGame.Teams.Blue(1000);
    var t2 = new WarGame.Teams.Red(1000);
    t1.addPlayer(p1);
    t2.addPlayer(p2);
    WarGame.Teams.reset();
    WarGame.Teams.add(t1);
    WarGame.Teams.add(t2);

    m.placePlayer(p1, new WarGame.Maps.MapLocation(5, 5));
    m.placePlayer(p2, new WarGame.Maps.MapLocation(loc.x, loc.z));

    assert.ok(m.isPlayerBattling(p1), 'expected to be battling');
    done();
});

            })({ x: x, z: z });
        }
    }
}
