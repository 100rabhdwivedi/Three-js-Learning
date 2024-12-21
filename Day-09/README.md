# Day 9: 3D HTML Website with Three.js

## Overview
On Day 9 of my Three.js learning journey, I created a fully interactive 3D HTML website featuring:

- Multiple planets with textures.
- Smooth animations and transitions using GSAP.
- Responsive design with a navbar and scroll interactions.
- Tailwind CSS integration for styling.

This project demonstrates my growing expertise in combining Three.js with modern web technologies to create visually stunning and functional 3D websites.

---

## Features

1. **3D Models and Textures:**
   - Rendered 3D planets using sphere geometry.
   - Applied realistic textures like Earth, Venus, Csilla, and Volcanic using `THREE.TextureLoader`.

2. **Smooth Animations:**
   - GSAP was used for smooth transitions during scrolling.
   - Planets scale, rotate, and reposition dynamically based on the current scroll section.

3. **Responsive Design:**
   - Adjusts camera position for different screen sizes to ensure optimal viewing.

4. **HTML & Tailwind CSS Integration:**
   - A styled navbar and content sections for an engaging user experience.

---

## Code Snippet

### JavaScript (Three.js + GSAP)
```javascript
// Responsive
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (window.innerWidth < 768) {
        camera.position.z = 12;
    } else if (window.innerWidth < 1200) {
        camera.position.z = 10;
    } else {
        camera.position.z = 9;
    }
});

// Scroll Animation
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const newSection = Math.round(scrollY / window.innerHeight);
    // GSAP animations based on sections
});

// Animation Loop
function animate() {
    planets.forEach(planet => {
        planet.rotation.y += 0.02;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();
```

### HTML (with Tailwind CSS)
```html
<nav class="fixed nav top-0 navbar h-20 w-full flex items-center justify-between px-6 md:px-12 lg:px-16 text-white bg-opacity-50 z-10">
  <div class="font-semibold text-lg md:text-xl">space<span class="text-[#219ebc]">edu</span></div>
  <div class="hidden md:flex gap-4 lg:gap-12 capitalize">
    <h2>planets</h2>
    <h2>trailer</h2>
    <h2>tickets</h2>
    <h2>blog</h2>
    <button class="px-6 py-2 bg-white rounded-full text-black">Enroll</button>
  </div>
</nav>
```

---

## Challenges Faced
- Optimizing animations for smooth transitions.
- Ensuring proper responsiveness for different screen sizes.
- Combining Three.js with a styled HTML structure.

---

## Technologies Used

- **Three.js:** For rendering 3D objects.
- **GSAP:** For animations and transitions.
- **Tailwind CSS:** For responsive and modern styling.
- **JavaScript (ES6):** For interactive logic.

---

## Future Enhancements
- Add more interactive sections with advanced Three.js features.
- Implement dynamic lighting for enhanced realism.
- Optimize performance for low-end devices.

---

## Demo
- **Live Website:** [planet-live-three.vercel.app];

---

## How to Run Locally
1. Clone the repository:
   ```bash
   git clone <repository-link>
   ```
2. Navigate to the project directory:
   ```bash
   cd project-directory
   ```
3. Install dependencies (if any):
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000`.

---

## Conclusion
This project marked an exciting step in my journey with Three.js. It highlights my ability to merge creativity and technical skills to build interactive 3D web experiences. Stay tuned for more updates!
