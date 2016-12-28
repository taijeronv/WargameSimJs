QUnit.module('WarGame.Battles.MeleBattle');
QUnit.test('getTotalAttackPoints adds all attacks for passed in player array', function (assert) {
    expect(1);
    var b = new WarGame.Battles.MeleBattle();
    var players = [
      new WarGame.Players.BasicPlayer(),
      new WarGame.Players.BasicPlayer(),
      new WarGame.Players.HeroPlayer()
    ];
    assert.equal(b.getTotalAttackPoints(players), 4, 'expected 4 points');
});

QUnit.test('getHighestMeleValue returns highest value player stat', function (assert) {
    expect(1);
    var b = new WarGame.Battles.MeleBattle();
    var players = [
      new WarGame.Players.BasicPlayer(),
      new WarGame.Players.BasicPlayer(),
      new WarGame.Players.HeroPlayer()
    ];
    assert.equal(b.getHighestMeleValue(players), 6, 'expected 6 points');
});
