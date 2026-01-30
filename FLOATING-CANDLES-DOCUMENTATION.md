# 🕯️ Floating Candles Feature Documentation

## Overview
The `spawnFloatingCandles()` function creates 5 dynamically positioned candle elements that float up and down at different speeds and with staggered timing, creating a magical Hogwarts Great Hall atmosphere.

## 🎯 Function: `spawnFloatingCandles()`

### Purpose
Dynamically creates 5 floating candles with realistic styling, random positioning, and unsynchronized animations to simulate the floating candles from the Harry Potter Great Hall.

### Location
`script-simple.js` (lines ~495-555)

### Parameters
None

### Returns
Nothing (void)

## 🎨 Implementation Details

### Function Breakdown

```javascript
function spawnFloatingCandles() {
  // 1. Get container element
  let candlesContainer = document.getElementById('candles-container');
  
  // 2. Validate container exists
  if (!candlesContainer) {
    console.warn('Candles container not found');
    return;
  }
  
  // 3. Clear any existing candles
  candlesContainer.innerHTML = '';
  
  // 4. Define possible horizontal positions
  const horizontalPositions = [10, 25, 40, 60, 75, 85];
  
  // 5. Create 5 candles
  for (let i = 0; i < 5; i++) {
    // Create element
    const candle = document.createElement('div');
    
    // Add classes for animation
    candle.className = 'floating-candle animate-float';
    
    // Random horizontal position
    const randomIndex = Math.floor(Math.random() * horizontalPositions.length);
    const horizontalPos = horizontalPositions[randomIndex];
    
    // Random vertical position (10-40%)
    const verticalPos = Math.random() * 30 + 10;
    
    // Random animation delay (0-6 seconds)
    const animationDelay = Math.random() * 6;
    
    // Random animation duration (5-8 seconds)
    const animationDuration = Math.random() * 3 + 5;
    
    // Apply styles
    candle.style.cssText = `
      position: absolute;
      left: ${horizontalPos}%;
      top: ${verticalPos}%;
      animation-delay: ${animationDelay}s;
      animation-duration: ${animationDuration}s;
    `;
    
    // Add candle body and flame
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
```

## 🔢 Randomization Details

### Horizontal Positioning
```javascript
const horizontalPositions = [10, 25, 40, 60, 75, 85];
```

**Available positions:**
- 10% - Near left edge
- 25% - Left quarter
- 40% - Left of center
- 60% - Right of center
- 75% - Right quarter
- 85% - Near right edge

**Selection:**
Random index from array ensures variety without clustering.

### Vertical Positioning
```javascript
const verticalPos = Math.random() * 30 + 10; // 10% to 40%
```

**Range:** 10% - 40% from top
- Keeps candles in upper portion of screen
- Avoids covering main content
- Simulates Great Hall ceiling

### Animation Delay
```javascript
const animationDelay = Math.random() * 6; // 0 to 6 seconds
```

**Purpose:** Staggers animation start times
- Prevents synchronized movement
- Creates natural, organic effect
- Range: 0s - 6s

### Animation Duration
```javascript
const animationDuration = Math.random() * 3 + 5; // 5 to 8 seconds
```

**Purpose:** Varies float speed
- Each candle moves at different pace
- Creates depth perception
- Range: 5s - 8s per cycle

## 🎨 Visual Design

### Candle Structure
```html
<div class="floating-candle animate-float">
  <div class="candle-body">
    <div class="candle-flame animate-flicker"></div>
  </div>
</div>
```

### Candle Body
- **Width:** 8px (base), varies 7-10px for variety
- **Height:** 40px (base), varies 35-50px
- **Color:** Cream/beige gradient (wax-like)
- **Effects:**
  - Inset shadow for depth
  - Drop shadow for floating effect
  - Wax drip at top (::before pseudo-element)

### Candle Flame
- **Size:** 12px × 20px
- **Shape:** Teardrop (using border-radius)
- **Color:** White → Yellow → Orange → Red gradient
- **Effects:**
  - Radial gradient for realistic flame
  - Multiple glows (orange/yellow)
  - 1px blur for softness
  - Flicker animation

## 🎭 CSS Styling

### Main Candle Styles
```css
.floating-candle {
  pointer-events: none;  /* Don't block clicks */
  z-index: 15;           /* Above background, below UI */
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}
```

### Candle Body
```css
.candle-body {
  position: relative;
  width: 8px;
  height: 40px;
  background: linear-gradient(to bottom, 
    #f5f5dc 0%,   /* Light cream */
    #e8dcc0 50%,  /* Mid beige */
    #d4c5a0 100%  /* Darker tan */
  );
  border-radius: 2px;
  box-shadow: 
    inset 0 -2px 4px rgba(0, 0, 0, 0.2),  /* Depth */
    0 2px 4px rgba(0, 0, 0, 0.3);         /* Shadow */
}
```

### Wax Drip
```css
.candle-body::before {
  content: '';
  position: absolute;
  top: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 3px;
  background: #f5f5dc;
  border-radius: 50%;
}
```

### Flame
```css
.candle-flame {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 20px;
  background: radial-gradient(
    ellipse at center,
    #ffffff 0%,      /* White hot center */
    #ffff00 15%,     /* Yellow */
    #ffaa00 30%,     /* Orange-yellow */
    #ff6600 50%,     /* Orange */
    rgba(255, 102, 0, 0.5) 70%,   /* Transparent orange */
    rgba(255, 102, 0, 0) 100%      /* Fully transparent */
  );
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  box-shadow: 
    0 0 10px rgba(255, 165, 0, 0.8),
    0 0 20px rgba(255, 140, 0, 0.6),
    0 0 30px rgba(255, 100, 0, 0.4);
  filter: blur(1px);
}
```

### Size Variations
```css
.floating-candle:nth-child(2) .candle-body { height: 45px; width: 9px; }
.floating-candle:nth-child(3) .candle-body { height: 35px; width: 7px; }
.floating-candle:nth-child(4) .candle-body { height: 50px; width: 10px; }
.floating-candle:nth-child(5) .candle-body { height: 38px; width: 8px; }
```

## 📊 Position Distribution Example

After calling `spawnFloatingCandles()`:

```
Screen width: 100%
─────────────────────────────────────────────────
│                                               │
│    🕯️       🕯️           🕯️        🕯️   🕯️  │ ← Random vertical
│   10%      40%          60%       75%   85%  │   positions 10-40%
│                                               │
│                                               │
│              [Main Content Area]              │
│                                               │
│                                               │
─────────────────────────────────────────────────
```

## 🎬 Animation Behavior

### Individual Candle Example:
```
Candle #1:
- Position: left: 25%, top: 15%
- Delay: 2.3s
- Duration: 6.5s
- Animation: Float up/down (±15px)
- Flame: Flicker (0.1s cycle)

Candle #2:
- Position: left: 75%, top: 28%
- Delay: 4.1s
- Duration: 7.2s
- Animation: Float up/down (±15px)
- Flame: Flicker (0.1s cycle)

[etc. for all 5 candles]
```

### Timeline Visualization:
```
Time:    0s    2s    4s    6s    8s    10s   12s
         │     │     │     │     │     │     │
Candle1: ─────●─────↑─────↓─────↑─────↓─────↑
Candle2: ─────────────────●─────↑─────↓─────↑
Candle3: ───●─────↑─────↓─────↑─────↓─────↑──
Candle4: ─────────●─────↑─────↓─────↑─────↓──
Candle5: ───────────●─────↑─────↓─────↑─────↓

● = Animation starts
↑ = Rising
↓ = Falling
```

All candles move at different rates with different start times!

## 🔧 Integration

### HTML Structure Required:
```html
<div id="candles-container" class="absolute inset-0 pointer-events-none z-10">
  <!-- Candles injected here by spawnFloatingCandles() -->
</div>
```

### Initialization:
```javascript
document.addEventListener('DOMContentLoaded', () => {
  spawnFloatingCandles(); // Call on page load
});
```

## 🎯 Usage Examples

### Basic Usage:
```javascript
// Called automatically on page load
spawnFloatingCandles();
```

### Respawn Candles:
```javascript
// Clear and create new random positions
spawnFloatingCandles();
```

### Custom Number of Candles:
Modify the function to accept a parameter:

```javascript
function spawnFloatingCandles(count = 5) {
  // ... existing code ...
  for (let i = 0; i < count; i++) {
    // Create candles
  }
}

// Usage
spawnFloatingCandles(10); // Create 10 candles
```

### Custom Positions:
```javascript
const horizontalPositions = [5, 15, 30, 45, 60, 70, 85, 95];
// More position options
```

## 🌟 Key Features

✅ **Random Positioning** - Each load creates unique layout
✅ **Staggered Animation** - No synchronized movement
✅ **Variable Speed** - Different durations (5-8s)
✅ **Realistic Styling** - Wax gradient, flame glow
✅ **Size Variety** - Different candle heights
✅ **Flickering Flame** - Animated fire effect
✅ **Non-Blocking** - `pointer-events: none`
✅ **Performance** - GPU-accelerated animations

## 📐 Mathematical Breakdown

### Horizontal Position Selection:
```
Random index: floor(random() * 6) → 0-5
Positions: [10, 25, 40, 60, 75, 85][index]
Example: index 3 → 60%
```

### Vertical Position:
```
random() * 30 + 10
= (0 to 0.999...) * 30 + 10
= 0 to 29.999... + 10
= 10 to 39.999... (effectively 10%-40%)
```

### Animation Delay:
```
random() * 6
= (0 to 0.999...) * 6
= 0s to 5.999...s
```

### Animation Duration:
```
random() * 3 + 5
= (0 to 0.999...) * 3 + 5
= 0 to 2.999... + 5
= 5s to 7.999...s
```

## 🎨 Color Palette

### Candle Wax:
- Light: `#f5f5dc` (Cream)
- Mid: `#e8dcc0` (Beige)
- Dark: `#d4c5a0` (Tan)

### Flame Colors:
- Core: `#ffffff` (White hot)
- Inner: `#ffff00` (Yellow)
- Mid: `#ffaa00` (Orange-yellow)
- Outer: `#ff6600` (Orange)
- Edge: Transparent orange

## 🔄 Function Flow

```
spawnFloatingCandles() called
        ↓
Get #candles-container
        ↓
Check if exists → No? → Warn & exit
        ↓ Yes
Clear container
        ↓
Loop 5 times:
    ├─ Create div element
    ├─ Add classes
    ├─ Calculate random horizontal position
    ├─ Calculate random vertical position
    ├─ Calculate random delay
    ├─ Calculate random duration
    ├─ Apply inline styles
    ├─ Create HTML structure (body + flame)
    └─ Append to container
        ↓
Log success message
```

## 🐛 Error Handling

```javascript
if (!candlesContainer) {
  console.warn('Candles container not found');
  return;
}
```

Gracefully exits if container element missing.

## 🚀 Performance Considerations

### Optimization:
- Uses CSS animations (GPU-accelerated)
- `pointer-events: none` (no hit detection overhead)
- Simple DOM structure (minimal elements)
- Fixed z-index (no stacking context issues)

### Best Practices:
- Only 5 candles (balanced visuals vs performance)
- Random values calculated once per candle
- Inline styles for dynamic positioning
- Reuses animation classes

## 🎓 Learning Points

- **DOM Manipulation**: `createElement()`, `appendChild()`
- **Random Values**: `Math.random()`, `Math.floor()`
- **Inline Styles**: `element.style.cssText`
- **Template Literals**: Multiline HTML strings
- **CSS Animations**: Float + flicker combination
- **Pseudo-elements**: `::before` for wax drip

## 📚 Related Files

- **script-simple.js** - Function implementation
- **styles.css** - Candle styling and animations
- **index.html** - Container element (#candles-container)

## 🎯 Customization Options

### More Candles:
```javascript
for (let i = 0; i < 10; i++) { // Change 5 to 10
```

### Different Positions:
```javascript
const horizontalPositions = [15, 35, 50, 65, 85];
```

### Faster/Slower Float:
```javascript
const animationDuration = Math.random() * 2 + 3; // 3-5s (faster)
```

### Longer Delays:
```javascript
const animationDelay = Math.random() * 10; // 0-10s
```

---

## 📋 Summary

✅ **Function:** `spawnFloatingCandles()`
✅ **Creates:** 5 animated candles
✅ **Positioning:** Random horizontal (6 options) + Random vertical (10-40%)
✅ **Animation:** Float (5-8s) + Flicker (0.1s)
✅ **Delays:** Staggered (0-6s) for unsynchronized movement
✅ **Styling:** Realistic wax body + glowing flame
✅ **Performance:** GPU-accelerated, non-blocking

This function brings the magical floating candles from Hogwarts Great Hall to life! 🕯️✨
