# Three.js Project - Rotating Wireframe Cube with Vite

## Overview

This project demonstrates how to set up a basic **Three.js** environment using **Vite** to create a 3D scene with a rotating cube rendered with a visible **wireframe**. This is a great starting point for exploring **Three.js** and building interactive 3D graphics in the browser.

**Technologies Used:**
- **Three.js**: JavaScript library for creating 3D graphics.
- **Vite**: A fast development build tool for modern web projects.
- **Tailwind**: A CSS Library.


---

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [How the Scene Works](#how-the-scene-works)
- [Camera Setup and Arguments](#camera-setup-and-arguments)
- [Geometry, Material, Mesh](#geometry-material-mesh)
- [Renderer](#renderer)
- [Rotating the Cube](#rotating-the-cube)
- [Project Structure](#project-structure)
- [License](#license)
- [Next Steps](#next-steps)

---

## Introduction

This project demonstrates a basic **3D scene** setup using **Three.js** and **Vite**. The main component is a **rotating cube** rendered with a **wireframe material**, which highlights the cube’s edges. This setup showcases how to:
- Initialize a **Three.js scene**.
- Set up a **camera** to view the scene.
- Create a **mesh** object and animate it in 3D space.

---

## Getting Started

To set up this project locally, follow these steps:


1. **Clone the repository**:

2. **Install dependencies:**:

Install the required npm packages:
npm install 

2. **Run the development server:**:

Start the local development server with Vite:
npm run dev

## How the Scene Works

In Three.js, the scene is the container for all 3D objects, lights, cameras, and other elements. The camera defines what part of the scene is visible to the user. The renderer is responsible for rendering the scene to a canvas in the browser.

---

## Camera Setup and Arguments

The PerspectiveCamera used in this project simulates a real-world camera. It defines the field of view (FOV), aspect ratio, and the near and far planes (depth range).

Key arguments:
- FOV (Field of View): The angle of view of the camera (75 degrees in this project).
- Aspect Ratio: The ratio of the canvas width to height (based on the browser window size).
- Near Plane: The closest point to the camera that will be rendered (0.1 in this case).
- Far Plane: The farthest point that will be rendered (1000 in this case).

---

## Geometry, Material, Mesh

- Geometry defines the shape of the object. In this project, we use BoxGeometry to create a cube.
- Material determines how the object appears. We use MeshBasicMaterial with wireframe: true to display the cube as a wireframe.
- Mesh is the combination of geometry and material that is added to the scene. The cube is created by combining a box shape with the wireframe material.

---

## Renderer

The WebGLRenderer is used to render the scene and camera view into a canvas. The renderer is updated on every frame to create the animation effect.

The requestAnimationFrame() function is used to create an animation loop that continuously updates the scene.

---

## Rotating the Cube
The cube is rotated around the  Y axe on each frame, giving the effect of a continuously rotating object. This is done by incrementally updating the  rotation.y properties of the cube.

---
## Project Structure

Here is the basic structure of the project:


my-threejs-project/
├── index.html       # Basic HTML file to load the app
├── package.json     # Project dependencies (like Three.js)
├──main.js           # Main JavaScript file with Three.js code
└── node_modules/    # npm packages installed


- index.html: Contains the HTML markup and includes the JavaScript file that sets up the Three.js scene.
- main.js: The JavaScript file where Three.js code resides (e.g., setting up the scene, camera, mesh, and animation).
- package.json: Defines the dependencies and scripts for the project.

---
## License
This project is licensed under the MIT License. See the LICENSE file for more information.

---

## Next Steps
- Experiment with other geometries, such as spheres, cylinders, or toruses.
- Add lighting to create dynamic effects (e.g., AmbientLight, DirectionalLight).
- Add camera controls for user interaction, such as using the mouse to rotate the camera view.
- Try creating more complex animations using keyframes or tweening.
