const app = document.getElementById('app');

let state = {
  microbeType: null,
  traits: {},
  symptomReflection: '',
  selectedSketch: '',
  name: ''
};

const screens = {
  welcome() {
    app.innerHTML = `
      <h1>Make Your Own Microbe</h1>
      <p>Welcome! This app will guide you through designing a microbe using what you've learned in microbiology.</p>
      <button onclick="goTo('microbeType')">Start Building</button>
    `;
  },

  microbeType() {
    app.innerHTML = `
      <h2>Step 1: Choose Microbe Type</h2>
      <p>Select the kind of microbe you want to create:</p>
      <button onclick="selectType('virus')">Virus</button>
      <button onclick="selectType('bacterium')">Bacterium</button>
      <button onclick="selectType('fungus')">Fungus</button>
      <button onclick="selectType('helminth')">Helminth</button>
      <button onclick="selectType('protozoan')">Protozoan</button>
      <br><br><button onclick="goTo('welcome')">Back</button>
    `;
  },

  traits() {
    const type = state.microbeType;
    let traitQuestions = '';

    switch (type) {
      case 'virus':
        traitQuestions = `
          <label>Capsid shape:</label>
          <select id="capsid">
            <option>Icosahedral</option>
            <option>Helical</option>
            <option>Complex</option>
          </select>
          <label>Envelope:</label>
          <select id="envelope">
            <option>Yes</option>
            <option>No</option>
          </select>
          <label>Genome Type:</label>
          <select id="genome">
            <option>ssRNA</option>
            <option>dsRNA</option>
            <option>ssDNA</option>
            <option>dsDNA</option>
            <option>Retrovirus</option>
          </select>
        `;
        break;
      case 'bacterium':
        traitQuestions = `
          <label>Shape:</label>
          <select id="shape">
            <option>Coccus</option>
            <option>Bacillus</option>
            <option>Spirochete</option>
            <option>Vibrio</option>
          </select>
          <label>Motility:</label>
          <select id="motility">
            <option>Non-motile</option>
            <option>Flagellated</option>
            <option>Cytoskeletal gliding</option>
          </select>
          <label>Cell wall type:</label>
          <select id="cellwall">
            <option>Gram-positive</option>
            <option>Gram-negative</option>
          </select>
        `;
        break;
      case 'fungus':
        traitQuestions = `
          <label>Structure:</label>
          <select id="fungitype">
            <option>Unicellular</option>
            <option>Multicellular</option>
            <option>Dimorphic</option>
          </select>
          <label>Reproduction:</label>
          <select id="fungirepro">
            <option>Asexual</option>
            <option>Sexual</option>
            <option>Both</option>
          </select>
        `;
        break;
      default:
        traitQuestions = `<p>(Scaffolding not provided for ${type}. Use worksheet!)</p>`;
    }

    app.innerHTML = `
      <h2>Step 2: Choose Traits for Your ${type}</h2>
      ${traitQuestions}
      <button onclick="saveTraits()">Next</button>
      <button onclick="goTo('microbeType')">Back</button>
    `;
  },

  reflection() {
    app.innerHTML = `
      <h2>Step 3: Predict Transmission and Symptoms</h2>
      <p>Based on your selections, how does your microbe spread and what symptoms does it likely cause?</p>
      <textarea id="reflection" rows="6" placeholder="e.g., My virus enters through the lungs and may cause coughing, fever, and shortness of breath..."></textarea>
      <p><strong>Examples:</strong></p>
      <ul>
        <li><em>Bacterium entering through the skin</em> → rash, ulcers</li>
        <li><em>Virus targeting respiratory tract</em> → coughing, congestion</li>
        <li><em>Helminth entering via GI tract</em> → nausea, diarrhea</li>
      </ul>
      <button onclick="saveReflection()">Next</button>
      <button onclick="goTo('traits')">Back</button>
    `;
  },

  sketch() {
    app.innerHTML = `
      <h2>Step 4: Choose a Sketch</h2>
      <p>Which of these images best represents your microbe?</p>
      <div class="microbe-card" onclick="selectSketch('A')">🔬 Sketch A (rounded with tail)</div>
      <div class="microbe-card" onclick="selectSketch('B')">🧬 Sketch B (spiral shape)</div>
      <div class="microbe-card" onclick="selectSketch('C')">🪱 Sketch C (wormlike)</div>
      <button onclick="goTo('reflection')">Back</button>
    `;
  },

  nameMicrobe() {
    app.innerHTML = `
      <h2>Step 5: Name Your Microbe</h2>
      <input type="text" id="microbeName" placeholder="e.g., Evilus microbii">
      <button onclick="saveName()">Finish</button>
      <button onclick="goTo('sketch')">Back</button>
    `;
  },

  summary() {
    const summaryHTML = `
      <h2>Final Microbe Profile</h2>
      <p><strong>Name:</strong> ${state.name}</p>
      <p><strong>Type:</strong> ${state.microbeType}</p>
      <p><strong>Traits:</strong> ${JSON.stringify(state.traits)}</p>
      <p><strong>Symptoms & Transmission:</strong><br>${state.symptomReflection}</p>
      <p><strong>Selected Sketch:</strong> ${state.selectedSketch}</p>
      <p>🎉 Great job! You can now take a screenshot or submit your worksheet.</p>
      <button onclick="goTo('nameMicrobe')">Back</button>
    `;
    app.innerHTML = summaryHTML;
  }
};

// Navigation and state handlers
function goTo(screen) {
  screens[screen]();
}

function selectType(type) {
  state.microbeType = type;
  goTo('traits');
}

function saveTraits() {
  const selects = app.querySelectorAll('select');
  selects.forEach(select => {
    state.traits[select.id] = select.value;
  });
  goTo('reflection');
}

function saveReflection() {
  state.symptomReflection = document.getElementById('reflection').value.trim();
  goTo('sketch');
}

function selectSketch(sketch) {
  state.selectedSketch = sketch;
  goTo('nameMicrobe');
}

function saveName() {
  state.name = document.getElementById('microbeName').value.trim();
  goTo('summary');
}

// Start the app
goTo('welcome');
