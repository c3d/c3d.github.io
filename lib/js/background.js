// ****************************************************************************
//  background.js                                                  Tao project 
// ****************************************************************************
// 
//   File Description:
// 
//     Using a shader as background for a web page
// 
// 
// 
// 
// 
// 
// 
// 
// ****************************************************************************
//  (C) 2015 Christophe de Dinechin <christophe@taodyne.com>
//  (C) 2015 Taodyne SAS
// ****************************************************************************

var container;
var camera, scene, renderer;
var uniforms, material, mesh;
var renderTexture, renderMaterial, renderMesh, renderScene, renderCamera;
var renderWidth = 64, renderHeight = 64;
var maxRenderWidth = 4096, maxRenderHeight = 4096;

var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var emptyVertex = "";
var emptyFragment = "";


function backgroundShader (element, indexh, indexv)
// ----------------------------------------------------------------------------
//   Draw a shader in the background
// ----------------------------------------------------------------------------
{
    if (element) {
        var name = element.backgroundShader;
        if (name) {
            name = processShaderOptions(element, name);
            if (name != "") {
                if (!element.vertexShader) {
                    $.get("http://www.taodyne.com/lib/shaders/" + name + ".vs", function(data,status) {
                        if (status != "success") { data = emptyVertex; }
                        element.vertexShader = data;
                        updateBackgroundShader(element, indexh, indexv);
                    }, "text");
                }
                
                if (!element.fragmentShader) {
                    $.get("http://ww.taodyne.com/lib/shaders/" + name + ".fs", function(data,status) {
                        if (status != "success") { data = emptyFragment; }
                        element.fragmentShader = data;
                        updateBackgroundShader(element, indexh, indexv);
                    }, "text");
                }
            }
            
            updateBackgroundShader(element, indexh, indexv);
        }
    }
    uniforms.offset.value.x = indexh;
    uniforms.offset.value.y = indexv;
}


function processShaderOptions(element, name)
// ----------------------------------------------------------------------------
//   Deal with shader options
// ----------------------------------------------------------------------------
{
    var resized = false;
    if (maxRenderWidth != 4096 || maxRenderHeight != 4096) {
        maxRenderWidth = maxRenderHeight = 4096;
        resized = true;
    }
    var parms = name.split(" ");
    if (parms.length > 1) {
        parms.forEach(function (item) {
            var assign = item.split("=");
            if (assign.length == 2) {
                var id = assign[0], val = assign[1];
                switch(id) {
                case "size":
                    maxRenderWidth = maxRenderHeight = val;
                    resized = true;
                    break;
                case "width":
                    maxRenderWidth = val;
                    resized = true;
                    break;
                case "height":
                    maxRenderHeight = val;
                    resized = true;
                    break;
                case "texture":
                    element.backgroundTexture = val;
                    break;
                }
            } else {
                name = item;
            }
        });
    }
    if(resized)
        onWindowResize();
    return name;
}


function updateBackgroundShader(element, indexh, indexv)
// ----------------------------------------------------------------------------
//    Update the shader for a given element
// ----------------------------------------------------------------------------
{
    if (element.vertexShader && element.fragmentShader) {
        if (material.vertexShader != element.vertexShader || material.fragmentShader != element.fragmentShader) {
            material.vertexShader = element.vertexShader || emptyVertex;
            material.fragmentShader = element.fragmentShader || emptyFragment;
            material.needsUpdate = true;
        }
    }

    if (material.backgroundTexture != element.backgroundTexture) {
        material.backgroundTexture = element.backgroundTexture;
        if (material.backgroundTexture) {
            uniforms.texture.value = material.backgroundTexture && THREE.ImageUtils.loadTexture(material.backgroundTexture);
            uniforms.texture.value.wrapS = THREE.RepeatWrapping;
            uniforms.texture.value.wrapT = THREE.RepeatWrapping;
        } else {
            uniforms.texture.value = null;
        }
    }
}


init();
animate();

function init()
// ----------------------------------------------------------------------------
//    Find elements specifying the shaders to use
// ----------------------------------------------------------------------------
{
    
    container = document.getElementById('bgshader');
    emptyVertex = document.getElementById('defaultVertexShader').textContent;
    emptyFragment = document.getElementById('defaultFragmentShader').textContent;
    
    camera = new THREE.Camera();
    camera.position.z = 1;
    
    uniforms = {
        time            : { type: "f", value: 1.0 },
        resolution      : { type: "v2", value: new THREE.Vector2() },
        mouse           : { type: "v2", value: new THREE.Vector2() },
        offset          : { type: "v2", value: new THREE.Vector2() },
        texture         : { type: "t", value: null }
    };

    material = new THREE.ShaderMaterial({
        uniforms: uniforms,
	vertexShader: emptyVertex,
	fragmentShader: emptyFragment
    });
    
    renderer = new THREE.WebGLRenderer();
    container.appendChild(renderer.domElement);

    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);

    // Attach the mousemove event handler.
    window.addEventListener('mousemove', ev_mouse, false);
    window.addEventListener('mousedown', ev_mouse, false);
    window.addEventListener('mouseup',   ev_mouse, false);

    window.addEventListener('touchstart', ev_touch, false);
    window.addEventListener('touchmove', ev_touch, false);
    window.addEventListener('touchend', ev_touch, false);
}


function onWindowResize(event)
// ----------------------------------------------------------------------------
//   When resizing, we need to update rendering buffer size
// ----------------------------------------------------------------------------
{
    if (maxRenderWidth > maxRenderHeight*window.innerWidth/window.innerHeight)
        maxRenderWidth = maxRenderHeight*window.innerWidth/window.innerHeight;
    if (maxRenderHeight > maxRenderWidth*window.innerHeight/window.innerWidth)
        maxRenderHeight = maxRenderWidth*window.innerHeight/window.innerWidth;

    renderWidth = Math.min(window.innerWidth, maxRenderWidth);
    renderHeight = Math.min(window.innerHeight, maxRenderHeight);

    uniforms.resolution.value.x = renderWidth;
    uniforms.resolution.value.y = renderHeight;

    renderTexture = new THREE.WebGLRenderTarget(
        renderWidth, renderHeight,
        {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBFormat
        });
    renderMaterial = new THREE.MeshBasicMaterial(
        {
            color: 0xffffff,
            map: renderTexture
        });
    renderMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    renderScene = new THREE.Scene();
    renderScene.add(renderMesh);

    renderCamera = new THREE.Camera();
    renderCamera.position.z = 1;

    mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), renderMaterial);
  
    scene = new THREE.Scene();
    scene.add(mesh);


    renderTexture.width = renderWidth;
    renderTexture.height = renderHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function animate()
// ----------------------------------------------------------------------------
//    Animation callback, to continuously update shader parms
// ----------------------------------------------------------------------------
{
    requestAnimationFrame(animate);
    render();
    uniforms.time.value += 0.05;
}


function render()
// ----------------------------------------------------------------------------
//    Render the background scene
// ----------------------------------------------------------------------------
{
    renderer.clear();
    renderer.render(renderScene, renderCamera, renderTexture, true);
    renderer.render(scene, camera);
}


function ev_mouse (ev)
// ----------------------------------------------------------------------------
//   Mouse move event handler
// ----------------------------------------------------------------------------
{
    uniforms.mouse.value.x = ev.clientX / window.innerWidth;
    uniforms.mouse.value.y = 1.0 - ev.clientY / window.innerHeight;
}


function ev_touch(ev)
// ----------------------------------------------------------------------------
//    Touch event - Not supported yet
// ----------------------------------------------------------------------------
{
    console.log(ev);
}

