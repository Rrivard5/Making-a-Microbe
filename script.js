// script.js (updated with requested improvements)

const app = document.getElementById("app");

let state = {
  microbeType: null,
  traits: {},
  transmission: '',
  lifeCycle: '',
  virulenceFactors: [],
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
      <button onclick="goTo('microbeType')">Start Building</button>
    `;
  },

  microbeType() {
    app.innerHTML = `
      <h2>Step 1: Choose Microbe Type</h2>
      <button onclick="selectType('virus')">Virus</button>
      <button onclick="selectType('bacterium')">Bacterium</button>
      <button onclick="selectType('fungus')">Fungus</button>
      <button onclick="selectType('helminth')">Helminth</button>
      <button onclick="selectType('protozoan')">Protozoan</button>
    `;
  },

  traits() {
    const type = state.microbeType;
    let html = `<h2>Step 2: Select Structural Traits</h2>`;

    if (type === 'virus') {
      html += `
        <label>Capsid Shape <span class="tooltip">[?]<span class="tooltiptext">Icosahedral = 20-sided; Helical = spiral tube; Complex = irregular</span></span></label>
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
        <label>Cell Wall:</label>
        <select id="cellwall">
          <option>Gram-positive</option>
          <option>Gram-negative</option>
        </select>
      `;
    } else if (type === 'fungus') {
      html += `
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
    } else if (type === 'helminth') {
      html += `
        <label>Body Form:</label>
        <select id="helminthform">
          <option>Nematode</option>
          <option>Cestode</option>
          <option>Trematode</option>
        </select>
      `;
    }

    html += `
      <button onclick="saveTraits()">Next</button>
    `;

    app.innerHTML = html;
  },

  transmission() {
    app.innerHTML = `
      <h2>Step 3: Select Transmission Type</h2>
      <label>How is your microbe transmitted?</label>
      <select id="transmission">
        <option>Airborne</option>
        <option>Waterborne</option>
        <option>Soilborne</option>
        <option>Vector-borne</option>
        <option>Direct contact</option>
        <option>Indirect contact (fomite)</option>
      </select>
      <button onclick="saveTransmission()">Next</button>
      <button onclick="goTo('traits')">Back</button>
    `;
  },

  lifeCycle() {
    app.innerHTML = `
      <h2>Step 4: Choose a Life Cycle</h2>
      <select id="lifecycle">
        <option>Simple (single host)</option>
        <option>Complex (multiple hosts)</option>
        <option>Dormant stage (e.g. spores or cysts)</option>
        <option>Latency (e.g. lysogenic cycle)</option>
      </select>
      <button onclick="saveLifeCycle()">Next</button>
      <button onclick="goTo('transmission')">Back</button>
    `;
  },

  virulence() {
    app.innerHTML = `
      <h2>Step 5: Add Virulence Factors</h2>
      <p>Select any virulence factors your microbe has:</p>
      <label><input type="checkbox" value="Toxin production"> Toxin production</label><br>
      <label><input type="checkbox" value="Immune evasion"> Immune evasion</label><br>
      <label><input type="checkbox" value="Biofilm formation"> Biofilm formation</label><br>
      <label><input type="checkbox" value="Cell invasion"> Cell invasion</label><br>
      <button onclick="saveVirulence()">Next</button>
      <button onclick="goTo('lifeCycle')">Back</button>
    `;
  },

  reflection() {
    app.innerHTML = `
      <h2>Step 6: Predict Symptoms Based on All Traits</h2>
      <p>Describe how your microbe causes disease and what symptoms result:</p>
      <textarea id="reflection" rows="6"></textarea>
      <p><strong>Hints based on your traits:</strong></p>
      <ul>
        <li><strong>Transmission:</strong> ${state.transmission} → ${state.transmission.includes('Air') ? 'Respiratory symptoms' : state.transmission.includes('Water') ? 'GI symptoms' : 'Local or systemic effects'}</li>
        <li><strong>Virulence:</strong> ${state.virulenceFactors.join(', ') || 'None'} → Potentially more severe or evasive disease</li>
        <li><strong>Life Cycle:</strong> ${state.lifeCycle} → May affect chronicity or exposure risk</li>
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
  },

  summary() {
    app.innerHTML = `
      <h2>🎓 Final Microbe Profile</h2>
      <p><strong>Name:</strong> ${state.name}</p>
      <p><strong>Type:</strong> ${state.microbeType}</p>
      <p><strong>Structural Traits:</strong> ${JSON.stringify(state.traits)}</p>
      <p><strong>Transmission:</strong> ${state.transmission}</p>
      <p><strong>Life Cycle:</strong> ${state.lifeCycle}</p>
      <p><strong>Virulence Factors:</strong> ${state.virulenceFactors.join(', ')}</p>
      <p><strong>Symptoms & Pathogenesis:</strong><br>${state.symptomReflection}</p>
      <p><strong>Sketch your microbe below based on this profile.</strong></p>
      <button onclick="goTo('nameMicrobe')">Back</button>
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

function saveTransmission() {
  state.transmission = document.getElementById('transmission').value;
  goTo('lifeCycle');
}

function saveLifeCycle() {
  state.lifeCycle = document.getElementById('lifecycle').value;
  goTo('virulence');
}

function saveVirulence() {
  const boxes = document.querySelectorAll('input[type=checkbox]:checked');
  state.virulenceFactors = Array.from(boxes).map(b => b.value);
  goTo('reflection');
}

function saveReflection() {
  state.symptomReflection = document.getElementById('reflection').value.trim();
  goTo('nameMicrobe');
}

function saveName() {
  state.name = document.getElementById('microbeName').value.trim();
  goTo('summary');
}

// Start app
goTo('welcome');
