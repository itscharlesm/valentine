// Get elements
const initialScreen = document.getElementById('initialScreen');
const questionScreen = document.getElementById('questionScreen');
const successScreen = document.getElementById('successScreen');
const proceedBtn = document.getElementById('proceedBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const audio = document.getElementById('mainFunctionSound');
const heartsBackground = document.getElementById('heartsBackground');

// Variables
let noClickCount = 0;
let scaleFactor = 1;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Create falling hearts
    createFallingHearts();
});

// Proceed button click
proceedBtn.addEventListener('click', () => {
    // Play audio
    audio.play().catch(error => {
        console.log('Audio play failed:', error);
    });

    // Transition to question screen
    initialScreen.classList.remove('active');
    setTimeout(() => {
        questionScreen.classList.add('active');
    }, 300);
});

// Yes button click
yesBtn.addEventListener('click', () => {
    // Transition to success screen
    questionScreen.classList.remove('active');
    setTimeout(() => {
        successScreen.classList.add('active');
        // Create celebration effect
        createCelebrationHearts();
    }, 300);
});

// No button click
noBtn.addEventListener('click', () => {
    noClickCount++;

    // Increase yes button size significantly each time
    scaleFactor += 0.5;
    yesBtn.style.transform = `scale(${scaleFactor})`;
    yesBtn.style.transition = 'transform 0.3s ease';

    // Move no button randomly
    moveNoButton();

    // Add shake animation to no button
    noBtn.style.animation = 'none';
    setTimeout(() => {
        noBtn.style.animation = 'shake 0.5s';
    }, 10);

    // After 5 clicks, make yes button cover most of the screen
    if (noClickCount >= 5) {
        yesBtn.style.position = 'fixed';
        yesBtn.style.top = '50%';
        yesBtn.style.left = '50%';
        yesBtn.style.transform = `translate(-50%, -50%) scale(${scaleFactor * 3})`;
        yesBtn.style.zIndex = '1000';
        noBtn.style.display = 'none';
    }
});

// Move no button randomly
function moveNoButton() {
    const container = document.querySelector('.button-container');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate random position within viewport
    const maxX = window.innerWidth - btnRect.width - 40;
    const maxY = window.innerHeight - btnRect.height - 40;

    const randomX = Math.random() * maxX + 20;
    const randomY = Math.random() * maxY + 20;

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transition = 'all 0.3s ease';
}

// Create falling hearts background
function createFallingHearts() {
    const heartEmojis = ['💗', '💖', '💕', '💓', '💝', '❤️'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('falling-heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';

        heartsBackground.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 500);
}

// Create celebration hearts effect
function createCelebrationHearts() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '💗';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '-50px';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.animation = `fall ${Math.random() * 2 + 2}s linear`;
            heart.style.zIndex = '100';

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 4000);
        }, i * 100);
    }
}

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Audio controls - Allow user interaction to play
document.body.addEventListener('click', () => {
    if (audio.paused && questionScreen.classList.contains('active')) {
        audio.play().catch(error => {
            console.log('Audio play failed:', error);
        });
    }
}, { once: true });