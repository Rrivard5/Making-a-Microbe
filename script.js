// script.js (updated with capsid, antimicrobial resistance, toxins, enzyme production, doc export)

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
  traits() {
    const type = state.microbeType;
    let html = `<h2>Step 2: Select Structural Traits</h2><p>If you need a reminder, consult your class PowerPoints.</p>`;

    if (type === 'virus') {
      html += `
        <label>Capsid Shape:</label>
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
    }
    // ...other conditions remain unchanged...

    html += `<button onclick="saveTraits()">Next</button>`;
    app.innerHTML = html;
  },

  virulence() {
    app.innerHTML = `
      <h2>Step 5: Add Virulence Factors</h2>
      <p>Select any virulence factors your microbe has:</p>
      <label><input type="checkbox" value="Toxin production" onchange="toggleToxinDetails(this.checked)"> Toxin production</label><br>
      <div id="toxinDetail"></div>
      <label><input type="checkbox" value="Immune evasion"> Immune evasion</label><br>
      <label><input type="checkbox" value="Biofilm formation"> Biofilm formation</label><br>
      <label><input type="checkbox" value="Cell invasion"> Cell invasion</label><br>
      <label><input type="checkbox" value="Antigenic variation"> Antigenic variation</label><br>
      <label><input type="checkbox" value="Antimicrobial resistance"> Antimicrobial resistance</label><br>
      <label><input type="checkbox" value="Enzyme production" onchange="toggleEnzymeDetails(this.checked)"> Enzyme production</label><br>
      <div id="enzymeDetail"></div>
      <button onclick="saveVirulence()">Next</button>
      <button onclick="goTo('lifeCycle')">Back</button>
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
      ${state.toxinType ? `<p><strong>Toxin Type:</strong> ${state.toxinType}</p>` : ''}
      ${state.enzymeFunction ? `<p><strong>Enzyme Function:</strong> ${state.enzymeFunction}</p>` : ''}
      <p><strong>Symptoms & Pathogenesis:</strong><br>${state.symptomReflection}</p>
      <p><strong>Sketch your microbe below based on this profile.</strong></p>
      <button onclick="goTo('nameMicrobe')">Back</button>
      <br><br>
      <button onclick="downloadSummary()">Download Summary (.doc)</button>
    `;
  }
};

function toggleToxinDetails(checked) {
  document.getElementById('toxinDetail').innerHTML = checked ? `
    <label>Select Toxin Type:</label>
    <select id="toxinType">
      <option>Cytotoxin</option>
      <option>Neurotoxin</option>
      <option>Superantigen</option>
      <option>Endotoxin</option>
    </select>
  ` : '';
}

function toggleEnzymeDetails(checked) {
  document.getElementById('enzymeDetail').innerHTML = checked ? `
    <label>What does the enzyme do?</label>
    <input type="text" id="enzymeFunction" placeholder="e.g., breaks down host cell walls">
  ` : '';
}

function saveVirulence() {
  const boxes = document.querySelectorAll('input[type=checkbox]:checked');
  state.virulenceFactors = Array.from(boxes).map(b => b.value);
  state.toxinType = document.getElementById('toxinType')?.value || '';
  state.enzymeFunction = document.getElementById('enzymeFunction')?.value || '';
  goTo('reflection');
}

function downloadSummary() {
  const html = `
    <html><body>
    <h1>${state.name}</h1>
    <p><strong>Type:</strong> ${state.microbeType}</p>
    <p><strong>Traits:</strong> ${JSON.stringify(state.traits)}</p>
    <p><strong>Transmission:</strong> ${state.transmission} (${state.transmissionDetail})</p>
    <p><strong>Life Cycle:</strong> ${state.lifeCycle}</p>
    <p><strong>Intermediate Hosts:</strong> ${state.intermediateHosts.join(', ')}</p>
    <p><strong>Definitive Host:</strong> ${state.definitiveHost}</p>
    <p><strong>Virulence:</strong> ${state.virulenceFactors.join(', ')}</p>
    <p><strong>Toxin Type:</strong> ${state.toxinType}</p>
    <p><strong>Enzyme Function:</strong> ${state.enzymeFunction}</p>
    <p><strong>Symptoms:</strong><br>${state.symptomReflection}</p>
    </body></html>
  `;
  const blob = new Blob([html], { type: 'application/msword' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${state.name || 'microbe'}.doc`;
  link.click();
}

// All other existing code and screens stay the same...
goTo('welcome');
