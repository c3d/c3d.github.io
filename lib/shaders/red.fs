uniform float time;
uniform vec2 resolution;
uniform vec2 offset;
uniform vec2 mouse;

uniform sampler2D texture;
varying vec2 textureCoords;


void main()
{
    float dist = length(textureCoords);
    float angle = dist * 0.05 * (offset.x + 1.0) * sin(time * (offset.y+1.0));
    float sa = sin(angle), ca = cos(angle);
    vec2 tc = textureCoords + mouse * 0.9;
    vec2 mtc = vec2(ca * tc.x + sa * tc.y, ca * tc.y - sa * tc.x);
    gl_FragColor = vec4(textureCoords.x, textureCoords.y, 1, 1) +  texture2D(texture, mtc);
}
