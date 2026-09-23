import * as THREE from "three";

import roadVertexShader from "../shaders/road.vert?raw";
import roadFragmentShader from "../shaders/road.frag?raw";

import { roadTexture } from "../utils/textures";

export class Road {
  public group: THREE.Group;

  public shaderMaterial!: THREE.ShaderMaterial;

  private readonly segmentLength = 100;

  private readonly segmentCount = 6;

  private segments: THREE.Group[] = [];

  constructor() {
    this.group =
      new THREE.Group();

    this.createSegments();
  }

  // ----------------------------------------
  // Create Road Segments
  // ----------------------------------------

  private createSegments() {
    for (
      let i = 0;
      i < this.segmentCount;
      i++
    ) {
      const segment =
        this.createSegment();

      segment.position.z =
        -i *
        this.segmentLength;

      this.group.add(
        segment
      );

      this.segments.push(
        segment
      );
    }
  }

  // ----------------------------------------
  // Create Single Segment
  // ----------------------------------------

  private createSegment() {
    const segment =
      new THREE.Group();

    // Road
    const roadGeometry =
      new THREE.PlaneGeometry(
        16,
        this.segmentLength
      );

    this.shaderMaterial =
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: {
            value: 0,
          },

          uTexture: {
            value: roadTexture,
          },
        },

        vertexShader:
          roadVertexShader,

        fragmentShader:
          roadFragmentShader,
      });

    const road =
      new THREE.Mesh(
        roadGeometry,
        this.shaderMaterial
      );

    road.rotation.x =
      -Math.PI / 2;

    road.receiveShadow = true;

    segment.add(road);

    // Lane markings
    this.createLaneMarkers(
      segment
    );

    // Sidewalks
    this.createSidewalks(
      segment
    );

    return segment;
  }

  // ----------------------------------------
  // Lane Markers
  // ----------------------------------------

  private createLaneMarkers(
    segment: THREE.Group
  ) {
    const material =
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.7,
      });

    for (
      let z = -45;
      z < 50;
      z += 12
    ) {
      const geometry =
        new THREE.PlaneGeometry(
          0.3,
          6
        );

      const marker =
        new THREE.Mesh(
          geometry,
          material
        );

      marker.rotation.x =
        -Math.PI / 2;

      marker.position.set(
        0,
        0.025,
        z
      );

      segment.add(marker);
    }
  }

  // ----------------------------------------
  // Sidewalks
  // ----------------------------------------

  private createSidewalks(
    segment: THREE.Group
  ) {
    const material =
      new THREE.MeshStandardMaterial({
        color: 0x555b63,
        roughness: 0.9,
      });

    const geometry =
      new THREE.BoxGeometry(
        2,
        0.3,
        this.segmentLength
      );

    const left =
      new THREE.Mesh(
        geometry,
        material
      );

    left.position.set(
      -9,
      0.15,
      0
    );

    left.receiveShadow = true;

    segment.add(left);

    const right =
      new THREE.Mesh(
        geometry,
        material
      );

    right.position.set(
      9,
      0.15,
      0
    );

    right.receiveShadow = true;

    segment.add(right);
  }

  // ----------------------------------------
  // Infinite Road
  // ----------------------------------------

  public update(
    carZ: number
  ) {
    const recycleDistance =
      this.segmentLength *
      2;

    this.segments.forEach(
      (segment) => {

        const distance =
          segment.position.z -
          carZ;

        if (
          distance >
          recycleDistance
        ) {
          let furthestZ =
            Infinity;

          this.segments.forEach(
            (other) => {
              furthestZ =
                Math.min(
                  furthestZ,
                  other.position.z
                );
            }
          );

          segment.position.z =
            furthestZ -
            this.segmentLength;
        }
      }
    );
  }

  // ----------------------------------------
  // Shader Update
  // ----------------------------------------

  public updateShader(
    elapsedTime: number
  ) {
    this.shaderMaterial
      .uniforms
      .uTime
      .value =
      elapsedTime;
  }
}