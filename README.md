# 3D City Car Driving Animation

An interactive **3D city driving environment** built with **Three.js, TypeScript, WebGL and GLSL** for the CSE 444 — Computer Graphics & Animation course.

The project demonstrates practical computer graphics concepts including 3D modeling, perspective projection, texture mapping, lighting, shadows, custom shaders, animation, keyboard interaction and mouse-controlled camera movement.

---

## Live Demo

🚀 **[View Live Demo](https://threejs-car-city.vercel.app/#)**

---

## Project Preview


```text
Home Page
    ↓
Start Driving
    ↓
Interactive 3D City
    ├── Car
    ├── Road
    ├── City Buildings
    ├── Lighting
    ├── Shadows
    ├── Custom Shader
    ├── Keyboard Controls
    └── Mouse Camera
```

---

## Features

### 3D Environment

- Procedural 3D car
- Road with lane markings and sidewalks
- Procedurally generated city buildings
- Perspective camera
- Scene fog for depth

### Texture Mapping

Textures are used for:

- Road / asphalt
- Car body
- Buildings
- Tires

The road texture uses `RepeatWrapping` to create a continuous asphalt surface without stretching one image across the entire road.

### Keyboard Driving

| Key | Action |
|---|---|
| `W` / `↑` | Accelerate |
| `S` / `↓` | Brake / Reverse |
| `A` / `←` | Steer Left |
| `D` / `→` | Steer Right |

The car starts at speed `0` and remains stationary until the user provides acceleration input.

### Mouse Camera

Move the mouse to change the camera's horizontal and vertical viewing angle.

The camera smoothly follows the car while allowing the user to inspect the surrounding city.

### Animation

The application uses:

- `requestAnimationFrame`
- `THREE.Clock`
- Frame delta time
- Elapsed time
- Wheel rotation
- Steering animation
- Road shader animation
- Dynamic lighting animation
- Road segment recycling
- City building recycling

### Lighting

The project uses:

- `AmbientLight`
- `DirectionalLight`
- `SpotLight` for headlights
- `PointLight` for dynamic illumination
- Shadow mapping

### Custom GLSL Shaders

The road uses a custom `ShaderMaterial` with:

- Vertex shader
- Fragment shader
- `uTime` uniform
- `uTexture` sampler

The fragment shader shifts the road texture over time to create an animated road effect.

---

## Home Page

The project starts with a dedicated landing page containing:

- Project title
- Project description
- Main project features
- `Start Driving` button
- Three project contributors
- Contributor image
- Student name
- Department
- University name

The driving experience is opened through the `#drive` route.

---

## Driving Page

The driving page provides a full-screen Three.js experience.

The interface contains:

- `← Home` button
- `3D CITY DRIVE` project label
- `Restart ↻` button
- Keyboard control HUD
- Mouse camera information
- Full-screen 3D scene

### Navigation

```text
/#
 ↓
Home Page

/#drive
 ↓
Driving Page
```

`Back to Home` returns to the project landing page.

`Restart` reloads the driving experience and restores the initial scene state.

---

## Project Architecture

```text
threejs-car-city/
│
├── public/
│   ├── textures/
│   │   ├── road/
│   │   ├── car/
│   │   ├── building/
│   │   └── wheel/
│   │
│   ├── contributors/
│   │   ├── student-1.jpg
│   │   ├── student-2.jpg
│   │   └── student-3.jpg
│   │
│   └── models/
│
├── src/
│   ├── objects/
│   │   ├── Car.ts
│   │   ├── Road.ts
│   │   └── City.ts
│   │
│   ├── shaders/
│   │   ├── road.vert
│   │   └── road.frag
│   │
│   ├── systems/
│   │   ├── AnimationSystem.ts
│   │   ├── InputSystem.ts
│   │   ├── CameraSystem.ts
│   │   └── LightingSystem.ts
│   │
│   ├── utils/
│   │   └── textures.ts
│   │
│   ├── pages/
│   │   ├── HomePage.ts
│   │   └── DrivingPage.ts
│   │
│   ├── main.ts
│   └── style.css
│
├── index.html
├── package.json
├── tsconfig.json
└── README.md
```

---

## Architecture Overview

### `Car.ts`

Responsible for the vehicle.

It manages:

- Car body
- Cabin
- Four wheels
- Acceleration
- Braking
- Reverse
- Steering
- Lateral movement
- Wheel rotation
- Speed and friction

---

### `Road.ts`

Responsible for the road environment.

It manages:

- Road segments
- Lane markings
- Sidewalks
- Road textures
- Segment recycling
- Shader updates

Instead of creating an infinitely long road, a fixed number of road segments are repositioned as the car moves.

---

### `City.ts`

Responsible for the city environment.

It generates buildings with different:

- Widths
- Heights
- Depths
- Positions

Buildings are recycled when they move sufficiently far behind the car.

---

### `InputSystem.ts`

Handles keyboard input using browser keyboard events.

It maintains a collection of currently pressed keys.

This keeps keyboard event handling separate from the vehicle movement logic.

---

### `AnimationSystem.ts`

Connects the different systems during each frame.

The main update sequence is:

```text
Keyboard Input
      ↓
AnimationSystem
      ↓
Car Update
      ↓
Road Update
      ↓
City Update
      ↓
Shader Update
```

---

### `CameraSystem.ts`

Handles the follow camera and mouse interaction.

It:

1. Reads mouse position.
2. Converts it into normalized coordinates.
3. Calculates target camera angles.
4. Smoothly interpolates camera movement.
5. Keeps the car as the camera's focus.

---

### `LightingSystem.ts`

Handles the dynamic vehicle lighting.

It provides:

- Left headlight
- Right headlight
- Visible headlight bulbs
- Dynamic point light
- Animated light intensity/position

---

### `textures.ts`

Centralizes texture loading.

Example:

```ts
const loader = new THREE.TextureLoader();

export const roadTexture =
  loader.load("/textures/road/asphalt.jpg");
```

Centralizing texture loading keeps asset configuration separate from object construction.

---

## Custom Shader Pipeline

The road uses a custom GLSL shader.

### Vertex Shader

```text
Vertex Position
      ↓
Time-based displacement
      ↓
Projection Matrix
      ↓
Model View Matrix
      ↓
Rendered Vertex
```

The vertex shader also passes UV coordinates to the fragment shader.

### Fragment Shader

```text
UV Coordinates
      ↓
Time-based UV offset
      ↓
Sample road texture
      ↓
Adjust color
      ↓
Final Fragment Color
```

### Shader Uniforms

| Uniform | Purpose |
|---|---|
| `uTime` | Provides elapsed animation time |
| `uTexture` | Provides the road texture |

The TypeScript animation loop updates `uTime` every frame.

---

## Rendering Pipeline

The main rendering process follows this pattern:

```text
Create Scene
    ↓
Create Camera
    ↓
Create Renderer
    ↓
Add Objects
    ↓
Add Lights
    ↓
Read User Input
    ↓
Update Animation
    ↓
Update Camera
    ↓
Update Dynamic Lights
    ↓
Render Scene
    ↓
Repeat with requestAnimationFrame
```

---

## Technologies

| Technology | Purpose |
|---|---|
| [Three.js](https://threejs.org/) | 3D rendering and scene management |
| TypeScript | Application and graphics logic |
| Vite | Development server and build tool |
| WebGL | Browser GPU rendering |
| GLSL | Custom shaders |
| HTML5 | Application structure |
| CSS3 | UI and project interface |
| Git | Version control |
| GitHub | Repository hosting |
| Vercel | Web deployment |

---

## Installation

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Enter the project directory

```bash
cd threejs-car-city
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL shown by Vite, normally:

```text
http://localhost:5173
```

---

## Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Controls

### Vehicle

```text
W / ↑       Accelerate

S / ↓       Brake / Reverse

A / ←       Steer Left

D / →       Steer Right
```

### Camera

```text
Mouse       Look / Camera Control
```

### Interface

```text
Start Driving   → Open 3D driving scene

← Home          → Return to project home

Restart ↻       → Reset the driving experience
```

---

## Computer Graphics Concepts Demonstrated

This project demonstrates the following CSE 444 concepts:

### 1. Perspective Projection

A `THREE.PerspectiveCamera` creates realistic depth.

### 2. 3D Modeling

Primitive geometries are combined into meaningful 3D objects.

### 3. Texture Mapping

Images are mapped onto 3D surfaces.

### 4. Lighting

Different light types illuminate the scene and create depth.

### 5. Shadow Mapping

The renderer and directional light are configured to produce shadows.

### 6. Animation

The application continuously updates object state through an animation loop.

### 7. User Interaction

Keyboard and mouse input directly affect the simulation.

### 8. Custom Shaders

GLSL is used to implement a custom animated road material.

### 9. Procedural Environment

Buildings are generated programmatically with varying dimensions.

### 10. Object Recycling

Road and city objects are reused to create an extended driving environment efficiently.

---

## Project Feature Status

| Feature | Status |
|---|---|
| Perspective Projection | ✅ Implemented |
| 3D Car | ✅ Implemented |
| 3D Road | ✅ Implemented |
| 3D City | ✅ Implemented |
| Texture Mapping | ✅ Implemented |
| Ambient Lighting | ✅ Implemented |
| Directional Lighting | ✅ Implemented |
| Shadow Mapping | ✅ Implemented |
| Car Headlights | ✅ Implemented |
| Dynamic Lighting | ✅ Implemented |
| Keyboard Interaction | ✅ Implemented |
| Mouse Interaction | ✅ Implemented |
| Car Animation | ✅ Implemented |
| Wheel Animation | ✅ Implemented |
| Road Shader | ✅ Implemented |
| Endless Road Recycling | ✅ Implemented |
| City Recycling | ✅ Implemented |
| Home Page | ✅ Implemented |
| Back to Home | ✅ Implemented |
| Restart Driving | ✅ Implemented |

---


Add project screenshots here.

### Home Page

```text
[ Add Screenshot ]
```

### 3D Driving Scene

```text
[ Add Screenshot ]
```

### Keyboard Controls

```text
[ Add Screenshot ]
```

### Mouse Camera Interaction

```text
[ Add Screenshot ]
```

### Lighting / Headlights

```text
[ Add Screenshot ]
```

---

## Academic Project

**Course:** CSE 444 — Computer Graphics & Animation  
**Project:** 3D City Car Driving Animation  
**Institution:** Southeast University

---

## Learning Outcomes

Through this project, the team gained practical experience in:

- Real-time 3D graphics
- Three.js scene management
- WebGL rendering
- Perspective projection
- Procedural modeling
- Texture mapping
- Lighting and shadows
- GLSL shader programming
- Real-time animation
- Keyboard and mouse interaction
- Modular TypeScript architecture
- Efficient object recycling
- Browser-based graphics application development
- Git/GitHub project management
- Web deployment

---

## License

This project was created as an academic project for educational purposes.
