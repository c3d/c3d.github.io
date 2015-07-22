varying vec2 textureCoords;
void main()
{
    textureCoords = uv;
    gl_Position = vec4( position, 1.0 );
}
      
