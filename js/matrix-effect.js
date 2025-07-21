// Matrix rain effect
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.createElement('canvas');
  canvas.id = 'matrix-canvas';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Matrix characters - mix of Arabic and normal chars for your special touch
  const chars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZابتثجحخدذرزسشصضطظعغفقكلمنهوي";
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  
  // Set drops for each column
  const drops = Array(columns).fill(1); 

  function draw() {
    // Semi-transparent black overlay for trailing effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Green text for matrix effect
    ctx.fillStyle = '#20C20E';
    ctx.font = `${fontSize}px monospace`;
    
    // Draw characters
    drops.forEach((drop, i) => {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drop * fontSize);
      
      // Reset drop if at bottom with random chance
      if (drop * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    });
  }

  // Only activate when in hacked mode
  let matrixInterval;
  function startMatrix() {
    matrixInterval = setInterval(draw, 33);
  }
  
  function stopMatrix() {
    clearInterval(matrixInterval);
    canvas.remove();
  }

  // Make these available globally
  window.matrixEffect = { startMatrix, stopMatrix };
});