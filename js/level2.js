window.isLevel2Active = true;

function restart() {
    window.location.reload();
}

// 1. Show birthday popup (bottom-right)
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const popup = document.getElementById('birthday-popup');
        if (popup) {
            popup.classList.add('visible');
        }
    }, 6000); // delay in milliseconds
});


// 2. When popup is clicked - trigger hack sequence
document.getElementById('birthday-popup').addEventListener('click', () => {
    // A. Visual hacking effects
    document.body.classList.add('hacked-mode');
    document.getElementById('birthday-popup').remove();
    window.matrixEffect.startMatrix();
    
    
    // B. Disable non-essential icons
    document.querySelectorAll('.taskbar .icon').forEach(icon => {
        if (!icon.classList.contains('terminal') && !icon.classList.contains('browser')) {
            icon.style.opacity = '0.2';
        }
    });

    // C. Show terminal alert
    printToTerminal("⚠️ SYSTEM HACKED BY \"CRYPT0_L0V3R\"");
    printToTerminal("All personal files are encrypted!");
    printToTerminal("Download repair tool from: fixmy.pc");
    printToTerminal("-------------------------------------");

    // D. Create corrupt antivirus file
    fileSystem['/'].contents['fix_pc.slash'] = {
        type: 'file',
        content: `function repair() {\n  if (system === "hacked" {  // 🐞 MISSING )\n    restoreFiles();\n  }\n}`
    };
});

// 3. Terminal helper function
function printToTerminal(text) {
    const terminalOutput = document.getElementById('terminal-output');
    terminalOutput.innerHTML += `<div class="command-line">${text}</div>`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// 3. Modified browser navigation (in browser.js)
function simulateBrowserNavigation(url) {
    const normalizedUrl = url.trim().toLowerCase();
    const content = document.getElementById('browser-content');

    if (normalizedUrl === 'fixmy.pc') {
        content.innerHTML = `
            <h3>Emergency Repair Tool</h3>
            <p>Download this to recover your files:</p>
            <button id="download-fix">Download fix_pc.slash</button>
        `;

        document.getElementById('download-fix').addEventListener('click', () => {
            // Show download success message in browser content
            content.innerHTML = `<p>Downloaded! Run in the terminal: <code>editor fix_pc.slash</code></p>`;
            printToTerminal('File downloaded: fixmy.pc\n Run in the terminal: <code>editor fix_pc.slash</code></p>');
        });
    }
}


// 4. When she fixes and runs the antivirus
function restoreSystem() {
    // Bring back everything
    document.body.classList.remove('hacked-mode');
    document.querySelectorAll('.taskbar .icon').forEach(icon => icon.style.opacity = '1');
    window.matrixEffect.stopMatrix();
window.hackEffect.stopEffect();
    // Create the final message
    fileSystem['/'].contents['message_from_husband.txt'] = {
        type: 'file',
        content: "You fixed it! Now type: slash complete@Basma"
    };

    printToTerminal("✅ System restored! Check your files.");

}