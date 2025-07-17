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
  name: '',
  currentStep: 0
};

function startApp() {
  showMicrobeTypeScreen();
}

function showMicrobeTypeScreen() {
  state.currentStep = 1;
  document.getElementById('app').innerHTML = `
    <div class="progress-bar">
      <div class="progress-fill" style="width: 17%"></div>
    </div>
    <h2>Step 1: Choose Your Microbe Type</h2>
    <p>Select the type of microorganism you want to design. Each has unique characteristics and pathogenic potential.</p>
    
    <div class="microbe-selector">
      <div class="microbe-card virus" onclick="selectMicrobeType('virus')">
        <span class="microbe-emoji">🦠</span>
        <strong>Virus</strong>
        <p>Obligate intracellular parasites</p>
      </div>
      <div class="microbe-card bacterium" onclick="selectMicrobeType('bacterium')">
        <span class="microbe-emoji">🧬</span>
        <strong>Bacterium</strong>
        <p>Single-celled prokaryotes</p>
      </div>
      <div class="microbe-card fungus" onclick="selectMicrobeType('fungus')">
        <span class="microbe-emoji">🍄</span>
        <strong>Fungus</strong>
        <p>Eukaryotic organisms</p>
      </div>
      <div class="microbe-card helminth" onclick="selectMicrobeType('helminth')">
        <span class="microbe-emoji">🪱</span>
        <strong>Helminth</strong>
        <p>Parasitic worms</p>
      </div>
    </div>
    
    <p><em>Note: Protozoa are too biologically diverse to be fully supported in this app. You are welcome to design one on your own.</em></p>
    
    <div class="navigation">
      <button class="secondary" onclick="goHome()">← Back to Home</button>
      <div></div>
    </div>
  `;
}

function selectMicrobeType(type) {
  state.microbeType = type;
  showTraitsScreen();
}

function showTraitsScreen() {
  state.currentStep = 2;
  const type = state.microbeType;
  let html = `
    <div class="progress-bar">
      <div class="progress-fill" style="width: 33%"></div>
    </div>
    <h2>Step 2: Select Structural Traits</h2>
    <p>Choose the structural characteristics that will define your ${type}'s biology and pathogenic potential.</p>
  `;

  if (type === 'virus') {
    html += `
      <div class="form-group">
        <label for="capsid">Capsid Shape:</label>
        <select id="capsid">
          <option value="">-- Select capsid shape --</option>
          <option value="Icosahedral">Icosahedral</option>
          <option value="Helical">Helical</option>
          <option value="Complex">Complex</option>
        </select>
      </div>
      <div class="form-group">
        <label for="envelope">Envelope:</label>
        <select id="envelope">
          <option value="">-- Select envelope presence --</option>
          <option value="Yes">Enveloped</option>
          <option value="No">Non-enveloped</option>
        </select>
      </div>
      <div class="form-group">
        <label for="genome">Genome Type:</label>
        <select id="genome">
          <option value="">-- Select genome type --</option>
          <option value="ssRNA (positive-sense)">ssRNA (positive-sense)</option>
          <option value="ssRNA (negative-sense)">ssRNA (negative-sense)</option>
          <option value="dsRNA">dsRNA</option>
          <option value="ssDNA">ssDNA</option>
          <option value="dsDNA">dsDNA</option>
          <option value="Retrovirus">Retrovirus</option>
        </select>
      </div>
    `;
  } else if (type === 'bacterium') {
    html += `
      <div class="form-group">
        <label for="shape">Cell Shape:</label>
        <select id="shape">
          <option value="">-- Select cell shape --</option>
          <option value="Coccus">Coccus (spherical)</option>
          <option value="Bacillus">Bacillus (rod-shaped)</option>
          <option value="Coccobacillus">Coccobacillus (short rod)</option>
          <option value="Spirochete">Spirochete (spiral)</option>
          <option value="Vibrio">Vibrio (comma-shaped)</option>
        </select>
      </div>
      <div class="form-group">
        <label for="motility">Motility:</label>
        <select id="motility">
          <option value="">-- Select motility type --</option>
          <option value="Non-motile">Non-motile</option>
          <option value="Flagellated">Flagellated</option>
          <option value="Cytoskeletal gliding">Cytoskeletal gliding</option>
        </select>
      </div>
      <div class="form-group">
        <label for="cellwall">Cell Wall Type:</label>
        <select id="cellwall">
          <option value="">-- Select cell wall type --</option>
          <option value="Gram-positive">Gram-positive</option>
          <option value="Gram-negative">Gram-negative</option>
        </select>
      </div>
    `;
  } else if (type === 'fungus') {
    html += `
      <div class="form-group">
        <label for="fungitype">Structure:</label>
        <select id="fungitype">
          <option value="">-- Select structure type --</option>
          <option value="Unicellular">Unicellular (yeast)</option>
          <option value="Multicellular">Multicellular (mold)</option>
          <option value="Dimorphic">Dimorphic (both forms)</option>
        </select>
      </div>
      <div class="form-group">
        <label for="fungirepro">Reproduction:</label>
        <select id="fungirepro">
          <option value="">-- Select reproduction type --</option>
          <option value="Asexual">Asexual only</option>
          <option value="Sexual">Sexual only</option>
          <option value="Both">Both asexual and sexual</option>
        </select>
      </div>
    `;
  } else if (type === 'helminth') {
    html += `
      <div class="form-group">
        <label for="helminthform">Body Form:</label>
        <select id="helminthform">
          <option value="">-- Select body form --</option>
          <option value="Nematode">Nematode (roundworm)</option>
          <option value="Cestode">Cestode (tapeworm)</option>
          <option value="Trematode">Trematode (fluke)</option>
        </select>
      </div>
    `;
  }

  html += `
    <div class="navigation">
      <button class="secondary" onclick="showMicrobeTypeScreen()">← Back</button>
      <button onclick="saveTraits()">Next →</button>
    </div>
  `;
  
  document.getElementById('app').innerHTML = html;
}

function saveTraits() {
  const selects = document.querySelectorAll('select');
  let allComplete = true;
  
  for (let sel of selects) {
    if (!sel.value) {
      allComplete = false;
      break;
    }
    state.traits[sel.id] = sel.value;
  }
  
  if (!allComplete) {
    alert("Please complete all selections before proceeding.");
    return;
  }
  
  showTransmissionScreen();
}

function showTransmissionScreen() {
  state.currentStep = 3;
  document.getElementById('app').innerHTML = `
    <div class="progress-bar">
      <div class="progress-fill" style="width: 50%"></div>
    </div>
    <h2>Step 3: Choose Transmission Method</h2>
    <p>How will your microbe spread from host to host?</p>
    
    <div class="form-group">
      <label for="transmission">Transmission Category:</label>
      <select id="transmission" onchange="updateTransmissionDetail()">
        <option value="">-- Select transmission category --</option>
        <option value="Contact Transmission">Contact Transmission</option>
        <option value="Vehicle Transmission">Vehicle Transmission</option>
        <option value="Vector-borne Transmission">Vector-borne Transmission</option>
      </select>
    </div>
    
    <div id="detail"></div>
    
    <div class="navigation">
      <button class="secondary" onclick="showTraitsScreen()">← Back</button>
      <button onclick="saveTransmission()">Next →</button>
    </div>
  `;
}

function updateTransmissionDetail() {
  const category = document.getElementById("transmission").value;
  state.transmission = category;
  const detailDiv = document.getElementById("detail");
  let html = "";

  if (category === "Contact Transmission") {
    html = `
      <div class="form-group">
        <label for="transmissionDetail">Specific Type:</label>
        <select id="transmissionDetail">
          <option value="">-- Select specific type --</option>
          <option value="Direct Contact">Direct Contact</option>
          <option value="Indirect Contact">Indirect Contact</option>
          <option value="Droplet Transmission">Droplet Transmission</option>
        </select>
      </div>
    `;
  } else if (category === "Vehicle Transmission") {
    html = `
      <div class="form-group">
        <label for="transmissionDetail">Specific Type:</label>
        <select id="transmissionDetail">
          <option value="">-- Select specific type --</option>
          <option value="Waterborne">Waterborne</option>
          <option value="Foodborne">Foodborne</option>
          <option value="Airborne">Airborne</option>
          <option value="Soilborne">Soilborne</option>
        </select>
      </div>
    `;
  } else if (category === "Vector-borne Transmission") {
    html = `
      <div class="form-group">
        <label for="transmissionDetail">Specific Type:</label>
        <select id="transmissionDetail">
          <option value="">-- Select specific type --</option>
          <option value="Biological Vector">Biological Vector</option>
          <option value="Mechanical Vector">Mechanical Vector</option>
        </select>
      </div>
    `;
  }

  detailDiv.innerHTML = html;
}

function saveTransmission() {
  const main = document.getElementById("transmission").value;
  const detail = document.getElementById("transmissionDetail");
  
  if (!main) {
    alert("Please select a transmission category.");
    return;
  }
  
  state.transmission = main;
  state.transmissionDetail = detail ? detail.value : '';
  
  if (!state.transmissionDetail) {
    alert("Please select a specific transmission type.");
    return;
  }
  
  showSummaryScreen();
}

function showSummaryScreen() {
  state.currentStep = 4;
  document.getElementById('app').innerHTML = `
    <div class="progress-bar">
      <div class="progress-fill" style="width: 100%"></div>
    </div>
    <h1>🎉 Your Microbe Design Complete!</h1>
    
    <div class="summary-card">
      <h3>Your Microbe Summary</h3>
      
      <div class="summary-item">
        <span class="summary-label">Type:</span>
        <span class="summary-value">${state.microbeType}</span>
      </div>
      
      ${Object.entries(state.traits).map(([key, value]) => `
        <div class="summary-item">
          <span class="summary-label">${key.charAt(0).toUpperCase() + key.slice(1)}:</span>
          <span class="summary-value">${value}</span>
        </div>
      `).join('')}
      
      <div class="summary-item">
        <span class="summary-label">Transmission:</span>
        <span class="summary-value">${state.transmission} - ${state.transmissionDetail}</span>
      </div>
    </div>
    
    <div class="navigation">
      <button class="secondary" onclick="showTransmissionScreen()">← Back to Edit</button>
      <button onclick="resetApp()">🔄 Design Another Microbe</button>
    </div>
  `;
}

function goHome() {
  resetApp();
}

function resetApp() {
  state = {
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
    name: '',
    currentStep: 0
  };
  
  document.getElementById('app').innerHTML = `
    <div class="welcome-content">
      <h1>🦠 Make Your Own Microbe</h1>
      <p>Welcome! This interactive app will guide you through designing a pathogenic microbe using concepts from microbiology.</p>
      <p>You'll explore different microbe types, their structural features, transmission methods, life cycles, and virulence factors.</p>
      <p><em>💡 Tip: If you need a reminder of any concept, consult your class PowerPoints or textbook.</em></p>
      <button onclick="startApp()">🚀 Start Building Your Microbe</button>
    </div>
  `;
}
