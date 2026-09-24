export class DrivingPage {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public render() {
    this.container.innerHTML = `
      <main class="driving-page">

        <div
          id="three-container"
          class="three-container"
        ></div>

        <div class="driving-overlay">

          <!-- Header -->

          <div class="driving-header">

            <button
              id="back-home"
              class="driving-button"
            >
              ← Home
            </button>

            <div class="driving-brand">
              3D CITY DRIVE
            </div>

            <button
              id="restart-driving"
              class="driving-button"
            >
              Restart ↻
            </button>

          </div>

          <!-- Controls -->

          <div class="controls-panel">

            <div class="control-row">
              <span class="key">W</span>
              <span class="key">↑</span>
              <span>Accelerate</span>
            </div>

            <div class="control-row">
              <span class="key">S</span>
              <span class="key">↓</span>
              <span>Brake / Reverse</span>
            </div>

            <div class="control-row">
              <span class="key">A</span>
              <span class="key">D</span>
              <span>Steer</span>
            </div>

            <div class="control-row">
              <span class="mouse-icon">⌁</span>
              <span>Mouse</span>
              <span>Camera</span>
            </div>

          </div>

        </div>

      </main>
    `;

    this.setupNavigation();
  }

  private setupNavigation() {
    const backButton =
      this.container.querySelector<HTMLButtonElement>(
        "#back-home",
      );

    const restartButton =
      this.container.querySelector<HTMLButtonElement>(
        "#restart-driving",
      );

    // Back to Home
    backButton?.addEventListener(
      "click",
      () => {
        window.location.hash = "";
      },
    );

    // Restart Driving
    restartButton?.addEventListener(
      "click",
      () => {
        window.location.reload();
      },
    );
  }

  public getCanvasContainer(): HTMLElement {
    return this.container.querySelector(
      "#three-container",
    ) as HTMLElement;
  }
}