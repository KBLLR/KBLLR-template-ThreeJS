import * as THREE from 'three'
import CameraControls from 'camera-controls'
import { Rendering } from './renderer.js'
import { TextureGenerator } from './textures.js'
import { updateMeshes } from './meshes.js'
import { SearchBarUI } from './searchBarUI.js'
import { palettes, sinPalettes, hemiLightColors } from './palette.js'
import { getPaletteFromParams, setupControls } from './utils.js'
import { torusKMesh, torusMesh, cylinderMesh, sphereMesh, cubeMesh, planeMesh, coneMesh, ringMesh } from './meshes.js'
import './style.css'

CameraControls.install( { THREE } )

//--- COLOR PALETTE CONTROLS

let paletteKey = getPaletteFromParams("blue")
let palette = palettes[paletteKey]
let sinPalette = sinPalettes[paletteKey]

const textureGenerator = new TextureGenerator(); 

const searchBarUI = new SearchBarUI()
searchBarUI.init()

// Handle the "Random Inspiration" button click to update the meshes
const randomInspirationButton = document.getElementById("generateRandomWord");
randomInspirationButton.addEventListener("click", () => {
  searchBarUI.updateTextureAndMesh(); // Update the UI title in the SearchBarUI
  updateMeshes(); // Update the meshes in the app.js
});

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

    this.cameraControls.enabled = true

  
//----------☞ TARGETS 

    const boxTarget = new THREE.Object3D();
    boxTarget.position.set(0, 0, 0);


    ////////////////////////////////////////////////////////////////
// ✧ LIGHTS

    const hemiLight = new THREE.HemisphereLight(hemiLightColors.space.skyC, hemiLightColors.space.groundC, 10.5)
    hemiLight.position.set(0, 5, 0)
    hemiLight.visible = true

//------------ MESHES 

    this.sphereMesh = sphereMesh
    this.sphereMesh.position.set(0, 0, 0)
    this.sphereMesh.scale.set(8, 8, 8)
    this.sphereMesh.rotation.set(0, 0, 0)
    this.sphereMesh.visible = false

    this.ringMesh = ringMesh
    this.ringMesh.position.set(0, 0, 0)
    this.ringMesh.scale.set(8, 8, 8)
    this.ringMesh.rotation.set(0, 0, 0)
    this.ringMesh.visible = false

    this.cubeMesh = cubeMesh
    this.cubeMesh.position.set(0, 0, 0)
    this.cubeMesh.scale.set(4, 4, 4)
    this.cubeMesh.rotation.set(0, 0, 0)
    this.cubeMesh.visible = false

    this.coneMesh = coneMesh
    this.coneMesh.position.set(0, 0, 0)
    this.coneMesh.scale.set(1, 1, 1)
    this.coneMesh.rotation.set(0, 0, 0)
    this.coneMesh.visible = false

    this.torusMesh = torusMesh
    this.torusMesh.position.set(0, 0, 0)
    this.torusMesh.scale.set(1, 1, 1)
    this.torusMesh.rotation.set(0, 0, 0)
    this.torusMesh.visible = false

    this.torusKMesh = torusKMesh
    this.torusKMesh.position.set(0, 0, 0)
    this.torusKMesh.scale.set(1, 1, 1)
    this.torusKMesh.rotation.set(0, 0, 0)
    this.torusKMesh.visible = false

    this.planeMesh = planeMesh
    this.planeMesh.position.set(0, 0, 0)
    this.planeMesh.scale.set(9, 16, 0)
    this.planeMesh.rotation.set(0, 0, 0) //.rotation.x = -Math.PI / 2
    this.planeMesh.visible = true

    this.cylinderMesh = cylinderMesh
    this.cylinderMesh.position.set(0, 0, 0)
    this.cylinderMesh.scale.set(1, 1, 1)
    this.cylinderMesh.rotation.set(0, 0, 0)
    this.cylinderMesh.visible = false


    const spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 2, 1)
    spotLight.angle = Math.PI / 3
    spotLight.penumbra = 0.1
    spotLight.decay = 2
    spotLight.spotLightPARAMS
    spotLight.position.set(0, 50, 0)

    const spotLightHelper = new THREE.SpotLightHelper(spotLight, 4, 0xff0f0f)
    spotLightHelper.visible = false

    spotLight.visible = true
    spotLight.castShadow = true
    spotLight.target = boxTarget;
    spotLight.shadow.mapSize.width= 2048
    spotLight.shadow.mapSize.height= 2048
    spotLight.shadow.camera.near= 0.1
    spotLight.shadow.camera.far= 100
    spotLight.shadow.focus= 1;

    console.log(
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
    this.rendering.scene.add(this.coneMesh)
    this.rendering.scene.add(this.cubeMesh)
    this.rendering.scene.add(this.planeMesh)
    this.rendering.scene.add(this.cylinderMesh)
    this.rendering.scene.add(this.torusMesh)
    this.rendering.scene.add(this.torusKMesh)
    this.rendering.scene.add(this.ringMesh)

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

// //--Parameters for Abstract Base Classes

// const lightCol = new THREE.Color(0xffffff)

// const hLightCol_1_1 = new THREE.Color(0xffffff)
// const hLightCol_1_2 = new THREE.Color(0xffffff)

// const pLight_1 = new THREE.Color(0xffffff)
// const pLight_2 = new THREE.Color(0xF5F5F5)

// const material_1_color = new THREE.Color(0x708090)
// const material_1_emissive = new THREE.Color(0x000000)

// const attenuationColor_Mat1 = new THREE.Color(0xF5F5F5)
// const shnColor_Mat1 = new THREE.Color(0xffffff/1.0)


///////////////////////////////////////////////////////////
// ✧ GUI - TWEAKPANE 

// //===========PANE SCENE
// const paneScene = new Pane({ title: "Scene", container: document.getElementById('c--Scene'), expanded: false })

// //========BACKGROUND FOLDER
// const experienceF = paneScene.addFolder({ title: "Background Options", expanded: false })
// experienceF.addInput(PARAMS.scene, "background", { view: 'color', color: { alpha: true }, label: ".color" })
// experienceF.addSeparator(); //===========================

// //========CAMERA FOLDER
// const cameraF = paneScene.addFolder({ title: "Cameras Directory", expanded: false })
// const lightsF = paneScene.addFolder({ title: "Lights directory", expanded: false })
// cameraF.addSeparator(); //===========================

//===========LIGHTS TAB
// const lightsTab = lightsF.addTab({
//   pages: [
//     { title: 'Base Class Light' },
//     { title: 'Ambient Light' },
//     { title: 'Hemisphere Light' },
//     { title: 'Directional Light' },
//     { title: 'Point Light' },
//   ],
// })
// lightsTab.pages[0].addInput(PARAMS.light, "color", { view: 'color', color: { alpha: true }, label: ".color" })
// lightsTab.pages[0].addInput(PARAMS.light, "intensity", { min: 0.0, max: 20.0, label: ".intensity" })
// lightsTab.pages[3].addInput(PARAMS.dirLight, "castShadow")
// lightsTab.pages[3].addInput(PARAMS.dirLight, "position")
// lightsTab.pages[3].addInput(PARAMS.dirLight, "target")


// //===========PANE HELPERS
// const paneHelpers = new Pane({ title: "Helpers", container: document.getElementById('c--Helpers'), expanded: false })
// const gridF = paneHelpers.addFolder({ title: "Grid", expanded: false })
// gridF.addInput(PARAMS.gridHelper, "divisions", { min: 20, max: 500, label: ".divisions" })
// gridF.addInput(PARAMS.gridHelper, "size", { min: 40, max: 150, step: 1, label: ".size" })
// gridF.addInput(PARAMS.gridHelper, "hidden")
// paneHelpers.addSeparator(); //=======

// //===========PANE MESHES
// const paneMeshes = new Pane({ title: "Meshes", container: document.getElementById('c--Meshes'), expanded: false })
// const sphereF = paneMeshes.addFolder({ title: "Sphere", expanded: false });
// const torusF = paneMeshes.addFolder({ title: "Torus", expanded: false });
// const torusKnotF = paneMeshes.addFolder({ title: "Torus Knot", expanded: false });
// paneMeshes.addSeparator(); //===========================

// //===========PANE GEOMETRIES
// const paneGeometries = new Pane({ title: "BufferGeometries", container: document.getElementById('c--Geometries'), expanded: false })
// const sphereG_F = paneGeometries.addFolder({ title: "SphereBufferGeometry", expanded: false });
// sphereG_F.addInput(PARAMS.geo.baseSphere, "radius", { step: 1, min: 1, max: 9, label: ".radius" })
// sphereG_F.addInput(PARAMS.geo.baseSphere, "widthS", { step: 1, min: 1, max: 180, label: ".widthSegments" })
// sphereG_F.addInput(PARAMS.geo.baseSphere, "heightS",{ step: 1,min: 1, max: 180, label: ".heightSegments" })
// sphereG_F.addInput(PARAMS.geo.baseSphere, "phiS", { min: 0.0, max: 5.0, label: ".phiStart" })
// sphereG_F.addInput(PARAMS.geo.baseSphere, "phiL", { min: 0.0, max: 5.0, label: ".phiLength" })
// sphereG_F.addInput(PARAMS.geo.baseSphere, "thetaS", { min: 0.0, max: 5.0, label: ".thetaStart" })
// sphereG_F.addInput(PARAMS.geo.baseSphere, "thetaL", { min: 0.0, max: 5.0, label: ".thetaLength" })
// paneGeometries.addSeparator(); //===========================
// const torusG_F = paneGeometries.addFolder({ title: "TorusBufferGeometry", expanded: false });
// paneGeometries.addSeparator(); //===========================
// const torusKnotG_F = paneGeometries.addFolder({ title: "TorusKnotGeometry", expanded: false });
// paneGeometries.addSeparator(); //===========================

// //===========PANE PARAMS
// const panePARAMS = new Pane({ title: "PARAMS ", container: document.getElementById('c--PARAMS'), expanded: false })
// const paramsMat_1_F = panePARAMS.addFolder({ title: "Material_1", expanded: false })
// const paramsMat_2_F = panePARAMS.addFolder({ title: "Material_2", expanded: false })
// paramsMat_1_F.addInput(PARAMS.material_1, "color")
// paramsMat_1_F.addInput(PARAMS.material_1, "emissive")
// paramsMat_1_F.addInput(PARAMS.material_1, "emissiveIntensity", { min: 1.0, max: 20.0, label: ".emissiveIntensity" })
// paramsMat_1_F.addInput(PARAMS.material_1, "ao", { min: 0.1, max: 1.0, label: ".aoMapIntensity" })
// paramsMat_1_F.addInput(PARAMS.material_1, "envInt", { min: 0.1, max: 10.0, label: ".envIntensity" })
// paramsMat_1_F.addInput(PARAMS.material_1, "metal", { min: 0.0, max: 1.0, label: ".metalness" })
// paramsMat_1_F.addInput(PARAMS.material_1, "rough", { min: 0.0, max: 1.0, label: ".roughness" })
// paramsMat_1_F.addInput(PARAMS.material_1, "alpha", { min: 0.0, max: 1.0, label: ".opacity" })
// paramsMat_1_F.addInput(PARAMS.material_1, "displ", { min: 0.0, max: 8.0, label: ".displacementScale" })
// paramsMat_1_F.addInput(PARAMS.material_1, "displBias", { min: 0.0, max: 8.0, label: ".displacementBias" })
// paramsMat_1_F.addInput(PARAMS.material_1, "normal", { min: 0.01, max: 8.0, label: "Normal" })
// paramsMat_1_F.addInput(PARAMS.material_1, "clearcoat", { min: 0.0, max: 1.0, label: "Clearcoat" })
// paramsMat_1_F.addInput(PARAMS.material_1, "coatrough", { min: 0.0, max: 1.0, label: "CCoatRoughness" })
// paramsMat_1_F.addSeparator() //===========================

// //===========PANE MATERIALS
// const paneMaterials = new Pane({ title: "Materials ", container: document.getElementById('c--Materials'), expanded: false })
// const physicalMaterialF = paneMaterials.addFolder({ title: 'Physical Material', expanded: false })

// physicalMaterialF.addInput(PARAMS.material_1, "dither")
// physicalMaterialF.addInput(PARAMS.material_1, "transparent")
// physicalMaterialF.addInput(PARAMS.material_1, "transm", { min: 0.0, max: 1.0, label: ".transmission" })
// physicalMaterialF.addInput(PARAMS.material_1, "attDist", { min: 0.0, max: 10.0, label: ".attenuationDistance" })
// physicalMaterialF.addInput(PARAMS.material_1, "attColor", { view: 'color', color: { alpha: true }, label: ".attenuationColor" })
// physicalMaterialF.addInput(PARAMS.material_1, "shn", { min: 0.0, max: 1.0, label: ".sheen" })
// physicalMaterialF.addInput(PARAMS.material_1, "shnColor", { view: 'color', color: { alpha: true }, label: ".sheenColor" })
// physicalMaterialF.addInput(PARAMS.material_1, "shnR", { min: 0.0, max: 1.0, label: ".sheenRoughness" })
// physicalMaterialF.addInput(PARAMS.material_1, "ior", { min: 0.0, max: 2.33, label: ".ior" })
// physicalMaterialF.addInput(PARAMS.material_1, "thick", { min: 0.0, max: 20.0, label: ".thickness" })
// physicalMaterialF.addInput(PARAMS.material_1, "reflect", { min: 0.0, max: 2.0, label: ".reflectivity" })
// physicalMaterialF.addSeparator(); //===========================


// ////////////////////////////////////////////////////////////////////
// ✧ RESETERS


// function renderMaterial() {

//   const element1A = material_1A
//   const element2A = dirLight
//   const element3A = sphereData

//   element1A.color = PARAMS.material_1.color
//   element1A.emissive.set(PARAMS.material_1.emissive)
//   element1A.attenuationColor.set(PARAMS.material_1.attColor)
//   element1A.emissiveIntensity = PARAMS.material_1.emissiveIntensity
//   element1A.sheen = PARAMS.material_1.shn
//   element1A.sheenColor = PARAMS.material_1.shnColor
//   element1A.sheenColorMap = PARAMS.material_1.shnColorMap
//   element1A.sheenRoughness = PARAMS.material_1.shnR
//   element1A.attenuationDistance = PARAMS.material_1.attDist
//   element1A.metalness = PARAMS.material_1.metal
//   element1A.roughness = PARAMS.material_1.rough
//   element1A.opacity = PARAMS.material_1.alpha
//   element1A.transmission = PARAMS.material_1.transm
//   element1A.ior = PARAMS.material_1.ior
//   element1A.thickness = PARAMS.material_1.thick
//   element1A.reflectivity = PARAMS.material_1.reflect
//   element1A.clearcoat = PARAMS.material_1.clearcoat * 5
//   element1A.clearcoatRoughness = PARAMS.material_1.coatrough
//   element1A.envMapIntensity = PARAMS.material_1.envInt
//   element1A.displacementScale = PARAMS.material_1.displ * 0.1
//   element1A.displacementBias = PARAMS.material_1.displBias
//   element1A.aoMapIntensity = PARAMS.material_1.ao;
//   element1A.normalScale.set(PARAMS.material_1.normal, PARAMS.material_1.normal)
//   element1A.dithering = PARAMS.material_1.dither
//   element1A.transparent = PARAMS.material_1.transparent
//   element1A.needsUpdate = true;
//   //--
//   element2A.intensity = PARAMS.light.intensity
//   element2A.color = PARAMS.light.color
//   element2A.castShadow = PARAMS.dirLight.castShadow
//   //--
//   element3A.radius = PARAMS.geo.baseSphere.radius
//   element3A.widthSegments = PARAMS.geo.baseSphere.widthS
//   element3A.heightSegments = PARAMS.geo.baseSphere.heightS
// }

//------------
// function regenerateSphereGeometry() {
//   const newGeometry = new THREE.SphereGeometry(
//     sphereData.radius,
//     sphereData.widthSegments,
//     sphereData.heightSegments,
//     sphereData.phiStart,
//     sphereData.phiLength,
//     sphereData.thetaStart,
//     sphereData.thetaLength
//   )
//   sphere.geometry.dispose()
//   sphere.geometry = newGeometry
// }

// //------------
// function regenerateTorusKnotGeometry() {
//   const newTorusKnotG = new THREE.TorusKnotGeometry(
//     torusKnotData.radius,
//     torusKnotData.tube,
//     torusKnotData.tubularSegments,
//     torusKnotData.radialSegments,
//     torusKnotData.p,
//     torusKnotData.q,
//   )
//   torusKnot.geometry.dispose()
//   torusKnot.geometry = newTorusKnotG
// }

// //------------
// function regenerateTorusGeometry() {
//   const newTorusG = new THREE.TorusGeometry(
//     torusData.radius,
//     torusData.tube,
//     torusData.tubularSegments,
//     torusData.radialSegments,
//     torusData.arc
//   )
//   torusMesh.geometry.dispose()
//   torusMesh.geometry = newTorusG
// }

////////////////////////////////////////////////////////////////////
// ✧ EFFECT COMPOSER - POSTPRODUCTION


// const composer = new EffectComposer(renderer)
// composer.addPass(new RenderPass(scene, camera))
// composer.addPass(new EffectPass(camera, new BloomEffect()));


////////////////////////////////////////////////////////////////////
// ✧ STATS
///////////////

// const stats = stats()

// document.body.appendChild(stats.dom)

////////////////////////////////////////////////////////////////////
// ✧ SCREENSHOT BUTTON
///////////////

// const clock = new THREE.Clock()
// let previousTime = 0


// function animate() {
// //   requestAnimationFrame(animate)

//   const elapsedTime = clock.getElapsedTime()
//   const deltaTime = elapsedTime - previousTime
//   previousTime = elapsedTime


//   torusKnot.rotation.x += 0.01
//   torusKnot.rotation.y += 0.01

//   torusMesh.rotation.x += 0.01
//   torusMesh.rotation.z += 0.01


//   pLight0.rotation.y += Math.cos(elapsedTime * 0.3) * 30
//   pLight0.rotation.x += Math.sin(elapsedTime * 0.3) * 30

//   pLight1.rotation.x += Math.sin(elapsedTime * 0.3) * 30
//   pLight1.rotation.y += Math.cos(elapsedTime * 0.3) * 30

//   controls.update()

// //   paneScene.refresh()
// //   paneHelpers.refresh()
// //   paneMaterials.refresh()
// //   paneMeshes.refresh()
// //   panePARAMS.refresh()

// //   paneGeometries.refresh()

// //   regenerateSphereGeometry()
// //   regenerateTorusKnotGeometry()
// //   regenerateTorusGeometry()

//   renderMaterial()

//   renderer.render(scene, camera)
//   // composer.render()

// //   stats.update()

// }

// animate()