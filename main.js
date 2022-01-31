import * as THREE from 'https://cdn.skypack.dev/three@0.137.5'

function init(){
   const scene = new THREE.Scene()

   const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)

   //mMdando a posição da câmera
   camera.position.x = 1
   camera.position.y = 2
   camera.position.z = 5
   camera.lookAt(new THREE.Vector3(0, 0, 0)) //A câmera irá olhar para o centro do espaço 3D

   const renderer = new THREE.WebGLRenderer()
   renderer.setSize(window.innerWidth, window.innerHeight)

   //Add objetos geométricos
   const box = getBox(1, 5, 1)
   const plane = getPlane(4, 4)
   plane.rotation.x = Math.PI / 2 //THREE.js usa radianos ao invés de graus
   box.position.y = box.geometry.parameters.height / 2 //O box ficará em cima do plano

   scene.add(box)
   scene.add(plane)

   document.getElementById('root').appendChild(renderer.domElement)
   renderer.render(scene, camera)
}

function getBox(w, h, d){
   const geometry = new THREE.BoxGeometry(w, h, d)
   const material = new THREE.MeshBasicMaterial({color: 'blue'})
   const mesh = new THREE.Mesh(geometry, material)

   return mesh
}

function getPlane(w, h){
   const geometry = new THREE.PlaneGeometry(w, h)
   const material = new THREE.MeshBasicMaterial({color: 'red', side: THREE.DoubleSide})
   const mesh = new THREE.Mesh(geometry, material)

   return mesh
}

init()