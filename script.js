// Global state object
let state = {
  microbeType: null,
  traits: {},
  transmission: '',
  transmissionDetail: '',
  portalOfEntry: '',
  reproduction: '',
  adaptations: [],
  toxinType: '',
  customEnzyme: '',
  enzymeFunction: '',
  symptoms: '',
  name: '',
  currentStep: 0
};

// Main start function
function startApp() {
  console.log("Starting app...");
  showMicrobeTypeScreen();
}

function showMicrobeTypeScreen() {
  state.currentStep = 1;
  document.getElementById('app').innerHTML = `
    <div class="progress-bar">
      <div class="progress-fill" style="width: 14%"></div>
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
      <div class="progress-fill" style="width: 28%"></div>
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
      <div class="progress-fill" style="width: 42%"></div>
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
    <div id="portal-section"></div>
    
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
  const portalDiv = document.getElementById("portal-section");
  let html = "";

  if (category === "Contact Transmission") {
    html = `
      <div class="form-group">
        <label for="transmissionDetail">Specific Type:</label>
        <select id="transmissionDetail" onchange="updatePortalOfEntry()">
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
        <select id="transmissionDetail" onchange="updatePortalOfEntry()">
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
        <select id="transmissionDetail" onchange="updatePortalOfEntry()">
          <option value="">-- Select specific type --</option>
          <option value="Biological Vector">Biological Vector</option>
          <option value="Mechanical Vector">Mechanical Vector</option>
        </select>
      </div>
    `;
  }

  detailDiv.innerHTML = html;
  portalDiv.innerHTML = "";
}

function updatePortalOfEntry() {
  const transmissionDetail = document.getElementById("transmissionDetail").value;
  const portalDiv = document.getElementById("portal-section");
  let portalOptions = ["Skin", "Respiratory tract", "Gastrointestinal tract", "Genitourinary tract"];
  
  // Add wound option for direct contact and biological vector
  if (transmissionDetail === "Direct Contact" || transmissionDetail === "Biological Vector") {
    portalOptions.push("Wound");
  }

  const portalHtml = `
    <div class="form-group">
      <label for="portalOfEntry">Portal of Entry:</label>
      <select id="portalOfEntry">
        <option value="">-- Select portal of entry --</option>
        ${portalOptions.map(option => `<option value="${option}">${option}</option>`).join('')}
      </select>
    </div>
  `;
  portalDiv.innerHTML = portalHtml;
}

function saveTransmission() {
  const main = document.getElementById("transmission").value;
  const detail = document.getElementById("transmissionDetail");
  const portal = document.getElementById("portalOfEntry");
  
  if (!main) {
    alert("Please select a transmission category.");
    return;
  }
  
  state.transmission = main;
  state.transmissionDetail = detail ? detail.value : '';
  state.portalOfEntry = portal ? portal.value : '';
  
  if (!state.transmissionDetail) {
    alert("Please select a specific transmission type.");
    return;
  }
  
  if (!state.portalOfEntry) {
    alert("Please select a portal of entry.");
    return;
  }
  
  showReproductionScreen();
}

function showReproductionScreen() {
  state.currentStep = 4;
  const type = state.microbeType;
  let reproductionOptions = [];
  let description = "";

  // Define reproduction methods based on microbe type
  if (type === 'virus') {
    reproductionOptions = ["Lytic cycle", "Lysogenic cycle"];
    description = "Viruses reproduce by hijacking host cellular machinery. Choose the replication strategy:";
  } else if (type === 'bacterium') {
    reproductionOptions = ["Binary fission", "Conjugation", "Transformation", "Transduction"];
    description = "Bacteria reproduce through various methods. Choose the primary reproduction method:";
  } else if (type === 'fungus') {
    reproductionOptions = ["Budding", "Fragmentation", "Spore formation", "Sexual reproduction"];
    description = "Fungi can reproduce through multiple methods. Choose the primary reproduction strategy:";
  } else if (type === 'helminth') {
    reproductionOptions = ["Sexual reproduction", "Asexual reproduction", "Parthenogenesis"];
    description = "Helminths use various reproductive strategies. Choose the reproduction method:";
  }

  document.getElementById('app').innerHTML = `
    <div class="progress-bar">
      <div class="progress-fill" style="width: 56%"></div>
    </div>
    <h2>Step 4: Select Reproduction Method</h2>
    <p>${description}</p>
    
    <div class="form-group">
      <label for="reproduction">Reproduction Method:</label>
      <select id="reproduction">
        <option value="">-- Select reproduction method --</option>
        ${reproductionOptions.map(option => `<option value="${option}">${option}</option>`).join('')}
      </select>
    </div>
    
    <div class="navigation">
      <button class="secondary" onclick="showTransmissionScreen()">← Back</button>
      <button onclick="saveReproduction()">Next →</button>
    </div>
  `;
}

function saveReproduction() {
  const reproduction = document.getElementById("reproduction").value;
  
  if (!reproduction) {
    alert("Please select a reproduction method.");
    return;
  }
  
  state.reproduction = reproduction;
  showAdaptationsScreen();
}

function showAdaptationsScreen() {
  state.currentStep = 5;
  const type = state.microbeType;
  
  // Define adaptations based on microbe type
  let adaptationOptions = [];
  
  if (type === 'virus') {
    adaptationOptions = [
      { id: "capsule", value: "Capsule formation", label: "Capsule formation" },
      { id: "biofilm", value: "Biofilm production", label: "Biofilm production" },
      { id: "resistance", value: "Antiviral resistance", label: "Antiviral resistance" },
      { id: "immune", value: "Immune evasion", label: "Immune evasion" },
      { id: "mutation", value: "High mutation rate", label: "High mutation rate" },
      { id: "toxin", value: "Toxin secretion", label: "Toxin secretion" },
      { id: "enzyme", value: "Enzyme production", label: "Enzyme production" }
    ];
  } else if (type === 'bacterium') {
    adaptationOptions = [
      { id: "capsule", value: "Capsule formation", label: "Capsule formation" },
      { id: "biofilm", value: "Biofilm production", label: "Biofilm production" },
      { id: "spores", value: "Spore formation", label: "Spore formation" },
      { id: "resistance", value: "Antibiotic resistance", label: "Antibiotic resistance" },
      { id: "immune", value: "Immune evasion", label: "Immune evasion" },
      { id: "mutation", value: "High mutation rate", label: "High mutation rate" },
      { id: "toxin", value: "Toxin secretion", label: "Toxin secretion" },
      { id: "enzyme", value: "Enzyme production", label: "Enzyme production" }
    ];
  } else if (type === 'fungus') {
    adaptationOptions = [
      { id: "capsule", value: "Capsule formation", label: "Capsule formation" },
      { id: "biofilm", value: "Biofilm production", label: "Biofilm production" },
      { id: "spores", value: "Spore formation", label: "Spore formation" },
      { id: "resistance", value: "Antifungal resistance", label: "Antifungal resistance" },
      { id: "immune", value: "Immune evasion", label: "Immune evasion" },
      { id: "toxin", value: "Toxin secretion", label: "Toxin secretion" },
      { id: "enzyme", value: "Enzyme production", label: "Enzyme production" }
    ];
  } else if (type === 'helminth') {
    adaptationOptions = [
      { id: "capsule", value: "Protective coating", label: "Protective coating" },
      { id: "resistance", value: "Drug resistance", label: "Drug resistance" },
      { id: "immune", value: "Immune evasion", label: "Immune evasion" },
      { id: "toxin", value: "Toxin secretion", label: "Toxin secretion" },
      { id: "enzyme", value: "Enzyme production", label: "Enzyme production" }
    ];
  }
  
  document.getElementById('app').innerHTML = `
    <div class="progress-bar">
      <div class="progress-fill" style="width: 70%"></div>
    </div>
    <h2>Step 5: Select Adaptations</h2>
    <p>Choose adaptations that help your microbe survive and cause disease:</p>
    
    <div class="checkbox-group">
      ${adaptationOptions.map(option => `
        <div class="checkbox-item">
          <input type="checkbox" id="${option.id}" value="${option.value}" onchange="toggleAdaptationDetails('${option.id}')">
          <label for="${option.id}">${option.label}</label>
        </div>
      `).join('')}
    </div>
    
    <div id="toxin-details" class="hidden">
      <div class="form-group">
        <label for="toxinType">Type of Toxin:</label>
        <select id="toxinType">
          <option value="">-- Select toxin type --</option>
          <option value="Exotoxin">Exotoxin</option>
          <option value="Endotoxin">Endotoxin</option>
          <option value="Enterotoxin">Enterotoxin</option>
          <option value="Neurotoxin">Neurotoxin</option>
          <option value="Cytotoxin">Cytotoxin</option>
          <option value="Hemotoxin">Hemotoxin</option>
        </select>
      </div>
    </div>
    
    <div id="enzyme-details" class="hidden">
      <div class="form-group">
        <label for="customEnzyme">Name your enzyme:</label>
        <input type="text" id="customEnzyme" placeholder="e.g., Tissuelysin, Cellulase, etc.">
      </div>
      <div class="form-group">
        <label for="enzymeFunction">What does your enzyme do?</label>
        <textarea id="enzymeFunction" placeholder="Describe the function of your enzyme (e.g., breaks down cell walls, degrades tissue, etc.)" rows="3"></textarea>
      </div>
    </div>
    
    <div class="navigation">
      <button class="secondary" onclick="showReproductionScreen()">← Back</button>
      <button onclick="saveAdaptations()">Next →</button>
    </div>
  `;
}

function toggleAdaptationDetails(adaptationId) {
  const checkbox = document.getElementById(adaptationId);
  const toxinDetails = document.getElementById('toxin-details');
  const enzymeDetails = document.getElementById('enzyme-details');
  
  if (adaptationId === 'toxin') {
    if (checkbox.checked) {
      toxinDetails.classList.remove('hidden');
    } else {
      toxinDetails.classList.add('hidden');
      document.getElementById('toxinType').value = '';
    }
  }
  
  if (adaptationId === 'enzyme') {
    if (checkbox.checked) {
      enzymeDetails.classList.remove('hidden');
    } else {
      enzymeDetails.classList.add('hidden');
      document.getElementById('customEnzyme').value = '';
      document.getElementById('enzymeFunction').value = '';
    }
  }
}

function saveAdaptations() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  state.adaptations = Array.from(checkboxes).map(cb => cb.value);
  
  if (state.adaptations.length === 0) {
    alert("Please select at least one adaptation.");
    return;
  }
  
  // Save toxin details if selected
  const toxinCheckbox = document.getElementById('toxin');
  if (toxinCheckbox && toxinCheckbox.checked) {
    const toxinType = document.getElementById('toxinType').value;
    if (!toxinType) {
      alert("Please select a toxin type.");
      return;
    }
    state.toxinType = toxinType;
  }
  
  // Save enzyme details if selected
  const enzymeCheckbox = document.getElementById('enzyme');
  if (enzymeCheckbox && enzymeCheckbox.checked) {
    const customEnzyme = document.getElementById('customEnzyme').value.trim();
    const enzymeFunction = document.getElementById('enzymeFunction').value.trim();
    if (!customEnzyme || !enzymeFunction) {
      alert("Please provide both an enzyme name and its function.");
      return;
    }
    state.customEnzyme = customEnzyme;
    state.enzymeFunction = enzymeFunction;
  }
  
  showSymptomsScreen();
}

function showSymptomsScreen() {
  state.currentStep = 6;
  document.getElementById('app').innerHTML = `
    <div class="progress-bar">
      <div class="progress-fill" style="width: 84%"></div>
    </div>
    <h2>Step 6: Predict Symptoms</h2>
    <p>Based on your microbe's characteristics, what symptoms do you think it would cause in humans?</p>
    <p><em>Consider your microbe's portal of entry, adaptations, toxins, and enzymes when making your prediction.</em></p>
    
    <div class="form-group">
      <label for="symptoms">Predicted Symptoms:</label>
      <textarea id="symptoms" placeholder="Describe the symptoms you think your microbe would cause (e.g., fever, nausea, skin lesions, respiratory distress, etc.)" rows="5"></textarea>
    </div>
    
    <div class="navigation">
      <button class="secondary" onclick="showAdaptationsScreen()">← Back</button>
      <button onclick="saveSymptoms()">Next →</button>
    </div>
  `;
}

function saveSymptoms() {
  const symptoms = document.getElementById('symptoms').value.trim();
  
  if (!symptoms) {
    alert("Please describe the predicted symptoms.");
    return;
  }
  
  state.symptoms = symptoms;
  showNamingScreen();
}

function showNamingScreen() {
  state.currentStep = 7;
  document.getElementById('app').innerHTML = `
    <div class="progress-bar">
      <div class="progress-fill" style="width: 100%"></div>
    </div>
    <h2>Step 7: Name Your Microbe</h2>
    <p>Give your microbe a scientific name! You can be creative or follow scientific naming conventions.</p>
    <p><em>Examples: Bacterium deadlicus, Virus terrifyensis, Fungus nasticus</em></p>
    
    <div class="form-group">
      <label for="microbeName">Microbe Name:</label>
      <input type="text" id="microbeName" placeholder="Enter your microbe's name">
    </div>
    
    <div class="navigation">
      <button class="secondary" onclick="showSymptomsScreen()">← Back</button>
      <button onclick="saveName()">Complete Design →</button>
    </div>
  `;
}

function saveName() {
  const name = document.getElementById('microbeName').value.trim();
  
  if (!name) {
    alert("Please give your microbe a name.");
    return;
  }
  
  state.name = name;
  showSummaryScreen();
}

function showSummaryScreen() {
  state.currentStep = 8;
  
  // Create adaptation display text
  let adaptationText = state.adaptations.join(', ');
  if (state.toxinType) {
    adaptationText = adaptationText.replace('Toxin secretion', `Toxin secretion (${state.toxinType})`);
  }
  if (state.customEnzyme) {
    adaptationText = adaptationText.replace('Enzyme production', `Enzyme production (${state.customEnzyme}: ${state.enzymeFunction})`);
  }
  
  document.getElementById('app').innerHTML = `
    <div class="progress-bar">
      <div class="progress-fill" style="width: 100%"></div>
    </div>
    <h1>🎉 Your Microbe Design Complete!</h1>
    
    <div class="summary-card">
      <h3>${state.name}</h3>
      
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
      
      <div class="summary-item">
        <span class="summary-label">Portal of Entry:</span>
        <span class="summary-value">${state.portalOfEntry}</span>
      </div>
      
      <div class="summary-item">
        <span class="summary-label">Reproduction:</span>
        <span class="summary-value">${state.reproduction}</span>
      </div>
      
      <div class="summary-item">
        <span class="summary-label">Adaptations:</span>
        <span class="summary-value">${adaptationText}</span>
      </div>
      
      <div class="summary-item">
        <span class="summary-label">Predicted Symptoms:</span>
        <span class="summary-value">${state.symptoms}</span>
      </div>
    </div>
    
    <div class="download-section">
      <button onclick="downloadWordDocument()" class="download-btn">📄 Download Word Document</button>
      <p><em>Download your microbe design as a Word document to email to your instructor.</em></p>
    </div>
    
    <div class="navigation">
      <button class="secondary" onclick="showNamingScreen()">← Back to Edit</button>
      <button onclick="resetApp()">🔄 Design Another Microbe</button>
    </div>
  `;
}

async function downloadWordDocument() {
  try {
    // Create adaptation text for document
    let adaptationText = state.adaptations.join(', ');
    if (state.toxinType) {
      adaptationText = adaptationText.replace('Toxin secretion', `Toxin secretion (${state.toxinType})`);
    }
    if (state.customEnzyme) {
      adaptationText = adaptationText.replace('Enzyme production', `Enzyme production (${state.customEnzyme}: ${state.enzymeFunction})`);
    }

    const doc = new docx.Document({
      sections: [{
        properties: {},
        children: [
          new docx.Paragraph({
            text: "Make Your Own Microbe - Design Summary",
            heading: docx.HeadingLevel.TITLE,
            alignment: docx.AlignmentType.CENTER,
          }),
          new docx.Paragraph({
            text: "",
            spacing: { after: 200 },
          }),
          new docx.Paragraph({
            text: `Student Name: _________________________    Date: _________________________`,
            spacing: { after: 200 },
          }),
          new docx.Paragraph({
            text: "",
            spacing: { after: 200 },
          }),
          new docx.Paragraph({
            text: `Microbe Name: ${state.name}`,
            heading: docx.HeadingLevel.HEADING_1,
            spacing: { after: 200 },
          }),
          new docx.Paragraph({
            text: "Basic Characteristics",
            heading: docx.HeadingLevel.HEADING_2,
            spacing: { after: 100 },
          }),
          new docx.Paragraph({
            text: `Microbe Type: ${state.microbeType}`,
            spacing: { after: 100 },
          }),
          ...Object.entries(state.traits).map(([key, value]) =>
            new docx.Paragraph({
              text: `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`,
              spacing: { after: 100 },
            })
          ),
          new docx.Paragraph({
            text: "Transmission and Entry",
            heading: docx.HeadingLevel.HEADING_2,
            spacing: { after: 100, before: 200 },
          }),
          new docx.Paragraph({
            text: `Transmission Method: ${state.transmission} - ${state.transmissionDetail}`,
            spacing: { after: 100 },
          }),
          new docx.Paragraph({
            text: `Portal of Entry: ${state.portalOfEntry}`,
            spacing: { after: 100 },
          }),
          new docx.Paragraph({
            text: "Reproduction and Survival",
            heading: docx.HeadingLevel.HEADING_2,
            spacing: { after: 100, before: 200 },
          }),
          new docx.Paragraph({
            text: `Reproduction Method: ${state.reproduction}`,
            spacing: { after: 100 },
          }),
          new docx.Paragraph({
            text: `Adaptations: ${adaptationText}`,
            spacing: { after: 100 },
          }),
          new docx.Paragraph({
            text: "Disease Manifestation",
            heading: docx.HeadingLevel.HEADING_2,
            spacing: { after: 100, before: 200 },
          }),
          new docx.Paragraph({
            text: `Predicted Symptoms: ${state.symptoms}`,
            spacing: { after: 200 },
          }),
          new docx.Paragraph({
            text: "Instructor Comments:",
            heading: docx.HeadingLevel.HEADING_2,
            spacing: { after: 100, before: 300 },
          }),
          new docx.Paragraph({
            text: "",
            spacing: { after: 300 },
          }),
          new docx.Paragraph({
            text: "",
            spacing: { after: 300 },
          }),
          new docx.Paragraph({
            text: "",
            spacing: { after: 300 },
          }),
        ],
      }],
    });

    const blob = await docx.Packer.toBlob(doc);
    saveAs(blob, `${state.name.replace(/[^a-zA-Z0-9]/g, '_')}_Microbe_Design.docx`);
    
  } catch (error) {
    console.error('Error creating document:', error);
    alert('There was an error creating the document. Please try again.');
  }
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
    portalOfEntry: '',
    reproduction: '',
    adaptations: [],
    toxinType: '',
    customEnzyme: '',
    enzymeFunction: '',
    symptoms: '',
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
