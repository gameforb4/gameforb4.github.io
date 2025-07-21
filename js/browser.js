// ======================
// BROWSER SIMULATION
// ======================

// Basic browser functionality
document.getElementById('browser-url').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const url = e.target.value.trim();
    simulateBrowserNavigation(url);
  }
});

document.querySelector('.window-dot.red').addEventListener('click', () => {
  document.getElementById('browser').classList.add('hidden');
});

function openBrowserFromGUI() {
  const browser = document.getElementById('browser');
  browser.classList.remove('hidden');
}

// Make browser draggable
(function makeDraggable(elemId, handleId) {
  const elem = document.getElementById(elemId);
  const handle = document.getElementById(handleId);
  let offsetX = 0, offsetY = 0, isDown = false;
  
  handle.addEventListener('mousedown', (e) => {
    isDown = true;
    offsetX = e.clientX - elem.offsetLeft;
    offsetY = e.clientY - elem.offsetTop;
    handle.style.cursor = 'grabbing';
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    elem.style.left = (e.clientX - offsetX) + 'px';
    elem.style.top = (e.clientY - offsetY) + 'px';
  });
  
  document.addEventListener('mouseup', () => {
    isDown = false;
    handle.style.cursor = 'grab';
  });
})('browser', 'browser-header');

// Link handling
function attachFakeLinkHandlers() {
    const links = document.querySelectorAll('.fake-link');
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const newUrl = this.getAttribute('href');
        document.getElementById('browser-url').value = newUrl;
        simulateBrowserNavigation(newUrl);
      });
    });
}
  
// Main navigation function
function simulateBrowserNavigation(url) {
  const content = document.getElementById('browser-content');
  const normalizedUrl = url.trim().toLowerCase();


  // ======================
  // LEVEL 2 SPECIFIC SITES
  // ======================
  if (window.isLevel2Active) {
        if (normalizedUrl === 'fixmy.pc') {
            content.innerHTML = `
                <h3>Emergency Repair Tool</h3>
                <p>Download this to recover your files:</p>
                <button id="download-fix">Download fix_pc.slash</button>
                <p style="color: red;">Warning: File may be corrupted</p>
            `;
            
            document.getElementById('download-fix').addEventListener('click', () => {
                // Add the file to the virtual file system
                fileSystem['/'].contents['fix_pc.slash'] = {
                    type: 'file',
                    content: `function repair() {\n  if (system === "hacked" {  // 🐞 MISSING )\n    restoreFiles();\n  }\n}`
                };
                content.innerHTML = `
    <p>Download complete!</p>
    <p>File is corrupt, you need to fix it before using it<p>
    <p>1. Modify the code of the app: <code>editor fix_pc.slash</code></p>
    <p>2. Then run the app using: <code>slash fix_pc</code></p>
    <p class="hint">(Fix the missing parenthesis in the file first!)</p>
`;
printToTerminal('File downloaded: fixmy.pc\nRun in the terminal: editor fix_pc.slash');
            });
            return;
        }
    }

  // ======================
  // DEFAULT SITES
  // ======================
  if (normalizedUrl === 'intranet.local') {
    content.innerHTML = `
      <h3>Intranet</h3>
      <p>Welcome to the intranet. Where do you want to go?</p>
      <ol>
        <li><a href="b4soum.site" class="fake-link">b4soum's site</a></li>
        <li><a href="intranet.local/help" class="fake-link">Help page</a></li>
      </ol>
    `;
  }
  else if (normalizedUrl === 'intranet.local/help') {
    content.innerHTML = `
      <h3>Help Page</h3>
      <p>This is the internal help site.</p>
      <a href="intranet.local" class="fake-link">Go back</a>
    `;
  } 
  else if (normalizedUrl === 'b4soum.site') {
    content.innerHTML = `
  <div class="b4soum-site">
    <div class="top-bar">
      <div class="menu-icon">☰</div>
      <span class="url">www.b4soum.site</span>
      <div class="lock-icon">🔒</div>
    </div>

    <div class="banner"></div>

    <div class="login-section">
      <div class="login-box">
        <div class="kuromi-icon">
          <img src="media/kuromi.png" alt="Kuromi Icon" />
        </div>
        <div class="form-section">
          <h2>Login details</h2>
          <form>
            <input type="text" id="username" placeholder="Username" required />
            <input type="password" id="password" placeholder="Password" required />
            <button type="button" id="b4soum-login-btn">➤</button>
            <a href="intranet.local" class="fake-link">Go back</a><br>
          <a href="intranet.local/help" class="fake-link">Help</a>
          </form>
        </div>
      </div>
    </div>
  </div>
`;
    setTimeout(() => {
      document.getElementById('b4soum-login-btn').addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username === 'b4soumtii' && password === 'mypr1ncess6') {
          simulateBrowserNavigation('b4soum.site/success');
        } else {
          simulateBrowserNavigation('b4soum.site/login');
        }
      });
    }, 0);
  }
  else if (normalizedUrl === 'b4soum.site/login') {
    content.innerHTML = `
      <h3>🔐 Login Failed</h3>
      <p>❌ Incorrect username or password.</p>
      <a href="b4soum.site" class="fake-link">Try again</a>
    `;
  }
  else if (normalizedUrl === 'b4soum.site/success') {
    content.innerHTML = `
          <h3>🧾 Secure File Access</h3>
          <p>Access granted. 1 new file for b4soum.</p>
          <p>To download the file, use the following command in your terminal:</p>
          <code>download b4soum.site/secret.txt -o secret.txt</code>
          <br><br>
          <a href="intranet.local" class="fake-link">Back to intranet</a>
        `;
    } else {
      content.innerHTML = `<h3>Website not available</h3><p>The address "${url}" is blocked or unreachable.</p>`;
    }

  // ✅ This line must be called AFTER new content is added
  attachFakeLinkHandlers();
}

// Initialize if in Level 2
if (document.body.classList.contains('level2-page')) {
  window.simulateBrowserNavigation = simulateBrowserNavigation;
}