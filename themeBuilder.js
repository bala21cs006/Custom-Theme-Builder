

function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --primary-color: #007BFF;
        --background-color: #ffffff;
        --text-color: #212529;
        --font-family: 'Segoe UI', sans-serif;
      }
  
      * {
        box-sizing: border-box;
      }
  
      body {
        font-family: var(--font-family);
        background-color: var(--background-color);
        color: var(--text-color);
        margin: 0;
        padding: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      }
  
      .container {
        background: #f9f9f9;
        padding: 2rem 2.5rem;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        max-width: 600px;
        width: 100%;
      }
  
      h1 {
        text-align: center;
        color: var(--primary-color);
        margin-bottom: 2rem;
        font-size: 2rem;
      }
  
      .control-group {
        margin-bottom: 1.5rem;
      }
  
      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }
  
      input[type="color"],
      select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 1rem;
      }
  
      button {
        margin-right: 10px;
        padding: 10px 18px;
        font-size: 1rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.3s ease;
      }
  
      .btn-save {
        background-color: var(--primary-color);
        color: #fff;
      }
  
      .btn-save:hover {
        background-color: #0056b3;
      }
  
      .btn-reset {
        background-color: #6c757d;
        color: #fff;
      }
  
      .btn-reset:hover {
        background-color: #495057;
      }
  
      .preview {
        margin-top: 2rem;
        padding: 1.5rem;
        background-color: var(--primary-color);
        color: var(--text-color);
        border-radius: 12px;
        font-size: 1.1rem;
        transition: all 0.3s ease;
      }
  
      .preview h2 {
        margin: 0 0 0.5rem 0;
        color: inherit;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Create labeled input/select
  function createControl(labelText, inputType, id, options = []) {
    const group = document.createElement('div');
    group.className = 'control-group';
  
    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.innerText = labelText;
  
    let input;
    if (inputType === 'select') {
      input = document.createElement('select');
      options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.innerText = opt;
        input.appendChild(option);
      });
    } else {
      input = document.createElement('input');
      input.type = inputType;
    }
  
    input.id = id;
    group.appendChild(label);
    group.appendChild(input);
    return group;
  }
  
  // Apply the selected theme
  function applyTheme(theme) {
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
    document.documentElement.style.setProperty('--background-color', theme.bgColor);
    document.documentElement.style.setProperty('--text-color', theme.textColor);
    document.documentElement.style.setProperty('--font-family', theme.font);
    document.body.style.fontFamily = theme.font;
  
    document.getElementById('primaryColor').value = theme.primaryColor;
    document.getElementById('bgColor').value = theme.bgColor;
    document.getElementById('textColor').value = theme.textColor;
    document.getElementById('fontSelect').value = theme.font;
  }
  
  // Initialize and build the UI
  function initThemeBuilder() {
    injectStyles();
  
    const container = document.createElement('div');
    container.className = 'container';
    document.body.appendChild(container);
  
    const h1 = document.createElement('h1');
    h1.innerText = 'Custom Theme Builder';
    container.appendChild(h1);
  
    container.appendChild(createControl('Primary Color', 'color', 'primaryColor'));
    container.appendChild(createControl('Background Color', 'color', 'bgColor'));
    container.appendChild(createControl('Text Color', 'color', 'textColor'));
    container.appendChild(createControl('Font Family', 'select', 'fontSelect', [
      'Segoe UI', 'Arial', 'Georgia', 'Courier New', 'Verdana'
    ]));
  
    const saveBtn = document.createElement('button');
    saveBtn.innerText = 'Save Theme';
    saveBtn.className = 'btn-save';
  
    const resetBtn = document.createElement('button');
    resetBtn.innerText = 'Reset';
    resetBtn.className = 'btn-reset';
  
    container.appendChild(saveBtn);
    container.appendChild(resetBtn);
  
    const preview = document.createElement('div');
    preview.className = 'preview';
    preview.innerHTML = `<h2>Theme Builder</h2><p>You can Customize your Theme, Background and Text</p>`;
    container.appendChild(preview);
  
    saveBtn.onclick = () => {
      const theme = {
        primaryColor: document.getElementById('primaryColor').value,
        bgColor: document.getElementById('bgColor').value,
        textColor: document.getElementById('textColor').value,
        font: document.getElementById('fontSelect').value
      };
      localStorage.setItem("customTheme", JSON.stringify(theme));
      applyTheme(theme);
    };
  
    resetBtn.onclick = () => {
      localStorage.removeItem("customTheme");
      window.location.reload();
    };
  
    const savedTheme = JSON.parse(localStorage.getItem("customTheme"));
    if (savedTheme) applyTheme(savedTheme);
  }
  
  // Run it on load
  window.addEventListener('DOMContentLoaded', initThemeBuilder);

  