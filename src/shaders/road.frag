uniform sampler2D uTexture;

uniform float uTime;

varying vec2 vUv;

void main() {

    vec2 uv = vUv;

    // Slowly move texture
    uv.y +=
        uTime * 0.03;

    vec4 textureColor =
        texture2D(
            uTexture,
            uv
        );

    // Slight brightness adjustment
    vec3 finalColor =
        textureColor.rgb *
        0.85;

    gl_FragColor =
        vec4(
            finalColor,
            1.0
        );
}