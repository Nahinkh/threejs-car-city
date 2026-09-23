export class InputSystem {
  private keys: Set<string> = new Set();

  constructor() {
    window.addEventListener("keydown", (event) => {
      this.keys.add(event.code);
    });

    window.addEventListener("keyup", (event) => {
      this.keys.delete(event.code);
    });
  }

  public isPressed(code: string): boolean {
    return this.keys.has(code);
  }
}