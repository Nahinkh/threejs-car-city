import * as THREE from "three";

import { Car } from "../objects/Car";

export class CameraSystem {
  private camera: THREE.PerspectiveCamera;

  private car: Car;

  private offset = new THREE.Vector3(0, 5, 10);

  constructor(camera: THREE.PerspectiveCamera, car: Car) {
    this.camera = camera;

    this.car = car;
  }

  public update() {
    const targetPosition = this.car.group.position.clone().add(this.offset);

    this.camera.position.lerp(targetPosition, 0.08);

    const lookTarget = this.car.group.position.clone();

    lookTarget.y += 1;

    this.camera.lookAt(lookTarget);
  }
}
