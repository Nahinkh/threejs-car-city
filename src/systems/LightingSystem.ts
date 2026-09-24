import * as THREE from "three";

import { Car } from "../objects/Car";

export class LightingSystem {
  private scene: THREE.Scene;

  private car: Car;

  private leftHeadlight!: THREE.SpotLight;

  private rightHeadlight!: THREE.SpotLight;

  private leftTarget!: THREE.Object3D;

  private rightTarget!: THREE.Object3D;

  private movingLight!: THREE.PointLight;

  constructor(scene: THREE.Scene, car: Car) {
    this.scene = scene;

    this.car = car;

    this.createHeadlights();

    this.createMovingLight();
  }

  // ----------------------------------------
  // Car Headlights
  // ----------------------------------------

  private createHeadlights() {
    this.leftHeadlight = new THREE.SpotLight(
      0xffffff,
      15,
      35,
      Math.PI / 7,
      0.5,
      1,
    );

    this.rightHeadlight = new THREE.SpotLight(
      0xffffff,
      15,
      35,
      Math.PI / 7,
      0.5,
      1,
    );
    const headlightMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    const headlightGeometry = new THREE.SphereGeometry(0.15, 16, 16);

    const leftBulb = new THREE.Mesh(headlightGeometry, headlightMaterial);

    const rightBulb = new THREE.Mesh(headlightGeometry, headlightMaterial);

    leftBulb.position.set(-1.1, 0.35, -2.5);

    rightBulb.position.set(1.1, 0.35, -2.5);

    this.car.group.add(leftBulb);

    this.car.group.add(rightBulb);

    // Headlight positions
    this.leftHeadlight.position.set(-1.1, 0.35, -2.5);

    this.rightHeadlight.position.set(1.1, 0.35, -2.5);

    // Headlights follow the car
    this.car.group.add(this.leftHeadlight);

    this.car.group.add(this.rightHeadlight);

    // ------------------------------------
    // Light targets
    // ------------------------------------

    this.leftTarget = new THREE.Object3D();

    this.rightTarget = new THREE.Object3D();

    this.leftTarget.position.set(-1.1, 0, -20);

    this.rightTarget.position.set(1.1, 0, -20);

    this.car.group.add(this.leftTarget);

    this.car.group.add(this.rightTarget);

    this.leftHeadlight.target = this.leftTarget;

    this.rightHeadlight.target = this.rightTarget;

    // Shadows
    this.leftHeadlight.castShadow = true;

    this.rightHeadlight.castShadow = true;

    this.leftHeadlight.shadow.mapSize.width = 512;

    this.leftHeadlight.shadow.mapSize.height = 512;

    this.rightHeadlight.shadow.mapSize.width = 512;

    this.rightHeadlight.shadow.mapSize.height = 512;
  }

  // ----------------------------------------
  // Moving Light
  // ----------------------------------------

  private createMovingLight() {
    this.movingLight = new THREE.PointLight(0xffd27d, 8, 25);

    this.movingLight.position.set(0, 6, -10);

    this.movingLight.castShadow = true;

    this.scene.add(this.movingLight);
  }

  // ----------------------------------------
  // Animation
  // ----------------------------------------

  public update(elapsedTime: number) {
    // ------------------------------------
    // Moving light around the road
    // ------------------------------------

    const carPosition = this.car.group.position;

    this.movingLight.position.x =
      carPosition.x + Math.sin(elapsedTime * 1.5) * 7;

    this.movingLight.position.y = 5 + Math.sin(elapsedTime * 2) * 1;

    this.movingLight.position.z = carPosition.z - 8 + Math.cos(elapsedTime) * 6;

    // ------------------------------------
    // Dynamic intensity
    // ------------------------------------

    this.movingLight.intensity = 6 + Math.sin(elapsedTime * 3) * 2;
  }
}
