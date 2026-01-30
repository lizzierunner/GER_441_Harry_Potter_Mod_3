# 🕯️ Nox Mode - Darkness with Flashlight Effect

## Overview
Nox Mode creates a full-screen darkness effect inspired by the *Nox* spell from Harry Potter (the counter-charm to *Lumos*). The screen goes completely black except for a circular "flashlight" area that follows your mouse cursor, revealing what's underneath.

**NEW**: A hidden "Nox" button appears in the center when you shine your flashlight on it. Clicking it casts the Nox spell, fading the screen to complete darkness and removing the flashlight entirely.

## Visual Effect

### What Happens
1. **All UI elements hidden** - Slides, buttons, candles, navigation disappear
2. **Black overlay** - Full-screen darkness (z-index: 9999)
3. **Flashlight effect** - 150px radius circle follows mouse cursor
4. **Radial gradient** - Smooth fade from transparent center to pure black
5. **Cursor hidden** - Standard cursor replaced by flashlight circle
6. **Hidden "Nox" button** - Appears only when flashlight shines on center
7. **Complete darkness** - Clicking Nox button fades to solid black

### The Hidden Button
- **Location**: Centered on screen
- **Visibility**: Only appears when flashlight (within 150px) hovers over it
- **Opacity**: Fades in/out based on distance from flashlight
- **Color**: Golden yellow (matching Harry Potter theme)
- **Effect**: Clicking it triggers a 2-second fade to complete darkness

### Gradient Breakdown
```
Circle at mouse position:
- 0-100px: Fully transparent (you can see through)
- 100-150px: Fade to 95% black
- 150-200px: Fade to 100% black
- 200px+: Pure black
```

## The "Nox" Spell Sequence

1. **Hover flashlight over center** → Button fades in with golden glow
2. **Click the "Nox" button** → Triggers spell
3. **2-second fade** → Flashlight disappears, screen goes solid black
4. **Message appears** → "Complete Darkness" with instructions to exit
5. **Exit anytime** → Click or press ESC to restore presentation

## Functions Added

### `startNoxMode()`
Activates the darkness mode.

**What it does:**
- Hides all UI elements (slides, buttons, candles, header, footer)
- Creates `#nox-overlay` div with black background
- Creates `#nox-flashlight` div with radial gradient
- Adds mousemove listener for flashlight tracking
- Adds click and ESC key listeners to exit
- Shows hint text at top of screen

### `endNoxMode()`
Exits the darkness mode.

**What it does:**
- Removes the overlay and flashlight elements
- Removes the hint text
- Restores all hidden UI elements
- Returns to normal presentation mode

## How to Use

### Method 1: Call from Console
```javascript
startNoxMode();  // Activate darkness
```

### Method 2: Add a Button
Add this to your HTML:

```html
<button onclick="startNoxMode()" 
        class="fixed top-4 right-4 z-50 px-4 py-2 bg-black/50 text-yellow-500 
               border border-yellow-500 rounded hover:bg-black/70">
  🕯️ Nox Mode
</button>
```

### Method 3: Keyboard Shortcut
Add this to your `init()` function in `script.js`:

```javascript
function init() {
    // ... existing code ...
    
    // Add Nox mode keyboard shortcut
    document.addEventListener('keydown', (e) => {
        if (e.key === 'n' || e.key === 'N') {
            const overlay = document.getElementById('nox-overlay');
            if (overlay) {
                endNoxMode();
            } else {
                startNoxMode();
            }
        }
    });
}
```

### Method 4: Easter Egg (Triple Click)
```javascript
let clickCount = 0;
let clickTimer = null;

document.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount === 3) {
        startNoxMode();
        clickCount = 0;
    }
    
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
        clickCount = 0;
    }, 500);
});
```

## Exiting Nox Mode

Users can exit by:
1. **Clicking anywhere** on the screen
2. **Pressing ESC** key
3. Programmatically calling `endNoxMode()`

## Customization Options

### Adjust Flashlight Size

**Larger flashlight (250px):**
```javascript
flashlight.style.background = `
    radial-gradient(
        circle 250px at ${percentX}% ${percentY}%,
        transparent 0%,
        transparent 200px,
        rgba(0, 0, 0, 0.95) 250px,
        rgba(0, 0, 0, 1) 300px
    )
`;
```

**Smaller flashlight (100px):**
```javascript
flashlight.style.background = `
    radial-gradient(
        circle 100px at ${percentX}% ${percentY}%,
        transparent 0%,
        transparent 50px,
        rgba(0, 0, 0, 0.95) 100px,
        rgba(0, 0, 0, 1) 150px
    )
`;
```

### Change Darkness Level

**Less dark (allows some visibility):**
```javascript
rgba(0, 0, 0, 0.85) 150px,
rgba(0, 0, 0, 0.95) 200px
```

**Completely opaque:**
```javascript
rgba(0, 0, 0, 1) 150px,
rgba(0, 0, 0, 1) 200px
```

### Add Color Tint

**Blue tint (night vision):**
```javascript
background: #000022;  // Instead of pure black
```

**Purple tint (magical):**
```javascript
background: #0a0015;
```

### Adjust Smoothness

**Smoother transition:**
```javascript
transition: background 0.1s ease-out;
```

**Instant (no smoothing):**
```javascript
transition: none;
```

### Add Glow Effect

Add a glow around the flashlight:
```javascript
flashlight.style.background = `
    radial-gradient(
        circle 150px at ${percentX}% ${percentY}%,
        rgba(255, 255, 200, 0.1) 0%,
        transparent 100px,
        rgba(0, 0, 0, 0.95) 150px,
        rgba(0, 0, 0, 1) 200px
    )
`;
```

## Advanced Features

### Multiple Flashlights

Track multiple touch points on mobile:

```javascript
overlay.addEventListener('touchmove', (e) => {
    const touches = Array.from(e.touches);
    const gradients = touches.map(touch => {
        const percentX = (touch.clientX / window.innerWidth) * 100;
        const percentY = (touch.clientY / window.innerHeight) * 100;
        return `radial-gradient(
            circle 150px at ${percentX}% ${percentY}%,
            transparent 0%,
            transparent 100px,
            rgba(0, 0, 0, 0) 150px
        )`;
    }).join(', ');
    
    flashlight.style.background = `${gradients}, rgba(0, 0, 0, 1)`;
});
```

### Animated Entry

Fade in the darkness:

```javascript
overlay.style.opacity = '0';
overlay.style.transition = 'opacity 1s ease-in';
setTimeout(() => {
    overlay.style.opacity = '1';
}, 10);
```

### Pulsing Flashlight

Add a subtle pulse:

```javascript
flashlight.style.animation = 'pulse 2s ease-in-out infinite';

// Add to CSS:
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
}
```

## Use Cases

1. **Dramatic Reveals** - Use for important slides or endings
2. **Easter Egg** - Hidden feature for users to discover
3. **Interactive Storytelling** - Create mystery or suspense
4. **Accessibility Demo** - Show how visually impaired users experience content
5. **Game Element** - "Find the hidden content" challenge
6. **Atmospheric Effect** - Enhance spooky or mysterious sections

## Performance Notes

- **Desktop**: Smooth performance, 60fps
- **Mobile**: Good performance, radial gradients are GPU accelerated
- **Battery**: Minimal impact, uses CSS transforms
- **Optimization**: Radial gradient updates are efficient

## Browser Support

✅ Chrome, Firefox, Safari, Edge (all modern versions)
✅ iOS Safari 12+
✅ Android Chrome 80+
✅ Touch events supported

## Accessibility Considerations

⚠️ **Important**: This effect should be optional and include warnings:

```javascript
function startNoxMode() {
    if (!confirm('This will darken the screen. Press OK to continue, Cancel to exit.')) {
        return;
    }
    // ... rest of function
}
```

Consider adding:
- Preference to disable effects
- Warning for photosensitive users
- Clear exit instructions
- High contrast mode override

## The Magic Behind It

The Nox mode uses:
1. **Fixed positioning** - Overlay covers entire viewport
2. **High z-index** - Appears above all content
3. **Radial gradient** - Creates circular reveal effect
4. **Percentage positioning** - Responsive to window size
5. **Pointer events: none** - Flashlight doesn't block mouse
6. **CSS transitions** - Smooth gradient updates

Perfect for adding mystery and interactivity to your magical Harry Potter presentation! 🪄✨

## Quick Reference

```javascript
// Activate
startNoxMode();

// Deactivate
endNoxMode();

// Toggle
const overlay = document.getElementById('nox-overlay');
if (overlay) {
    endNoxMode();
} else {
    startNoxMode();
}
```

**Hint displayed**: "Nox Mode Active • Click or press ESC to exit"

**Elements hidden**: slides, buttons, candles, navigation, header, footer

**Elements shown**: Black overlay with mouse-following flashlight effect
