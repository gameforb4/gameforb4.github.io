const hackEffect = (function() {
    // Private variables
    let linesInterval;
    let isActive = false;
    
    // Private methods
    function getHeight() {
        return window.innerHeight || 
               document.documentElement.clientHeight || 
               document.body.clientHeight;
    }
    
    function drawLines() {
        // Clear existing lines
        const lines = document.getElementsByClassName('line');
        while(lines.length > 0) {
            document.body.removeChild(lines[0]);
        }
        
        // Don't draw if not in hacked mode
        if (!isActive) return;
        
        // Create new lines
        for(let i = 0; i < getHeight()/10; i++) {
            const line = document.createElement("div");
            line.className = `line line-${i}`;
            line.style.top = `${i * 10}px`;
            const time = Math.random() * 5;
            line.style.animation = `lines ${time}s infinite`;
            document.body.appendChild(line);
        }
    }
    
    // Public methods
    return {
        init: function() {
            // Initial setup
            window.addEventListener('resize', () => {
                if (isActive) drawLines();
            });
            
            // Set up activation button
            const btn = document.getElementById('activate-effect');
            if (btn) {
                btn.addEventListener('click', () => this.startEffect());
            }
        },
        
        startEffect: function() {
            if (isActive) return;
            
            isActive = true;
            document.body.classList.add('hacked-mode');
            
            // Start lines animation
            drawLines();
            linesInterval = setInterval(drawLines, 5000); // Redraw lines every 5 seconds
            
            // Remove activation button if exists
            const btn = document.getElementById('activate-effect');
            if (btn) btn.remove();
        },
        
        stopEffect: function() {
            if (!isActive) return;
            
            isActive = false;
            document.body.classList.remove('hacked-mode');
            
            // Clear lines animation
            clearInterval(linesInterval);
            const lines = document.getElementsByClassName('line');
            while(lines.length > 0) {
                document.body.removeChild(lines[0]);
            }
        },
        
        isActive: function() {
            return isActive;
        }
    };
})();

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    hackEffect.init();
    
    // Make available globally
    window.hackEffect = {
        startEffect: hackEffect.startEffect.bind(hackEffect),
        stopEffect: hackEffect.stopEffect.bind(hackEffect),
        isActive: hackEffect.isActive.bind(hackEffect)
    };
});