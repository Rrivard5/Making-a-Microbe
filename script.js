// script.js (fixed: ensure Step 2 Next buttons work by adding placeholder transmission screen)

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
      <p><em>Note: Protozoa are too biologically diverse to be fully supported in this app. You are welcome to design one on your own.</em></p>
      <br><button onclick="goTo('welcome')">Back</button>
    `;
  },

  traits() {
    const type = state.microbeType;
    let html = `<h2>Step 2: Select Structural Traits</h2><p>If you need a reminder, consult your class PowerPoints.</p>`;

    if (type === 'virus') {
      html += `
        <label>Capsid Shape:</label>
        <select id="capsid">
          <option value="">-- Select --</option>
          <option>Icosahedral</option>
          <option>Helical</option>
          <option>Complex</option>
        </select>
        <label>Envelope:</label>
        <select id="envelope">
          <option value="">-- Select --</option>
          <option>Yes</option>
          <option>No</option>
        </select>
        <label>Genome Type:</label>
        <select id="genome">
          <option value="">-- Select --</option>
          <option>ssRNA (positive-sense)</option>
          <option>ssRNA (negative-sense)</option>
          <option>dsRNA</option>
          <option>ssDNA</option>
          <option>dsDNA</option>
          <option>Retrovirus</option>
        </select>
      `;
    } else if (type === 'bacterium') {
      html += `
        <label>Shape:</label>
        <select id="shape">
          <option value="">-- Select --</option>
          <option>Coccus</option>
          <option>Bacillus</option>
          <option>Coccobacillus</option>
          <option>Spirochete</option>
          <option>Vibrio</option>
        </select>
        <label>Motility:</label>
        <select id="motility">
          <option value="">-- Select --</option>
          <option>Non-motile</option>
          <option>Flagellated</option>
          <option>Cytoskeletal gliding</option>
        </select>
        <label>Cell Wall:</label>
        <select id="cellwall">
          <option value="">-- Select --</option>
          <option>Gram-positive</option>
          <option>Gram-negative</option>
        </select>
      `;
    } else if (type === 'fungus') {
      html += `
        <label>Structure:</label>
        <select id="fungitype">
          <option value="">-- Select --</option>
          <option>Unicellular</option>
          <option>Multicellular</option>
          <option>Dimorphic</option>
        </select>
        <label>Reproduction:</label>
        <select id="fungirepro">
          <option value="">-- Select --</option>
          <option>Asexual</option>
          <option>Sexual</option>
          <option>Both</option>
        </select>
      `;
    } else if (type === 'helminth') {
      html += `
        <label>Body Form:</label>
        <select id="helminthform">
          <option value="">-- Select --</option>
          <option>Nematode</option>
          <option>Cestode</option>
          <option>Trematode</option>
        </select>
      `;
    }

    html += `
      <button onclick="saveTraits()">Next</button>
      <button onclick="goTo('microbeType')">Back</button>
    `;
    app.innerHTML = html;
  },

  transmission() {
    app.innerHTML = `
      <h2>Step 3: Transmission (Placeholder)</h2>
      <p>This is a placeholder. More logic will go here in future steps.</p>
      <button onclick="goTo('reflection')">Skip to Symptoms</button>
      <button onclick="goTo('traits')">Back</button>
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
  const selects = document.querySelectorAll('select');
  for (let sel of selects) {
    if (!sel.value) {
      alert('Please complete all selections.');
      return;
    }
    state.traits[sel.id] = sel.value;
  }
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

window.onload = () => goTo('welcome');
