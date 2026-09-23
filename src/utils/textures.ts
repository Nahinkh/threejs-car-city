import * as THREE from "three";

const loader = new THREE.TextureLoader();

export const roadTexture = loader.load("textures/road/asphalt.jpg");
roadTexture.wrapS =
  THREE.RepeatWrapping;

roadTexture.wrapT =
  THREE.RepeatWrapping;

roadTexture.repeat.set(
  1,
  30
);
export const carTextures = loader.load("textures/car/car.png");
export const buildingTexture = loader.load("/textures/building/building.jpg");
export const tireTexture = loader.load("/textures/wheel/tire.jpg");
