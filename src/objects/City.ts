import * as THREE from "three";

import {
  buildingTexture,
} from "../utils/textures";

export class City {
  public group: THREE.Group;

  private buildings: THREE.Mesh[] =
    [];

  private readonly spacing = 18;

  private readonly buildingCount =
    30;

  constructor() {
    this.group =
      new THREE.Group();

    this.createBuildings(-16);
    this.createBuildings(16);
  }

  private createBuildings(
    side: number
  ) {
    for (
      let i = 0;
      i < this.buildingCount;
      i++
    ) {
      const width =
        4 +
        Math.random() * 4;

      const depth =
        4 +
        Math.random() * 5;

      const height =
        5 +
        Math.random() * 18;

      const geometry =
        new THREE.BoxGeometry(
          width,
          height,
          depth
        );

      const material =
        new THREE.MeshStandardMaterial({
          map: buildingTexture,
          roughness: 0.8,
        });

      const building =
        new THREE.Mesh(
          geometry,
          material
        );

      building.position.set(
        side +
          (Math.random() * 3 - 1.5),
        height / 2,
        -i * this.spacing
      );

      building.castShadow = true;

      building.receiveShadow = true;

      this.group.add(
        building
      );

      this.buildings.push(
        building
      );
    }
  }

  // ----------------------------------------
  // Infinite City
  // ----------------------------------------

  public update(
    carZ: number
  ) {
    this.buildings.forEach(
      (building) => {

        const distance =
          building.position.z -
          carZ;

        if (
          distance >
          40
        ) {
          let furthestZ =
            Infinity;

          this.buildings.forEach(
            (other) => {
              furthestZ =
                Math.min(
                  furthestZ,
                  other.position.z
                );
            }
          );

          building.position.z =
            furthestZ -
            this.spacing *
              2;
        }
      }
    );
  }
}