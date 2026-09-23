import { Car } from "../objects/Car";
import { Road } from "../objects/Road";
import { City } from "../objects/City";
import { InputSystem } from "./InputSystem";

export class AnimationSystem {
  private car: Car;

  private road: Road;

  private city: City;

  private input: InputSystem;

  constructor(
    car: Car,
    road: Road,
    city: City,
    input: InputSystem
  ) {
    this.car = car;

    this.road = road;

    this.city = city;

    this.input = input;
  }

  public update(
    delta: number,
    elapsedTime: number
  ) {
    // ------------------------------------
    // INPUT
    // ------------------------------------

    const accelerate =
      this.input.isPressed(
        "KeyW"
      ) ||
      this.input.isPressed(
        "ArrowUp"
      );

    const brake =
      this.input.isPressed(
        "KeyS"
      ) ||
      this.input.isPressed(
        "ArrowDown"
      );

    let steering = 0;

    if (
      this.input.isPressed(
        "KeyA"
      ) ||
      this.input.isPressed(
        "ArrowLeft"
      )
    ) {
      steering = -1;
    }

    if (
      this.input.isPressed(
        "KeyD"
      ) ||
      this.input.isPressed(
        "ArrowRight"
      )
    ) {
      steering = 1;
    }

    // ------------------------------------
    // CAR
    // ------------------------------------

    this.car.update(
      delta,
      accelerate,
      brake,
      steering
    );

    // ------------------------------------
    // ROAD
    // ------------------------------------

    this.road.update(
      this.car.group.position.z
    );

    this.road.updateShader(
      elapsedTime
    );

    // ------------------------------------
    // CITY
    // ------------------------------------

    this.city.update(
      this.car.group.position.z
    );
  }
}