# ✨ Magic Canvas Cursor Effect Documentation

## Overview
The magic canvas cursor effect creates an interactive, magical experience by tracking the mouse and rendering sparkles and a wand cursor that follows the pointer. This adds a Harry Potter-themed visual enhancement to the presentation app.

## 🎯 Components

### 1. **Sparkle Class**
A class representing individual sparkle particles that appear as the cursor moves.

#### Properties
```javascript
{
  x: number,           // X position
  y: number,           // Y position
  size: number,        // Size (1-4 pixels, random)
  life: number,        // Opacity/life (1.0 = full, 0 = dead)
  decay: number,       // How fast it fades (0.01-0.025)
  velocityX: number,   // Horizontal drift speed
  velocityY: number,   // Vertical drift speed
  color: string        // Sparkle color (gold/orange/white/yellow)
}
```

#### Methods

**`constructor(x, y)`**
- Creates a new sparkle at position (x, y)
- Randomizes size, decay rate, velocity, and color

**`getRandomColor()`**
- Returns a random color from gold/orange/white/yellow palette
- Matches Harry Potter theme

**`update()`**
- Decreases life by decay amount
- Moves sparkle based on velocity
- Shrinks size over time (98% per frame)

**`draw(ctx)`**
- Renders sparkle as 5-pointed star
- Applies alpha based on life
- Adds glow effect with shadow blur

**`isDead()`**
- Returns true when life <= 0
- Used to remove dead sparkles

### 2. **Canvas Setup**

```javascript
const canvas = document.getElementById('magic-canvas');
const ctx = canvas.getContext('2d');
```

- Gets reference to canvas element
- Obtains 2D rendering context

### 3. **Mouse Tracking**

```javascript
let mouseX = 0;          // Current X position
let mouseY = 0;          // Current Y position
let lastMouseX = 0;      // Previous X position
let lastMouseY = 0;      // Previous Y position
```

Tracks current and previous mouse positions to calculate velocity.

### 4. **Sparkles Array**

```javascript
const sparkles = [];
```

Stores all active sparkle instances. Capped at 200 for performance.

## 🎨 Visual Features

### Sparkle Appearance
- **Shape**: 5-pointed star
- **Size**: 1-4 pixels (random)
- **Colors**: Gold (#FFD700), Orange (#FFA500), White (#FFFFFF), Yellow (#FFFF00), Theme Gold (#d4af37)
- **Effects**: 
  - Glow/shadow blur
  - Fades out over time
  - Drifts randomly
  - Shrinks as it fades

### Wand Cursor
- **Stick**: Brown (#8B4513), 3px wide, diagonal line
- **Tip**: Glowing gold circle
- **Sparkle**: Animated 4-pointed star at tip (rotates)
- **Position**: Follows mouse exactly
- **Effects**: Drop shadow and glow

## ⚡ Animation Logic

### Frame-by-Frame Process

```
requestAnimationFrame loop
        ↓
1. Clear canvas
        ↓
2. Update all sparkles
   - Decrease life
   - Move position
   - Shrink size
        ↓
3. Remove dead sparkles
        ↓
4. Draw remaining sparkles
        ↓
5. Draw wand cursor at mouse position
        ↓
6. Request next frame
```

### Sparkle Spawning Logic

```javascript
On mouse move:
  1. Calculate velocity (distance moved)
  2. If velocity > 1:
     - Spawn 0-3 sparkles based on speed
     - Add random offset to position
     - Add to sparkles array
  3. Cap array at 200 sparkles
```

**Velocity-based spawning**:
- Moving slowly: Few sparkles
- Moving fast: More sparkles (max 3 per frame)
- Creates trail effect

## 🔧 Implementation Details

### Canvas Initialization

```javascript
function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
```

- Sets canvas to full window size
- Re-runs on window resize

### Mouse Move Handler

```javascript
document.addEventListener('mousemove', (event) => {
  // Update position tracking
  lastMouseX = mouseX;
  lastMouseY = mouseY;
  mouseX = event.clientX;
  mouseY = event.clientY;
  
  // Calculate velocity
  const dx = mouseX - lastMouseX;
  const dy = mouseY - lastMouseY;
  const velocity = Math.sqrt(dx * dx + dy * dy);
  
  // Spawn sparkles based on velocity
  if (velocity > 1) {
    const sparkleCount = Math.min(Math.floor(velocity / 10), 3);
    for (let i = 0; i < sparkleCount; i++) {
      sparkles.push(new Sparkle(mouseX, mouseY));
    }
  }
});
```

### Drawing Functions

#### `drawWand(ctx, x, y)`
```javascript
1. Draw brown stick (diagonal line)
2. Draw glowing gold tip (circle)
3. Draw animated star sparkle at tip
   - 4 lines rotating
   - Pulsing length
```

#### `animate()`
```javascript
1. Clear entire canvas
2. Loop through sparkles (reverse order):
   - Update sparkle
   - Check if dead → remove
   - Draw sparkle
3. Draw wand at mouse position
4. requestAnimationFrame(animate)
```

## 📊 Performance Optimizations

### 1. **Sparkle Limit**
```javascript
if (sparkles.length > 200) {
  sparkles.splice(0, sparkles.length - 200);
}
```
- Prevents memory issues
- Maintains smooth animation

### 2. **Velocity Check**
```javascript
if (velocity > 1) {
  // Only spawn if moving
}
```
- Doesn't spawn when idle
- Reduces unnecessary particles

### 3. **Efficient Removal**
```javascript
for (let i = sparkles.length - 1; i >= 0; i--) {
  if (sparkles[i].isDead()) {
    sparkles.splice(i, 1);
  }
}
```
- Iterates backwards
- Safe array modification

### 4. **requestAnimationFrame**
- GPU-optimized
- Pauses when tab inactive
- ~60 FPS automatically

## 🎭 Visual Effects Breakdown

### Sparkle Star Shape
```javascript
// 5-pointed star
for (let i = 0; i < 5; i++) {
  const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
  const x = this.x + Math.cos(angle) * this.size;
  const y = this.y + Math.sin(angle) * this.size;
  // Connect points
}
```

### Wand Tip Animation
```javascript
// Rotating 4-pointed star
for (let i = 0; i < 4; i++) {
  const angle = (i * Math.PI) / 2 + Date.now() / 200; // Rotates
  const length = 4 + Math.sin(Date.now() / 100) * 2;  // Pulsing
  // Draw line from center
}
```

### Glow Effects
```javascript
ctx.shadowBlur = 10;
ctx.shadowColor = this.color;
```
- Creates magical glow
- Different colors for variety

## 🎨 Color Palette

```javascript
const colors = [
  '#FFD700', // Gold - Bright, magical
  '#FFA500', // Orange - Warm glow
  '#FFFFFF', // White - Pure sparkle
  '#FFFF00', // Yellow - Bright accent
  '#d4af37', // Theme Gold - Hogwarts theme
];
```

## 📐 Math Formulas Used

### Velocity Calculation
```javascript
const dx = mouseX - lastMouseX;
const dy = mouseY - lastMouseY;
const velocity = Math.sqrt(dx * dx + dy * dy);
```
Uses Pythagorean theorem: `v = √(dx² + dy²)`

### Star Points
```javascript
const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
```
Divides circle into 5 points, offset by 90° to point upward

### Random Drift
```javascript
this.velocityX = (Math.random() - 0.5) * 2; // -1 to 1
this.velocityY = (Math.random() - 0.5) * 2; // -1 to 1
```

## 🎯 Usage Example

```javascript
// Create sparkles manually
const sparkle = new Sparkle(100, 100);
sparkles.push(sparkle);

// In animation loop
sparkle.update();
sparkle.draw(ctx);
if (sparkle.isDead()) {
  // Remove it
}
```

## 🔄 Animation Flow Diagram

```
Mouse Moves
     ↓
Update mouseX, mouseY
     ↓
Calculate velocity
     ↓
Spawn sparkles (if moving fast)
     ↓
     ↓ (60fps loop)
     ↓
┌────────────────────┐
│  animate() frame   │
│                    │
│ 1. Clear canvas    │
│ 2. Update sparkles │
│ 3. Draw sparkles   │
│ 4. Draw wand       │
│ 5. Next frame      │
└────────────────────┘
     ↑                 │
     └─────────────────┘
```

## 🌟 Key Features

✅ **Velocity-based spawning** - More sparkles when moving fast
✅ **Star-shaped sparkles** - 5-pointed stars
✅ **Random colors** - Gold, orange, white, yellow
✅ **Fade out animation** - Gradually disappears
✅ **Random drift** - Sparkles float naturally
✅ **Wand cursor** - Brown stick with glowing gold tip
✅ **Animated tip** - Rotating, pulsing star
✅ **Performance optimized** - Limited sparkles, efficient rendering
✅ **Responsive** - Canvas resizes with window
✅ **Smooth animation** - 60 FPS with requestAnimationFrame

## 🐛 Error Handling

```javascript
const canvas = document.getElementById('magic-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

if (!canvas || !ctx) return; // Exit if canvas not found
```

Gracefully handles missing canvas element.

## 🎓 Learning Points

- **Canvas API** - Drawing shapes, paths, gradients
- **Animation Loop** - requestAnimationFrame pattern
- **Particle Systems** - Spawning, updating, removing particles
- **Vector Math** - Velocity, distance calculations
- **Performance** - Array management, frame rate optimization
- **OOP** - Class-based particle system

## 📁 Related Files

- **script-simple.js** - Full implementation
- **index.html** - Canvas element (#magic-canvas)
- **styles.css** - Canvas positioning (fixed, full-screen, z-30)

## 🎯 Customization Options

### Change Sparkle Colors
```javascript
const colors = [
  '#FF0000', // Red
  '#00FF00', // Green
  // etc.
];
```

### Adjust Sparkle Size
```javascript
this.size = Math.random() * 5 + 2; // 2-7 pixels
```

### Change Spawn Rate
```javascript
const sparkleCount = Math.min(Math.floor(velocity / 5), 5); // More sparkles
```

### Modify Fade Speed
```javascript
this.decay = Math.random() * 0.03 + 0.02; // Faster fade
```

## 🚀 Future Enhancements

Possible additions:
- [ ] Different sparkle shapes (circles, hearts, lightning)
- [ ] Color trails based on slide theme
- [ ] Particle collisions
- [ ] Mouse click spell effects
- [ ] Wand trail effect
- [ ] Different wands for different houses

---

**This feature transforms the cursor into a magical wand! ✨🪄**
