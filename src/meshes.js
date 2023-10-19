import { TextureGenerator } from "./textures.js"
import * as THREE from 'three'

const textureGenerator = new TextureGenerator();
textureGenerator.populateElement();

const myTexture = textureGenerator.g_texture("your-topic", 4);

export default class ObjectMesh {
  constructor(geometry, material) {
    this.geometry = geometry;
    this.material = material;
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = Boolean; // Use true to enable shadow casting
    this.mesh.receiveShadow = Boolean; // Use true to enable shadow receiving

    // Initialize other properties if needed
    this.position = new THREE.Vector3();
    this.quaternion = new THREE.Quaternion();
    this.scale = new THREE.Vector3(1, 1, 1);
  }

  update() { // This method should be used to update the mesh's properties
    this.mesh.position.copy(this.position);
    this.mesh.quaternion.copy(this.quaternion);
    this.mesh.scale.copy(this.scale);
  } 

  dispose() {} // This method should be used to release resources
  
  getBoundingBox() {} // Implement logic to retrieve the bounding box of the mesh
  
  getBoundingSphere() {} // Implement logic to retrieve the bounding sphere of the mesh

  getGeometry() {
    return this.geometry; // Return the geometry of the mesh
  }

  getMaterial() {
    return this.material; // Return the material of the mesh
  }

  getMesh() {
    return this.mesh; // Return the entire mesh
  }

  getVertices() {} // Implement logic to retrieve the vertices of the mesh if needed
}
//------------------------------------------------------------------------------ ◉
 const cubeG = new THREE.BoxGeometry({
  width: 1,
  height: 1,
  depth: 1,
  widthSegments: 1,
  heightSegments: 1,
  depthSegments: 1,
})
 const circleG = new THREE.CircleGeometry({
  radius: 1,
  segments: 32,
  thetaStart: 0,
  thetaLength: Math.PI * 2,
})
 const coneG = new THREE.ConeGeometry({
  radius: 1,
  height: 1,
  radialSegments: 32,
  heightSegments: 1,
  openEnded: false,
})
 const cylinderG = new THREE.CylinderGeometry({
  radiusTop: 1,
  radiusBottom: 1,
  height: 1,
  radialSegments: 32,
  heightSegments: 1,
  openEnded: false,
})
 const planeG = new THREE.PlaneGeometry({
  width: 1,
  height: 1,
  widthSegments: 1,
  heightSegments: 1,
})
 const ringG = new THREE.RingGeometry({
  innerRadius: 0.5,
  outerRadius: 1,
  thetaSegments: 32,
  phiSegments: 1,
  thetaStart: 0,
  thetaLength: Math.PI * 2,
})
 const sphereG = new THREE.SphereGeometry({
  radius: 1,
  widthSegments: 32,
  heightSegments: 32,
  phiStart: 0,
  phiLength: Math.PI,
  thetaStart: 0,
  thetaLength: Math.PI * 2,
})
 const torusG = new THREE.TorusGeometry({
  radius: 1,
  tube: 0.45,
  radialSegments: 32,
  tubularSegments: 32,
  arc: Math.PI * 2,
})
 const torusKG =  new THREE.TorusKnotGeometry({
  radius: 1,
  tube: 0.45,
  radialSegments: 32,
  tubularSegments: 32,
  p: 2,
  q: 3,
  heightScale: 1,
})
 const spriteG = new THREE.Sprite({
  material: new THREE.SpriteMaterial(),
  scale: new THREE.Vector2(1, 1),
})
//------------------------------------------------------------------------------ ◉
const standardMaps = new THREE.MeshStandardMaterial({
  map: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  emissiveMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  aoMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  envMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  normalMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  metalnessMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  roughnessMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  displacementMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  displacementMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
})
const physicalMaps = new THREE.MeshPhysicalMaterial({
  map: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  emissiveMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  aoMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  envMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  normalMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  metalnessMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  roughnessMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  clearcoatRoughnessMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  clearcoatNormalMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  displacementMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  sheenRoughnessMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  sheenColorMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
})
 const basicMaps = new THREE.MeshBasicMaterial({
  map: textureGenerator.g_texture(textureGenerator.wildCard, 4),  
  alphaMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  specularMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  aoMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  envMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
})
const lambertMaps = new THREE.MeshLambertMaterial({
  map: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  emissiveMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  aoMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  envMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  normalMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  displacementMap: textureGenerator.g_texture(textureGenerator.wildCard, 4)
})
const phongMaps = new THREE.MeshPhongMaterial({
  map: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  emissiveMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
  aoMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
})
// const shaderMaps = new THREE.ShaderMaterial({
//   uniforms: {
//     time: { value: 0 },
//     resolution: { value: new THREE.Vector2() },
//     mouse: { value: new THREE.Vector2() },
//     date: { value: new THREE.Vector2() },
//     frameCount: { value: 0 },
//     cameraPosition: { value: new THREE.Vector3() },
//     cameraRotation: { value: new THREE.Vector3() },
//     cameraDirection: { value: new THREE.Vector3() },
//     cameraNear: { value: 0.1 },
//     cameraFar: { value: 1000 },
//     cameraFOV: { value: 75 },
//     cameraAspect: { value: 1 },
//     cameraZoom: { value: 1 },
//     cameraFocus: { value: 0 },
//     cameraTarget: { value: new THREE.Vector3() },
//     cameraViewport: { value: new THREE.Vector4() },
//     cameraResolution: { value: new THREE.Vector2() },
//     cameraFocalLength: { value: 0.01 },
//     cameraFilmGauge: { value: 0.98 },
//     cameraFilmOffset: { value: 0.02 },
//     cameraFilmWidth: { value: 0.02 },
//     cameraFilmHeight: { value: 0.02 },
//     cameraFilmSpeed: { value: 0},
//     cameraFilmNoise: { value: 0},
//     cameraFilmGrain: { value: 0},
//     cameraFilmGrainSize: { value: 0},
//     cameraFilmGrainRandom: { value: 0},
//     cameraFilmExposure: { value: 0},
//     cameraFilmExposureMax: { value: 0},
//     cameraFilmExposureMin: { value: 0},
//     cameraFilmContrast: { value: 0},
//     cameraFilmContrastMax: { value: 0},
//     cameraFilmContrastMin: { value: 0},
//     cameraFilmExposure: { value: 0},
//     cameraFilmExposureBias: { value: 0},
//     cameraFilmBlur: { value: 0},
//     cameraFilmBlurAmount: { value: 0},
//     cameraFilmBlurRadius: { value: 0},
//     cameraFilmBlurSTD: { value: 0},
//     cameraFilmBlurIntensity: { value: 0},
//     cameraFilmBlurDepth: { value: 0},
//     cameraFilmBlurChroma: { value: 0},
//     cameraFilmBlurChromaAmount: { value: 0},
//     cameraFilmBlurChromaRadius: { value: 0},
//     cameraFilmBlurChromaSTD: { value: 0},
//     cameraFilmBlurChromaIntensity: { value: 0},
//     cameraFilmBlurChromaDepth: { value: 0},
//     cameraFilmBlurChromaThreshold: { value: 0},
//     cameraFilmBlurChroma: { value: 0}
//     },
//     // vertexShader: document.getElementById("vertexshader").textContent,
//     // fragmentShader: document.getElementById("fragmentshader").textContent,
//     side: THREE.DoubleSide,
//     fog: true,
//     lights: true,
//     precision: "highp",
//     flatShading: false,
//     wireframe: false,
//     wireframeLinewidth: 1,
//     vertexColors: false,
//     skinning: false,
//     morphTargets: false,
//     morphNormals: false,
//     fog: false,
//     shading: THREE.SmoothShading,
//     vertexTangents: false,
//     map: textureGenerator.g_texture(textureGenerator.wildCard, 4),
//     alphaMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
//     specularMap: textureGenerator.g_texture(textureGenerator.wildCard, 4),
//     aoMap: textureGenerator.g_texture(textureGenerator.wildCard, 4)
// })
//------------------------------------------------------------------------------ ◉

let MaterialPARAMS =
{
    MeshPhysicalMaterialParameters: {
        attenuationDistance: 2.0,
        emissive: 0x000,
        emissiveIntensity: 1.0,
        aoMapIntensity: 1.0,
        envMapIntensity: 6,
        reflectivity: 1.2,
        normalScale: new THREE.Vector2(4, 4),
        metalness: 0.05,
        roughness: 0.2,
        sheen: 1.0,
        sheenRoughness: 0.5,
        ior: 1.5,
        opacity: 1.0,
        clearcoat: 0.8,
        clearcoatRoughness: 0.5,
        clearcoatNormalScale: new THREE.Vector2(0.2, 0.2),
        displacementScale: 0.3,
        displacementBias: 1.3,
        flatShading: false,
        side: THREE.DoubleSide,
        precision: "highp",
    },
    MeshBasicMaterialParameters: {
        color: 0xffffff,
        opacity: 1.0,
        transparent: false,
        wireframe: false,
        wireframeLinewidth: 1,
        fog: true,
        lights: true,
        precision: "highp",
        flatShading: false,
        side: THREE.DoubleSide,
    }
}

let TexturePARAMS = 
{
    format: "RGBFormat",
    type: "UnsignedByteType",
    encoding: "LinearEncoding",
    generateMipmaps: true,
    flipY: false,
    anisotropy: 16,
    minFilter: THREE.LinearMipMapLinearFilter,
    magFilter: {
        "5126": THREE.NearestFilter,
        "default": THREE.LinearFilter
    },
    wrapS: {
        "5126": THREE.ClampToEdgeWrapping,
        "default": THREE.RepeatWrapping
    },
    wrapT: {
        "5126": THREE.ClampToEdgeWrapping,
        "default": THREE.RepeatWrapping
    },
    depthTexture: {
        "5126": THREE.DepthTexture,
        "default": THREE.UnsignedShortType
    },
    unpackAlignment: 1,
    textureQuality: 0,
    textureLOD: true,
    generateMipmaps: true,
    premultiplyAlpha: true,
    preserveDrawingBuffer: false,
    depthWrite: true,
    stencilWrite: false,
    alphaTest: 0,
    polygonOffset: false,
    polygonOffsetFactor: 0,
    polygonOffsetUnits: 0,
    precision: "highp",
}
//------------------------------------------------------------------------------ ◉
const torusKMesh = new ObjectMesh(torusKG, physicalMaps)
const sphereMesh = new ObjectMesh(sphereG, physicalMaps)
const cubeMesh = new ObjectMesh(cubeG, physicalMaps)
const cylinderMesh = new ObjectMesh(cylinderG, physicalMaps)
const coneMesh = new ObjectMesh(coneG, standardMaps)
const torusMesh = new ObjectMesh(torusG, physicalMaps)
const planeMesh = new ObjectMesh(planeG, basicMaps)
//------------------------------------------------------------------------------ ◉
export const torusKComponent = torusKMesh.material.setValues(MaterialPARAMS.physicalPARAMS)
export const cylinderComponent = cylinderMesh.material.setValues(MaterialPARAMS.physicalPARAMS)
export const torusComponent = torusMesh.material.setValues(MaterialPARAMS.physicalPARAMS)
export const sphereComponent = sphereMesh.material.setValues(MaterialPARAMS.physicalPARAMS)
export const cubeComponent = cubeMesh.material.setValues(MaterialPARAMS.physicalPARAMS)
export const planeComponent = planeMesh.material.setValues(MaterialPARAMS.basicPARAMS)
export const coneComponent = coneMesh.material.setValues(MaterialPARAMS.basicPARAMS)
