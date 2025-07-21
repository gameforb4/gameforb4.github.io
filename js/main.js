function goToIntro() {
    window.location.href = 'main.html';
}

function goToStart() {
    window.location.href = 'index.html';
}

function restart() {
    window.location.reload();
}


// In main.js
document.getElementById("birthday-popup").addEventListener("click", () => {
  // Start glitch effects
  document.body.classList.add("hacked-mode");
  
  // Delete the birthday message
  delete fileSystem['/birthday_message.txt'];
  
  // Show hacker warning
  printToTerminal("ALERT: FILES ENCRYPTED BY 'CRYPT0_L0V3R'");
  printToTerminal("Download unlock_love.exe to recover.");
  
  // Remove popup
  document.getElementById("birthday-popup").remove();
});