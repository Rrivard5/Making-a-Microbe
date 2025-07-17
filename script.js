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

    .welcome-content {
      text-align: center;
      padding: 2rem 0;
    }

    .welcome-content p {
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
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

    .microbe-emoji {
      font-size: 3rem;
      margin-bottom: 1rem;
      display: block;
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

    .navigation {
      display: flex;
      justify-content: space-between;
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 2px solid #e2e8f0;
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
      width: 0%;
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

    .hidden {
      display: none;
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
  <div id="app">
    <div class="welcome-content">
      <h1>🦠 Make Your Own Microbe</h1>
      <p>Welcome! This interactive app will guide you through designing a pathogenic microbe using concepts from microbiology.</p>
      <p>You'll explore different microbe types, their structural features, transmission methods, life cycles, and virulence factors.</p>
      <p><em>💡 Tip: If you need a reminder of any concept, consult your class PowerPoints or textbook.</em></p>
      <button onclick="startApp()">🚀 Start Building Your Microbe</button>
    </div>
  </div>

  <script>
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
  </script>
</body>
</html>
