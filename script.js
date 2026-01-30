const slides = [
  {
    id: 'intro',
    title: 'Harry Potter, Gender and Sexuality',
    subtitle: 'Fairy Tales, Film, and Gender',
    layout: 'center',
    content: []
  },
  {
    id: 'q1',
    title: 'Question 1: Princess as Reward',
    layout: 'standard',
    content: [
      {
        type: 'quiz',
        quizItems: [
          {
            question: 'How does Lin\'s idea of the princess as a "reward" apply to Cinderella?',
            answer: 'Lin\'s argument fits especially well with Grimm Cinderella and Disney\'s 1950 version, where Cinderella\'s suffering is rewarded through marriage and recognition. The 2015 version adds emotional depth, but the story still resolves through being chosen, reinforcing the princess-as-reward structure.'
          }
        ]
      }
    ]
  },
  {
    id: 'q2',
    title: 'Question 2: Archetype vs. Stereotype',
    layout: 'standard',
    content: [
      {
        type: 'quiz',
        quizItems: [
          {
            question: 'When does an archetype become a stereotype in Disney\'s Cinderella?',
            answer: 'According to Lin, an archetype becomes a stereotype when it is shaped more by cultural expectations than narrative needs. In Disney\'s Cinderella, kindness, beauty, and patience become predictable requirements, which limits the character\'s complexity.'
          }
        ]
      }
    ]
  },
  {
    id: 'q3',
    title: 'Question 3: Shifting Structure',
    layout: 'standard',
    content: [
      {
        type: 'quiz',
        quizItems: [
          {
            question: 'How does Harry Potter and the Sorcerer’s Stone shift fairy-tale structure away from romance?',
            answer: 'Instead of centering romance, the film makes the reward belonging and identity. Harry’s journey focuses on friendship, home, and self-discovery rather than winning a princess.'
          }
        ]
      }
    ]
  },
  {
    id: 'q4',
    title: 'Question 4: Rescue Scenes',
    layout: 'standard',
    content: [
      {
        type: 'quiz',
        quizItems: [
          {
            question: 'How do rescue scenes differ between Cinderella and Harry Potter?',
            answer: 'In Cinderella, rescue happens through recognition and marriage with little direct action from Cinderella. In Harry Potter, survival depends on teamwork and problem-solving, moving away from the passive rescue model.'
          }
        ]
      }
    ]
  },
  {
    id: 'q5',
    title: 'Question 5: Agency Comparison',
    layout: 'standard',
    content: [
      {
        type: 'quiz',
        quizItems: [
          {
            question: 'Which version shows the strongest example of agency?',
            answer: 'Harry Potter and the Sorcerer’s Stone shows the strongest agency, especially through Hermione, whose choices directly affect outcomes. While the 2015 Cinderella adds emotional agency, the story still relies on recognition and romance.'
          }
        ]
      }
    ]
  },
  {
    id: 'q6',
    title: 'Question 6: Identity & Belonging',
    layout: 'standard',
    content: [
      {
        type: 'quiz',
        quizItems: [
          {
            question: 'How does the movie show Harry trying to figure out who he is, and how does Hogwarts help him feel he belongs?',
            answer: 'The film shows Harry\'s identity crisis through his life with the Dursleys, where he feels unwanted and ordinary. Hogwarts transforms this by revealing his magical heritage and famous past. Through the Sorting Hat ceremony, friendships with Ron and Hermione, and discovering his parents\' legacy, Harry finds belonging in a community that values him. The school becomes the home he never had, where his identity as "the boy who lived" evolves into simply being Harry—a brave, loyal friend who belongs to Gryffindor.'
          }
        ]
      }
    ]
  },
  {
    id: 'q7',
    title: 'Question 7: Types of Power',
    layout: 'standard',
    content: [
      {
        type: 'quiz',
        quizItems: [
          {
            question: 'How do characters like Dumbledore, Snape, and Voldemort show different types of power in the movie?',
            answer: 'The film presents three distinct forms of power: Dumbledore embodies wisdom and benevolent authority, using his power to guide and protect rather than control. His strength lies in trust and restraint. Voldemort represents raw, destructive power driven by fear and the desire for immortality—power without moral boundaries. Snape demonstrates the power of deception and complexity, operating in the shadows with ambiguous loyalties. While Voldemort seeks power through domination and Dumbledore through compassion, Snape\'s power comes from secrecy and the ability to serve multiple masters, showing that power can be subtle and layered.'
          }
        ]
      }
    ]
  },
  {
    id: 'q8',
    title: 'Question 8: Harry as Classic Hero',
    layout: 'standard',
    content: [
      {
        type: 'quiz',
        quizItems: [
          {
            question: 'How is Harry like a classic hero from a fairy tale?',
            answer: 'Harry follows the archetypal hero\'s journey found in classic fairy tales: he begins as an orphan in humble, oppressive circumstances (like Cinderella or Snow White), receives a magical call to adventure (the Hogwarts letter), gains supernatural aid (his wand, Hagrid\'s guidance), faces tests and trials (the challenges protecting the Stone), and ultimately confronts the villain to restore balance. Like traditional fairy tale heroes, Harry possesses inherent special qualities (his magical ability, fame, and the protection of his mother\'s love) that mark him as "chosen." However, unlike passive fairy tale princesses, Harry actively pursues his destiny, making him a hero in the classic adventurer tradition rather than the romantic reward structure.'
          }
        ]
      }
    ]
  },
  {
    id: 'conclusion',
    title: 'Mischief Managed',
    layout: 'center',
    content: []
  }
];

let currentSlide = 0;
const container = document.getElementById('slide-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageIndicator = document.getElementById('page-indicator');
const progressBar = document.getElementById('progress-bar');
const printContainer = document.getElementById('print-questions-container');

// --- Initialization ---

function init() {
    // Check URL hash
    const hash = window.location.hash;
    const match = hash.match(/#slide-(\d+)/);
    if (match) {
        const index = parseInt(match[1], 10) - 1;
        if (index >= 0 && index < slides.length) {
            currentSlide = index;
        }
    }

    renderSlide(currentSlide);
    setupControls();
    setupBackground();
    setupCursor();
    setupParallax();
    setupSpectacularEffects();
    renderPrintContent();
    lucide.createIcons();
}

// --- Rendering ---

function renderSlide(index) {
    const slide = slides[index];
    if (!slide) return;

    // Update URL
    window.history.replaceState(null, '', `#slide-${index + 1}`);

    // Update Controls
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === slides.length - 1;
    // Update Icons in Buttons (since innerHTML rewrite might lose them)
    prevBtn.innerHTML = `<i data-lucide="chevron-left" class="w-6 h-6"></i>`;
    if (index === slides.length - 1) {
        nextBtn.innerHTML = `<i data-lucide="wand-2" class="w-6 h-6"></i>`;
    } else {
        nextBtn.innerHTML = `<i data-lucide="chevron-right" class="w-6 h-6"></i>`;
    }
    lucide.createIcons();

    // Update Progress
    pageIndicator.innerText = `Page ${index + 1} of ${slides.length}`;
    const progress = ((index + 1) / slides.length) * 100;
    progressBar.style.width = `${progress}%`;

    // Render Content
    const isIntro = slide.id === 'intro';
    const isConclusion = slide.id === 'conclusion';
    const isSpecial = isIntro || isConclusion;

    let contentHtml = '';

    if (isIntro) {
        contentHtml = `
            <div class="flex flex-col items-center justify-center text-center slide-enter slide-enter-active">
                <div class="relative mb-8">
                     <div class="absolute inset-0 border-2 border-yellow-500 rounded-full opacity-20 animate-[spin_10s_linear_infinite]" style="width:300px; height:300px; top:50%; left:50%; transform:translate(-50%, -50%);"></div>
                </div>
                <h1 class="text-5xl md:text-8xl font-bold mb-8 font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-500 to-yellow-800 drop-shadow-[0_4px_15px_rgba(234,179,8,0.3)] tracking-widest uppercase leading-tight">
                    ${slide.title}
                </h1>
                <div class="h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent w-48 mx-auto mb-8"></div>
                <h2 class="text-2xl md:text-4xl font-cinzel text-yellow-100 font-light tracking-[0.2em] uppercase text-shadow-glow">
                    ${slide.subtitle || ''}
                </h2>
            </div>
        `;
    } else if (isConclusion) {
         contentHtml = `
            <div class="flex flex-col items-center justify-center text-center slide-enter slide-enter-active h-full">
                <div class="text-xl md:text-2xl font-cinzel text-yellow-600/80 mb-8 tracking-widest uppercase animate-fade-in">I solemnly swear I am up to no good</div>
                <h1 id="mischief-title" class="text-7xl md:text-[12rem] lg:text-[14rem] font-bold font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-[#d4af37] via-[#f4d03f] to-[#d4af37] drop-shadow-[0_0_30px_rgba(212,175,55,0.6)] tracking-widest uppercase italic animate-glow-pulse" style="font-family: 'Cinzel Decorative', serif; text-shadow: 0 0 40px rgba(212,175,55,0.8), 0 0 80px rgba(212,175,55,0.4), 0 0 120px rgba(212,175,55,0.2);">
                    ${slide.title}
                </h1>
                <div class="h-1 bg-gradient-to-r from-transparent via-yellow-600 to-transparent w-3/4 mx-auto mt-8 animate-pulse"></div>
                <button id="mischief-managed-btn" class="mt-16 px-12 py-5 bg-transparent border-2 border-yellow-600/50 text-yellow-600/80 font-cinzel text-lg rounded-lg hover:bg-yellow-600/10 hover:border-yellow-500 hover:text-yellow-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-105">
                    ✨ Tap to Reveal Magic ✨
                </button>
            </div>
        `;
    } else {
        // Standard Content
        let innerContent = '';
        slide.content.forEach(item => {
            if (item.type === 'quiz' && item.quizItems) {
                item.quizItems.forEach((q, idx) => {
                    innerContent += `
                        <div class="bg-black/40 border border-yellow-900/30 p-8 rounded-lg backdrop-blur-sm mb-6 w-full text-left relative overflow-hidden group">
                             <h3 class="text-xl md:text-3xl font-cinzel text-yellow-500 mb-6 flex items-start leading-relaxed relative z-10">
                                <span class="mr-4 mt-1 text-yellow-600 shrink-0"><i data-lucide="help-circle" class="w-8 h-8"></i></span>
                                ${q.question}
                            </h3>
                            <div class="pl-0 md:pl-12 relative z-10">
                                <div class="relative p-6 bg-[#1a1a1a]/80 border-l-4 border-green-600 rounded-r-lg shadow-inner">
                                    <p class="text-xl md:text-2xl font-crimson text-yellow-100/90 leading-relaxed">
                                        ${q.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    `;
                });
            }
        });

        contentHtml = `
            <div class="w-full max-w-6xl flex flex-col items-center text-center slide-enter slide-enter-active">
                <h1 class="text-4xl md:text-6xl font-bold mb-4 font-cinzel text-yellow-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wider">
                    ${slide.title}
                </h1>
                 ${slide.subtitle ? `<h2 class="text-2xl md:text-3xl font-cinzel text-yellow-200/80 italic border-b border-yellow-500/30 pb-4 inline-block mb-8">${slide.subtitle}</h2>` : ''}
                 
                 <div class="w-full mt-8">
                    ${innerContent}
                 </div>
            </div>
        `;
    }

    container.innerHTML = contentHtml;
    lucide.createIcons();
    
    // Setup Mischief Managed button if on conclusion slide
    if (isConclusion) {
        setupMischiefManagedButton();
    }
}

function renderPrintContent() {
    let html = '';
    slides.forEach((slide, i) => {
        slide.content.forEach(item => {
            if (item.type === 'quiz' && item.quizItems) {
                item.quizItems.forEach(q => {
                    html += `
                    <div class="break-inside-avoid">
                        <h3 class="text-xl font-bold font-serif mb-2">Question ${i}: ${q.question}</h3>
                        <div class="pl-4 border-l-4 border-gray-300">
                            <p class="text-lg font-serif leading-relaxed text-gray-800 text-justify">
                                ${q.answer}
                            </p>
                        </div>
                        <div class="mt-6 border-b border-gray-200"></div>
                    </div>
                    `;
                });
            }
        });
    });
    printContainer.innerHTML = html;
}

// --- Mischief Managed Button ---

function setupMischiefManagedButton() {
    const btn = document.getElementById('mischief-managed-btn');
    const title = document.getElementById('mischief-title');
    
    if (!btn || !title) return;
    
    btn.addEventListener('click', () => {
        // Disable button to prevent multiple clicks
        btn.disabled = true;
        btn.style.pointerEvents = 'none';
        
        // 1. Spawn trailing footprints walking off screen
        spawnExitFootprints();
        
        // 2. Fade out the "Mischief Managed" text like evaporating ink
        title.style.transition = 'opacity 2.5s ease-out, filter 2.5s ease-out, transform 2.5s ease-out';
        title.style.opacity = '0';
        title.style.filter = 'blur(3px)';
        title.style.transform = 'scale(1.05)';
        
        // Also fade out the button
        btn.style.transition = 'opacity 1.5s ease-out';
        btn.style.opacity = '0';
        
        // 3. After 3 seconds, trigger Nox Mode
        setTimeout(() => {
            startNoxMode();
        }, 3000);
    });
}

function spawnExitFootprints() {
    const footprintsContainer = document.getElementById('footprints-container');
    if (!footprintsContainer) return;
    
    // Create footprints that walk from center to off-screen (right side)
    const footprintPath = [
        { x: 50, y: 55, isLeft: true, rotation: 15 },
        { x: 53, y: 58, isLeft: false, rotation: 10 },
        { x: 56, y: 60, isLeft: true, rotation: 12 },
        { x: 59, y: 63, isLeft: false, rotation: 8 },
        { x: 62, y: 65, isLeft: true, rotation: 10 },
        { x: 66, y: 68, isLeft: false, rotation: 15 },
        { x: 70, y: 70, isLeft: true, rotation: 12 },
        { x: 74, y: 72, isLeft: false, rotation: 10 },
        { x: 78, y: 75, isLeft: true, rotation: 8 },
        { x: 83, y: 77, isLeft: false, rotation: 12 },
        { x: 88, y: 78, isLeft: true, rotation: 10 },
        { x: 93, y: 80, isLeft: false, rotation: 15 },
        { x: 98, y: 82, isLeft: true, rotation: 12 },
        { x: 103, y: 83, isLeft: false, rotation: 10 } // Off screen
    ];
    
    footprintPath.forEach((step, index) => {
        setTimeout(() => {
            createFootprint(step.x, step.y, step.isLeft, step.rotation);
        }, index * 250); // Spawn every 250ms
    });
}

function createFootprint(x, y, isLeft, rotation = 0) {
    const footprintsContainer = document.getElementById('footprints-container');
    if (!footprintsContainer) return;
    
    const footprint = document.createElement('div');
    footprint.className = 'footprint';
    footprint.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: 40px;
        height: 50px;
        opacity: 0;
        transform: rotate(${rotation}deg);
        pointer-events: none;
        animation: footprintAppear 1s ease-out forwards, footprintFade 2s ease-out 1s forwards;
    `;
    
    // Create SVG footprint
    footprint.innerHTML = `
        <svg viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
            <g fill="rgba(139, 69, 19, 0.4)" transform="${isLeft ? '' : 'scale(-1, 1) translate(-40, 0)'}">
                <!-- Heel -->
                <ellipse cx="20" cy="40" rx="12" ry="8"/>
                <!-- Ball of foot -->
                <ellipse cx="20" cy="25" rx="13" ry="10"/>
                <!-- Toes -->
                <circle cx="15" cy="10" r="4"/>
                <circle cx="20" cy="8" r="4"/>
                <circle cx="25" cy="10" r="4"/>
                <circle cx="28" cy="14" r="3.5"/>
            </g>
        </svg>
    `;
    
    footprintsContainer.appendChild(footprint);
    
    // Remove after animation
    setTimeout(() => {
        footprint.remove();
    }, 3000);
}

// --- Controls ---

function setupControls() {
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            renderSlide(currentSlide);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            renderSlide(currentSlide);
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Space') {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                renderSlide(currentSlide);
            }
        } else if (e.key === 'ArrowLeft') {
             if (currentSlide > 0) {
                currentSlide--;
                renderSlide(currentSlide);
            }
        }
    });
}

function shareLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.remove('opacity-0', 'translate-y-20');
        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-20');
        }, 2000);
    });
}

// --- Background Effects ---

function setupBackground() {
    const sparklesContainer = document.getElementById('sparkles-container');
    const candlesContainer = document.getElementById('candles-container');

    // Sparkles
    for (let i = 0; i < 30; i++) {
        const div = document.createElement('div');
        div.className = 'absolute text-yellow-200 opacity-60 pointer-events-none sparkle-anim';
        div.style.left = Math.random() * 100 + '%';
        div.style.top = Math.random() * 100 + '%';
        div.style.animationDelay = Math.random() * 5 + 's';
        div.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
        sparklesContainer.appendChild(div);
    }

    // Candles
    for (let i = 0; i < 12; i++) {
        const div = document.createElement('div');
        div.className = 'absolute z-10 pointer-events-none animate-float';
        const x = 5 + Math.random() * 90;
        const y = 5 + Math.random() * 40;
        const scale = 0.6 + Math.random() * 0.4;
        div.style.left = x + '%';
        div.style.top = y + '%';
        div.style.transform = `scale(${scale})`;
        div.style.animationDelay = Math.random() * 2 + 's';
        
        div.innerHTML = `
            <div class="relative w-4 h-12 bg-gradient-to-b from-[#fdf6e3] to-[#e6dcc3] rounded-sm shadow-lg opacity-90">
                <div class="absolute top-0 left-0 w-full h-2 bg-[#fdf6e3] rounded-t-sm"></div>
                <div class="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-4 bg-orange-300 rounded-full blur-[1px] candle-flame">
                    <div class="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-2 bg-yellow-100 rounded-full"></div>
                </div>
                <div class="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-500/20 rounded-full blur-xl animate-pulse"></div>
            </div>
        `;
        candlesContainer.appendChild(div);
    }
}

// --- Cursor ---
function setupCursor() {
    const cursor = document.getElementById('wand-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Add trail
        if (Math.random() > 0.8) {
            const trail = document.createElement('div');
            trail.className = 'fixed w-1 h-1 bg-yellow-400 rounded-full pointer-events-none z-[99]';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            document.body.appendChild(trail);
            
            // Animate fade out
            trail.animate([
                { opacity: 1, transform: 'scale(1)' },
                { opacity: 0, transform: 'scale(0)' }
            ], {
                duration: 1000,
                fill: 'forwards'
            }).onfinish = () => trail.remove();
        }
    });
}

// --- Parallax Effect ---
function setupParallax() {
    const bgLayer = document.getElementById('bg-layer');
    if (!bgLayer) return;

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Calculate center of viewport
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Calculate offset from center, divided by 50 for subtle effect
        const offsetX = (centerX - mouseX) / 50;
        const offsetY = (centerY - mouseY) / 50;
        
        // Apply translation in opposite direction
        bgLayer.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
}

// --- Nox Mode (Darkness with Flashlight Effect) ---
function startNoxMode() {
    // Hide all UI elements
    const elementsToHide = [
        document.getElementById('slide-container'),
        document.getElementById('prev-btn'),
        document.getElementById('next-btn'),
        document.getElementById('candles-container'),
        document.getElementById('page-indicator'),
        document.querySelector('header'),
        document.querySelector('footer')
    ];
    
    elementsToHide.forEach(el => {
        if (el) {
            el.style.display = 'none';
        }
    });

    // Create the Nox overlay
    const overlay = document.createElement('div');
    overlay.id = 'nox-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        z-index: 9999;
        cursor: none;
    `;

    // Create the flashlight layer
    const flashlight = document.createElement('div');
    flashlight.id = 'nox-flashlight';
    flashlight.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background: radial-gradient(
            circle 150px at 50% 50%,
            transparent 0%,
            transparent 100px,
            rgba(0, 0, 0, 0.95) 150px,
            rgba(0, 0, 0, 1) 200px
        );
        transition: background 0.05s ease-out;
    `;

    overlay.appendChild(flashlight);
    document.body.appendChild(overlay);

    // Create hidden "Nox" button (only visible in flashlight)
    const noxButton = document.createElement('button');
    noxButton.id = 'nox-spell-button';
    noxButton.textContent = 'Nox';
    noxButton.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: rgba(255, 255, 255, 0.3);
        background: transparent;
        border: 2px solid rgba(255, 255, 255, 0.2);
        padding: 15px 30px;
        font-family: 'Cinzel', serif;
        font-size: 24px;
        cursor: pointer;
        z-index: 10001;
        transition: all 0.3s ease;
        opacity: 0;
        pointer-events: auto;
        border-radius: 8px;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    `;
    document.body.appendChild(noxButton);

    // Add mousemove event for flashlight effect
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    overlay.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update flashlight position with percentage coordinates
        const percentX = (mouseX / window.innerWidth) * 100;
        const percentY = (mouseY / window.innerHeight) * 100;

        flashlight.style.background = `
            radial-gradient(
                circle 150px at ${percentX}% ${percentY}%,
                transparent 0%,
                transparent 100px,
                rgba(0, 0, 0, 0.95) 150px,
                rgba(0, 0, 0, 1) 200px
            )
        `;

        // Check if flashlight is near the Nox button
        const buttonRect = noxButton.getBoundingClientRect();
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(mouseX - buttonCenterX, 2) + 
            Math.pow(mouseY - buttonCenterY, 2)
        );

        // Show button when flashlight is within 150px
        if (distance < 150) {
            const opacity = 1 - (distance / 150);
            noxButton.style.opacity = opacity;
            noxButton.style.color = `rgba(251, 191, 36, ${opacity})`;
            noxButton.style.borderColor = `rgba(251, 191, 36, ${opacity * 0.7})`;
            noxButton.style.textShadow = `0 0 20px rgba(251, 191, 36, ${opacity})`;
        } else {
            noxButton.style.opacity = '0';
        }
    });

    // Nox button click - fade to complete darkness
    noxButton.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Remove flashlight effect
        flashlight.style.transition = 'opacity 2s ease-out';
        flashlight.style.opacity = '0';
        
        // Fade overlay to solid black
        overlay.style.transition = 'background 2s ease-out';
        overlay.style.background = '#000';
        
        // Hide button
        noxButton.style.transition = 'opacity 1s ease-out';
        noxButton.style.opacity = '0';
        
        // After fade, show message and allow exit
        setTimeout(() => {
            flashlight.remove();
            noxButton.remove();
            
            // Create "darkness" message
            const darknessMsg = document.createElement('div');
            darknessMsg.id = 'darkness-message';
            darknessMsg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: rgba(255, 255, 255, 0.3);
                font-family: 'Cinzel', serif;
                font-size: 18px;
                text-align: center;
                z-index: 10002;
                opacity: 0;
                transition: opacity 2s ease-in;
            `;
            darknessMsg.innerHTML = `
                Complete Darkness<br>
                <span style="font-size: 14px; margin-top: 10px; display: block;">
                    Click anywhere or press ESC to exit
                </span>
            `;
            document.body.appendChild(darknessMsg);
            
            // Fade in message
            setTimeout(() => {
                darknessMsg.style.opacity = '1';
            }, 100);
        }, 2000);
    });

    // Add click to exit Nox mode (but not on button)
    overlay.addEventListener('click', (e) => {
        endNoxMode();
    });

    // Add Escape key to exit
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            endNoxMode();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);

    // Add text hint
    const hint = document.createElement('div');
    hint.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        color: rgba(255, 255, 255, 0.5);
        font-family: 'Cinzel', serif;
        font-size: 14px;
        text-align: center;
        z-index: 10000;
        pointer-events: none;
    `;
    hint.textContent = 'Nox Mode Active • Click or press ESC to exit';
    document.body.appendChild(hint);

    // Store hint reference for cleanup
    overlay.dataset.hintId = 'nox-hint';
    hint.id = 'nox-hint';
}

function endNoxMode() {
    // Remove overlay and flashlight
    const overlay = document.getElementById('nox-overlay');
    const hint = document.getElementById('nox-hint');
    const noxButton = document.getElementById('nox-spell-button');
    const darknessMsg = document.getElementById('darkness-message');
    
    if (overlay) {
        overlay.remove();
    }
    
    if (hint) {
        hint.remove();
    }
    
    if (noxButton) {
        noxButton.remove();
    }
    
    if (darknessMsg) {
        darknessMsg.remove();
    }

    // Show all UI elements again
    const elementsToShow = [
        document.getElementById('slide-container'),
        document.getElementById('prev-btn'),
        document.getElementById('next-btn'),
        document.getElementById('candles-container'),
        document.getElementById('page-indicator'),
        document.querySelector('header'),
        document.querySelector('footer')
    ];
    
    elementsToShow.forEach(el => {
        if (el) {
            el.style.display = '';
        }
    });
}

// --- SPECTACULAR HARRY POTTER FEATURES ---

let housePoints = 0;
let lumosActive = false;

function setupSpectacularEffects() {
    setupLumosButton();
    setupPatronusButton();
    setupProphecyOrbs();
    setupGoldenSnitch();
    setupFlooPowderTransition();
    setupHousePoints();
    setupScreenShake();
}

// --- LUMOS/NOX Toggle ---
function setupLumosButton() {
    const lumosBtn = document.getElementById('lumos-btn');
    const body = document.body;
    
    if (!lumosBtn) return;
    
    lumosBtn.addEventListener('click', () => {
        lumosActive = !lumosActive;
        
        if (lumosActive) {
            // Lumos - brighten everything
            body.style.filter = 'brightness(1.3) saturate(1.2)';
            lumosBtn.innerHTML = `
                <i data-lucide="lightbulb-off" class="w-4 h-4"></i>
                <span>Nox</span>
            `;
            lumosBtn.classList.add('!text-yellow-300', '!border-yellow-400', '!bg-yellow-900/30');
            
            // Add glow effect
            createLumosGlow();
            awardHousePoints(5, "Cast Lumos!");
        } else {
            // Nox - return to normal
            body.style.filter = '';
            lumosBtn.innerHTML = `
                <i data-lucide="lightbulb" class="w-4 h-4"></i>
                <span>Lumos</span>
            `;
            lumosBtn.classList.remove('!text-yellow-300', '!border-yellow-400', '!bg-yellow-900/30');
            
            removeLumosGlow();
        }
        lucide.createIcons();
    });
}

function createLumosGlow() {
    const glow = document.createElement('div');
    glow.id = 'lumos-glow';
    glow.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(255, 255, 200, 0.3) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        animation: lumosGlow 2s ease-in-out infinite;
    `;
    document.body.appendChild(glow);
}

function removeLumosGlow() {
    const glow = document.getElementById('lumos-glow');
    if (glow) glow.remove();
}

// --- PATRONUS EFFECT ---
function setupPatronusButton() {
    const patronusBtn = document.getElementById('patronus-btn');
    
    if (!patronusBtn) return;
    
    patronusBtn.addEventListener('click', () => {
        spawnPatronus();
        awardHousePoints(10, "Expecto Patronum!");
        
        // Disable button briefly
        patronusBtn.disabled = true;
        setTimeout(() => {
            patronusBtn.disabled = false;
        }, 5000);
    });
}

function spawnPatronus() {
    const container = document.getElementById('patronus-container');
    if (!container) return;
    
    const patronus = document.createElement('div');
    patronus.className = 'patronus';
    
    // Random animal shapes
    const animals = ['🦌', '🐴', '🦊', '🦅', '🐺', '🦁', '🐈'];
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    
    patronus.style.cssText = `
        position: absolute;
        left: ${startX}%;
        top: ${startY}%;
        font-size: 60px;
        filter: brightness(2) blur(1px) drop-shadow(0 0 20px rgba(200, 220, 255, 0.8));
        opacity: 0.8;
        animation: patronusFloat 8s ease-in-out forwards;
        pointer-events: none;
        z-index: 100;
    `;
    patronus.textContent = randomAnimal;
    
    container.appendChild(patronus);
    
    // Remove after animation
    setTimeout(() => {
        patronus.remove();
    }, 8000);
}

// --- PROPHECY ORBS ---
function setupProphecyOrbs() {
    const container = document.getElementById('prophecy-orbs-container');
    if (!container) return;
    
    // Create 5 floating prophecy orbs
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createProphecyOrb();
        }, i * 2000);
    }
}

function createProphecyOrb() {
    const container = document.getElementById('prophecy-orbs-container');
    if (!container) return;
    
    const orb = document.createElement('div');
    const x = 10 + Math.random() * 80;
    const y = 10 + Math.random() * 80;
    
    orb.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: 40px;
        height: 40px;
        background: radial-gradient(circle at 30% 30%, rgba(200, 220, 255, 0.8), rgba(100, 150, 255, 0.3));
        border-radius: 50%;
        filter: blur(2px) drop-shadow(0 0 15px rgba(150, 180, 255, 0.6));
        animation: orbFloat 4s ease-in-out infinite, orbPulse 2s ease-in-out infinite;
        pointer-events: auto;
        cursor: pointer;
        z-index: 50;
    `;
    
    orb.addEventListener('click', () => {
        // Orb shatters on click
        orb.style.animation = 'orbShatter 0.5s ease-out forwards';
        awardHousePoints(15, "Prophecy Revealed!");
        setTimeout(() => orb.remove(), 500);
    });
    
    container.appendChild(orb);
}

// --- FLOO POWDER TRANSITION ---
function setupFlooPowderTransition() {
    const flooEffect = document.getElementById('floo-powder-effect');
    if (!flooEffect) return;
    
    // Set up green flames effect
    flooEffect.style.background = `
        radial-gradient(ellipse at center, 
            rgba(0, 255, 100, 0.6) 0%, 
            rgba(0, 200, 80, 0.4) 20%,
            rgba(0, 150, 60, 0.2) 40%,
            transparent 70%
        )
    `;
}

function triggerFlooPowder() {
    const flooEffect = document.getElementById('floo-powder-effect');
    if (!flooEffect) return;
    
    flooEffect.style.opacity = '1';
    setTimeout(() => {
        flooEffect.style.opacity = '0';
    }, 1000);
}

// --- HOUSE POINTS SYSTEM ---
function setupHousePoints() {
    // Show house points display
    const display = document.getElementById('house-points');
    if (display) {
        setTimeout(() => {
            display.style.opacity = '1';
        }, 1000);
    }
}

function awardHousePoints(points, reason) {
    housePoints += points;
    const pointsValue = document.getElementById('points-value');
    
    if (pointsValue) {
        // Animate points
        pointsValue.style.transform = 'scale(1.5)';
        pointsValue.textContent = housePoints;
        
        setTimeout(() => {
            pointsValue.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Show notification
    showNotification(`+${points} points! ${reason}`);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: rgba(0, 0, 0, 0.9);
        color: #eab308;
        padding: 20px 40px;
        border: 2px solid #d4af37;
        border-radius: 10px;
        font-family: 'Cinzel', serif;
        font-size: 20px;
        z-index: 10000;
        pointer-events: none;
        box-shadow: 0 0 30px rgba(212, 175, 55, 0.5);
        animation: notificationPop 2s ease-out forwards;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// --- SCREEN SHAKE (Howler Effect) ---
function setupScreenShake() {
    // Trigger on certain events
    document.addEventListener('keydown', (e) => {
        if (e.key === 'h' || e.key === 'H') {
            triggerHowler();
        }
    });
}

function triggerHowler() {
    const main = document.getElementById('main-content');
    if (!main) return;
    
    main.style.animation = 'shake 0.5s ease-in-out';
    showNotification("HOWLER RECEIVED!");
    
    setTimeout(() => {
        main.style.animation = '';
    }, 500);
}

// --- ENHANCED GOLDEN SNITCH WITH CATCH GAME ---
function setupGoldenSnitch() {
    const snitch = createGoldenSnitch();
    if (!snitch) return;
    
    snitch.style.cursor = 'pointer';
    snitch.addEventListener('click', () => {
        // Snitch caught!
        snitch.style.animation = 'snitchCaught 1s ease-out forwards';
        awardHousePoints(150, "GOLDEN SNITCH CAUGHT!");
        
        setTimeout(() => {
            snitch.remove();
            // Respawn after delay
            setTimeout(setupGoldenSnitch, 10000);
        }, 1000);
    });
}

// Start
init();
