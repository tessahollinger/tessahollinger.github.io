var fov = 5, near = 0.1, far = 10000;

var container, renderer, camera, scene;

var layers = 10;

var group = [];

function init() {
    var directionalLight;

    container = document.createElement('div');
    document.body.appendChild(container);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

/*
    container.addEventListener("click", function(){
        window.top.location.href='/projects/featured/';
    });

*/

       
    camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, near, far );
    camera.position.z = 3000;

    controls = new THREE.OrbitControls( camera, renderer.domElement );

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    renderer.setClearColor(0x111111, 1.0);

    scene = new THREE.Scene();
    scene.add(camera);

    var distance = 100;    

    for (var o = 0; o < layers; o++) {

        var geometry = new THREE.Geometry();


        for (var i = 0; i < 1000; i++) {
            distance = 105 + (o * Math.random()/6);

            var vertex = new THREE.Vector3();

            var theta = THREE.Math.randFloatSpread(360);
            var phi = THREE.Math.randFloatSpread(360);


            vertex.y = distance * Math.sin(theta) * Math.cos(phi);
            vertex.x = distance * Math.sin(theta) * Math.sin(phi);
            vertex.z = distance * Math.cos(theta);

            if(o>8){

                vertex.y = Math.random()*400 - 200;
                vertex.x = Math.random()*400 - 200;
                vertex.z = Math.random()*400 - 200;
            } else if(o > 6){
                vertex.y += Math.random()*10 - 5;
                vertex.x += Math.random()*10 - 5;
                vertex.z += Math.random()*10 - 5;
            }
            geometry.vertices.push(vertex);
            var gray = Math.random();
            geometry.colors.push(new THREE.Color(gray,gray,gray));
        }
        var particles = new THREE.PointCloud(geometry, new THREE.PointCloudMaterial({
            size:8,
            vertexColors: THREE.VertexColors
        }));
        particles.boundingSphere = 50;
        particles.rotation.x = 1;
        particles.rotation.y = 0.5;
        scene.add(particles);
        group.push(particles);

    }

    console.log('geometry',geometry);
}

function onWindowResize() {

    if(window.innerWidth < window.innerHeight){
     camera.position.z = 3000 / (window.innerWidth/window.innerHeight);
 } else {
     camera.position.z = 3000;
 }

 camera.projectionMatrix.makePerspective( fov, window.innerWidth / window.innerHeight, near, far );

 renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', onWindowResize, false );

function animate() {

    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    for (var o = 0; o < layers; o++) {
        group[o].rotation.z += o/600 + 0.001;
    }

}

init();
animate();