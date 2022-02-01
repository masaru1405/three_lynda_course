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
   const box = getBox(1, 1, 1)
   const plane = getPlane(4, 4)
   plane.name = 'plane-1' //Podemos nomear nossos objetos, facilitando sua localização através getObjectByName pelo objeto pai (neste caso, o pai de 'plane' é 'scene'). Retorno o primeiro objeto que deu match no nome.
   plane.rotation.x = Math.PI / 2 //THREE.js usa radianos ao invés de graus
   plane.position.y = 1
   box.position.y = box.geometry.parameters.height / 2 //O box ficará em cima do plano (não mais se adicionarmos o 'box' como filho de 'plane' e mudarmos a posição y de plane -> plane.position.y = 1)

   plane.add(box) //box é filho de plane
   scene.add(plane)

   document.getElementById('root').appendChild(renderer.domElement)
   update(renderer, camera, scene)

   return scene
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

function update(renderer, camera, scene){
   renderer.render(scene, camera)

   const myPlane = scene.getObjectByName('plane-1')
   myPlane.rotation.y += 0.001
   myPlane.rotation.z += 0.001

   //Função callback, irá percorrer por todos os objetos filho e executar uma determinada ação. Neste caso, o único filho de 'scene' é o 'plane', que por sua vez é pai de 'box'
   scene.traverse(function(child){
      child.scale.x += 0.001
   })

   //requestAnimationFrame é um método do objeto window
   requestAnimationFrame(function(){ //Chamando o método update de forma recursiva
      update(renderer, camera, scene)
   })
}

var scene = init()