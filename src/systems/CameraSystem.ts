import * as THREE from "three";

import { Car } from "../objects/Car";

export class CameraSystem {
  private camera: THREE.PerspectiveCamera;

  private car: Car;

  // Camera distance from car
  private readonly distance = 12;

  // Camera height
  private readonly height = 5;

  // Mouse position
  private mouseX = 0;

  private mouseY = 0;

  // Smoothed camera rotation
  private currentAngleX = 0;

  private currentAngleY = 0;

  // Maximum camera movement
  private readonly maxHorizontalAngle =
    Math.PI / 5;

  private readonly maxVerticalAngle =
    Math.PI / 12;

  constructor(
    camera: THREE.PerspectiveCamera,
    car: Car
  ) {
    this.camera = camera;

    this.car = car;

    this.setupMouseInteraction();
  }

  // ----------------------------------------
  // Mouse Interaction
  // ----------------------------------------

  private setupMouseInteraction() {
    window.addEventListener(
      "mousemove",
      (event) => {
        this.mouseX =
          (event.clientX /
            window.innerWidth) *
            2 -
          1;

        this.mouseY =
          (event.clientY /
            window.innerHeight) *
            2 -
          1;
      }
    );
  }

  // ----------------------------------------
  // Camera Update
  // ----------------------------------------

  public update() {
    // Convert mouse position into target angles

    const targetAngleX =
      this.mouseX *
      this.maxHorizontalAngle;

    const targetAngleY =
      this.mouseY *
      this.maxVerticalAngle;

    // Smooth camera movement

    this.currentAngleX =
      THREE.MathUtils.lerp(
        this.currentAngleX,
        targetAngleX,
        0.06
      );

    this.currentAngleY =
      THREE.MathUtils.lerp(
        this.currentAngleY,
        targetAngleY,
        0.06
      );

    // ------------------------------------
    // Base camera position
    // ------------------------------------

    const carPosition =
      this.car.group.position;

    const cameraPosition =
      new THREE.Vector3(
        carPosition.x,
        carPosition.y +
          this.height,
        carPosition.z +
          this.distance
      );

    // ------------------------------------
    // Horizontal rotation
    // ------------------------------------

    cameraPosition.x +=
      Math.sin(
        this.currentAngleX
      ) *
      this.distance;

    cameraPosition.z +=
      Math.cos(
        this.currentAngleX
      ) *
      this.distance;

    // ------------------------------------
    // Vertical rotation
    // ------------------------------------

    cameraPosition.y +=
      this.currentAngleY *
      4;

    // ------------------------------------
    // Smooth camera position
    // ------------------------------------

    this.camera.position.lerp(
      cameraPosition,
      0.08
    );

    // ------------------------------------
    // Look at car
    // ------------------------------------

    const lookTarget =
      this.car.group.position.clone();

    lookTarget.y += 1;

    // Mouse vertical movement slightly
    // changes the look target

    lookTarget.y -=
      this.currentAngleY * 2;

    this.camera.lookAt(
      lookTarget
    );
  }
}