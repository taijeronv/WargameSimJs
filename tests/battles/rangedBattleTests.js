QUnit.module('WarGame.Battles.RangedBattle');

QUnit.test('addAttacker throws exception if called more than once', function (assert) {
    expect(2);
    var b = new WarGame.Battles.RangedBattle();
    assert.equal(b.getPlayers().length, 0, 'expected 0 players in battle');
    b.addAttacker(new WarGame.Players.BasicPlayer());
    assert.throws(function () {
        b.addAttacker(new WarGame.Players.BasicPlayer());
    }, 'expected exception adding 2nd attacker');
});
