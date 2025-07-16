// script.js (updated with advanced branching and features)

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

  traits() {
    const type = state.microbeType;
    let html = `<h2>Step 2: Select Structural Traits</h2><p>If you need a reminder, consult your class PowerPoints.</p>`;

    if (type === 'virus') {
      html += `
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
          <option>Coccobacillus</option>
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

    html += `<button onclick="saveTraits()">Next</button>`;
    app.innerHTML = html;
  },

  transmission() {
    app.innerHTML = `
      <h2>Step 3: Select Transmission Type</h2>
      <p>This step is critical for determining how well your microbe spreads and how easily it can be controlled.</p>
      <label>Primary Mode:</label>
      <select id="transmission" onchange="loadTransmissionDetails()">
        <option value="">--Choose--</option>
        <option value="Airborne">Airborne</option>
        <option value="Waterborne">Waterborne</option>
        <option value="Soilborne">Soilborne</option>
        <option value="Vector-borne">Vector-borne</option>
        <option value="Direct contact">Direct contact</option>
        <option value="Indirect contact">Indirect contact</option>
      </select>
      <div id="transmissionDetail"></div>
      <button onclick="saveTransmission()">Next</button>
      <button onclick="goTo('traits')">Back</button>
    `;
  },

  lifeCycle() {
    let options = '';
    if (state.microbeType === 'virus') {
      options = `<option>Lytic</option><option>Lysogenic</option>`;
    } else if (state.microbeType === 'helminth') {
      options = `<option>Simple (single host)</option><option>Complex (multiple hosts)</option>`;
    } else {
      options = `<option>Simple (single host)</option><option>Complex (multiple hosts)</option><option>Dormant stage (e.g. spores or cysts)</option>`;
    }

    app.innerHTML = `
      <h2>Step 4: Choose a Life Cycle</h2>
      <select id="lifecycle" onchange="checkComplexLifeCycle()">
        ${options}
      </select>
      <div id="lifeCycleDetail"></div>
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
      <label><input type="checkbox" value="Antigenic variation"> Antigenic variation</label><br>
      <label><input type="checkbox" value="Resistance to antibiotics"> Resistance to antibiotics</label><br>
      <button onclick="saveVirulence()">Next</button>
      <button onclick="goTo('lifeCycle')">Back</button>
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
  },

  summary() {
    app.innerHTML = `
      <h2>🎓 Final Microbe Profile</h2>
      <p><strong>Name:</strong> ${state.name}</p>
      <p><strong>Type:</strong> ${state.microbeType}</p>
      <p><strong>Structural Traits:</strong> ${JSON.stringify(state.traits)}</p>
      <p><strong>Transmission:</strong> ${state.transmission} (${state.transmissionDetail})</p>
      <p><strong>Life Cycle:</strong> ${state.lifeCycle}</p>
      ${state.intermediateHosts.length > 0 ? `<p><strong>Intermediate Hosts:</strong> ${state.intermediateHosts.join(', ')}</p>` : ''}
      ${state.definitiveHost ? `<p><strong>Definitive Host:</strong> ${state.definitiveHost}</p>` : ''}
      <p><strong>Virulence Factors:</strong> ${state.virulenceFactors.join(', ')}</p>
      <p><strong>Symptoms & Pathogenesis:</strong><br>${state.symptomReflection}</p>
      <p><strong>Sketch your microbe below based on this profile.</strong></p>
      <button onclick="goTo('nameMicrobe')">Back</button>
      <br><br>
      <button onclick="downloadSummary()">Download Summary</button>
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

function loadTransmissionDetails() {
  const value = document.getElementById('transmission').value;
  let html = '';
  if (value === 'Vector-borne') {
    html = `
      <label>Type of Vector:</label>
      <select id="transDetail">
        <option>Biological (bite)</option>
        <option>Mechanical (surface)</option>
      </select>
    `;
  } else {
    html = `<input type="text" id="transDetail" placeholder="Describe how it transmits">`;
  }
  document.getElementById('transmissionDetail').innerHTML = html;
}

function saveTransmission() {
  state.transmission = document.getElementById('transmission').value;
  state.transmissionDetail = document.getElementById('transDetail')?.value || '';
  goTo('lifeCycle');
}

function checkComplexLifeCycle() {
  const value = document.getElementById('lifecycle').value;
  if (value === 'Complex (multiple hosts)') {
    document.getElementById('lifeCycleDetail').innerHTML = `
      <label>Intermediate Hosts (comma-separated):</label>
      <input type="text" id="intermediateHosts">
      <label>Definitive Host:</label>
      <input type="text" id="definitiveHost">
    `;
  } else {
    document.getElementById('lifeCycleDetail').innerHTML = '';
  }
}

function saveLifeCycle() {
  state.lifeCycle = document.getElementById('lifecycle').value;
  if (state.lifeCycle === 'Complex (multiple hosts)') {
    state.intermediateHosts = document.getElementById('intermediateHosts').value.split(',').map(h => h.trim());
    state.definitiveHost = document.getElementById('definitiveHost').value.trim();
  }
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

function downloadSummary() {
  const text = `Microbe Name: ${state.name}\nType: ${state.microbeType}\nTraits: ${JSON.stringify(state.traits)}\nTransmission: ${state.transmission} (${state.transmissionDetail})\nLife Cycle: ${state.lifeCycle}\nIntermediate Hosts: ${state.intermediateHosts.join(', ')}\nDefinitive Host: ${state.definitiveHost}\nVirulence: ${state.virulenceFactors.join(', ')}\nSymptoms: ${state.symptomReflection}`;
  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${state.name || 'microbe'}.txt`;
  link.click();
}

// Start app
goTo('welcome');
