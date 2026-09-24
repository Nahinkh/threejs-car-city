export class HomePage {
  private container: HTMLElement;
  private onStart: () => void;

  constructor(container: HTMLElement, onStart: () => void) {
    this.container = container;
    this.onStart = onStart;

    this.render();
  }

  private render() {
    this.container.innerHTML = `
      <main class="home-page">

        <div class="home-background"></div>

        <section class="home-content">

          <div class="home-badge">
            CSE 444 · COMPUTER GRAPHICS & ANIMATION
          </div>

          <h1>
            3D City
            <span>Car Driving</span>
          </h1>

          <p class="home-description">
            An interactive 3D driving environment built with
            Three.js, demonstrating computer graphics and
            animation techniques through a city driving scene.
          </p>

          <button
            id="start-driving"
            class="start-button"
          >
            <span>Start Driving</span>
            <span class="start-arrow">→</span>
          </button>

          <!-- Project Features -->

          <div class="project-features">

            <div class="feature-card">
              <div class="feature-number">01</div>

              <div>
                <h3>3D Environment</h3>
                <p>
                  Car, road and procedural city
                </p>
              </div>
            </div>

            <div class="feature-card">
              <div class="feature-number">02</div>

              <div>
                <h3>Graphics</h3>
                <p>
                  Textures, lighting & shaders
                </p>
              </div>
            </div>

            <div class="feature-card">
              <div class="feature-number">03</div>

              <div>
                <h3>Interaction</h3>
                <p>
                  Keyboard & mouse controls
                </p>
              </div>
            </div>

          </div>

          <!-- Contributors -->

          <section class="contributors-section">

            <div class="section-label">
              PROJECT CONTRIBUTED BY
            </div>

            <h2>
              Our Team
            </h2>

            <div class="contributors">

              <div class="contributor-card">

                <div class="contributor-image">
                    <img
                    src="/contributors/Md Abdul Halim Khan.jpg"
                    alt="Student 1"
                    />
                </div>

                <h3>
                    MD ABDUL HALIM KAHN
                </h3>

            <p class="contributor-department">
                Department of Computer Science & Engineering
            </p>

            <p class="contributor-university">
                Southeast University
            </p>

        </div>

              <div class="contributor-card">

  <div class="contributor-image">
    <img
      src="/contributors/Md Sangram.png"
      alt="Student 1"
    />
  </div>

  <h3>
    Md Sangram
  </h3>

  <p class="contributor-department">
    Department of Computer Science & Engineering
  </p>

  <p class="contributor-university">
    Southeast University
  </p>

</div>

              <div class="contributor-card">

  <div class="contributor-image">
    <img
      src="/contributors/Md Nur Hossan Zisan.png"
      alt="Student 1"
    />
  </div>

  <h3>
    Md Nur Hossan Zisan
  </h3>

  <p class="contributor-department">
    Department of Computer Science & Engineering
  </p>

  <p class="contributor-university">
    Southeast University
  </p>

</div>

            </div>

          </section>

        </section>

        <div class="home-footer">
          <span>THREE.JS</span>
          <span>WEBGL</span>
          <span>INTERACTIVE 3D</span>
        </div>

      </main>
    `;

    const startButton =
      this.container.querySelector<HTMLButtonElement>("#start-driving");

    startButton?.addEventListener("click", () => {
      this.onStart();
    });
  }
}
