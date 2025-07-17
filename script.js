// script.js (final full version with all screens restored, transmission nested, virus restrictions, and toxin symptom prompt)

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
      <button onclick="selectType('virus')">Virus</button>
      <button onclick="selectType('bacterium')">Bacterium</button>
      <button onclick="selectType('fungus')">Fungus</button>
      <button onclick="selectType('helminth')">Helminth</button>
      <p><em>Note: Protozoa are too biologically diverse to be fully supported in this app. You are welcome to design one on your own.</em></p>
      <br><button onclick="goTo('welcome')">Back</button>
    `;
  },

  transmission() {
    app.innerHTML = `
      <h2>Step 3: Choose Transmission</h2>
      <label>Transmission Category:</label>
      <select id="transmission">
        <option value="">-- Select --</option>
        <option>Contact Transmission</option>
        <option>Vehicle Transmission</option>
        <option>Vector-borne Transmission</option>
      </select>
      <div id="detail"></div>
      <button onclick="saveTransmission()">Next</button>
      <button onclick="goTo('traits')">Back</button>
    `;
    document.getElementById("transmission").addEventListener("change", updateTransmissionDetail);
  },

  lifeCycle() {
    let options = `<option value="">-- Select --</option>`;
    if (state.microbeType === "virus") {
      options += `<option>Lytic</option><option>Lysogenic</option>`;
    } else {
      options += `<option>Simple (single host)</option><option>Complex (multiple hosts)</option>`;
      if (state.microbeType === "bacterium") options += `<option>Lytic</option>`;
    }
    app.innerHTML = `
      <h2>Step 4: Life Cycle</h2>
      <select id="lifeCycle">${options}</select>
      <div id="hostOptions"></div>
      <button onclick="saveLifeCycle()">Next</button>
      <button onclick="goTo('transmission')">Back</button>
    `;
    document.getElementById("lifeCycle").addEventListener("change", updateHostFields);
  },

  virulence() {
    app.innerHTML = `
      <h2>Step 5: Virulence Factors</h2>
      <label><input type="checkbox" value="Antimicrobial Resistance"> Antimicrobial Resistance</label><br>
      <label><input type="checkbox" value="Capsule"> Capsule</label><br>
      <label><input type="checkbox" value="Enzyme Production"> Enzyme Production</label><br>
      <label><input type="checkbox" value="Toxin Production"> Toxin Production</label><br>
      <div id="toxinDetails"></div>
      <div id="enzymeDetails"></div>
      <button onclick="saveVirulence()">Next</button>
      <button onclick="goTo('lifeCycle')">Back</button>
    `;
    document.querySelectorAll('input[type=checkbox]').forEach(cb => cb.addEventListener("change", updateVirulenceDetails));
  }
};

function updateTransmissionDetail() {
  const category = document.getElementById("transmission").value;
  state.transmission = category;
  const detailDiv = document.getElementById("detail");
  let html = "";

  if (category === "Contact Transmission") {
    html += `<label>Specific Type:</label>
      <select id="transmissionDetail">
        <option value="">-- Select --</option>
        <option>Direct Contact</option>
        <option>Indirect Contact</option>
        <option>Droplet Transmission</option>
      </select>`;
  } else if (category === "Vehicle Transmission") {
    html += `<label>Specific Type:</label>
      <select id="transmissionDetail">
        <option value="">-- Select --</option>
        <option>Waterborne</option>
        <option>Foodborne</option>
        <option>Airborne</option>
        <option>Soilborne</option>
      </select>`;
  } else if (category === "Vector-borne Transmission") {
    html += `<label>Specific Type:</label>
      <select id="transmissionDetail">
        <option value="">-- Select --</option>
        <option>Biological Vector</option>
        <option>Mechanical Vector</option>
      </select>`;
  }

  detailDiv.innerHTML = html;
}

function saveTransmission() {
  const main = document.getElementById("transmission").value;
  const detail = document.getElementById("transmissionDetail");
  if (!main) return alert("Please select a transmission category.");
  state.transmission = main;
  state.transmissionDetail = detail ? detail.value : '';
  if (!state.transmissionDetail) return alert("Please select a specific transmission type.");
  goTo('lifeCycle');
}

function updateHostFields() {
  const lc = document.getElementById("lifeCycle").value;
  let html = "";
  if (lc === "Complex (multiple hosts)") {
    html += `
      <label>Intermediate Hosts (comma separated):</label><br>
      <input type="text" id="intermediate">
      <br><label>Definitive Host:</label><br>
      <input type="text" id="definitive">
    `;
  }
  document.getElementById("hostOptions").innerHTML = html;
}

function saveLifeCycle() {
  const lc = document.getElementById("lifeCycle").value;
  if (!lc) return alert("Please select a life cycle.");
  state.lifeCycle = lc;
  if (lc === "Complex (multiple hosts)") {
    state.intermediateHosts = document.getElementById("intermediate").value.split(',').map(s => s.trim());
    state.definitiveHost = document.getElementById("definitive").value.trim();
  }
  goTo('virulence');
}

function updateVirulenceDetails() {
  const checked = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(cb => cb.value);
  state.virulenceFactors = checked;
  let toxin = "", enzyme = "";
  if (checked.includes("Toxin Production")) {
    toxin = `
      <label>Toxin Type:</label>
      <select id="toxinType">
        <option value="">-- Select --</option>
        <option>Endotoxin</option>
        <option>Exotoxin - Cytotoxin</option>
        <option>Exotoxin - Neurotoxin</option>
        <option>Exotoxin - Enterotoxin</option>
      </select>
      <p><em>How will this toxin influence the symptoms in your host?</em></p>
    `;
  }
  if (checked.includes("Enzyme Production")) {
    enzyme = `<label>Enzyme Function:</label><input type="text" id="enzymeFunction">`;
  }
  document.getElementById("toxinDetails").innerHTML = toxin;
  document.getElementById("enzymeDetails").innerHTML = enzyme;
}

function saveVirulence() {
  const tox = document.getElementById("toxinType");
  const enz = document.getElementById("enzymeFunction");
  if (tox) state.toxinType = tox.value;
  if (enz) state.enzymeFunction = enz.value;
  goTo('reflection');
}

window.onload = () => goTo('welcome');
