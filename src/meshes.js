import { TextureGenerator } from "./textures.js"
import * as THREE from 'three'

const textureGenerator = new TextureGenerator()
textureGenerator.populateElement()

const myTexture = textureGenerator.g_texture("your-topic", 4)

//------------------------------------------------------------------------------ ◉
const cubeParams = {
  width: 1,
  height: 1,
  depth: 10,
  widthSegments: 10,
  heightSegments: 1,
  depthSegments: 1,
}
const circleParams = {
  radius: 1,
  segments: 32,
  thetaStart: 0,
  thetaLength: Math.PI * 2,
}
const coneParams = {
  radius: 1,
  height: 1,
  radialSegments: 32,
  heightSegments: 1,
  openEnded: false,
}
const cylinderParams = {
  radiusTop: 1,
  radiusBottom: 1,
  height: 10,
  radialSegments: 32,
  heightSegments: 1,
  openEnded: false,
}
const planeParams = {
  width: 1,
  height: 1,
  widthSegments: 1,
  heightSegments: 1,
}
const ringParams = {
  innerRadius: 0.5,
  outerRadius: 1,
  thetaSegments: 32,
  phiSegments: 1,
  thetaStart: 0,
  thetaLength: Math.PI * 2,
}
const sphereParams = {
  radius: 1,
  widthSegments: 32,
  heightSegments: 32,
  phiStart: 1,
  phiLength: Math.PI,
  thetaStart: 0,
  thetaLength: Math.PI * 2,
}
const torusParams = {
  radius: 10,
  tube: 10.15,
  radialSegments: 32,
  tubularSegments: 32,
  arc: Math.PI * 2,
}
const torusKParams = {
  radius: 14,
  tube: 0.19,
  radialSegments: 62,
  tubularSegments: 92,
  p: 22,
  q: 53,
  heightScale: 10,
}
//------------------------------------------------------------------------------ ◉

// Cube
const cubeG = new THREE.BoxGeometry(cubeParams.width,cubeParams.height,cubeParams.depth,cubeParams.widthSegments,cubeParams.heightSegments,cubeParams.depthSegments)

// Sphere
const sphereG = new THREE.SphereGeometry(
  sphereParams.radius,
  sphereParams.widthSegments,
  sphereParams.heightSegments,
  sphereParams.phiStart,
  sphereParams.phiLength,
  sphereParams.thetaStart,
  sphereParams.thetaLength
)

// Cone
const coneG = new THREE.ConeGeometry(coneParams.radius,coneParams.height,coneParams.radialSegments,coneParams.heightSegments,coneParams.openEnded)

// Torus
const torusG = new THREE.TorusGeometry(
  torusParams.radius,
  torusParams.tube,
  torusParams.radialSegments,
  torusParams.tubularSegments,
  torusParams.arc
)

// TorusK
const torusKG = new THREE.TorusKnotGeometry(
  torusKParams.radius,
  torusKParams.tube,
  torusKParams.radialSegments,
  torusKParams.tubularSegments,
  torusKParams.p,
  torusKParams.q,
  torusKParams.heightScale
)

// Plane
const planeG = new THREE.PlaneGeometry(
  planeParams.width,
  planeParams.height,
  planeParams.widthSegments,
  planeParams.heightSegments
)

// Cylinder
const cylinderG = new THREE.CylinderGeometry(
  cylinderParams.radiusTop,
  cylinderParams.radiusBottom,
  cylinderParams.height,
  cylinderParams.radialSegments,
  cylinderParams.heightSegments,
  cylinderParams.openEnded
)
//------------------------------------------------------------------------------ ◉
const circleG = new THREE.CircleGeometry(circleParams.radius,circleParams.segments,circleParams.thetaStart,circleParams.thetaLength)
//------------------------------------------------------------------------------ ◉

const ringG = new THREE.RingGeometry(
  ringParams.innerRadius,
  ringParams.outerRadius,
  ringParams.thetaSegments,
  ringParams.phiSegments,
  ringParams.thetaStart,
  ringParams.thetaLength
)

const spriteParams = {
  material: new THREE.SpriteMaterial(),
  scale: new THREE.Vector2(1, 1),
}
const spriteG = new THREE.Sprite(spriteParams)

//------------------------------------------------------------------------------ ◉

//------------------------------------------------------------------------------ ◉

const wildMapMisc = textureGenerator.g_texture(textureGenerator.wildCard, 4)

//------------------------------------------------------------------------------ ◉
const MeshPhysicalMaterialParameters = {
  attenuationDistance: 10.0,
  emissive: 0x000,
  emissiveIntensity: 1.0,
  aoMapIntensity: 1.0,
  envMapIntensity: 2,
  reflectivity: 1.2,
  normalScale: new THREE.Vector2(4, 4),
  metalness: 0.05,
  roughness: 0.3,
  sheen: 0.4,
  sheenRoughness: 0.1,
  transmission:1.0,
  ior: 2.0,
  opacity: 1.0,
  clearcoat: 0.8,
  clearcoatRoughness: 0.1,
  clearcoatNormalScale: new THREE.Vector2(0.2, 0.2),
  displacementScale: 0.9,
  displacementBias: 0.3,
  flatShading: false,
  side: THREE.DoubleSide,
  transparent: true,
  wireframe: false,
  wireframeLinewidth: 1,
  fog: true,
  precision: "highp",
}
const MeshPhysicalMaterialParams = {
  ...MeshPhysicalMaterialParameters,
  map: wildMapMisc,
  emissiveMap: wildMapMisc,
  aoMap: wildMapMisc,
  envMap: wildMapMisc,
  normalMap: wildMapMisc,
  metalnessMap: wildMapMisc,
  roughnessMap: wildMapMisc,
  displacementMap: wildMapMisc,
  clearcoatNormalMap: wildMapMisc,
  sheenColorMap: wildMapMisc,

}
//------------------------------------------------------------------------------ ◉

const MeshBasicMaterialParameters = {
  color: 0xffffff,
  opacity: 1.0,
  transparent: false,
  wireframe: false,
  wireframeLinewidth: 1,
  fog: true,
  precision: "highp",
  side: THREE.DoubleSide,
}
const MeshBasicMaterialParams = {
  ...MeshBasicMaterialParameters,
  map: wildMapMisc,
  alphaMap: wildMapMisc,
  specularMap: wildMapMisc,
  aoMap: wildMapMisc,
  envMap: wildMapMisc,
}
//------------------------------------------------------------------------------ ◉

const MeshLambertMaterialParameters = {
  color: 0xffffff,
  opacity: 0.5,
  transparent: true,
  wireframe: true,
  wireframeLinewidth: 10,
  fog: false,
  precision: "highp",
  flatShading: false,
  side: THREE.DoubleSide,
}
const MeshLambertMaterialParams = {
  ...MeshLambertMaterialParameters,
  map: wildMapMisc,
  emissiveMap: wildMapMisc,
  aoMap: wildMapMisc,
  envMap: wildMapMisc,
  normalMap: wildMapMisc,
  displacementMap: wildMapMisc,
}
//------------------------------------------------------------------------------ ◉

const MeshPhongMaterialParameters = {
  color: 0xffffff,
  opacity: 1.0,
  transparent: false,
  wireframe: false,
  wireframeLinewidth: 1,
  fog: true,
  precision: "highp",
}
const MeshPhongMaterialParams = {
  ...MeshPhongMaterialParameters,
  map: wildMapMisc,
  emissiveMap: wildMapMisc,
  aoMap: wildMapMisc,
}
//------------------------------------------------------------------------------ ◉

const MeshStandardMaterialParameters = {
  emissive: 0x000,
  emissiveIntensity: 0.5,
  aoMapIntensity: 1.0,
  envMapIntensity: 2,
  normalScale: new THREE.Vector2(4, 4),
  metalness: 0.05,
  roughness: 0.2,
  opacity: 1.0,
  displacementScale: 0.3,
  displacementBias: 1.3,
  flatShading: false,
  side: THREE.DoubleSide,
  precision: "highp",
}
const MeshStandardMaterialParams = {
  ...MeshStandardMaterialParameters,
  map: wildMapMisc,
  emissiveMap: wildMapMisc,
  aoMap: wildMapMisc,
  envMap: wildMapMisc,
  normalMap: wildMapMisc,
  displacementMap: wildMapMisc,
}

//------------------------------------------------------------------------------ ◉
const MeshStandardMaterial = new THREE.MeshStandardMaterial(MeshStandardMaterialParams)
const MeshPhongMaterial = new THREE.MeshPhongMaterial(MeshPhongMaterialParams)
const MeshLambertMaterial = new THREE.MeshLambertMaterial(MeshLambertMaterialParams)
const MeshBasicMaterial = new THREE.MeshBasicMaterial(MeshBasicMaterialParams)
const MeshPhysicalMaterial = new THREE.MeshPhysicalMaterial(MeshPhysicalMaterialParams)
//------------------------------------------------------------------------------ ◉

//------------------------------------------------------------------------------ ◉
export const torusKMesh = new THREE.Mesh(torusKG, MeshPhysicalMaterial)
export const sphereMesh = new THREE.Mesh(sphereG, MeshPhysicalMaterial)
export const cubeMesh = new THREE.Mesh(cubeG, MeshPhysicalMaterial)
export const cylinderMesh = new THREE.Mesh(cylinderG, MeshLambertMaterial)
export const coneMesh = new THREE.Mesh(coneG, MeshStandardMaterial)
export const torusMesh = new THREE.Mesh(torusG, MeshPhysicalMaterial)
export const planeMesh = new THREE.Mesh(planeG, MeshBasicMaterial)
//------------------------------------------------------------------------------ ◉
