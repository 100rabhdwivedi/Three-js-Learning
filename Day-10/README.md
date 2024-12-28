# JBL 3D Website with Three.js & GSAP

This project demonstrates a 3D website created using **Three.js** and **GSAP**, showcasing a JBL speaker model with scroll-triggered animations. The animations include rotation, position changes, and background color transitions as the user scrolls through the page.

## Features

- **3D Model Integration:** A JBL speaker modeled in GLTF format, loaded and rendered using Three.js.
- **Scroll-Triggered Animations:** Smooth animations triggered by scrolling, powered by GSAP and ScrollTrigger.
- **Responsive Design:** Adjusts camera position based on screen size (mobile, tablet, desktop).
- **Dynamic Background and Text Color Changes:** Enhances visual appeal during scrolling.

## Technologies Used

- **Three.js**: For rendering the 3D speaker model and creating the 3D scene.
- **GSAP (GreenSock Animation Platform)**: For smooth animations and scroll-triggered effects.
- **GLTFLoader**: To load the 3D model of the speaker.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:
   ```bash
   cd Day-10
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## File Structure

```
.
├── assist
│   └── font
│       ├── NeueMontreal-Bold.otf
│       ├── NeueMontreal-Medium.otf
│       └── NeueMontreal-Regular.otf
├── node_modules       # Project dependencies
├── public
│   ├── 3dModel
│   │   └── speaker.glb  # GLTF model of the JBL speaker
│   └── video
│       └── video.mp4    # Video file (e.g., for showcasing the project)
├── src
│   ├── main.js         # Main Three.js and GSAP code
│   ├── style.css       # Custom styles for the project
├── index.html          # HTML file
├── package.json        # Node.js dependencies
├── package-lock.json   # Locked dependencies
└── README.md           # Project documentation
```

## Key Code Highlights

### Responsive Camera Position
The camera's position adjusts based on the screen width for optimal viewing experience:
```javascript
function calculateCameraZ(width) {
  if (width < 768) {
    return 10;
  } else if (width < 1024) {
    return 6;
  } else {
    return 5;
  }
}
```

### Scroll-Triggered Animations
Using GSAP ScrollTrigger to animate the speaker's position and rotation:
```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.section-2',
    start: 'top 90%',
    end: 'top 10%',
    scrub: 2,
  },
});

tl.to(model.position, {
  x: -0.5,
  z: -1.5,
  ease: 'power4.out',
}).to(model.rotation, {
  y: 1,
  x: 0.5,
  ease: 'power4.out',
}, '<');
```



## License

This project is licensed under the MIT License. Feel free to use and modify it for your own projects!
