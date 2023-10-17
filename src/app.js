import "./style.css"
// import "./wildCards.js"
import { gsap } from "gsap"
import { Rendering } from "./renderer.js"
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { palettes, sinPalettes } from "./palette";
import { getPaletteFromParams, setupControls } from "./utils";

// Colors 
let paletteKey = getPaletteFromParams("blue")

let palette = palettes[paletteKey]
let sinPalette = sinPalettes[paletteKey]

const anisotropyLevel = 16;

//==GEOMETRIES DATA

const geoPARAMS = {
  sphereData : {
    radius: 1,
    widthSegments: 80,
    heightSegments: 80,
    phiStart: 0,
    phiLength: Math.PI * 2,
    thetaStart: 0,
    thetaLength: Math.PI * 2,
  },
  torusData : {
    radius: 1,
    tube: 0.1,
    tubularSegments: 200,
    radialSegments: 30,
    arc: 6.283,
  },
  torusKnotData : {
    radius: 1,
    tube: 0.1,
    tubularSegments: 300,
    radialSegments: 20,
    p: 1,
    q: 3,
  }
}

let topic = ["diamonds", "minerals", "eye", "iridescent", "eyes", "geometry", "New York", "Universe", "aurora borealis", "northern lights", "neon", "clouds", "smoke", "AI", "Caustics", "Fractals", "words", "colors", "abstract", "pattern"];

const uiTitle = document.getElementById("ui-title");
let wildCard

function populateElement() {
   wildCard = topic[Math.floor(Math.random() * topic.length)];
   uiTitle.textContent = wildCard;
}
populateElement()

const Template = "https://unsplash.com/photos/QwoNAhbmLLo";

const g_texture = (wildcard = "topic", repeat = 4) => {
  const path = `https://source.unsplash.com/random/?${wildcard}`;
  const preload = new THREE.TextureLoader().load(
    path ? path : Template,
    (e) => {
      e.mapping = THREE.EquirectangularRefractionMapping;
      e.anisotropy = anisotropyLevel
      e.magFilter = THREE.NearestFilter;
      e.minFilter = THREE.LinearMipmapLinearFilter;
      e.wrapS = e.wrapT = THREE.MirroredRepeatWrapping;
      e.type = THREE.HalfFloatType;
      e.format = THREE.RGBAFormat;
      e.repeat.set(repeat, repeat);
      e.dispose();
    }
  );
  console.log(preload);
  return preload;
};

  ////////////////////////////////////////////////////////////////
// ✧ Properties that take a texture image as an input 

const mPhysicalMat_maps = new THREE.MeshPhysicalMaterial(
  {
  map: g_texture(wildCard, 4),
  emissiveMap: g_texture(wildCard, 4),
  aoMap: g_texture(wildCard, 4),
  envMap: g_texture(wildCard, 4),
  normalMap: g_texture(wildCard, 4),
  metalnessMap: g_texture(wildCard, 4),
  roughnessMap: g_texture(wildCard, 4),
  clearcoatRoughnessMap: g_texture(wildCard, 4),
  clearcoatNormalMap: g_texture(wildCard, 4),
  displacementMap: g_texture(wildCard, 4),
  sheenRoughnessMap: g_texture(wildCard, 4),
  sheenColorMap: g_texture(wildCard, 4),
  clearcoatRoughnessMap: g_texture(wildCard, 4), 
  clearcoatNormalMap: g_texture(wildCard, 4),
  displacementMap: g_texture(wildCard, 4)
  }
);
const mBasicMat_maps = new THREE.MeshBasicMaterial (
  {
  map: null,          // Texture for color
  alphaMap: null,     // Texture for alpha
  specularMap: null,  // Texture for specular
  aoMap: null,        // Texture for ambient occlusion
  envMap: null,       // Cube texture for environment mapping
  }
)

  ////////////////////////////////////////////////////////////////
// ✧ Properties that take a value as an input 

  // mPhysicalMat_maps.attenuationDistance= 2.0,
  // mPhysicalMat_maps.emissive= 0x000,
  // mPhysicalMat_maps.emissiveIntensity= 1.0,
  // mPhysicalMat_maps.aoMapIntensity= 1.0,
  // mPhysicalMat_maps.envMapIntensity= 6,
  // mPhysicalMat_maps.reflectivity= 1.2,
  // mPhysicalMat_maps.normalScale= new THREE.Vector2(4, 4),
  // mPhysicalMat_maps.metalness= 0.05,
  // mPhysicalMat_maps.roughness= 0.2,
  // mPhysicalMat_maps.sheen= 1.0,
  // mPhysicalMat_maps.sheenRoughness= 0.5,
  // mPhysicalMat_maps.ior= 1.5,
  // mPhysicalMat_maps.opacity= 1.0,
  // mPhysicalMat_maps.clearcoat= 0.8,
  // mPhysicalMat_maps.clearcoatRoughness= 0.5,
  // mPhysicalMat_maps.clearcoatNormalScale= new THREE.Vector2(0.2, 0.2),
  // mPhysicalMat_maps.displacementScale= 0.3,
  // mPhysicalMat_maps.displacementBias= 1.3,



  // mBasicMat_maps.color= 0xffffff,    // The color of the material
  // mBasicMat_maps.opacity= 1.0,       // Opacity of the material
  // mBasicMat_maps.transparent= false, // Whether the material is transparent
  // mBasicMat_maps.wireframe= false,   // Whether the material is displayed as wireframe
  // mBasicMat_maps.wireframeLinewidth= 1, // Line width for wireframe rendering
  // mBasicMat_maps.fog= true,          // Whether the material is affected by fog
  // mBasicMat_maps.lights= true,       // Whether the material receives light


  ////////////////////////////////////////////////////////////////
// ✧ Directional Light

const dirLightPARAMS = {
  color: 0xffffff, // The color of the light
  intensity: 4, // The intensity of the light
  distance: 10, // The distance at which the light's intensity is zero
  decay: 2, // The amount the light dims along the distance
  shadow: {
    castShadow: true, // Whether the light casts shadows
    mapSize: {
      width: 2048, // Width of the shadow map
      height: 2048, // Height of the shadow map
    },
    bias: 0.001, // Adjust for shadow bias
    normalBias: 0.01, // Adjust for normal bias
    radius: 2, // Adjust for softer shadows
  },
  //target: null, // The light's target object
};

const controlPARAMS = {
  enabled: true,
  enableDamping:true,
  dampingFactor: 0.08,
  autoRotate: true,
  enableZoom:true,
  autoRotateSpeed: 1.2,
  minDistance: 0.01,
  maxDistance: 25,
  minPolarAngle: 0,
  maxPolarAngle: Math.PI / 2.1
  }

class Demo {
  constructor(){
    this.rendering = new Rendering(document.querySelector("#canvas"), palette)
    this.controls = new OrbitControls(this.rendering.camera, this.rendering.canvas)
    this.controls.controlPARAMS
    this.uTime = new THREE.Uniform(0)
    this.init()
  }
  init(){

//---☞ TARGETS 
    const boxTarget = new THREE.Object3D();
    boxTarget.position.set(0, 0, 0); 

//---✧ SPHERE
    const sphereGeo = new THREE.SphereGeometry(geoPARAMS.sphereData)

//---✧ TORUS
    const torusGeo = new THREE.TorusGeometry()

//---✧ TORUS_KNOT
    const torusKGeo = new THREE.TorusKnotGeometry()

//---✧ BOX
    const boxGeo = new THREE.BoxGeometry()

//---✧ PLANE
    const planeGeo = new THREE.PlaneGeometry(10, 10)
    
//---✣ MATERIALS

//---✣ PHYSICAL    
    mPhysicalMat_maps.flatShading= false,
    mPhysicalMat_maps.side= THREE.DoubleSide,
    mPhysicalMat_maps.precision= "highp"

//---✣ BASIC 
    mBasicMat_maps.flatShading= false,
    mBasicMat_maps.side= THREE.DoubleSide,
    mBasicMat_maps.precision= "highp"

//---✣ LAMBERT
    const matLambert = new THREE.MeshLambertMaterial()
    
//---✣ PHONG
    const matPhong = new THREE.MeshPhongMaterial()

//--- MESHES

    const box = new THREE.Mesh(boxGeo, mPhysicalMat_maps)
    box.castShadow = true
    box.receiveShadow = true

    // const torus = new THREE.Mesh(torusGeo, matPhysical)

    // const torusK = new THREE.Mesh(torusKGeo, matPhysical)

    const sphere = new THREE.Mesh(sphereGeo, mPhysicalMat_maps)
    sphere.castShadow = true
    sphere.receiveShadow = true

    const plane = new THREE.Mesh(planeGeo, mBasicMat_maps)
    plane.castShadow = false
    plane.receiveShadow = true


//--- LIGHTS

    const dirLight = new THREE.DirectionalLight(dirLightPARAMS)
    dirLight.castShadow = true
    dirLight.target = boxTarget;

//---✧ GUI HELPERS 

const gridHelper = new THREE.GridHelper(80, 80)
const axesHelper = new THREE.AxesHelper()
const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 4, 0xfff) // Light- size of the arrowhead - color (optional).

//---  POSITION

    box.position.set(0,0,0)
    dirLight.position.set(0,5,0)
    dirLight.target.position.copy(box.position);
    axesHelper.position.set(0, 0, 0)
    gridHelper.position.y = -2
    plane.position.y = -2

//--- ROTATION

    plane.rotation.x = -Math.PI / 2;

//--- SCENE EVENTS

    this.rendering.scene.add(box)
    this.rendering.scene.add(sphere)
    this.rendering.scene.add(plane)
    this.rendering.scene.add(dirLight)
    this.rendering.scene.add(gridHelper)
    //this.rendering.scene.add(axesHelper)
    this.rendering.scene.add(dirLightHelper)
    this.addEvents()
  }
    addEvents(){
      gsap.ticker.add(this.tick)
  }
  tick = (_time, delta)=>{
    this.uTime.value += delta;
    this.rendering.render()
  }
}

let demo = new Demo()

setupControls(paletteKey)


////////////////////////////////////////////////////////////////////
// ✧ RENDERER

// const clearBgColor = new THREE.Color(0xffffff)
// const background = new THREE.Color(0xc3c3c3)

// renderer.setClearBackgroundColor = clearBgColor;
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// // renderer.setAnimationLoop(scene, camera)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
// renderer.gammaInput= true
// renderer.gammaOutput= true
// renderer.gammaFactor= 2.2
// renderer.sortObjects= true
// // renderer.lod= 1.0
// // renderer.frustumCulling= true
// renderer.shadowMap.enabled = true
// renderer.xr.enabled = false
// // renderer.shadowMap = VSMShadowMap;

// const randWC = (wcMixedI) => {
//     const randomWildCard = Math.floor(Math.random() * wcMixedI.length);
//     return wcMixedI[randomWildCard];
//   };

//   const Template = "https://unsplash.com/photos/QwoNAhbmLLo";

// const g_texture = (topic = String, repeat = 4) => {
// const path = `https://source.unsplash.com/random/?${topic}`;

// const preload = new THREE.TextureLoader().load(
//     path ? path : Template,
//     (e) => {
//     e.mapping = THREE.EquirectangularRefractionMapping;
//     e.anisotropy = renderer.capabilities.getMaxAnisotropy();
//     e.magFilter = THREE.NearestFilter;
//     e.minFilter = THREE.LinearMipmapLinearFilter;
//     e.wrapS = e.wrapT = THREE.MirroredRepeatWrapping;
//     e.type = THREE.HalfFloatType;
//     e.format = THREE.RGBAFormat;
//     e.repeat.set(repeat, repeat);
//     e.dispose();
//     }
// );
// };
  
////////////////////
// ✧ RANDOMIZERS///


//--Random RGB Color Generator
// let rRGB = () => Math.random() * 256 >> 0
// let randRGB = `rgb(${rRGB()}, ${rRGB()}, ${rRGB()})`
// console.log(randRGB)

// //--Random PARAM between 0.1 and 1.0
// let rParam = () => Math.random() * 1.0 >> 0.1
// let randPARAM = `rParam()`
// console.log(randPARAM)

// //--Random RGBa Color Generator
// let randRGBa = `rgb(${rRGB()}, ${rRGB()}, ${rRGB()}, ${rParam()})`

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

//=====================================================

// const PARAMS = {
//   camera: {},
//   // scene: {
//   //   // background: background.convertLinearToSRGB(),
//   //   envmap: g_texture("texture", 4),
//   //   envmapIntensity: 1.0,
//   //   fog: true,
//   //   fogExp2: 0.04,
//   //   fogColor: clearBgColor.convertLinearToSRGB(),
//   //   fogDensity: 0.00025,
//   //   fogNear: 2,
//   //   fogFar: 100,
//   // },
//   gridHelper: {
//     size: 40,
//     divisions: 40,
//     hidden: true,
//   },
//   geo: {
//     baseSphere: {
//       radius: 4,
//       widthS: 4,
//       heightS: 4,
//       phiS: 0,
//       phiL: Math.PI * 2,
//       thetaS: 10,
//       thetaL: Math.PI * 2,
//     },
//   },
//   material_1: {
//     color: material_1_color.convertLinearToSRGB(),
//     metal: 0.4,
//     attColor: attenuationColor_Mat1.convertLinearToSRGB(),
//     attDist: 2.0,
//     rough: 0.05,
//     alpha: 0.9,
//     transm: 1.0,
//     shn: 0.5,
//     shnColor: shnColor_Mat1.convertLinearToSRGB(),
//     shnColorMap: g_texture(wildCard, 4),
//     shnR: 0.5,
//     ior: 1.44, //--X
//     thick: 1.0, //
//     reflect: 0.4, //--no effect when metalness is 1.0
//     clearcoat: 0.4, //
//     coatrough: 0.8, //.15
//     envInt: 5.0,
//     emissive: material_1_emissive.convertLinearToSRGB(),
//     emissiveIntensity: 1,
//     displ: 0.5,
//     displBias: 1.0,
//     ao: 1.0,
//     normal: 0.1,
//     dither: true,
//     transparent: true,
//     combine: THREE.AlwaysDepth,
//   },
//   material_2: {
//     sheen: 0.7,
//     sheenRoughness: 0.3,
//     sheenColor: 0xD8BFD8,
//     envMapIntensity: 6,
//     reflectivity: 0.5,
//     specularColor: 0xF5F5F5,
//     specularIntensity: 0.2,
//     displacementBias: 3,
//     displacementScale: 0.2,
//     ior: 1.2,
//     transmission: 1.0,
//     clearcoat: 0.5,
//     clearcoatRoughness: 0.8,
//     // Volume
//     thickness: 1.5,
//     thicknessMap: g_texture("galaxy", 4), // stores on the G channel
//     dither: true,
//     transparent: true,
//     combine: THREE.AddOperation,
//     side: THREE.FrontSide,
//     lights: true,
//     // Fog
//     fog: true,
//     depthTest: true,
//     depthWrite: true,
//     blending: THREE.NormalBlending,
//     clippingPlanes: [],
//     wireframe: true,
//     wireframeLineWidth: 1,
//     // wireframeLineJoin: THREE.RoundLineJoin,
//     // wireframeLineCap: THREE.RoundLineCap,
//     wireframeMaterial: undefined,
//     morphTargets: false,
//     morphNormals: false,
//     dispatchEvents: true,
//     customProperties: {},
//   }
// }


////////////////////////////////////////////////////////////////////
// ✧ LIGHTS + group


// const hemis_light = new THREE.HemisphereLight(PARAMS.hLight.color1, PARAMS.hLight.color2, PARAMS.hLight.intensity)
// scene.add(hemis_light)

// const pLight0 = new THREE.PointLight(PARAMS.pLight_1.color, PARAMS.pLight_1.intensity)
// pLight0.position.set(7, 7, 12)

// const pLight1 = new THREE.PointLight(PARAMS.pLight_2.color, PARAMS.pLight_2.intensity)
// pLight1.position.set(-7, -7, -12)

// scene.add(pLight0, pLight1)


// dirLight.shadow.mapSize.width = 1024; // default
// dirLight.shadow.mapSize.height = 1024; // default
// dirLight.shadow.camera.near = 0.1; // default
// dirLight.shadow.camera.far = 10000; // default

////////////////////////////
// ✧ MeshPhysicalMaterial


////////////////////////////////////////////////////////////////////
// ✧ GEOMETRIES 

////////////////////
// ✧ MESH OBJECTS /


// //--- TORUS
// const torusG = new THREE.TorusGeometry()
// const torusMesh = new THREE.Mesh(torusG, material_2A)
// torusMesh.rotation.z = (90 * Math.PI) / 180
// torusMesh.castShadow = true;
// torusMesh.name = "TORUS#0";
// scene.add(torusMesh)


// //--- TORUS_KNOT
// const torusKGeo = new THREE.TorusKnotGeometry()
// const torusKnot = new THREE.Mesh(torusKGeo, material_2A)
// scene.add(torusKnot)



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