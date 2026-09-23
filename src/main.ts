import * as THREE from "three";

import "./style.css";

import { Car } from "./objects/Car";
import { Road } from "./objects/Road";
import { City } from "./objects/City";

import { InputSystem } from "./systems/InputSystem";
import { AnimationSystem } from "./systems/AnimationSystem";
import { CameraSystem } from "./systems/CameraSystem";

// -----------------------------------------
// Scene
// -----------------------------------------

const scene =
  new THREE.Scene();

scene.background =
  new THREE.Color(
    0x101827
  );

scene.fog =
  new THREE.Fog(
    0x101827,
    40,
    180
  );

// -----------------------------------------
// Camera
// -----------------------------------------

const camera =
  new THREE.PerspectiveCamera(
    60,
    window.innerWidth /
      window.innerHeight,
    0.1,
    1000
  );

camera.position.set(
  0,
  5,
  12
);

// -----------------------------------------
// Renderer
// -----------------------------------------

const renderer =
  new THREE.WebGLRenderer({
    antialias: true,
  });

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(
  Math.min(
    window.devicePixelRatio,
    2
  )
);

renderer.shadowMap.enabled =
  true;

renderer.shadowMap.type =
  THREE.PCFSoftShadowMap;

document.body.appendChild(
  renderer.domElement
);

// -----------------------------------------
// Lighting
// -----------------------------------------

const ambientLight =
  new THREE.AmbientLight(
    0xffffff,
    0.45
  );

scene.add(
  ambientLight
);

const sun =
  new THREE.DirectionalLight(
    0xffffff,
    2
  );

sun.position.set(
  20,
  30,
  10
);

sun.castShadow = true;

scene.add(sun);

// -----------------------------------------
// Road
// -----------------------------------------

const road =
  new Road();

scene.add(
  road.group
);

// -----------------------------------------
// Car
// -----------------------------------------

const car =
  new Car();

car.group.position.set(
  0,
  0.8,
  5
);

scene.add(
  car.group
);

// -----------------------------------------
// City
// -----------------------------------------

const city =
  new City();

scene.add(
  city.group
);

// -----------------------------------------
// Input
// -----------------------------------------

const input =
  new InputSystem();

// -----------------------------------------
// Animation
// -----------------------------------------

const animation =
  new AnimationSystem(
    car,
    road,
    city,
    input
  );

// -----------------------------------------
// Camera
// -----------------------------------------

const cameraSystem =
  new CameraSystem(
    camera,
    car
  );

// -----------------------------------------
// Clock
// -----------------------------------------

const clock =
  new THREE.Clock();

// -----------------------------------------
// Animation Loop
// -----------------------------------------

function animate() {
  requestAnimationFrame(
    animate
  );

  const delta =
    clock.getDelta();

  const elapsedTime =
    clock.elapsedTime;

  animation.update(
    delta,  
    elapsedTime
  );

  cameraSystem.update();

  renderer.render(
    scene,
    camera
  );
}

animate();

// -----------------------------------------
// Resize
// -----------------------------------------

window.addEventListener(
  "resize",
  () => {
    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );
  }
);  