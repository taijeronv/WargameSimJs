var WarGame = WarGame || {};
WarGame.UI = WarGame.UI || {};
WarGame.UI.PlayersUi = {};

WarGame.UI.PlayersUi.displayPlayerDefeatedAlert = function (player) {
    setTimeout(function () {
        WarGame.UI.displayAlert(player.getTeam().getName() + ' - ' + player.getName() + ' defeated!', WarGame.UI.ALERT_BAD);
    }, 0);
};
