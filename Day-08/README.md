# Day 8: Exploring 3D Shapes with Three.js and HTML Integration

## Overview
On Day 8 of my Three.js learning journey, I created a project that integrates 3D shapes with HTML. This project showcases three unique 3D objects, dynamic animations, parallax effects, and smooth interactions based on scrolling and mouse movements.

---

## Features
1. **Scene Setup:**
   - Added a Three.js scene and a perspective camera for a 3D environment.

2. **3D Objects:**
   - Created three distinct meshes:
     - Torus
     - Cone
     - Torus Knot
   - Positioned these objects strategically for a dynamic visual layout.

3. **Material and Texture:**
   - Used a `MeshToonMaterial` with a gradient texture for a unique stylized look.

4. **Lighting:**
   - Included a directional light for proper illumination and enhanced visuals.

5. **Scroll Animation:**
   - Integrated GSAP to animate object rotations when scrolling between sections.

6. **Parallax Effect:**
   - Added parallax motion to the camera group based on mouse movements for an interactive experience.

7. **Responsive Design:**
   - Made the scene responsive to window resizing.

---

## Implementation
### Key Concepts
- **Scene and Camera Setup:**
  - A `PerspectiveCamera` for realistic 3D rendering.
- **Dynamic Textures:**
  - Utilized a gradient texture mapped to a toon material.
- **User Interaction:**
  - Scrolling triggers animations.
  - Mouse movement creates parallax effects.

### Code Snippets
#### 1. Creating and Positioning Meshes
```javascript
const mesh1 = new THREE.Mesh(
  new THREE.TorusGeometry(1, 0.4, 16, 60),
  material
);
const mesh2 = new THREE.Mesh(
  new THREE.ConeGeometry(1, 2, 32),
  material
);
const mesh3 = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
  material
);

mesh1.position.set(2, 0, 0);
mesh2.position.set(-2, -4, 0);
mesh3.position.set(2, -8, 0);
scene.add(mesh1, mesh2, mesh3);
```

#### 2. Scroll Event Animation
```javascript
window.addEventListener("scroll", () => {
  const newSection = Math.round(scrollY / window.innerHeight);
  if (currentSection !== newSection) {
    currentSection = newSection;
    gsap.to(sectionMeshes[currentSection].rotation, {
      duration: 1.5,
      ease: "power2.inOut",
      x: '+=6',
      y: '+=3',
      z: '+=1.5',
    });
  }
});
```

#### 3. Mousemove Event for Parallax
```javascript
window.addEventListener("mousemove", (e) => {
  cursor.x = (e.clientX / window.innerWidth) - 0.5;
  cursor.y = (e.clientY / window.innerHeight) - 0.5;
});
```

---

## Tools and Libraries
- **Three.js:** Core 3D library.
- **GSAP:** Smooth animations for scroll and object interactions.

---

## How to Run
1. Clone the repository:
   ```bash
   git clone <repo-link>
   ```
2. Navigate to the project directory:
   ```bash
   cd day8-threejs
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start a local server to view the project.
   ```bash
   npm start
   ```

---

## Screenshots
### Full Project View
*Include screenshots or visuals of the 3D scene in action.*

---

## Future Improvements
1. Add interactivity to 3D objects (e.g., click events).
2. Implement advanced materials and post-processing effects.
3. Extend the project with additional shapes or dynamic textures.

---

## Links
- **Three.js Documentation:** [https://threejs.org/docs/](https://threejs.org/docs/)

---

Feel free to explore, contribute, and provide feedback!
