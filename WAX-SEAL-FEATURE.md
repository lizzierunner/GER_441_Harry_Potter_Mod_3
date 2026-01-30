# 🔴 Wax Seal Feature Documentation

## Overview
The wax seal feature adds an interactive, immersive element to the presentation app. Users must "break" a red wax seal by clicking it to reveal the answer to each question, creating a magical Harry Potter-style experience.

## 🎯 Function: `createWaxSeal(callback)`

### Purpose
Creates a button element styled like a red wax seal that, when clicked, triggers animations and executes a callback function to reveal hidden content.

### Parameters
- **`callback`** (Function): A function that will be executed after the seal breaks. This callback typically reveals the answer text.

### Returns
- **`HTMLButtonElement`**: A fully styled and configured button element ready to be inserted into the DOM.

## 🎨 Visual Design

### Wax Seal Appearance
- **Shape**: Perfect circle (120px × 120px)
- **Color**: Deep red gradient (#8B0000 → #660000 → #4a0000)
- **Effects**: 
  - Multiple box shadows for 3D depth
  - Inset shadows for realistic texture
  - Gold "H" letter (Hogwarts emblem)
  - "Click to Reveal" text below in gold

### Hover State
- Scales up to 105%
- Enhanced shadow effects
- Smooth transition

## ⚡ Animation Sequence

### 1. **Seal Break Animation** (0.6s)
```css
@keyframes sealBreak {
  0%   → opacity: 1, scale: 1, rotate: 0deg
  50%  → opacity: 0.6, scale: 1.1, rotate: 5deg
  100% → opacity: 0, scale: 1.5, rotate: 10deg
}
```
- Fades out
- Scales up to 150%
- Rotates slightly for "breaking" effect

### 2. **Answer Reveal Animation** (0.8s)
```css
@keyframes blurIn {
  0%   → opacity: 0, blur: 10px, translateY: 10px
  100% → opacity: 1, blur: 0, translateY: 0
}
```
- Blurs in from transparent
- Slides up slightly
- Smooth reveal effect

## 🔧 Implementation

### Basic Usage
```javascript
// Create a wax seal with a callback
const seal = createWaxSeal(() => {
  // This code runs after the seal breaks
  console.log('Seal broken! Revealing answer...');
  showAnswer();
});

// Add seal to the page
document.getElementById('answer-container').appendChild(seal);
```

### In Question Slides
```javascript
// Inside renderSlide() for question type slides
const seal = createWaxSeal(() => {
  // Create answer paragraph
  const answerParagraph = document.createElement('p');
  answerParagraph.className = 'answer-reveal';
  answerParagraph.textContent = slide.answer;
  
  // Add to container
  answerContainer.appendChild(answerParagraph);
  
  // Trigger reveal animation
  setTimeout(() => {
    answerParagraph.classList.add('revealed');
  }, 10);
});

answerContainer.appendChild(seal);
```

## 📋 Event Flow

```
User clicks seal
      ↓
Check if already breaking (prevent double-click)
      ↓
Add 'breaking' class
      ↓
Trigger CSS animation (fade out + scale up)
      ↓
Wait 600ms (animation duration)
      ↓
Execute callback function
      ↓
Reveal answer with blur-in effect
      ↓
Remove seal from DOM
```

## 🎭 CSS Classes

### `.wax-seal-button`
- Base styling for the seal
- Red gradient background
- Circular shape with shadows
- Hover and active states

### `.wax-seal-button.breaking`
- Applied when seal is clicked
- Triggers the break animation
- Disables pointer events during animation

### `.seal-inner`
- Container for seal content
- Centers icon and text

### `.seal-icon`
- SVG icon (Hogwarts "H")
- 80px × 80px
- Drop shadow effect

### `.seal-text`
- "Click to Reveal" label
- Gold color matching theme
- Positioned below seal

### `.answer-reveal`
- Initial state (hidden, blurred)
- Applied to answer text

### `.answer-reveal.revealed`
- Triggers blur-in animation
- Applied after seal breaks

## 🌟 Features

✅ **Prevents Multiple Clicks**: Once breaking, can't be clicked again
✅ **Smooth Animations**: CSS-based for performance
✅ **Accessible**: Includes aria-label for screen readers
✅ **Themed**: Matches Harry Potter aesthetic
✅ **Responsive**: Works on all screen sizes
✅ **Callback Pattern**: Flexible for different reveal mechanisms

## 🎨 Customization Options

### Change Seal Color
```css
.wax-seal-button {
  background: radial-gradient(circle, #1a472a 0%, #0e3820 50%, #072814 100%);
  /* Slytherin green */
}
```

### Adjust Animation Speed
```css
.wax-seal-button.breaking {
  animation: sealBreak 0.4s ease-out forwards; /* Faster */
}
```

### Modify Size
```css
.wax-seal-button {
  width: 150px;
  height: 150px;
}
```

## 🐛 Error Handling

The function includes safeguards:
- Checks if callback is a function before executing
- Prevents multiple clicks with class checking
- Uses setTimeout to ensure animation completes

## 💡 Use Cases

1. **Quiz Answers**: Hide answers behind seals
2. **Spoiler Content**: Protect plot reveals
3. **Achievements**: Unlock content progressively
4. **Easter Eggs**: Hidden messages or features
5. **Gated Content**: Require interaction to view

## 🔗 Related Files

- **script-simple.js** - Function implementation
- **styles.css** - Animation and styling
- **index.html** - DOM structure

## 📝 Example: Full Implementation

```javascript
// Create answer container
const container = document.createElement('div');
container.id = 'answer-area';
container.className = 'relative p-6 bg-black/80';

// Create seal
const seal = createWaxSeal(() => {
  // Create answer element
  const answer = document.createElement('p');
  answer.className = 'text-xl answer-reveal';
  answer.textContent = 'The answer is revealed!';
  
  // Add to container
  container.appendChild(answer);
  
  // Trigger animation
  requestAnimationFrame(() => {
    answer.classList.add('revealed');
  });
});

// Add seal to container
container.appendChild(seal);

// Add to page
document.body.appendChild(container);
```

## 🎓 Learning Points

- **Callback Functions**: Flexible pattern for deferred execution
- **DOM Manipulation**: Creating and styling elements programmatically
- **CSS Animations**: Keyframe-based effects
- **Event Handling**: Click events with state management
- **SVG Integration**: Scalable icon graphics
- **User Experience**: Interactive feedback and engagement

---

**This feature transforms a simple Q&A into an engaging, magical experience! ✨🔮**
