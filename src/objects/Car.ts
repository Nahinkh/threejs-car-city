import * as THREE from "three";

import {
  carTextures,
  tireTexture,
} from "../utils/textures";

export class Car {
  public group: THREE.Group;

  public wheels: THREE.Mesh[] = [];

  public speed = 0;

  public steering = 0;

  private readonly maxSpeed = 0.45;

  private readonly reverseSpeed = 0.18;

  private readonly acceleration = 0.45;

  private readonly braking = 1.2;

  private readonly friction = 0.35;

  constructor() {
    this.group = new THREE.Group();

    this.createBody();
    this.createCabin();
    this.createWheels();

    this.group.position.y = 0.8;
  }

  // ----------------------------------------
  // Car Body
  // ----------------------------------------

  private createBody() {
    const geometry =
      new THREE.BoxGeometry(
        3.4,
        0.8,
        5
      );

    const material =
      new THREE.MeshStandardMaterial({
        map: carTextures,
        roughness: 0.35,
        metalness: 0.4,
      });

    const body =
      new THREE.Mesh(
        geometry,
        material
      );

    body.castShadow = true;

    this.group.add(body);
  }

  // ----------------------------------------
  // Cabin
  // ----------------------------------------

  private createCabin() {
    const geometry =
      new THREE.BoxGeometry(
        2.5,
        1,
        2.5
      );

    const material =
      new THREE.MeshStandardMaterial({
        color: 0x111827,
        roughness: 0.15,
        metalness: 0.2,
      });

    const cabin =
      new THREE.Mesh(
        geometry,
        material
      );

    cabin.position.set(
      0,
      0.8,
      -0.2
    );

    cabin.castShadow = true;

    this.group.add(cabin);
  }

  // ----------------------------------------
  // Wheels
  // ----------------------------------------

  private createWheels() {
    const wheelGeometry =
      new THREE.CylinderGeometry(
        0.65,
        0.65,
        0.45,
        32
      );

    const wheelMaterial =
      new THREE.MeshStandardMaterial({
        map: tireTexture,
        roughness: 0.9,
      });

    const positions = [
      [-1.75, 0, 1.6],
      [1.75, 0, 1.6],
      [-1.75, 0, -1.6],
      [1.75, 0, -1.6],
    ];

    positions.forEach(
      ([x, y, z]) => {
        const wheel =
          new THREE.Mesh(
            wheelGeometry,
            wheelMaterial
          );

        wheel.rotation.z =
          Math.PI / 2;

        wheel.position.set(
          x,
          y,
          z
        );

        wheel.castShadow = true;

        this.group.add(wheel);

        this.wheels.push(wheel);
      }
    );
  }

  // ----------------------------------------
  // Car Movement
  // ----------------------------------------

  public update(
    delta: number,
    accelerate: boolean,
    brake: boolean,
    steering: number
  ) {
    // ------------------------------------
    // ACCELERATION
    // ------------------------------------

    if (accelerate) {
      this.speed +=
        this.acceleration * delta;

      this.speed = Math.min(
        this.speed,
        this.maxSpeed
      );
    }

    // ------------------------------------
    // BRAKE / REVERSE
    // ------------------------------------

    if (brake) {
      this.speed -=
        this.braking * delta;

      this.speed = Math.max(
        this.speed,
        -this.reverseSpeed
      );
    }

    // ------------------------------------
    // NATURAL FRICTION
    // ------------------------------------

    if (
      !accelerate &&
      !brake
    ) {
      if (this.speed > 0) {
        this.speed -=
          this.friction * delta;

        if (this.speed < 0) {
          this.speed = 0;
        }
      }

      if (this.speed < 0) {
        this.speed +=
          this.friction * delta;

        if (this.speed > 0) {
          this.speed = 0;
        }
      }
    }

    // ------------------------------------
    // STEERING
    // ------------------------------------

    this.steering =
      THREE.MathUtils.lerp(
        this.steering,
        steering,
        0.1
      );

    // Only allow steering when moving
    if (
      Math.abs(this.speed) > 0.001
    ) {
      this.group.position.x +=
        this.steering *
        Math.abs(this.speed) *
        0.35;

      this.group.rotation.y =
        -this.steering * 0.15;
    }

    // Keep car inside road
    this.group.position.x =
      THREE.MathUtils.clamp(
        this.group.position.x,
        -5.5,
        5.5
      );

    // ------------------------------------
    // MOVE CAR
    // ------------------------------------

    this.group.position.z -=
      this.speed;

    // ------------------------------------
    // WHEEL ROTATION
    // ------------------------------------

    this.rotateWheels(
      this.speed
    );

    // ------------------------------------
    // FRONT WHEEL STEERING
    // ------------------------------------

    this.steerFrontWheels(
      this.steering
    );
  }

  // ----------------------------------------
  // Wheel Rotation
  // ----------------------------------------

  private rotateWheels(
    speed: number
  ) {
    this.wheels.forEach(
      (wheel) => {
        wheel.rotation.x -=
          speed;
      }
    );
  }

  // ----------------------------------------
  // Front Wheel Steering
  // ----------------------------------------

  private steerFrontWheels(
    steering: number
  ) {
    if (
      this.wheels.length < 4
    ) {
      return;
    }

    this.wheels[0].rotation.y =
      steering * 0.4;

    this.wheels[1].rotation.y =
      steering * 0.4;
  }
}