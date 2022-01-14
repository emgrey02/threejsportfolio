import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//*create scene
const scene = new THREE.Scene();

//*add camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);

//*set up renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);
camera.position.z = 20;

//*here's some light
const pointLight = new THREE.PointLight(0xffaaaa);
pointLight.position.set(80, 80, 80);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//*add ring object to scene
const geometry = new THREE.TorusGeometry(7, 1, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xb78ed2,
  wireframe: true,
});
const ring = new THREE.Mesh(geometry, material);
scene.add(ring);

//*helpers
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);
renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate);

  ring.rotation.x += 0.003;
  ring.rotation.y += 0.004;
  ring.rotation.z += 0.006;

  controls.update();

  renderer.render(scene, camera);
}

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

//*add stars
Array(400).fill().forEach(addStar);

//*add scroll animation
let scrollNum = 0;
function moveCamera(e) {
  console.log(e.target.scrollTop);
  //*scroll up
  if (scrollNum - e.target.scrollTop >= 0) {
    thing.rotation.x -= 0.05;
    thing.rotation.y -= 0.075;
    thing.rotation.z -= 0.05;

    camera.position.z -= 0.5;
    camera.position.x -= 1;
    //*scroll down
  } else {
    thing.rotation.x += 0.05;
    thing.rotation.y += 0.075;
    thing.rotation.z += 0.05;

    camera.position.z += 1;
    camera.position.x += 1.3;
  }
  emma.rotation.y += 0.1;
  scrollNum = e.target.scrollTop;
}
let body = document.querySelector('body');
body.addEventListener('scroll', (e) => moveCamera(e), false);

//*avatar plane
const emmaTexture = new THREE.TextureLoader().load('images/emmaa.jpg');
const emma = new THREE.Mesh(
  new THREE.PlaneGeometry(8, 8),
  new THREE.MeshBasicMaterial({ map: emmaTexture, side: THREE.DoubleSide })
);
scene.add(emma);

//cool object
const thing = new THREE.Mesh(
  new THREE.TorusKnotGeometry(5, 1, 100, 20),
  new THREE.MeshStandardMaterial({
    color: 0xb78ed2,
    wireframe: true,
  })
);
scene.add(thing);
thing.position.z = 30;
thing.position.x = 30;

animate();
