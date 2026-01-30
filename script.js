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
            question: 'How does Lin’s idea of the princess as a “reward” apply to Cinderella?',
            answer: 'Lin’s argument fits especially well with Grimm Cinderella and Disney’s 1950 version, where Cinderella’s suffering is rewarded through marriage and recognition. The 2015 version adds emotional depth, but the story still resolves through being chosen, reinforcing the princess-as-reward structure.'
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
            question: 'When does an archetype become a stereotype in Disney’s Cinderella?',
            answer: 'According to Lin, an archetype becomes a stereotype when it is shaped more by cultural expectations than narrative needs. In Disney’s Cinderella, kindness, beauty, and patience become predictable requirements, which limits the character’s complexity.'
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
            <div class="flex flex-col items-center justify-center text-center slide-enter slide-enter-active">
                <div class="text-xl md:text-2xl font-cinzel text-yellow-600/80 mb-4 tracking-widest uppercase">I solemnly swear I am up to no good</div>
                <h1 class="text-6xl md:text-9xl font-bold mb-8 font-cinzel text-[#d4af37] drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] tracking-widest uppercase italic" style="font-family: 'Cinzel Decorative', serif;">
                    ${slide.title}
                </h1>
                <div class="h-px bg-gradient-to-r from-transparent via-yellow-700 to-transparent w-full mx-auto mb-8"></div>
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

// Start
init();
