varying vec2 tc;
void main()
{
    gl_Position = vec4( position, 1.0 );
    tc = position.xy;
}
      
