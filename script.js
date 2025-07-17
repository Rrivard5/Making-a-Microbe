<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Make Your Own Microbe</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #333;
      min-height: 100vh;
      padding: 20px;
    }

    #app {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      min-height: 80vh;
    }

    h1 {
      color: #2d3748;
      text-align: center;
      margin-bottom: 1rem;
      font-size: 2.5rem;
      font-weight: 700;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    h2 {
      color: #4a5568;
      margin-bottom: 1.5rem;
      font-size: 1.8rem;
      border-bottom: 3px solid #e2e8f0;
      padding-bottom: 0.5rem;
    }

    p {
      line-height: 1.6;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }

    .microbe-selector {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 2rem 0;
    }

    .microbe-card {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      border: none;
      border-radius: 12px;
      padding: 1.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
      font-size: 1.1rem;
      font-weight: 600;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .microbe-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .microbe-card.virus {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .microbe-card.bacterium {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }

    .microbe-card.fungus {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }

    .microbe-card.helminth {
      background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    }

    button {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 0.8rem 2rem;
      margin: 0.5rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    button.secondary {
      background: #e2e8f0;
      color: #4a5568;
    }

    button.secondary:hover {
      background: #cbd5e0;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #4a5568;
    }

    input[type="text"], textarea, select {
      width: 100%;
      padding: 0.8rem;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }

    input[type="text"]:focus, textarea:focus, select:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .checkbox-group {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 1rem 0;
    }

    .checkbox-item {
      display: flex;
      align-items: center;
      padding: 0.5rem;
      border-radius: 8px;
      transition: background-color 0.3s ease;
    }

    .checkbox-item:hover {
      background-color: #f7fafc;
    }

    .checkbox-item input[type="checkbox"] {
      width: auto;
      margin-right: 0.5rem;
    }

    .navigation {
      display: flex;
      justify-content: space-between;
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 2px solid #e2e8f0;
    }

    .welcome-content {
      text-align: center;
      padding: 2rem 0;
    }

    .welcome-content p {
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
    }

    .microbe-emoji {
      font-size: 3rem;
      margin-bottom: 1rem;
      display: block;
    }

    .tooltip {
      position: relative;
      cursor: help;
      border-bottom: 1px dotted #667eea;
      color: #667eea;
    }

    .tooltip .tooltiptext {
      visibility: hidden;
      width: 300px;
      background-color: #2d3748;
      color: white;
      text-align: left;
      border-radius: 8px;
      padding: 1rem;
      position: absolute;
      z-index: 1000;
      bottom: 125%;
      left: 50%;
      margin-left: -150px;
      opacity: 0;
      transition: opacity 0.3s;
      font-size: 0.9rem;
      line-height: 1.4;
    }

    .tooltip:hover .tooltiptext {
      visibility: visible;
      opacity: 1;
    }

    .progress-bar {
      width: 100%;
      height: 6px;
      background-color: #e2e8f0;
      border-radius: 3px;
      margin-bottom: 2rem;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      transition: width 0.3s ease;
    }

    .alert {
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      border-left: 4px solid #e53e3e;
      background-color: #fed7d7;
      color: #742a2a;
    }

    .summary-card {
      background: #f7fafc;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      padding: 1.5rem;
      margin: 1rem 0;
    }

    .summary-card h3 {
      color: #2d3748;
      margin-bottom: 1rem;
      font-size: 1.3rem;
    }

    .summary-item {
      margin-bottom: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .summary-label {
      font-weight: 600;
      color: #4a5568;
    }

    .summary-value {
      color: #2d3748;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      #app {
        padding: 1rem;
        margin: 10px;
      }

      h1 {
        font-size: 2rem;
      }

      .microbe-selector {
        grid-template-columns: 1fr;
      }

      .navigation {
        flex-direction: column;
        gap: 1rem;
      }
    }
  </style>
</head>
<body>
  <div id="app"></div>

  <script>
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
      name: '',
      currentStep: 0
    };

    const totalSteps = 6;

    function updateProgress() {
      const progress = (state.currentStep / totalSteps) * 100;
      const progressBar = document.querySelector('.progress-fill');
      if (progressBar) {
        progressBar.style.width = progress + '%';
      }
    }

    function goTo(screen) {
      screens[screen]();
      updateProgress();
    }

    function selectType(type) {
      state.microbeType = type;
      state.currentStep = 2;
      goTo('traits');
    }

    const screens = {
      welcome() {
        state.currentStep = 0;
        app.innerHTML = `
          <div class="welcome-content">
            <h1>🦠 Make Your Own Microbe</h1>
            <p>Welcome! This interactive app will guide you through designing a pathogenic microbe using concepts from microbiology.</p>
            <p>You'll explore different microbe types, their structural features, transmission methods, life cycles, and virulence factors.</p>
            <p><em>💡 Tip: If you need a reminder of any concept, consult your class PowerPoints or textbook.</em></p>
            <button onclick="goTo('microbeType')">🚀 Start Building Your Microbe</button>
          </div>
        `;
      },

      microbeType() {
        state.currentStep = 1;
        app.innerHTML = `
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <h2>Step 1: Choose Your Microbe Type</h2>
          <p>Select the type of microorganism you want to design. Each has unique characteristics and pathogenic potential.</p>
          
          <div class="microbe-selector">
            <div class="microbe-card virus" onclick="selectType('virus')">
              <span class="microbe-emoji">🦠</span>
              <strong>Virus</strong>
              <p>Obligate intracellular parasites</p>
            </div>
            <div class="microbe-card bacterium" onclick="selectType('bacterium')">
              <span class="microbe-emoji">🧬</span>
              <strong>Bacterium</strong>
              <p>Single-celled prokaryotes</p>
            </div>
            <div class="microbe-card fungus" onclick="selectType('fungus')">
              <span class="microbe-emoji">🍄</span>
              <strong>Fungus</strong>
              <p>Eukaryotic organisms</p>
            </div>
            <div class="microbe-card helminth" onclick="selectType('helminth')">
              <span class="microbe-emoji">🪱</span>
              <strong>Helminth</strong>
              <p>Parasitic worms</p>
            </div>
          </div>
          
          <p><em>Note: Protozoa are too biologically diverse to be fully supported in this app. You are welcome to design one on your own.</em></p>
          
          <div class="navigation">
            <button class="secondary" onclick="goTo('welcome')">← Back</button>
            <div></div>
          </div>
        `;
        updateProgress();
      },

      traits() {
        state.currentStep = 2;
        const type = state.microbeType;
        let html = `
          <div class="progress-bar">
            <div class="progress-fill"></div>
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
            <button class="secondary" onclick="goTo('microbeType')">← Back</button>
            <button onclick="saveTraits()">Next →</button>
          </div>
        `;
        app.innerHTML = html;
        updateProgress();
      },

      transmission() {
        state.currentStep = 3;
        app.innerHTML = `
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <h2>Step 3: Choose Transmission Method</h2>
          <p>How will your microbe spread from host to host?</p>
          
          <div class="form-group">
            <label for="transmission">Transmission Category:</label>
            <select id="transmission">
              <option value="">-- Select transmission category --</option>
              <option value="Contact Transmission">Contact Transmission</option>
              <option value="Vehicle Transmission">Vehicle Transmission</option>
              <option value="Vector-borne Transmission">Vector-borne Transmission</option>
            </select>
          </div>
          
          <div id="detail"></div>
          
          <div class="navigation">
            <button class="secondary" onclick="goTo('traits')">← Back</button>
            <button onclick="saveTransmission()">Next →</button>
          </div>
        `;
        document.getElementById("transmission").addEventListener("change", updateTransmissionDetail);
        updateProgress();
      },

      lifeCycle() {
        state.currentStep = 4;
        let options = `<option value="">-- Select life cycle --</option>`;
        if (state.microbeType === "virus") {
          options += `<option value="Lytic">Lytic</option><option value="Lysogenic">Lysogenic</option>`;
        } else {
          options += `<option value="Simple (single host)">Simple (single host)</option><option value="Complex (multiple hosts)">Complex (multiple hosts)</option>`;
          if (state.microbeType === "bacterium") options += `<option value="Lytic">Lytic</option>`;
        }
        
        app.innerHTML = `
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <h2>Step 4: Life Cycle</h2>
          <p>Define how your microbe reproduces and completes its life cycle.</p>
          
          <div class="form-group">
            <label for="lifeCycle">Life Cycle Type:</label>
            <select id="lifeCycle">${options}</select>
          </div>
          
          <div id="hostOptions"></div>
          
          <div class="navigation">
            <button class="secondary" onclick="goTo('transmission')">← Back</button>
            <button onclick="saveLifeCycle()">Next →</button>
          </div>
        `;
        document.getElementById("lifeCycle").addEventListener("change", updateHostFields);
        updateProgress();
      },

      virulence() {
        state.currentStep = 5;
        app.innerHTML = `
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <h2>Step 5: Virulence Factors</h2>
          <p>Select the factors that make your microbe pathogenic and help it cause disease.</p>
          
          <div class="checkbox-group">
            <div class="checkbox-item">
              <input type="checkbox" id="resistance" value="Antimicrobial Resistance">
              <label for="resistance">Antimicrobial Resistance</label>
            </div>
            <div class="checkbox-item">
              <input type="checkbox" id="capsule" value="Capsule">
              <label for="capsule">Capsule</label>
            </div>
            <div class="checkbox-item">
              <input type="checkbox" id="enzyme" value="Enzyme Production">
              <label for="enzyme">Enzyme Production</label>
            </div>
            <div class="checkbox-item">
              <input type="checkbox" id="toxin" value="Toxin Production">
              <label for="toxin">Toxin Production</label>
            </div>
          </div>
          
          <div id="toxinDetails"></div>
          <div id="enzymeDetails"></div>
          
          <div class="navigation">
            <button class="secondary" onclick="goTo('lifeCycle')">← Back</button>
            <button onclick="saveVirulence()">Next →</button>
          </div>
        `;
        document.querySelectorAll('input[type=checkbox]').forEach(cb => 
          cb.addEventListener("change", updateVirulenceDetails)
        );
        updateProgress();
      },

      reflection() {
        state.currentStep = 6;
        app.innerHTML = `
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <h2>Step 6: Final Reflection</h2>
          <p>Complete your microbe design with some final details.</p>
          
          <div class="form-group">
            <label for="name">Give your microbe a name:</label>
            <input type="text" id="name" placeholder="e.g., Pathogenicus maximus">
          </div>
          
          <div class="form-group">
            <label for="symptomReflection">Describe the symptoms your microbe would cause in its host:</label>
            <textarea id="symptomReflection" rows="4" placeholder="Think about how your chosen virulence factors would affect the host..."></textarea>
          </div>
          
          <div class="navigation">
            <button class="secondary" onclick="goTo('virulence')">← Back</button>
            <button onclick="saveReflection()">Complete Design →</button>
          </div>
        `;
        updateProgress();
      },

      summary() {
        state.currentStep = 6;
        app.innerHTML = `
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <h1>🎉 Your Microbe Design Complete!</h1>
          
          <div class="summary-card">
            <h3>Meet ${state.name || 'Your Microbe'}!</h3>
            
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
              <span class="summary-value">${state.transmission}${state.transmissionDetail ? ' - ' + state.transmissionDetail : ''}</span>
            </div>
            
            <div class="summary-item">
              <span class="summary-label">Life Cycle:</span>
              <span class="summary-value">${state.lifeCycle}</span>
            </div>
            
            ${state.virulenceFactors.length > 0 ? `
              <div class="summary-item">
                <span class="summary-label">Virulence Factors:</span>
                <span class="summary-value">${state.virulenceFactors.join(', ')}</span>
              </div>
            ` : ''}
            
            ${state.symptomReflection ? `
              <div style="margin-top: 1rem;">
                <span class="summary-label">Symptoms:</span>
                <p style="margin-top: 0.5rem; font-style: italic;">${state.symptomReflection}</p>
              </div>
            ` : ''}
          </div>
          
          <div class="navigation">
            <button class="secondary" onclick="goTo('reflection')">← Back to Edit</button>
            <button onclick="resetApp()">🔄 Design Another Microbe</button>
          </div>
        `;
        updateProgress();
      }
    };

    function updateTransmissionDetail() {
      const category = document.getElementById("transmission").value;
      state.transmission = category;
      const detailDiv = document.getElementById("detail");
      let html = "";

      if (category === "Contact Transmission") {
        html += `
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
        html += `
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
        html += `
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

    function saveTraits() {
      const selects = document.querySelectorAll('select');
      for (let sel of selects) {
        if (!sel.value) {
          showAlert("Please complete all selections before proceeding.");
          return;
        }
        state.traits[sel.id] = sel.value;
      }
      goTo('transmission');
    }

    function saveTransmission() {
      const main = document.getElementById("transmission").value;
      const detail = document.getElementById("transmissionDetail");
      if (!main) {
        showAlert("Please select a transmission category.");
        return;
      }
      state.transmission = main;
      state.transmissionDetail = detail ? detail.value : '';
      if (!state.transmissionDetail) {
        showAlert("Please select a specific transmission type.");
        return;
      }
      goTo('lifeCycle');
    }

    function updateHostFields() {
      const lc = document.getElementById("lifeCycle").value;
      let html = "";
      if (lc === "Complex (multiple hosts)") {
        html += `
          <div class="form-group">
            <label for="intermediate">Intermediate Hosts (comma separated):</label>
            <input type="text" id="intermediate" placeholder="e.g., mosquito, bird">
          </div>
          <div class="form-group">
            <label for="definitive">Definitive Host:</label>
            <input type="text" id="definitive" placeholder="e.g., human, dog">
          </div>
        `;
      }
      document.getElementById("hostOptions").innerHTML = html;
    }

    function saveLifeCycle() {
      const lc = document.getElementById("lifeCycle").value;
      if (!lc) {
        showAlert("Please select a life cycle.");
        return;
      }
      state.lifeCycle = lc;
      if (lc === "Complex (multiple hosts)") {
        const intermediate = document.getElementById("intermediate");
        const definitive = document.getElementById("definitive");
        if (intermediate) {
          state.intermediateHosts = intermediate.value.split(',').map(s => s.trim());
        }
        if (definitive) {
          state.definitiveHost = definitive.value.trim();
        }
      }
      goTo('virulence');
    }

    function updateVirulenceDetails() {
      const checked = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(cb => cb.value);
      state.virulenceFactors = checked;
      let toxin = "", enzyme = "";
      
      if (checked.includes("Toxin Production")) {
        toxin = `
          <div class="form-group">
            <label for="toxinType">Toxin Type:</label>
            <select id="toxinType">
              <option value="">-- Select toxin type --</option>
              <option value="Endotoxin">Endotoxin</option>
              <option value="Exotoxin - Cytotoxin">Exotoxin - Cytotoxin</option>
              <option value="Exotoxin - Neurotoxin">Exotoxin - Neurotoxin</option>
              <option value="Exotoxin - Enterotoxin">Exotoxin - Enterotoxin</option>
            </select>
          </div>
        `;
      }
      
      if (checked.includes("Enzyme Production")) {
        enzyme = `
          <div class="form-group">
            <label for="enzymeFunction">Enzyme Function:</label>
            <input type="text" id="enzymeFunction" placeholder="e.g., breaks down host tissue">
          </div>
        `;
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

    function saveReflection() {
      const name = document.getElementById("name");
      const symptoms = document.getElementById("symptomReflection");
      if (name) state.name = name.value;
      if (symptoms) state.symptomReflection = symptoms.value;
      goTo('summary');
    }

    function showAlert(message) {
      const existing = document.querySelector('.alert');
      if (existing) existing.remove();
      
      const alert = document.createElement('div');
      alert.className = 'alert';
      alert.textContent = message;
      
      const firstButton = document.querySelector('button');
      if (firstButton) {
        firstButton.parentNode.insertBefore(alert, firstButton);
      } else {
        app.insertBefore(alert, app.firstChild);
      }
      
      setTimeout(() => {
        if (alert.parentNode) alert.remove();
      }, 5000);
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
      goTo('welcome');
    }

    // Initialize the app
    document.addEventListener('DOMContentLoaded', function() {
      goTo('welcome');
    });
    
    // Fallback initialization
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => goTo('welcome'));
    } else {
      goTo('welcome');
    }
  </script>
</body>
</html>
