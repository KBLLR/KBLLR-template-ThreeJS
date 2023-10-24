import * as THREE from 'three'
import CameraControls from 'camera-controls'
import { Rendering } from './renderer.js'
import { TextureGenerator } from './textures.js'
import { updateMeshes } from './meshes.js'
import { palettes, sinPalettes, hemiLightColors } from './palette.js'
import { getPaletteFromParams, setupControls } from './utils.js'
import { torusMesh, sphereMesh, planeMesh } from './meshes.js'
import './style.css'

CameraControls.install( { THREE } )

//--- COLOR PALETTE CONTROLS

let paletteKey = getPaletteFromParams("blue")
let palette = palettes[paletteKey]
let sinPalette = sinPalettes[paletteKey]

const textureGenerator = new TextureGenerator(); 


////////////////////////////////////////////////////////////////
// ✧ MAIN CLASS - DEMO APP                                     /
////////////////////////////////////////////////////////////////

class Demo {
  constructor(){
    this.rendering = new Rendering(document.querySelector("#canvas"), palette)
    this.cameraControls = new CameraControls(this.rendering.camera, this.rendering.canvas)
    this.uTime = new THREE.Uniform(0)
    this.clock = new THREE.Clock()
    this.startAnimationLoop()

    this.init()
  }

  init(){

//----------☞ CONTROLS

    
    console.log(
      this.cameraControls.enabled = true,
      this.cameraControls.active, 
      this.cameraControls.currentAction,
      this.cameraControls.distance,
      this.cameraControls.minDistance,
      this.cameraControls.maxDistance,
      this.cameraControls.minZoom,
      this.cameraControls.maxZoom,
      this.cameraControls.polarAngle,
      this.cameraControls.minPolarAngle,
      this.cameraControls.maxPolarAngle,
      this.cameraControls.azimuthAngle,
      this.cameraControls.minAzimuthAngle,
      this.cameraControls.maxAzimuthAngle,
      this.cameraControls.boundaryEnclosesCamera = true,
      this.cameraControls.boundaryFriction,
      this.cameraControls.smoothTime = 0.5,
      this.cameraControls.draggingSmoothTime = 0.5,
      this.cameraControls.azimuthRotateSpeed = 0.5,
      this.cameraControls.polarRotateSpeed = 0.5,
      this.cameraControls.dollySpeed = 0.5,
      this.cameraControls.truckSpeed = 0.5,
      this.cameraControls.dollyToCursor = false,
      this.cameraControls.verticalDragToForward = true,
      this.cameraControls.colliderMeshes = []
      )

  
//----------☞ TARGETS 

    const boxTarget = new THREE.Object3D();
    boxTarget.position.set(0, 0, 0);


    ////////////////////////////////////////////////////////////////
// ✧ LIGHTS

    const hemiLight = new THREE.HemisphereLight(hemiLightColors.forest.skyC, hemiLightColors.forest.groundC, 10.5)
    hemiLight.position.set(0, 5, 0)
    hemiLight.visible = true

    const spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 2, 1)
    spotLight.angle = Math.PI / 3
    spotLight.penumbra = 0.1
    spotLight.decay = 2
    spotLight.spotLightPARAMS
    spotLight.position.set(0, 50, 0)

    const spotLightHelper = new THREE.SpotLightHelper(spotLight, 4, 0xff0f0f)
    spotLightHelper.visible = true

    spotLight.visible = true
    spotLight.castShadow = true
    spotLight.target = boxTarget;
    spotLight.shadow.mapSize.width= 2048
    spotLight.shadow.mapSize.height= 2048
    spotLight.shadow.camera.near= 0.1
    spotLight.shadow.camera.far= 100
    spotLight.shadow.focus= 1;

//------------ MESHES 

    this.sphereMesh = sphereMesh
    this.sphereMesh.position.set(0, 0, 0)
    this.sphereMesh.scale.set(8, 8, 8)
    this.sphereMesh.rotation.set(0, 0, 0)
    this.sphereMesh.visible = false

    this.torusMesh = torusMesh
    this.torusMesh.position.set(0, 0, 0)
    this.torusMesh.scale.set(1, 1, 1)
    this.torusMesh.rotation.set(0, 0, 0)
    this.torusMesh.visible = false

    this.planeMesh = planeMesh
    this.planeMesh.position.set(0, 0, 0)
    this.planeMesh.scale.set(16, 9, 0)
    this.planeMesh.rotation.set(0, 0, 0) //.rotation.x = -Math.PI / 2
    this.planeMesh.visible = true


//-----✧ GUI HELPERS 

    const gridHelper = new THREE.GridHelper(100, 100)
    gridHelper.position.y = -0.01
    gridHelper.rotation.x = -Math.PI / 2
    gridHelper.material.opacity = 0
    gridHelper.material.transparent = true

    const axesHelper = new THREE.AxesHelper()


//-----✧ POSITION

    //axesHelper.position.set(0, 0, 0)
    gridHelper.position.y = 0
    
//-----✧ ROTATION

//-----✧ SCENE ADD EVENTS

    this.rendering.scene.add(this.sphereMesh)
    this.rendering.scene.add(this.planeMesh)
    this.rendering.scene.add(this.torusMesh)

    //this.rendering.scene.add(dirLight)
    this.rendering.scene.add(spotLight)
    this.rendering.scene.add(hemiLight)

    this.rendering.scene.add(gridHelper)
    //this.rendering.scene.add(axesHelper)
    this.rendering.scene.add(spotLightHelper)


    this.addEvents()
  }
  

  addEvents() {
    window.addEventListener("resize", this.onResize);
  }

  dispose() {
    this.disposed = true;
    window.removeEventListener("resize", this.onResize);
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.context = null;
    this.renderer.domElement = null;
    this.renderer = null
  }

  getViewSizeAtDepth(depth = 0) {
    const fovInRadians = (this.camera.fov * Math.PI) / 180;
    const height = Math.abs(
      (this.camera.position.z - depth) * Math.tan(fovInRadians / 2) * 2
    );
    return { width: height * this.camera.aspect, height };
  }

  //---✧ ANIMATION LOOP

  startAnimationLoop() {
    const animate = (time) => {
      this.uTime.value += time;
      this.rendering.render();
      
      // Calculate the time delta (elapsed time since the last frame)
      const delta = this.clock.getDelta();
      
      // Update the camera controls
      this.cameraControls.update(delta);
      
      // Request the next animation frame
      requestAnimationFrame(animate);
    };
  
    // Start the animation loop
    animate();
  }
}

let demo = new Demo()

setupControls(paletteKey)

