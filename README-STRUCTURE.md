# Harry Potter Presentation App - Code Structure

## Overview
This document explains the structure of the presentation app as requested, with a clean separation of data and logic.

## 📊 Slides Array Structure

The `slides` array contains objects with the following structure:

### Cover Slide
```javascript
{
  id: 1,
  type: 'cover',
  title: 'Harry Potter, Gender and Sexuality',
  content: 'Fairy Tales, Film, and Gender'
}
```

### Question Slides (4 total)
```javascript
{
  id: 2,
  type: 'question',
  question: 'How does Lin's idea of the princess as a "reward" apply to Cinderella?',
  answer: 'Lin's argument fits especially well with Grimm Cinderella and Disney's 1950 version...'
}
```

### End Slide
```javascript
{
  id: 6,
  type: 'end',
  title: 'Mischief Managed',
  content: 'I solemnly swear I am up to no good'
}
```

## 🎯 Core Functions

### renderSlide(index)
This function is responsible for rendering slides based on the current index.

**What it does:**
1. **Clears the current slide container** - removes existing content
2. **Gets the slide data** from the slides array at the given index
3. **Generates HTML based on slide type:**
   - `type: 'cover'` → Full-screen title and subtitle
   - `type: 'question'` → Question/answer layout with styled cards
   - `type: 'end'` → Conclusion screen with special styling
4. **Inserts the HTML** into the slide container
5. **Updates progress indicators** (page number and progress bar)
6. **Updates button states** (disables prev on first, next on last)

**Example usage:**
```javascript
renderSlide(0); // Renders the first slide
renderSlide(2); // Renders the third slide
```

## 🎮 Event Listeners

### Navigation Buttons

**Previous Button:**
```javascript
prevBtn.addEventListener('click', () => {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    renderSlide(currentSlideIndex);
  }
});
```

**Next Button:**
```javascript
nextBtn.addEventListener('click', () => {
  if (currentSlideIndex < slides.length - 1) {
    currentSlideIndex++;
    renderSlide(currentSlideIndex);
  }
});
```

### Keyboard Navigation

```javascript
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === ' ') {
    // Go to next slide
    currentSlideIndex++;
    renderSlide(currentSlideIndex);
  } else if (event.key === 'ArrowLeft') {
    // Go to previous slide
    currentSlideIndex--;
    renderSlide(currentSlideIndex);
  }
});
```

## 📦 State Management

```javascript
let currentSlideIndex = 0; // Tracks which slide is currently displayed
```

This variable is updated by the event listeners and used by `renderSlide()` to determine which content to display.

## 🔄 Flow Diagram

```
User clicks Next/Prev
       ↓
currentSlideIndex updated (+1 or -1)
       ↓
renderSlide(currentSlideIndex) called
       ↓
1. Clear container
2. Get slide data from array
3. Generate HTML based on type
4. Insert HTML
5. Update progress
6. Update buttons
```

## 🎨 Slide Types Breakdown

### 1. Cover Slide
- Large centered title
- Subtitle with gradient text
- Decorative divider line
- Full viewport centered layout

### 2. Question Slide
- Question header with icon
- Answer in styled card
- Left-aligned text for readability
- Green accent border for answers

### 3. End Slide
- Large italic title
- Subtitle above
- Horizontal divider
- Celebratory styling

## 🚀 Initialization

```javascript
document.addEventListener('DOMContentLoaded', () => {
  renderSlide(currentSlideIndex); // Render first slide
  lucide.createIcons(); // Initialize icons
});
```

## 📝 Adding New Slides

To add a new slide, simply add an object to the `slides` array:

```javascript
{
  id: 7,
  type: 'question',
  question: 'Your question here?',
  answer: 'Your answer here.'
}
```

The `renderSlide()` function will automatically handle it!

## 🎯 Key Features

- ✅ **Clean data structure** - All content in one array
- ✅ **Type-based rendering** - Different layouts for different slide types
- ✅ **State management** - Single source of truth for current slide
- ✅ **Event-driven** - Buttons and keyboard update state and trigger renders
- ✅ **Progress tracking** - Automatic updates to indicators
- ✅ **Responsive** - Works on mobile and desktop
- ✅ **Accessible** - Keyboard navigation support

## 🔧 Files

- **script-simple.js** - Clean implementation with requested structure
- **script.js** - Original implementation (more features)
- **index.html** - HTML structure with #app, #bg-layer, #magic-canvas
- **styles.css** - CSS variables and styling
