import * as THREE from 'https://cdn.skypack.dev/three@0.137.5'

function init(){
   const scene = new THREE.Scene()

   const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)

   //mudando a posição da câmera
   camera.position.x = 1
   camera.position.y = 2
   camera.position.z = 5
   camera.lookAt(new THREE.Vector3(0, 0, 0)) //a câmera irá olhar para o centro do espaço 3D

   const renderer = new THREE.WebGLRenderer()
   renderer.setSize(window.innerWidth, window.innerHeight)

   const box = getBox(1, 1, 1)
   scene.add(box)

   document.getElementById('root').appendChild(renderer.domElement)
   renderer.render(scene, camera)
}

function getBox(w, h, d){
   const geometry = new THREE.BoxGeometry(w, h, d)
   const material = new THREE.MeshBasicMaterial({color: 'blue'})
   const mesh = new THREE.Mesh(geometry, material)

   return mesh
}

init()