uniform float uTime;

varying vec2 vUv;

void main() {

    vUv = uv;

    vec3 transformed =
        position;

    // Very subtle movement
    transformed.y +=
        sin(
            position.x * 2.0 +
            uTime
        ) * 0.01;

    gl_Position =
        projectionMatrix *
        modelViewMatrix *
        vec4(
            transformed,
            1.0
        );
}