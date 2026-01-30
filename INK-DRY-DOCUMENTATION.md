# 🖋️ Ink Dry Animation

## Overview
The `.ink-dry` animation class simulates the effect of wet ink being written on parchment and then drying into sharp, clear text. It starts as a blurry, transparent shadow and gradually becomes solid, crisp text with a deep red color (`#4a0404`).

## Visual Effect

### Starting State (Wet Ink)
- **Color**: `transparent` (invisible text)
- **Text-shadow**: `0 0 10px black` (blurry black shadow)
- **Filter**: `blur(4px)` (very blurry)
- **Opacity**: `0.5` (semi-transparent)
- **Appearance**: Looks like wet ink bleeding on parchment

### Ending State (Dried Ink)
- **Color**: `#4a0404` (deep dark red/burgundy)
- **Text-shadow**: `none` (no shadow)
- **Filter**: `blur(0)` (perfectly sharp)
- **Opacity**: `1` (fully visible)
- **Appearance**: Sharp, crisp dried ink text

## Animation Timeline

The animation has **6 keyframes** for a smooth drying effect:

| Time | Color Opacity | Blur | Shadow | Visual Effect |
|------|---------------|------|--------|---------------|
| 0% | Transparent | 4px | 10px | Wet ink, very blurry |
| 20% | 20% visible | 3px | 8px | Starting to set |
| 40% | 40% visible | 2px | 6px | Partially dried |
| 60% | 70% visible | 1px | 4px | Mostly dry |
| 80% | 90% visible | 0.5px | 2px | Almost complete |
| 100% | 100% visible | 0px | None | Fully dried, sharp |

**Duration**: 3 seconds (default)
**Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` (smooth acceleration/deceleration)

## Usage

### Basic Usage

```html
<p class="ink-dry">This text appears like drying ink</p>
<h1 class="ink-dry">Title with Ink Effect</h1>
<span class="ink-dry">Any text element works</span>
```

### Speed Variants

```html
<!-- Fast drying (1.5 seconds) -->
<p class="ink-dry ink-dry-fast">Quick drying text</p>

<!-- Normal speed (3 seconds) -->
<p class="ink-dry">Normal drying text</p>

<!-- Slow drying (5 seconds) -->
<p class="ink-dry ink-dry-slow">Slow drying text</p>
```

### Staggered Text Lines

```html
<!-- Lines appear one after another -->
<p class="ink-dry">First line appears</p>
<p class="ink-dry ink-dry-delay-1">Second line (0.3s delay)</p>
<p class="ink-dry ink-dry-delay-2">Third line (0.6s delay)</p>
<p class="ink-dry ink-dry-delay-3">Fourth line (0.9s delay)</p>
```

### Combined with Other Effects

```html
<!-- Ink dry + fade in container -->
<div class="fade-in">
  <h2 class="ink-dry">Magical Headline</h2>
  <p class="ink-dry ink-dry-delay-1">Supporting text appears after</p>
</div>
```

## Classes Reference

| Class | Duration | Delay | Effect |
|-------|----------|-------|--------|
| `.ink-dry` | 3s | 0s | Default drying effect |
| `.ink-dry-fast` | 1.5s | 0s | Faster drying |
| `.ink-dry-slow` | 5s | 0s | Slower, more dramatic |
| `.ink-dry-delay-1` | (inherit) | 0.3s | Delayed start |
| `.ink-dry-delay-2` | (inherit) | 0.6s | More delay |
| `.ink-dry-delay-3` | (inherit) | 0.9s | Most delay |

## Customization Options

### Change Color

Modify the final color in `@keyframes inkDry`:

```css
/* Gold ink */
100% {
  color: #d4af37; /* Gold instead of dark red */
  text-shadow: none;
  filter: blur(0);
  opacity: 1;
}
```

```css
/* Black ink (traditional) */
100% {
  color: #000000;
  text-shadow: none;
  filter: blur(0);
  opacity: 1;
}
```

### Adjust Blur Amount

Make the wet ink more or less blurry:

```css
/* More dramatic blur */
0% {
  color: transparent;
  text-shadow: 0 0 15px black; /* Increased from 10px */
  filter: blur(6px); /* Increased from 4px */
  opacity: 0.5;
}
```

### Change Duration

```css
.ink-dry-very-fast {
  animation-duration: 0.8s;
}

.ink-dry-dramatic {
  animation-duration: 8s;
}
```

### Add Custom Delays

```css
.ink-dry-delay-4 {
  animation-delay: 1.2s;
}

.ink-dry-delay-5 {
  animation-delay: 1.5s;
}
```

### Change Shadow Color

```css
/* Brown shadow (old parchment) */
0% {
  color: transparent;
  text-shadow: 0 0 10px #8B4513; /* Brown instead of black */
  filter: blur(4px);
  opacity: 0.5;
}
```

## Use Cases

### 1. Question Reveals
```html
<div class="quiz-answer">
  <p class="ink-dry">The answer appears like magical writing...</p>
</div>
```

### 2. Title Sequences
```html
<header>
  <h1 class="ink-dry ink-dry-slow">Chapter Title</h1>
  <p class="ink-dry ink-dry-delay-1">Subtitle appears after</p>
</header>
```

### 3. Story Text
```html
<article>
  <p class="ink-dry">Once upon a time...</p>
  <p class="ink-dry ink-dry-delay-1">In a land far away...</p>
  <p class="ink-dry ink-dry-delay-2">There lived a wizard...</p>
</article>
```

### 4. Button Labels
```html
<button class="magical-btn">
  <span class="ink-dry ink-dry-fast">Cast Spell</span>
</button>
```

### 5. Marauder's Map Effect
```html
<div class="map-text">
  <span class="ink-dry">Messrs Moony,</span>
  <span class="ink-dry ink-dry-delay-1">Wormtail,</span>
  <span class="ink-dry ink-dry-delay-2">Padfoot,</span>
  <span class="ink-dry ink-dry-delay-3">and Prongs</span>
</div>
```

## Combining with Ink-Reveal

You can use both effects for different purposes:

- **`.ink-reveal`**: Left-to-right writing effect (quill motion)
- **`.ink-dry`**: Color/sharpness transition (wet to dry)

```html
<!-- Writing motion + drying effect -->
<p class="ink-reveal">
  <span class="ink-dry">Text writes AND dries</span>
</p>
```

## Animation Details

### Keyframe Progression

The animation uses **progressive values** for smooth transitions:

**Color Alpha (RGBA)**
- 0% → transparent (0 alpha)
- 20% → 0.2 alpha
- 40% → 0.4 alpha
- 60% → 0.7 alpha
- 80% → 0.9 alpha
- 100% → 1.0 alpha (fully opaque)

**Blur Amount**
- 0% → 4px (very blurry)
- 20% → 3px
- 40% → 2px
- 60% → 1px
- 80% → 0.5px
- 100% → 0px (sharp)

**Text Shadow**
- 0% → 10px spread
- 20% → 8px spread
- 40% → 6px spread
- 60% → 4px spread
- 80% → 2px spread
- 100% → none

**Opacity**
- 0% → 0.5
- 20% → 0.7
- 40% → 0.85
- 60% → 0.95
- 80% → 1.0
- 100% → 1.0

## Performance Considerations

### Optimization Tips

1. **Use sparingly** - Blur is GPU-intensive
2. **Limit concurrent animations** - Don't animate 50 elements at once
3. **Consider mobile** - Older devices may struggle with blur
4. **Test performance** - Use browser DevTools to check frame rate

### Will-Change Optimization

For better performance on multiple elements:

```css
.ink-dry {
  will-change: color, text-shadow, filter, opacity;
  /* ...rest of properties */
}
```

Remove `will-change` after animation completes:

```javascript
element.addEventListener('animationend', () => {
  element.style.willChange = 'auto';
});
```

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Color | ✅ All | ✅ All | ✅ All | ✅ All |
| Text-shadow | ✅ All | ✅ All | ✅ All | ✅ All |
| Filter blur | ✅ 53+ | ✅ 35+ | ✅ 9.1+ | ✅ 79+ |
| Opacity | ✅ All | ✅ All | ✅ All | ✅ All |
| CSS animations | ✅ All | ✅ All | ✅ All | ✅ All |

**Recommendation**: Fully supported in all modern browsers (2020+)

## Accessibility

### Considerations

⚠️ **Motion sensitivity**: Some users may be affected by animations

**Respect prefers-reduced-motion**:

```css
@media (prefers-reduced-motion: reduce) {
  .ink-dry {
    animation: none;
    color: #4a0404;
    text-shadow: none;
    filter: blur(0);
    opacity: 1;
  }
}
```

This instantly shows the final state for users who prefer reduced motion.

## Troubleshooting

### Text appears immediately (no animation)
- Check that the element has the `.ink-dry` class
- Ensure CSS file is loaded
- Verify no conflicting styles override the animation

### Animation is choppy
- Reduce concurrent animations
- Check device performance
- Try disabling other effects temporarily
- Use `will-change` property

### Wrong color appears
- Check if other styles override the color
- Ensure proper color specificity
- Look for `!important` rules conflicting

### Animation doesn't repeat
- By default, it runs once (`forwards`)
- To repeat: Add `animation-iteration-count: infinite`
- To loop: Remove `forwards` from animation property

## Quick Reference

```css
/* Basic usage */
.ink-dry { /* 3s, starts immediately */ }

/* Speed control */
.ink-dry-fast { /* 1.5s */ }
.ink-dry-slow { /* 5s */ }

/* Timing control */
.ink-dry-delay-1 { /* +0.3s */ }
.ink-dry-delay-2 { /* +0.6s */ }
.ink-dry-delay-3 { /* +0.9s */ }

/* Animation properties */
duration: 3s (default)
easing: cubic-bezier(0.4, 0, 0.2, 1)
fill-mode: forwards
iteration: 1
```

## The Magic

This animation recreates the authentic experience of:
1. **Writing with a quill** - Wet ink first appears blurry
2. **Ink absorption** - Parchment soaks up the ink
3. **Drying process** - Text becomes sharper as ink dries
4. **Final result** - Crisp, permanent text in deep burgundy

Perfect for Harry Potter themed content, magical documents, or any parchment-style interface! 📜✨
