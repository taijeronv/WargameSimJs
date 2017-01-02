var WarGame = WarGame || {};
WarGame.UI = {
  _counter: 0,
  _playfield: null,
  ALERT_GOOD: 'alert-success',
  ALERT_INFO: 'alert-info',
  ALERT_BAD: 'alert-danger'
};

WarGame.UI.initialize = function () {
    WarGame.UI._playfield = document.querySelector('#playfield');
    WarGame.UI.getPlayfield().style.height = window.innerHeight + "px";
    WarGame.UI.Plotter.initialize();
    WarGame.UI.createMenusContainer();

    // add map to playfield
    WarGame.UI.addMesh(WarGame.Maps.get().getObj());
    // add players to playfield
    for (var team of WarGame.Teams.get()) {
      for (var player of team.getPlayers()) {
        WarGame.UI.addMesh(player.getObj());
      }
    }
};

WarGame.UI.getPlayField = function () {
    return WarGame.UI._playfield;
};

WarGame.UI.addMesh = function (mesh) {
    WarGame.UI.Plotter.addMesh(mesh);
};

WarGame.UI.removeMesh = function (mesh) {
    WarGame.UI.Plotter.removeMesh(mesh);
};

WarGame.UI.displayAlert = function (message, type) {
  setTimeout(function () {
    if (!type) {
      type = WarGame.UI.ALERT_INFO;
    }
    var alertsContainer = WarGame.UI.getAlertsContainer();
    var alertId = WarGame.UI._counter++;
    alertsContainer.innerHTML = '<div id="alert-' + alertId + '" class="alert ' + type + '" role="alert" style="display: none;">' +
        message + '</div>' + alertsContainer.innerHTML;
    $("#alert-" + alertId).fadeIn(100, function () {
      $("#alert-" + alertId).delay(5000).fadeOut(1000, function () {
          $("#alert-" + alertId).remove();
      });
    });
  }, 0);
};

WarGame.UI.getAlertsContainer = function () {
    var alertsContainer;
    try {
        alertsContainer = document.querySelector('#alertsContainer');
        if (!alertsContainer) {
            throw 'does not exist';
        }
    } catch (e) {
        WarGame.UI.createAlertsContainer();
        alertsContainer = document.querySelector('#alertsContainer');
    }
    return alertsContainer;
};

WarGame.UI.createAlertsContainer = function () {
    var alertsContainer = document.createElement('div');
    alertsContainer.setAttribute("id", 'alertsContainer');

    var container = document.querySelector('#middle');
    container.insertBefore(alertsContainer, container.firstChild);
};

WarGame.UI.getMenusContainer = function () {
    var menusContainer;
    menusContainer = document.querySelector('#menusContainer');
    return menusContainer;
};

WarGame.UI.getLeftContainer = function () {
  return document.querySelector('#left');
};

WarGame.UI.getRightContainer = function () {
  return document.querySelector('#right');
};

WarGame.UI.getCentreContainer = function () {
  return document.querySelector('#middle');
};

WarGame.UI.createMenusContainer = function () {
    var menusContainer = document.createElement('div');
    menusContainer.setAttribute('id', 'menusContainer');
    menusContainer.className = 'container-fluid';
    menusContainer.innerHTML = '' +
'<div class="row-fluid">' +
'<div id="left" class="col-xs-3"></div>' +
'<div id="middle" class="col-xs-6"></div>' +
'<div id="right" class="col-xs-3"></div>' +
'</div>';

    var playfiled = WarGame.UI.getPlayField();
    playfield.insertBefore(menusContainer, playfield.firstChild);
};

WarGame.UI.removeMenusContainer = function () {
    var menusContainer = document.querySelector('#menusContainer');
    WarGame.UI.getPlayField().removeChild(menusContaner);
};

/**
 * find a element using the passed in 'containerId' and set its
 * innerHTML to the passed in 'contentsStr'
 */
WarGame.UI.setContents = function (containerId, contentsStr) {
    document.querySelector('#' + containerId).innerHTML = contentsStr;
};

WarGame.UI.getContents = function (containerId) {
    return document.querySelector('#' + containerId).innerHTML;
};

WarGame.UI.setValue = function (fieldId, valueStr) {
    document.querySelector('#' + fieldId).value = valueStr;
};

WarGame.UI.getValue = function (fieldId) {
    return document.querySelector('#' + fieldId).value;
};

WarGame.UI.update = function () {
    WarGame.UI.Plotter.render();
};

WarGame.UI.reset = function () {
    WarGame.UI.removeMenusContainer();
    WarGame.UI.Plotter.reset();
};
