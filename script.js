// script.js (fixed: added welcome screen + missing screens)

const app = document.getElementById("app");

let state = {
  microbeType: null,
  traits: {},
  transmission: '',
  transmissionDetail: '',
  lifeCycle: '',
  intermediateHosts: [],
  definitiveHost: '',
  virulenceFactors: [],
  toxinType: '',
  enzymeFunction: '',
  symptomReflection: '',
  name: ''
};

function goTo(screen) {
  screens[screen]();
}

const screens = {
  welcome() {
    app.innerHTML = `
      <h1>Make Your Own Microbe</h1>
      <p>Welcome! This app will guide you through designing a microbe using what you've learned in microbiology.</p>
      <p>If you need a reminder of what anything is, consult your class PowerPoints.</p>
      <button onclick="goTo('microbeType')">Start Building</button>
    `;
  },

  microbeType() {
    app.innerHTML = `
      <h2>Step 1: Choose Microbe Type</h2>
      <p>If you need a reminder of what anything is, consult your class PowerPoints.</p>
      <button onclick="selectType('virus')">Virus</button>
      <button onclick="selectType('bacterium')">Bacterium</button>
      <button onclick="selectType('fungus')">Fungus</button>
      <button onclick="selectType('helminth')">Helminth</button>
      <button onclick="selectType('protozoan')">Protozoan</button>
    `;
  },

  reflection() {
    app.innerHTML = `
      <h2>Step 6: Predict Symptoms Based on All Traits</h2>
      <p>Describe how your microbe causes disease and what symptoms result:</p>
      <textarea id="reflection" rows="6"></textarea>
      <p><strong>Hints:</strong></p>
      <ul>
        <li><strong>Transmission:</strong> ${state.transmission} → impacts spread and symptoms</li>
        <li><strong>Virulence:</strong> ${state.virulenceFactors.join(', ') || 'None'} → affects severity</li>
        <li><strong>Life Cycle:</strong> ${state.lifeCycle} → ${state.lifeCycle === 'Complex (multiple hosts)' ? 'Consider intermediate and definitive hosts' : 'Simpler host-pathogen interaction'}</li>
      </ul>
      <button onclick="saveReflection()">Next</button>
      <button onclick="goTo('virulence')">Back</button>
    `;
  },

  nameMicrobe() {
    app.innerHTML = `
      <h2>Step 7: Name Your Microbe</h2>
      <input type="text" id="microbeName" placeholder="e.g., Evilus microbii">
      <button onclick="saveName()">Finish</button>
      <button onclick="goTo('reflection')">Back</button>
    `;
  }
};

function selectType(type) {
  state.microbeType = type;
  state.traits = {};
  goTo('traits');
}

function saveTraits() {
  document.querySelectorAll('select').forEach(sel => {
    state.traits[sel.id] = sel.value;
  });
  goTo('transmission');
}

function saveReflection() {
  state.symptomReflection = document.getElementById('reflection').value.trim();
  goTo('nameMicrobe');
}

function saveName() {
  state.name = document.getElementById('microbeName').value.trim();
  goTo('summary');
}

// previously defined: toggleToxinDetails, toggleEnzymeDetails, saveVirulence, downloadSummary

// Fix to reinitialize start screen
window.onload = () => goTo('welcome');
