uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;
uniform sampler2D texture;

vec3 COLOR1 = vec3(0.9, 0.4, 0.3);
vec3 COLOR2 = vec3(0.3, 0.4, 0.8);
float BLOCK_WIDTH = 0.01;

void main(void)
{
    vec2 xy = gl_FragCoord.xy;
    vec2 uv = xy / resolution;

    // To create the BG pattern
    vec3 final_color = vec3(1.0);
    vec3 bg_color = vec3(0.0);
    vec3 wave_color = vec3(0.0);

#if 1
    for (float a = 1.0; a < 4.0; a += 1.0)
    {
        vec2 center = 1.1*sin(vec2(12348.1, 23489.3) * a + vec2(0.15, 0.13) * time) + vec2(1.0);
        vec3 color = sin(vec3(12391238123.1, 123123123.3, 123.123)*a)*0.1+0.9;
        bg_color += 1.5 * color * vec3(exp(-15.3 * (1.9+0.3 * sin(129312312.31*a)) * length(uv - center)));
    }
#endif

    // To create the waves
    float wave_width = 0.01;
    uv  = -1.0 + 2.0 * uv;
    uv.y -= mouse.y;
    vec3 baseColor = COLOR1 * (1.0 + 0.3 * sin (0.111*time)) + COLOR2 * (1.0 + 0.3 * sin (0.117*time));
    for(float i = 0.0; i < 5.0; i++) {

        uv.y += (0.13 * sin((1.5+1.5*mouse.x+0.1*i)*uv.x + i/7.0 + time * (0.17 + 0.00117 * i * i)));
        wave_width = abs(1.0 / (150.0 * uv.y));
        wave_color += 0.7*wave_width * baseColor;
    }

    final_color = bg_color + wave_color;

    gl_FragColor = vec4(final_color, 1.0);
}
