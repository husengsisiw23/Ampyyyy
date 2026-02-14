// ===== Romantic Roses Animation Logic =====

document.addEventListener('DOMContentLoaded', function() {
    initRoseAnimations();
    initParticles();
    initInteractivity();
    animateRosePetals();
});

// Initialize rose animations
function initRoseAnimations() {
    const roses = document.querySelectorAll('.rose');
    roses.forEach((rose, index) => {
        rose.style.setProperty('--rose-delay', `${index * 0.3}s`);
        
        rose.addEventListener('click', function() {
            createMagicEffect(this);
        });
    });
}

// Create magical glow effect on click
function createMagicEffect(rose) {
    const petals = rose.querySelectorAll('.petal');
    const center = rose.querySelector('.rose__center');
    
    petals.forEach(petal => {
        petal.style.filter = 'drop-shadow(0 0 30px rgba(217, 70, 239, 1)) brightness(1.3)';
        setTimeout(() => {
            petal.style.filter = 'drop-shadow(0 0 12px rgba(217, 70, 239, 0.7))';
        }, 400);
    });
    
    if (center) {
        center.style.transform = 'translate(-50%, 50%) scale(1.2)';
        setTimeout(() => {
            center.style.transform = 'translate(-50%, 50%) scale(1)';
        }, 400);
    }
    
    // Create sparkles around the rose
    for (let i = 0; i < 8; i++) {
        createSparkle(rose);
    }
}

// Create sparkles
function createSparkle(rose) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.width = '8px';
    sparkle.style.height = '8px';
    sparkle.style.background = '#d946ef';
    sparkle.style.borderRadius = '50%';
    sparkle.style.boxShadow = '0 0 15px rgba(217, 70, 239, 1)';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '100';
    
    const angle = (Math.PI * 2 * Math.random());
    const distance = 60 + Math.random() * 40;
    const startX = rose.offsetWidth / 2 + Math.cos(angle) * distance;
    const startY = 100 + Math.sin(angle) * distance;
    
    sparkle.style.left = startX + 'px';
    sparkle.style.top = startY + 'px';
    sparkle.style.animation = 'sparkleAway 1s ease-out forwards';
    
    rose.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
}

// Initialize particle animations
function initParticles() {
    const hearts = document.querySelectorAll('.float-heart');
    hearts.forEach((heart, index) => {
        const randomLeft = Math.random() * 100;
        heart.style.left = randomLeft + '%';
        
        const duration = 4 + Math.random() * 2;
        heart.style.animationDuration = duration + 's';
        
        const delay = Math.random() * 3;
        heart.style.animationDelay = delay + 's';
    });
    
    const sparkles = document.querySelectorAll('.sparkle');
    sparkles.forEach((sparkle, index) => {
        const delay = Math.random() * 2;
        sparkle.style.animationDelay = delay + 's';
    });
}

// Interactive effects
function initInteractivity() {
    const roses = document.querySelectorAll('.rose');
    roses.forEach(rose => {
        rose.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 20px 40px rgba(217, 70, 239, 0.4))';
        });
        
        rose.addEventListener('mouseleave', function() {
            this.style.filter = 'drop-shadow(0 10px 25px rgba(217, 70, 239, 0.3))';
        });
    });
    
    // Click anywhere to create hearts
    document.addEventListener('click', function(e) {
        if (e.target.closest('.rose') === null) {
            createClickHeart(e.clientX, e.clientY);
        }
    });
}

// Create hearts on click
function createClickHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💜';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '32px';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'floatHeart 2s ease-out forwards';
    heart.style.zIndex = '1000';
    heart.style.textShadow = '0 0 15px rgba(217, 70, 239, 0.8)';
    
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
}

// Animate petal bloom
function animateRosePetals() {
    const petals = document.querySelectorAll('.petal');
    petals.forEach((petal, index) => {
        const delay = (index * 50) + 'ms';
        petal.style.animationDelay = delay;
    });
    
    const centers = document.querySelectorAll('.rose__center');
    centers.forEach((center, index) => {
        center.style.animationDelay = `${index * 0.4}s`;
    });
}

// Mouse parallax effect - disabled on mobile for better performance
const isMobile = () => window.innerWidth <= 1024 || /iPhone|iPad|Android/i.test(navigator.userAgent);

if (!isMobile()) {
    document.addEventListener('mousemove', function(e) {
        const roses = document.querySelectorAll('.rose');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        roses.forEach((rose, index) => {
            const speed = (index + 1) * 3;
            const moveX = (x - 0.5) * speed;
            const moveY = (y - 0.5) * speed * 0.5;
            
            rose.style.transform = `translateX(${moveX}px) translateY(${moveY}px) rotate(var(--rotation, 0deg))`;
        });
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key.toLowerCase() === 'r') {
        createHeartRain();
    }
    
    if (e.key.toLowerCase() === 'm') {
        const message = document.querySelector('.message');
        message.style.display = message.style.display === 'none' ? 'block' : 'none';
    }
    
    if (e.key.toLowerCase() === 's') {
        createSparkleExplosion();
    }
});

// Heart rain effect
function createHeartRain() {
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💜';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '-50px';
            heart.style.fontSize = '28px';
            heart.style.pointerEvents = 'none';
            heart.style.animation = 'rainDown 4s ease-in forwards';
            heart.style.zIndex = '999';
            heart.style.textShadow = '0 0 10px rgba(217, 70, 239, 0.8)';
            
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 4000);
        }, i * 40);
    }
}

// Sparkle explosion effect
function createSparkleExplosion() {
    const roses = document.querySelectorAll('.rose');
    roses.forEach(rose => {
        for (let i = 0; i < 15; i++) {
            createSparkle(rose);
        }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.innerHTML = `
    @keyframes sparkleAway {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-50px);
        }
    }
    
    @keyframes floatHeart {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-150px) scale(0);
        }
    }
    
    @keyframes rainDown {
        0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(100vh) rotate(720deg);
        }
    }
`;
document.head.appendChild(style);

// Console message
console.log('%c💜 Purple Roses for My Love 💜', 'color: #d946ef; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px rgba(217, 70, 239, 0.8);');
console.log('%cPress R for heart rain 💜 | Press M to toggle message 💬 | Press S for sparkle explosion ✨', 'color: #a855f7; font-size: 12px;');
console.log('%cClick the roses to make them glow! 🌹', 'color: #e879f9; font-size: 12px;');

