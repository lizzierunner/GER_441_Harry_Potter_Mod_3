# 🎭 CSS Keyframe Animations Documentation

## Overview
This document details the CSS keyframe animations created for the Harry Potter presentation app, specifically the `float` and `flicker` animations along with their variations and utility classes.

## 🎨 Animation Types

### 1. Float Animation
Creates a gentle up-and-down movement, perfect for magical floating objects.

#### **`@keyframes float`**
```css
@keyframes float {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}
```

**Properties:**
- **Duration**: Typically 6s
- **Movement**: ±15px vertical
- **Easing**: ease-in-out (smooth)
- **Pattern**: Up → Down → Up

**Use Cases:**
- Floating candles
- Levitating objects
- Golden Snitch
- Magical artifacts
- Hovering icons

#### **`@keyframes floatSlow`**
```css
@keyframes floatSlow {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
```

**Properties:**
- **Duration**: Typically 8s
- **Movement**: ±10px vertical (more subtle)
- **Easing**: ease-in-out
- **Pattern**: Slower, gentle floating

**Use Cases:**
- Background elements
- Subtle decorations
- Large objects that should move slowly

### 2. Flicker Animation
Simulates realistic candlelight with varying opacity and slight scaling.

#### **`@keyframes flicker`**
```css
@keyframes flicker {
  0%   { opacity: 1.0;  transform: scale(1); }
  10%  { opacity: 0.95; transform: scale(0.98); }
  20%  { opacity: 0.88; transform: scale(0.96); }
  30%  { opacity: 0.92; transform: scale(0.97); }
  40%  { opacity: 0.85; transform: scale(0.95); }
  50%  { opacity: 0.9;  transform: scale(0.96); }
  60%  { opacity: 0.93; transform: scale(0.98); }
  70%  { opacity: 0.88; transform: scale(0.95); }
  80%  { opacity: 0.95; transform: scale(0.97); }
  90%  { opacity: 0.9;  transform: scale(0.96); }
  100% { opacity: 1.0;  transform: scale(1); }
}
```

**Properties:**
- **Duration**: Typically 3s
- **Opacity Range**: 0.85 - 1.0 (15% variance)
- **Scale Range**: 0.95 - 1.0 (5% variance)
- **Easing**: ease-in-out
- **Pattern**: Random-looking flicker with 11 keyframes

**Use Cases:**
- Candle flames
- Torch fire
- Magical glows
- Fireplace effects
- Lanterns

#### **`@keyframes flickerSubtle`**
```css
@keyframes flickerSubtle {
  0%, 100% { opacity: 1; }
  25%      { opacity: 0.95; }
  50%      { opacity: 0.9; }
  75%      { opacity: 0.96; }
}
```

**Properties:**
- **Duration**: Typically 2s
- **Opacity Range**: 0.9 - 1.0 (10% variance)
- **No scaling**: Only opacity changes
- **Easing**: ease-in-out
- **Pattern**: Gentler, more subtle effect

**Use Cases:**
- Background ambient lighting
- Distant light sources
- Subtle glow effects
- Less prominent candles

## 🎯 Utility Classes

### Float Classes

#### `.animate-float`
```css
.animate-float {
  animation: float 6s ease-in-out infinite;
}
```
**Standard floating effect** - 6 second cycle, 15px movement

**Example Usage:**
```html
<div class="animate-float">
  <img src="golden-snitch.png" alt="Golden Snitch">
</div>
```

#### `.animate-float-slow`
```css
.animate-float-slow {
  animation: floatSlow 8s ease-in-out infinite;
}
```
**Slower, more subtle floating** - 8 second cycle, 10px movement

**Example Usage:**
```html
<div class="animate-float-slow">
  <div class="background-star"></div>
</div>
```

#### `.animate-float-fast`
```css
.animate-float-fast {
  animation: float 4s ease-in-out infinite;
}
```
**Faster floating** - 4 second cycle, 15px movement

**Example Usage:**
```html
<div class="animate-float-fast">
  <span class="magical-sparkle">✨</span>
</div>
```

### Flicker Classes

#### `.animate-flicker`
```css
.animate-flicker {
  animation: flicker 3s ease-in-out infinite;
}
```
**Realistic candlelight flicker** - 3 second cycle, detailed keyframes

**Example Usage:**
```html
<div class="candle animate-flicker">
  🕯️
</div>
```

#### `.animate-flicker-subtle`
```css
.animate-flicker-subtle {
  animation: flickerSubtle 2s ease-in-out infinite;
}
```
**Gentle, subtle flicker** - 2 second cycle, opacity-only

**Example Usage:**
```html
<div class="ambient-glow animate-flicker-subtle">
  💡
</div>
```

#### `.animate-flicker-fast`
```css
.animate-flicker-fast {
  animation: flicker 1.5s ease-in-out infinite;
}
```
**Fast, intense flicker** - 1.5 second cycle, more dramatic

**Example Usage:**
```html
<div class="torch animate-flicker-fast">
  🔥
</div>
```

#### `.candle-flame`
```css
.candle-flame {
  animation: flicker 0.15s infinite alternate;
  filter: blur(1px);
}
```
**Ultra-realistic candle flame** - Very fast flicker with blur

**Example Usage:**
```html
<div class="flame candle-flame">
  🔥
</div>
```

## 📊 Animation Comparison

| Animation | Duration | Movement | Opacity Range | Scale Range | Best For |
|-----------|----------|----------|---------------|-------------|----------|
| `float` | 6s | ±15px | - | - | Standard floating |
| `floatSlow` | 8s | ±10px | - | - | Subtle backgrounds |
| `flicker` | 3s | - | 0.85-1.0 | 0.95-1.0 | Candlelight |
| `flickerSubtle` | 2s | - | 0.9-1.0 | - | Ambient glow |

## 🎨 Visual Examples

### Float Animation Timeline
```
Time:  0s        1.5s      3s        4.5s      6s
       │         │         │         │         │
       ●         ↑         ●         ↓         ●
       │         │         │         │         │
       0px      -7.5px   -15px     -7.5px     0px
       
Position: Rest → Rising → Peak → Falling → Rest
```

### Flicker Animation Pattern
```
Time:    0s   0.3s  0.6s  0.9s  1.2s  1.5s  1.8s  2.1s  2.4s  2.7s  3s
Opacity: 1.0  0.95  0.88  0.92  0.85  0.9   0.93  0.88  0.95  0.9   1.0
         ██   ██    █     █     █     █     ██    █     ██    █     ██

Pattern: Full → Slight dim → Dimmer → Flicker → Dimmer → Flicker → Full
```

## 🎭 Combining Animations

### Float + Flicker
Create a floating, flickering candle:

```html
<div class="animate-float animate-flicker">
  🕯️
</div>
```

### Custom Duration
Override animation duration:

```html
<div class="animate-float" style="animation-duration: 10s;">
  Slow floating
</div>
```

### Delay Animations
Stagger multiple elements:

```html
<div class="animate-float" style="animation-delay: 0s;">🕯️</div>
<div class="animate-float" style="animation-delay: 1s;">🕯️</div>
<div class="animate-float" style="animation-delay: 2s;">🕯️</div>
```

## 🔧 Customization

### Change Float Height
```css
.custom-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes customFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-30px); } /* Double height */
}
```

### Adjust Flicker Intensity
```css
.intense-flicker {
  animation: flicker 3s ease-in-out infinite;
  opacity: 1;
}

.intense-flicker:hover {
  animation-duration: 1s; /* Faster when hovered */
}
```

### Direction Control
```css
/* Float horizontally instead */
@keyframes floatHorizontal {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(20px); }
}
```

## 🎯 Performance Tips

### Optimization Best Practices:

1. **Use `transform` over `top/left`**
   ```css
   /* ✓ Good - GPU accelerated */
   transform: translateY(-15px);
   
   /* ✗ Avoid - causes reflow */
   top: -15px;
   ```

2. **Limit simultaneous animations**
   - Keep under 50 animated elements
   - Use `will-change` sparingly

3. **Use `animation-play-state`**
   ```css
   .paused {
     animation-play-state: paused;
   }
   ```

4. **Reduce animations on mobile**
   ```css
   @media (prefers-reduced-motion: reduce) {
     .animate-float,
     .animate-flicker {
       animation: none;
     }
   }
   ```

## 🌟 Real-World Examples

### Floating Candles Effect
```html
<div class="candles-container">
  <div class="candle animate-float" style="animation-delay: 0s;">
    <div class="flame candle-flame">🔥</div>
  </div>
  <div class="candle animate-float" style="animation-delay: 1.5s;">
    <div class="flame candle-flame">🔥</div>
  </div>
  <div class="candle animate-float" style="animation-delay: 3s;">
    <div class="flame candle-flame">🔥</div>
  </div>
</div>
```

### Magical Atmosphere
```html
<div class="hogwarts-hall">
  <!-- Background floating particles -->
  <div class="particle animate-float-slow">✨</div>
  <div class="particle animate-float-slow" style="animation-delay: 2s;">✨</div>
  
  <!-- Torches on walls -->
  <div class="torch animate-flicker">🔥</div>
  
  <!-- Ambient magical glow -->
  <div class="magic-aura animate-flicker-subtle"></div>
</div>
```

## 📐 Mathematical Breakdown

### Float Animation
```
y(t) = A * sin(2π * t / T)

Where:
  y(t) = vertical position at time t
  A = amplitude (15px)
  T = period (6s)
  t = current time

At t=0s:   y = 0px
At t=1.5s: y = -15px (peak)
At t=3s:   y = 0px
At t=4.5s: y = -15px (peak)
At t=6s:   y = 0px (cycle complete)
```

### Flicker Pattern
11 keyframes create pseudo-random appearance:
- Average opacity: 0.925
- Standard deviation: ~0.047
- Appears natural due to irregular pattern

## 🎓 Learning Resources

### Key Concepts:
- **Keyframes**: Define animation states at specific points
- **Timing Functions**: Control animation pacing
- **Infinite Loops**: `animation-iteration-count: infinite`
- **Transform**: GPU-accelerated property
- **Opacity**: Efficient for fading effects

### Browser Support:
✅ All modern browsers (Chrome, Firefox, Safari, Edge)
✅ Mobile browsers (iOS Safari, Chrome Android)
⚠️ IE11: Requires vendor prefixes

## 🚀 Quick Start

### Basic Setup:
```html
<!-- Float an element -->
<div class="animate-float">
  Your content here
</div>

<!-- Add candlelight effect -->
<div class="animate-flicker">
  🕯️
</div>

<!-- Combine both -->
<div class="animate-float animate-flicker">
  🕯️ Floating, flickering candle
</div>
```

---

## 📋 Summary

✅ **Float Animation**: Smooth up-and-down movement
✅ **Flicker Animation**: Realistic candlelight effect
✅ **Multiple Variations**: Slow, fast, subtle options
✅ **Utility Classes**: Easy to apply
✅ **GPU Optimized**: Uses transform and opacity
✅ **Customizable**: Easily adjust timing and intensity
✅ **Accessible**: Respects prefers-reduced-motion

These animations add magical, immersive effects to the Harry Potter presentation! ✨🕯️
