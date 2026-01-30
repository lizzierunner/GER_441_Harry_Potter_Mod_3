# 🪄 Magic Canvas Cursor - Visual Guide

```
╔═══════════════════════════════════════════════════════════════════╗
║            MAGIC CANVAS CURSOR EFFECT - VISUAL GUIDE              ║
╚═══════════════════════════════════════════════════════════════════╝

┌───────────────────────────────────────────────────────────────────┐
│ 1️⃣  SPARKLE LIFECYCLE                                             │
└───────────────────────────────────────────────────────────────────┘

Frame 1          Frame 10         Frame 20         Frame 30
  ✨              ✨               ✨              ....
  │               │                │                 │
life: 1.0      life: 0.7       life: 0.4        life: 0.1
size: 4px      size: 3.2px     size: 2.5px      size: 2px
opacity: 100%  opacity: 70%    opacity: 40%     opacity: 10%
                                                   (removed)

┌───────────────────────────────────────────────────────────────────┐
│ 2️⃣  SPARKLE CLASS STRUCTURE                                       │
└───────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────┐
│         Sparkle Instance        │
├─────────────────────────────────┤
│ Properties:                     │
│  • x: 450                       │
│  • y: 300                       │
│  • size: 3.5                    │
│  • life: 1.0                    │
│  • decay: 0.015                 │
│  • velocityX: 0.8               │
│  • velocityY: -0.3              │
│  • color: '#FFD700'             │
├─────────────────────────────────┤
│ Methods:                        │
│  • update()     → Fade & move   │
│  • draw(ctx)    → Render star   │
│  • isDead()     → Check life    │
│  • getRandomColor() → Pick color│
└─────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────┐
│ 3️⃣  MOUSE TRACKING SYSTEM                                         │
└───────────────────────────────────────────────────────────────────┘

Mouse Movement:
  
  t=0                t=1               t=2
  
  ┌─────┐           ┌─────┐          ┌─────┐
  │ 🖱️  │────→──────│ 🖱️  │───→──────│ 🖱️  │
  └─────┘           └─────┘          └─────┘
  (100,100)         (150,120)        (220,140)
  
  lastX=0           lastX=100        lastX=150
  lastY=0           lastY=100        lastY=120
  
  mouseX=100        mouseX=150       mouseX=220
  mouseY=100        mouseY=120       mouseY=140
  
  velocity=0        velocity=50      velocity=72
                    ↓                ↓
                  spawn 5          spawn 7
                  sparkles         sparkles

┌───────────────────────────────────────────────────────────────────┐
│ 4️⃣  SPARKLE SPAWNING LOGIC                                        │
└───────────────────────────────────────────────────────────────────┘

velocity = √(dx² + dy²)

  velocity < 1     →  No sparkles
  velocity 1-10    →  1 sparkle
  velocity 10-20   →  1 sparkle
  velocity 20-30   →  2 sparkles
  velocity 30+     →  3 sparkles (max)

Example:
  Mouse moves 50 pixels
  velocity = 50
  sparkleCount = Math.min(Math.floor(50/10), 3)
  sparkleCount = Math.min(5, 3) = 3 sparkles

┌───────────────────────────────────────────────────────────────────┐
│ 5️⃣  WAND CURSOR STRUCTURE                                         │
└───────────────────────────────────────────────────────────────────┘

                   ╱ ✨ ← Animated star (rotating)
                  ╱
                 ╱ ● ← Glowing gold tip
                ╱
               ╱
              ╱ ← Brown stick (3px wide)
             ╱
            ╱
           ╱
          •  ← Mouse position

Components:
1. Stick:    Brown line from (x-15, y+15) to (x+5, y-5)
2. Tip:      Gold circle at (x+5, y-5), radius 3px
3. Sparkle:  4 rotating lines, pulsing length

┌───────────────────────────────────────────────────────────────────┐
│ 6️⃣  STAR SHAPE MATHEMATICS                                        │
└───────────────────────────────────────────────────────────────────┘

5-Pointed Star:

       ★
      /|\
     / | \
    4  0  1
     \ | /
      \|/
     3   2

Points calculation:
  for i = 0 to 4:
    angle = (i * 4π / 5) - π/2
    x = centerX + cos(angle) * size
    y = centerY + sin(angle) * size

Result: Points 0→2→4→1→3→0 (connected)

┌───────────────────────────────────────────────────────────────────┐
│ 7️⃣  ANIMATION LOOP VISUALIZATION                                  │
└───────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    ANIMATION FRAME                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Step 1: ctx.clearRect(0, 0, width, height)                    │
│          ┌──────────────────────────────────┐                  │
│          │                                  │                  │
│          │         [Blank Canvas]           │                  │
│          │                                  │                  │
│          └──────────────────────────────────┘                  │
│                                                                 │
│  Step 2: Update & Draw Sparkles                                │
│          ┌──────────────────────────────────┐                  │
│          │    ✨  ✨                        │                  │
│          │  ✨      ✨    ✨               │                  │
│          │       ✨    ✨                  │                  │
│          └──────────────────────────────────┘                  │
│                                                                 │
│  Step 3: Draw Wand Cursor                                      │
│          ┌──────────────────────────────────┐                  │
│          │    ✨  ✨                        │                  │
│          │  ✨      ✨    ✨               │                  │
│          │       ✨    ✨         🪄       │                  │
│          └──────────────────────────────────┘                  │
│                                                                 │
│  Step 4: requestAnimationFrame(animate)                        │
│          ↓ (repeat at 60 FPS)                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────┐
│ 8️⃣  SPARKLE ARRAY MANAGEMENT                                      │
└───────────────────────────────────────────────────────────────────┘

sparkles = [💫, 💫, 💫, 💫, 💫]  (length: 5)
              ↓
Mouse moves fast → spawn 3 new
              ↓
sparkles = [💫, 💫, 💫, 💫, 💫, ✨, ✨, ✨]  (length: 8)
              ↓
Update all → 2 die
              ↓
sparkles = [💫, 💫, 💫, ✨, ✨, ✨]  (length: 6)
              ↓
If length > 200 → remove oldest
sparkles = [💫, 💫, 💫, ✨, ✨, ✨]  (keep all, under limit)

┌───────────────────────────────────────────────────────────────────┐
│ 9️⃣  COLOR PALETTE                                                 │
└───────────────────────────────────────────────────────────────────┘

┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│          │  │          │  │          │  │          │  │          │
│  #FFD700 │  │  #FFA500 │  │  #FFFFFF │  │  #FFFF00 │  │  #d4af37 │
│   Gold   │  │  Orange  │  │  White   │  │  Yellow  │  │Theme Gold│
│          │  │          │  │          │  │          │  │          │
└──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘
    ★             ★             ★             ★             ★
  Sparkle       Sparkle       Sparkle       Sparkle       Sparkle
  Option 1      Option 2      Option 3      Option 4      Option 5

┌───────────────────────────────────────────────────────────────────┐
│ 🔟  WAND TIP ANIMATION                                            │
└───────────────────────────────────────────────────────────────────┘

Rotating 4-pointed star:

t=0ms         t=100ms       t=200ms       t=300ms       t=400ms
   |             ╱                          \              |
───●───    ───  ●  ──      ─── ● ───      ──  ●  ───   ───●───
   |                          ╱                \            |
                             
Rotation: angle = Date.now() / 200
Length pulse: 4 + sin(Date.now() / 100) * 2 (between 2-6px)

┌───────────────────────────────────────────────────────────────────┐
│ 1️⃣1️⃣  PERFORMANCE METRICS                                         │
└───────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Particle Count vs Frame Rate           │
│                                         │
│ 60 FPS │████████████████                │ < 50 sparkles
│        │                                 │
│ 50 FPS │████████████████████            │ 50-100 sparkles
│        │                                 │
│ 40 FPS │████████████████████████        │ 100-150 sparkles
│        │                                 │
│ 30 FPS │████████████████████████████    │ 150-200 sparkles
│        │                                 │
│ 20 FPS │████████████████████████████████│ 200+ sparkles (capped)
└─────────────────────────────────────────┘

Maximum: 200 sparkles (enforced by splice)
Optimal: 50-100 sparkles for smooth 60 FPS

┌───────────────────────────────────────────────────────────────────┐
│ 1️⃣2️⃣  VELOCITY TO SPARKLE COUNT                                   │
└───────────────────────────────────────────────────────────────────┘

Graph:
Sparkles
   3│         ████████████████████
    │         █
   2│     ████
    │     █
   1│ ████
    │ █
   0└─────────────────────────────→ Velocity
    0   10    20   30   40   50

Formula: Math.min(Math.floor(velocity / 10), 3)

Examples:
  velocity = 5   → 0 sparkles
  velocity = 15  → 1 sparkle
  velocity = 25  → 2 sparkles
  velocity = 50  → 3 sparkles
  velocity = 100 → 3 sparkles (capped)

┌───────────────────────────────────────────────────────────────────┐
│ 1️⃣3️⃣  CANVAS LAYER STRUCTURE                                      │
└───────────────────────────────────────────────────────────────────┘

z-index layers (bottom to top):

z-0:  Background Layer (#bg-layer)
      ├─ Background images
      ├─ Textures
      ├─ House banners
      └─ Dynamic containers

z-20: Main App Container (#app)
      ├─ Slide content
      └─ Navigation UI

z-30: Magic Canvas (#magic-canvas)  ← THIS LAYER
      ├─ Sparkles
      └─ Wand cursor

z-100: Custom cursor (if enabled)

┌───────────────────────────────────────────────────────────────────┐
│ 1️⃣4️⃣  COMPLETE FLOW DIAGRAM                                       │
└───────────────────────────────────────────────────────────────────┘

┌──────────┐
│  START   │
└────┬─────┘
     │
     ↓
┌─────────────────────┐
│ Initialize Canvas   │
│ - Set size          │
│ - Get context       │
└────┬────────────────┘
     │
     ↓
┌─────────────────────┐
│ Start Animation     │
│ - Call animate()    │
└────┬────────────────┘
     │
     ├──────────────────────────────┐
     ↓                              ↓
┌──────────────┐           ┌────────────────┐
│ Mouse Moves  │           │ Animation Loop │
└──┬───────────┘           └───┬────────────┘
   │                           │
   ↓                           ↓
┌──────────────────┐     ┌──────────────────┐
│ Track Position   │     │ Clear Canvas     │
│ - Update x, y    │     └───┬──────────────┘
└──┬───────────────┘         │
   │                         ↓
   ↓                    ┌──────────────────┐
┌──────────────────┐   │ For each sparkle │
│ Calc Velocity    │   │ - Update         │
└──┬───────────────┘   │ - Check death    │
   │                   │ - Draw           │
   ↓                   └───┬──────────────┘
┌──────────────────┐       │
│ Spawn Sparkles   │       ↓
│ based on speed   │  ┌──────────────────┐
└──┬───────────────┘  │ Draw Wand        │
   │                  │ - Stick          │
   │                  │ - Tip            │
   │                  │ - Animated star  │
   │                  └───┬──────────────┘
   │                      │
   │                      ↓
   │              ┌──────────────────┐
   │              │ Request Next     │
   │              │ Animation Frame  │
   │              └───┬──────────────┘
   │                  │
   └──────────────────┴───────────────┘
                      │
                      ↓
                  (repeat)

═══════════════════════════════════════════════════════════════════
                    🎉 VISUAL GUIDE COMPLETE! 🎉
═══════════════════════════════════════════════════════════════════
```

## 💡 Quick Reference

### Create Sparkle
```javascript
new Sparkle(x, y)
```

### Update Sparkle
```javascript
sparkle.update()  // Fade, move, shrink
```

### Draw Sparkle
```javascript
sparkle.draw(ctx)  // Render to canvas
```

### Check Status
```javascript
sparkle.isDead()  // Returns true when life <= 0
```

### Draw Wand
```javascript
drawWand(ctx, mouseX, mouseY)
```

### Animation Frame
```javascript
requestAnimationFrame(animate)
```

## 🎯 Key Takeaways

✅ Sparkles spawn based on mouse velocity
✅ Each sparkle is a 5-pointed star
✅ Random colors create variety
✅ Wand cursor follows mouse exactly
✅ Animated tip rotates and pulses
✅ Performance capped at 200 sparkles
✅ 60 FPS smooth animation
✅ Self-cleaning (removes dead sparkles)
