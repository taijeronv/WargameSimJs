var WarGame = WarGame || {};
WarGame.UI = WarGame.UI || {};
WarGame.UI.PhasesUi = {};

WarGame.UI.PhasesUi.getPhaseContainers = function () {
    var phases = [];
    for (var phase of WarGame.Phases.get()) {
      phases.push(getPhaseContainer(phase));
    }

    return phases;
};

WarGame.UI.PhasesUi.getPhaseContainer = function (phase) {
  return document.querySelector('#' + phase.getName());
};

WarGame.UI.PhasesUi.createPhaseContainers = function () {
  var parentElement = document.querySelector('#left');
  for (var phase of WarGame.Phases.get()) {
      parentElement.appendChild(WarGame.UI.PhasesUi._createPhaseContainer(phase.getName()));
  }
  // pc.innerHTML = '' +
  // '<h3><span id="currentTeam" class="label label-default">loading...</span> ' +
  // '<span id="currentPhase" class="label label-default">loading...</span></h3>';
};

WarGame.UI.PhasesUi._createPhaseContainer = function (id) {
  var pc = document.createElement('div');
  pc.className = 'row-fluid';
  pc.setAttribute('id', id);
  return pc;
};

WarGame.UI.PhasesUi.removePhaseContainers = function () {
    for (var container of WarGame.UI.PhasesUi.getPhaseContainers()) {
      WarGame.UI.getLeftContainer().removeChild(container);
    }
};

WarGame.UI.PhasesUi.setCurrentPhaseText = function () {
    WarGame.UI.setContents('currentPhase', WarGame.Phases.getCurrentPhase().getName());
};
