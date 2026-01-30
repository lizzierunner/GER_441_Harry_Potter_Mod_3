// ========================================
// SLIDES DATA - Array of Objects
// ========================================
const slides = [
  // Cover Slide
  {
    id: 1,
    type: 'cover',
    title: 'Harry Potter, Gender and Sexuality',
    content: 'Fairy Tales, Film, and Gender'
  },
  
  // Question Slide 1
  {
    id: 2,
    type: 'question',
    question: 'How does Lin's idea of the princess as a "reward" apply to Cinderella?',
    answer: 'Lin's argument fits especially well with Grimm Cinderella and Disney's 1950 version, where Cinderella's suffering is rewarded through marriage and recognition. The 2015 version adds emotional depth, but the story still resolves through being chosen, reinforcing the princess-as-reward structure.'
  },
  
  // Question Slide 2
  {
    id: 3,
    type: 'question',
    question: 'When does an archetype become a stereotype in Disney's Cinderella?',
    answer: 'According to Lin, an archetype becomes a stereotype when it is shaped more by cultural expectations than narrative needs. In Disney's Cinderella, kindness, beauty, and patience become predictable requirements, which limits the character's complexity.'
  },
  
  // Question Slide 3
  {
    id: 4,
    type: 'question',
    question: 'How does Harry Potter and the Sorcerer's Stone shift fairy-tale structure away from romance?',
    answer: 'Instead of centering romance, the film makes the reward belonging and identity. Harry's journey focuses on friendship, home, and self-discovery rather than winning a princess.'
  },
  
  // Question Slide 4
  {
    id: 5,
    type: 'question',
    question: 'How do rescue scenes differ between Cinderella and Harry Potter?',
    answer: 'In Cinderella, rescue happens through recognition and marriage with little direct action from Cinderella. In Harry Potter, survival depends on teamwork and problem-solving, moving away from the passive rescue model.'
  },
  
  // End Slide
  {
    id: 6,
    type: 'end',
    title: 'Mischief Managed',
    content: 'I solemnly swear I am up to no good'
  }
];

// ========================================
// STATE MANAGEMENT
// ========================================
let currentSlideIndex = 0;

// ========================================
// DOM ELEMENTS
// ========================================
const slideContainer = document.getElementById('slide-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageIndicator = document.getElementById('page-indicator');
const progressBar = document.getElementById('progress-bar');

// ========================================
// WAX SEAL FUNCTION
// ========================================
function createWaxSeal(callback) {
  // Create button element
  const sealButton = document.createElement('button');
  
  // Style the button like a red wax seal
  sealButton.className = 'wax-seal-button';
  sealButton.setAttribute('aria-label', 'Click to reveal answer');
  
  // Add wax seal content (Hogwarts-style seal with "H" letter)
  sealButton.innerHTML = `
    <div class="seal-inner">
      <svg viewBox="0 0 100 100" class="seal-icon">
        <circle cx="50" cy="50" r="45" fill="currentColor" opacity="0.9"/>
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="2" opacity="0.6"/>
        <text x="50" y="65" font-size="50" font-weight="bold" text-anchor="middle" fill="#8B0000" font-family="serif">H</text>
      </svg>
      <div class="seal-text">Click to Reveal</div>
    </div>
  `;
  
  // Add click event listener
  sealButton.addEventListener('click', function() {
    // Prevent multiple clicks
    if (sealButton.classList.contains('breaking')) return;
    
    // Add breaking animation class
    sealButton.classList.add('breaking');
    
    // Wait for animation to complete before executing callback
    setTimeout(() => {
      // Execute the callback to reveal answer
      if (typeof callback === 'function') {
        callback();
      }
      
      // Remove the seal button from DOM
      sealButton.remove();
    }, 600); // Match the CSS animation duration
  });
  
  return sealButton;
}

// ========================================
// RENDER SLIDE FUNCTION
// ========================================
function renderSlide(index) {
  // Get the slide data
  const slide = slides[index];
  
  // Clear current slide container
  slideContainer.innerHTML = '';
  
  // Generate HTML based on slide type
  let slideHTML = '';
  
  if (slide.type === 'cover') {
    // Cover slide layout
    slideHTML = `
      <div class="flex flex-col items-center justify-center text-center slide-enter slide-enter-active">
        <h1 class="text-5xl md:text-8xl font-bold mb-8 font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-500 to-yellow-800 drop-shadow-[0_4px_15px_rgba(234,179,8,0.3)] tracking-widest uppercase leading-tight">
          ${slide.title}
        </h1>
        <div class="h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent w-48 mx-auto mb-8"></div>
        <h2 class="text-2xl md:text-4xl font-cinzel text-yellow-100 font-light tracking-[0.2em] uppercase">
          ${slide.content}
        </h2>
      </div>
    `;
  } 
  else if (slide.type === 'question') {
    // Question slide layout with wax seal
    slideHTML = `
      <div class="w-full max-w-6xl flex flex-col items-center text-center slide-enter slide-enter-active">
        <h1 class="text-4xl md:text-6xl font-bold mb-8 font-cinzel text-yellow-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wider">
          Question ${index}
        </h1>
        
        <div class="bg-black/40 border border-yellow-900/30 p-8 rounded-lg backdrop-blur-sm mb-6 w-full text-left">
          <h3 class="text-xl md:text-3xl font-cinzel text-yellow-500 mb-6 flex items-start leading-relaxed">
            <span class="mr-4 mt-1 text-yellow-600 shrink-0">
              <i data-lucide="help-circle" class="w-8 h-8"></i>
            </span>
            ${slide.question}
          </h3>
          
          <div class="pl-0 md:pl-12">
            <div id="answer-container-${index}" class="relative p-6 bg-[#1a1a1a]/80 border-l-4 border-green-600 rounded-r-lg shadow-inner">
              <!-- Wax seal will be inserted here programmatically -->
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Insert HTML first
    slideContainer.innerHTML = slideHTML;
    
    // Get the answer container
    const answerContainer = document.getElementById(`answer-container-${index}`);
    
    // Create wax seal with callback to reveal answer
    const seal = createWaxSeal(() => {
      // Create answer paragraph with blur-in animation
      const answerParagraph = document.createElement('p');
      answerParagraph.className = 'text-xl md:text-2xl font-crimson text-yellow-100/90 leading-relaxed answer-reveal';
      answerParagraph.textContent = slide.answer;
      
      // Insert answer into container
      answerContainer.appendChild(answerParagraph);
      
      // Trigger blur-in animation
      setTimeout(() => {
        answerParagraph.classList.add('revealed');
      }, 10);
    });
    
    // Add seal to answer container
    answerContainer.appendChild(seal);
    
    // Reinitialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    
    // Return early since we've already set innerHTML
    updateProgress(index);
    updateButtons(index);
    return;
  } 
  else if (slide.type === 'end') {
    // End slide layout
    slideHTML = `
      <div class="flex flex-col items-center justify-center text-center slide-enter slide-enter-active">
        <div class="text-xl md:text-2xl font-cinzel text-yellow-600/80 mb-4 tracking-widest uppercase">
          ${slide.content}
        </div>
        <h1 class="text-6xl md:text-9xl font-bold mb-8 font-cinzel text-[#d4af37] drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] tracking-widest uppercase italic">
          ${slide.title}
        </h1>
        <div class="h-px bg-gradient-to-r from-transparent via-yellow-700 to-transparent w-full mx-auto mb-8"></div>
      </div>
    `;
  }
  
  // Insert HTML into container
  slideContainer.innerHTML = slideHTML;
  
  // Check if this is the end slide and spawn footprints
  if (slide.type === 'end') {
    // Spawn footprints with a short delay after slide appears
    setTimeout(() => {
      spawnFootprintPath();
    }, 500);
  }
  
  // Update progress indicator
  updateProgress(index);
  
  // Update button states
  updateButtons(index);
  
  // Reinitialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// ========================================
// HELPER FUNCTIONS
// ========================================
function updateProgress(index) {
  // Update page indicator text
  pageIndicator.textContent = `Page ${index + 1} of ${slides.length}`;
  
  // Update progress bar width
  const progressPercentage = ((index + 1) / slides.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

function updateButtons(index) {
  // Disable prev button on first slide
  prevBtn.disabled = (index === 0);
  
  // Disable next button on last slide
  nextBtn.disabled = (index === slides.length - 1);
  
  // Update button icons
  prevBtn.innerHTML = '<i data-lucide="chevron-left" class="w-6 h-6"></i>';
  
  if (index === slides.length - 1) {
    nextBtn.innerHTML = '<i data-lucide="wand-2" class="w-6 h-6"></i>';
  } else {
    nextBtn.innerHTML = '<i data-lucide="chevron-right" class="w-6 h-6"></i>';
  }
  
  // Reinitialize icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// ========================================
// EVENT LISTENERS
// ========================================

// Previous Button
prevBtn.addEventListener('click', () => {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    renderSlide(currentSlideIndex);
  }
});

// Next Button
nextBtn.addEventListener('click', () => {
  if (currentSlideIndex < slides.length - 1) {
    currentSlideIndex++;
    renderSlide(currentSlideIndex);
  }
});

// Keyboard Navigation
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === ' ') {
    if (currentSlideIndex < slides.length - 1) {
      currentSlideIndex++;
      renderSlide(currentSlideIndex);
    }
  } else if (event.key === 'ArrowLeft') {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      renderSlide(currentSlideIndex);
    }
  }
});

// ========================================
// MAGIC CANVAS CURSOR EFFECT
// ========================================

// Sparkle Class
class Sparkle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1; // Random size between 1-4
    this.life = 1.0; // Full life at creation
    this.decay = Math.random() * 0.015 + 0.01; // Random fade speed
    this.velocityX = (Math.random() - 0.5) * 2; // Random horizontal drift
    this.velocityY = (Math.random() - 0.5) * 2; // Random vertical drift
    this.color = this.getRandomColor();
  }
  
  getRandomColor() {
    const colors = [
      '#FFD700', // Gold
      '#FFA500', // Orange
      '#FFFFFF', // White
      '#FFFF00', // Yellow
      '#d4af37', // Theme gold
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  update() {
    this.life -= this.decay;
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.size *= 0.98; // Shrink over time
  }
  
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    
    // Draw star-shaped sparkle
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const x = this.x + Math.cos(angle) * this.size;
      const y = this.y + Math.sin(angle) * this.size;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
  }
  
  isDead() {
    return this.life <= 0;
  }
}

// Magic Canvas Setup
const canvas = document.getElementById('magic-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

// Mouse tracking
let mouseX = 0;
let mouseY = 0;
let lastMouseX = 0;
let lastMouseY = 0;

// Sparkles array
const sparkles = [];

// Initialize canvas
function initCanvas() {
  if (!canvas || !ctx) return;
  
  // Set canvas size to window size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Handle window resize
window.addEventListener('resize', () => {
  initCanvas();
});

// Track mouse position
document.addEventListener('mousemove', (event) => {
  lastMouseX = mouseX;
  lastMouseY = mouseY;
  mouseX = event.clientX;
  mouseY = event.clientY;
  
  // Spawn sparkles on mouse move
  if (canvas && ctx) {
    // Calculate mouse velocity
    const dx = mouseX - lastMouseX;
    const dy = mouseY - lastMouseY;
    const velocity = Math.sqrt(dx * dx + dy * dy);
    
    // Spawn more sparkles when moving faster
    if (velocity > 1) {
      const sparkleCount = Math.min(Math.floor(velocity / 10), 3);
      for (let i = 0; i < sparkleCount; i++) {
        // Add some randomness to spawn position
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        sparkles.push(new Sparkle(mouseX + offsetX, mouseY + offsetY));
      }
    }
    
    // Limit sparkles array size for performance
    if (sparkles.length > 200) {
      sparkles.splice(0, sparkles.length - 200);
    }
  }
});

// Draw wand cursor
function drawWand(ctx, x, y) {
  ctx.save();
  
  // Wand stick
  ctx.strokeStyle = '#8B4513'; // Brown color
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.shadowBlur = 5;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  
  ctx.beginPath();
  ctx.moveTo(x - 15, y + 15);
  ctx.lineTo(x + 5, y - 5);
  ctx.stroke();
  
  // Wand tip (glowing)
  ctx.shadowBlur = 15;
  ctx.shadowColor = '#FFD700';
  ctx.fillStyle = '#FFD700';
  ctx.beginPath();
  ctx.arc(x + 5, y - 5, 3, 0, Math.PI * 2);
  ctx.fill();
  
  // Star sparkle at tip
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowBlur = 20;
  ctx.shadowColor = '#FFFFFF';
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2 + Date.now() / 200;
    const length = 4 + Math.sin(Date.now() / 100) * 2;
    ctx.beginPath();
    ctx.moveTo(x + 5, y - 5);
    ctx.lineTo(
      x + 5 + Math.cos(angle) * length,
      y - 5 + Math.sin(angle) * length
    );
    ctx.stroke();
  }
  
  ctx.restore();
}

// Animation loop
function animate() {
  if (!canvas || !ctx) return;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Update and draw sparkles
  for (let i = sparkles.length - 1; i >= 0; i--) {
    sparkles[i].update();
    
    if (sparkles[i].isDead()) {
      sparkles.splice(i, 1);
    } else {
      sparkles[i].draw(ctx);
    }
  }
  
  // Draw wand cursor
  drawWand(ctx, mouseX, mouseY);
  
  // Continue animation
  requestAnimationFrame(animate);
}

// Start magic canvas animation
if (canvas && ctx) {
  initCanvas();
  animate();
}

// ========================================
// FLOATING CANDLES
// ========================================

function spawnFloatingCandles() {
  // Get or create container for candles
  let candlesContainer = document.getElementById('candles-container');
  
  if (!candlesContainer) {
    console.warn('Candles container not found');
    return;
  }
  
  // Clear existing candles
  candlesContainer.innerHTML = '';
  
  // Random horizontal positions (in percentages)
  const horizontalPositions = [10, 25, 40, 60, 75, 85];
  
  // Create 5 candles
  for (let i = 0; i < 5; i++) {
    // Create candle div
    const candle = document.createElement('div');
    candle.className = 'floating-candle animate-float';
    
    // Random position from array
    const randomIndex = Math.floor(Math.random() * horizontalPositions.length);
    const horizontalPos = horizontalPositions[randomIndex];
    
    // Random vertical starting position
    const verticalPos = Math.random() * 30 + 10; // Between 10% and 40%
    
    // Random animation delay (0-6 seconds)
    const animationDelay = Math.random() * 6;
    
    // Random animation duration for variety (5-8 seconds)
    const animationDuration = Math.random() * 3 + 5;
    
    // Apply positioning and animation styles
    candle.style.cssText = `
      position: absolute;
      left: ${horizontalPos}%;
      top: ${verticalPos}%;
      animation-delay: ${animationDelay}s;
      animation-duration: ${animationDuration}s;
    `;
    
    // Create candle structure (body + flame)
    candle.innerHTML = `
      <div class="candle-body">
        <div class="candle-flame animate-flicker"></div>
      </div>
    `;
    
    // Add to container
    candlesContainer.appendChild(candle);
  }
  
  console.log('✨ 5 floating candles spawned!');
}

// ========================================
// GOLDEN SNITCH
// ========================================

/**
 * Creates and animates the Golden Snitch
 * Moves randomly across the screen with fluttering wings
 */
function createGoldenSnitch() {
  const snitchContainer = document.getElementById('snitch-container');
  
  if (!snitchContainer) {
    console.warn('Snitch container not found');
    return;
  }
  
  // Create snitch element
  const snitch = document.createElement('div');
  snitch.className = 'golden-snitch';
  snitch.id = 'golden-snitch';
  
  // Create snitch structure (ball + wings)
  snitch.innerHTML = `
    <div class="snitch-ball"></div>
    <div class="snitch-wing-left">
      <div class="wing-feather"></div>
    </div>
    <div class="snitch-wing-right">
      <div class="wing-feather"></div>
    </div>
  `;
  
  // Set initial random position
  const initialX = Math.random() * 80 + 10; // 10-90%
  const initialY = Math.random() * 60 + 20; // 20-80%
  snitch.style.left = `${initialX}%`;
  snitch.style.top = `${initialY}%`;
  
  // Add to container
  snitchContainer.appendChild(snitch);
  
  // Start random movement
  moveSnitch();
  
  console.log('⚡ Golden Snitch created!');
}

/**
 * Moves the snitch to random positions at intervals
 */
function moveSnitch() {
  const snitch = document.getElementById('golden-snitch');
  
  if (!snitch) return;
  
  function randomMove() {
    // Get viewport dimensions to ensure snitch stays on screen
    const padding = 5; // Keep 5% away from edges
    
    // Generate random position (avoid edges)
    const newX = Math.random() * (90 - padding * 2) + padding;
    const newY = Math.random() * (80 - padding * 2) + padding;
    
    // Random transition duration (1-2.5 seconds)
    const duration = Math.random() * 1.5 + 1;
    
    // Apply new position with transition
    snitch.style.transitionDuration = `${duration}s`;
    snitch.style.left = `${newX}%`;
    snitch.style.top = `${newY}%`;
    
    // Schedule next move (2-4 seconds after current move completes)
    const nextMoveDelay = (duration + Math.random() * 2 + 2) * 1000;
    setTimeout(randomMove, nextMoveDelay);
  }
  
  // Start the first move after a short delay
  setTimeout(randomMove, 2000);
}

// ========================================
// MAGICAL FOOTPRINTS
// ========================================

/**
 * Creates a single footprint element
 * @param {number} x - X position percentage (0-100)
 * @param {number} y - Y position percentage (0-100)
 * @param {boolean} isLeft - Whether it's a left footprint
 * @param {number} rotation - Rotation angle in degrees
 * @returns {HTMLElement} The footprint element
 */
function createFootprint(x, y, isLeft, rotation = 0) {
  const footprint = document.createElement('div');
  footprint.className = `magical-footprint ${isLeft ? 'footprint-left' : 'footprint-right'}`;
  
  // Position the footprint
  footprint.style.left = `${x}%`;
  footprint.style.top = `${y}%`;
  footprint.style.transform = `rotate(${rotation}deg)`;
  
  // Create SVG footprint shape (simplified shoe print)
  footprint.innerHTML = `
    <svg viewBox="0 0 40 50" class="footprint-svg" xmlns="http://www.w3.org/2000/svg">
      <!-- Heel -->
      <ellipse cx="20" cy="40" rx="12" ry="8" opacity="0.9"/>
      <!-- Ball of foot -->
      <ellipse cx="20" cy="25" rx="14" ry="10" opacity="0.9"/>
      <!-- Toes -->
      <circle cx="15" cy="12" r="3.5" opacity="0.8"/>
      <circle cx="20" cy="8" r="4" opacity="0.8"/>
      <circle cx="25" cy="10" r="3.5" opacity="0.8"/>
      <circle cx="29" cy="14" r="3" opacity="0.8"/>
    </svg>
  `;
  
  return footprint;
}

/**
 * Spawns a walking path of footprints across the screen
 * Creates footprints one by one with delays
 */
function spawnFootprintPath() {
  const footprintsContainer = document.getElementById('footprints-container');
  
  if (!footprintsContainer) {
    console.warn('Footprints container not found');
    return;
  }
  
  // Clear any existing footprints
  footprintsContainer.innerHTML = '';
  
  // Define a walking path (alternating left/right footprints)
  const path = [
    { x: 5, y: 85, isLeft: true, rotation: 30 },
    { x: 12, y: 78, isLeft: false, rotation: 25 },
    { x: 18, y: 70, isLeft: true, rotation: 35 },
    { x: 25, y: 63, isLeft: false, rotation: 30 },
    { x: 32, y: 55, isLeft: true, rotation: 25 },
    { x: 38, y: 48, isLeft: false, rotation: 30 },
    { x: 45, y: 42, isLeft: true, rotation: 20 },
    { x: 52, y: 36, isLeft: false, rotation: 25 },
    { x: 58, y: 30, isLeft: true, rotation: 30 },
    { x: 64, y: 25, isLeft: false, rotation: 20 },
    { x: 70, y: 20, isLeft: true, rotation: 25 },
    { x: 76, y: 15, isLeft: false, rotation: 30 },
    { x: 82, y: 12, isLeft: true, rotation: 20 },
    { x: 88, y: 8, isLeft: false, rotation: 25 }
  ];
  
  // Spawn each footprint with a delay
  path.forEach((step, index) => {
    setTimeout(() => {
      const footprint = createFootprint(step.x, step.y, step.isLeft, step.rotation);
      footprintsContainer.appendChild(footprint);
      
      // Start fading after appearing
      setTimeout(() => {
        footprint.classList.add('fading');
      }, 1000);
      
    }, index * 300); // 300ms delay between each footprint
  });
  
  console.log(`👣 Spawning ${path.length} magical footprints...`);
}

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Render the first slide
  renderSlide(currentSlideIndex);
  
  // Spawn floating candles
  spawnFloatingCandles();
  
  // Create Golden Snitch
  createGoldenSnitch();
  
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});
