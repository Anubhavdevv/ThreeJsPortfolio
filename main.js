import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bgr'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

//Creating a object of three.js
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
    color: 0xff6347  //wireframe use as lightning the object 
});
const torus = new THREE.Mesh(geometry, material);

//Adding the scene to the object
scene.add(torus);
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff
    });
    const star = new THREE.Mesh(geometry, material);
    const[x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

//Creating array and call function for each array value 
Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

//2 Dimesional Pixel and map to 3D geometry Texture map
const jeffTexture = new THREE.TextureLoader().load('azure.png');

//Creating Mesh which contain box geomery
const jeff = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({
        map: jeffTexture
    })
);
scene.add(jeff);

//Multiple map function to animate the object
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const moon = new THREE.Mesh(
   new THREE.SphereGeometry(3, 32, 32),
   new THREE.MeshStandardMaterial({
      map: moonTexture,
      normalMap: normalTexture,
   })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;

//Fucntion to move camera
function movecamera(){
    const s = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.75;
    moon.rotation.z += 0.05;

    jeff.rotation.y += 0.01;
    jeff.rotation.z += 0.01;
  
    camera.position.z = s * -0.01;
    camera.position.x = s * -0.0002;
    camera.rotation.y = s * -0.0002;
}
document.body.onscroll = movecamera;
movecamera();







//Declaring Animation function to animate the object
function animate(){    //Recursive funtion to animate the object loop
    requestAnimationFrame(animate);
    
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
    moon.rotation.x += 0.005;
    renderer.render(scene, camera);
}
animate();