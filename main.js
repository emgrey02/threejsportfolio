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
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 15;

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
  const t = document.body.getBoundingClientRect().top;

  //*scroll up
  if (scrollNum - e.target.scrollingElement.scrollTop >= 0) {
    thing.rotation.x -= 0.05;
    thing.rotation.y -= 0.075;
    thing.rotation.z -= 0.05;

    camera.position.z -= t * -0.0005;
    camera.position.x -= t * -0.0004;
    camera.rotation.y -= t * -0.001;
    //*scroll down
  } else {
    thing.rotation.x += 0.05;
    thing.rotation.y += 0.075;
    thing.rotation.z += 0.05;

    camera.position.z += t * -0.001;
    camera.position.x += t * -0.0004;
    camera.rotation.y += t * -0.001;
  }
  emma.rotation.y += 0.1;
  scrollNum = e.target.scrollingElement.scrollTop;
}

document.addEventListener('scroll', (e) => moveCamera(e), false);

//*add background
//Photo by Folco Masi https://unsplash.com/@folcomasi?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
//on unsplash https://unsplash.com/t/textures-patterns?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
const spaceTexture = new THREE.TextureLoader().load('images/sky.jpg');
scene.background = spaceTexture;

//*avatar plane
const emmaTexture = new THREE.TextureLoader().load('images/github-avatar.png');
const emma = new THREE.Mesh(
  new THREE.CircleGeometry(4, 32),
  new THREE.MeshBasicMaterial({ map: emmaTexture, side: THREE.DoubleSide })
);
scene.add(emma);

//cool object
const thing = new THREE.Mesh(
  new THREE.TorusKnotGeometry(10, 3, 100, 20),
  new THREE.MeshStandardMaterial({
    color: 0xb78ed2,
    wireframe: true,
  })
);
scene.add(thing);
thing.position.z = 30;
thing.position.x = 30;

animate();
