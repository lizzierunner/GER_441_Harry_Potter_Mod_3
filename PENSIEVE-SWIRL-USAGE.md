# 🌀 Pensieve Swirl Transition

## Overview
The "pensieve-swirl" effect creates a dramatic memory-diving transition between slides, inspired by Harry Potter's Pensieve. The old slide swirls away while the new slide emerges from the memory pool.

## Visual Effect

### Exiting Slide (Diving In)
- **Blur**: 0px → 10px (becomes unfocused)
- **Scale**: 1.0 → 1.15 (zooms in slightly)
- **Hue Rotate**: 0° → 90° (colors shift to blue-purple)
- **Opacity**: 1 → 0 (fades out)
- **Duration**: 0.7s ease-in

### Entering Slide (Emerging)
- **Blur**: 10px → 0px (comes into focus)
- **Scale**: 1.15 → 1.0 (zooms out to normal)
- **Hue Rotate**: -90° → 0° (colors shift from teal back to normal)
- **Opacity**: 0 → 1 (fades in)
- **Duration**: 0.7s ease-out

## CSS Classes Added

```css
.pensieve-swirl-exit          /* Initial state of exiting slide */
.pensieve-swirl-exit-active   /* Animated state of exiting slide */
.pensieve-swirl-enter         /* Initial state of entering slide */
.pensieve-swirl-enter-active  /* Animated state of entering slide */
```

## How to Use

### Method 1: Replace Existing Transitions in JavaScript

In your `renderSlide()` function in `script.js`, replace the classes:

```javascript
// BEFORE (current implementation)
contentHtml = `
  <div class="w-full max-w-6xl slide-enter slide-enter-active">
    ${slide.title}
  </div>
`;

// AFTER (with pensieve swirl)
contentHtml = `
  <div class="w-full max-w-6xl pensieve-swirl-enter pensieve-swirl-enter-active">
    ${slide.title}
  </div>
`;
```

### Method 2: Dynamic Class Application

Add exit classes to the current slide before transitioning:

```javascript
function renderSlide(index) {
  const container = document.getElementById('slide-container');
  
  // Add exit classes to current content
  const currentContent = container.firstElementChild;
  if (currentContent) {
    currentContent.classList.add('pensieve-swirl-exit', 'pensieve-swirl-exit-active');
    
    // Wait for exit animation to complete
    setTimeout(() => {
      // Render new slide with enter classes
      renderNewSlideContent(index);
    }, 700); // Match transition duration
  } else {
    renderNewSlideContent(index);
  }
}
```

### Method 3: Toggle Between Transitions

Create a setting to switch between normal and pensieve transitions:

```javascript
const usePensieveTransition = true; // or false for normal

function getTransitionClasses() {
  if (usePensieveTransition) {
    return 'pensieve-swirl-enter pensieve-swirl-enter-active';
  }
  return 'slide-enter slide-enter-active';
}

// Use in renderSlide:
contentHtml = `
  <div class="w-full max-w-6xl ${getTransitionClasses()}">
    ...
  </div>
`;
```

## Customization Options

### Adjust Speed
Change the transition duration:

```css
.pensieve-swirl-exit-active {
  transition: opacity 1s ease-in,    /* Slower */
              transform 1s ease-in, 
              filter 1s ease-in;
}
```

### Adjust Blur Intensity
Modify the blur amount:

```css
.pensieve-swirl-exit-active {
  filter: blur(15px) hue-rotate(90deg);  /* More dramatic */
}
```

### Adjust Hue Rotation
Change the color shift:

```css
.pensieve-swirl-exit-active {
  filter: blur(10px) hue-rotate(180deg);  /* Full color spectrum shift */
}
```

### Adjust Scale
Make the zoom more or less dramatic:

```css
.pensieve-swirl-exit-active {
  transform: scale(1.3);  /* Zoom in more */
}
```

## Best Practices

1. **Use for dramatic moments** - Best for important slide transitions
2. **Match timing** - Ensure exit and enter durations are the same (0.7s)
3. **Test on mobile** - Blur effects can be performance-intensive
4. **Consider accessibility** - Provide option to disable for users sensitive to motion

## Performance Notes

- **Desktop**: Smooth on modern browsers
- **Mobile**: May cause slight lag on older devices
- **Optimization**: Consider using `will-change: transform, filter, opacity` on the slide container

## Browser Support

✅ Chrome, Firefox, Safari, Edge (modern versions)
✅ iOS Safari 12+
✅ Android Chrome 80+

## The Effect Explained

The pensieve-swirl mimics the visual of:
1. **Diving into the Pensieve** (exit) - Content swirls away, blurs, and shifts colors
2. **Emerging from memory** (enter) - New content crystallizes from blur, colors normalize

Perfect for transitions between different "memories" or sections in your Harry Potter presentation! 🧙‍♂️✨
