import { TextureGenerator } from "./textures.js"
import * as THREE from 'three'

const textureGenerator = new TextureGenerator()

const wildMapMisc = textureGenerator.g_texture("your-topic", 8)

//------------------------------------------------------------------------------ ◉
const cubeParams = {
  width: 1,
  height: 1,
  depth: 1,
  widthSegments: 10,
  heightSegments: 10,
  depthSegments: 100,
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
  widthSegments: 100,
  heightSegments: 100,
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
  tube: 1.15,
  radialSegments: 32,
  tubularSegments: 32,
  arc: Math.PI * 2,
}
const torusKParams = {
  radius: 10,
  tube: 4,
  radialSegments: 24,
  tubularSegments: 64,
  p: 8,
  q: 24,
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


const MeshPhysicalMaterialParameters = {
  attenuationDistance: 1.0,
  emissive: 0x000,
  emissiveIntensity: 1.0,
  aoMapIntensity: 0.2,
  envMapIntensity: 1.0,
  reflectivity: 0.5,
  normalScale: new THREE.Vector2(-1.0, 1.0),
  metalness: 0.05,
  roughness: 0.3,
  sheen: 0.4,
  sheenRoughness: 0.1,
  transmission:1.0,
  ior: 1.44,
  opacity: 1.0,
  clearcoat: 0.5,
  clearcoatRoughness: 0.1,
  clearcoatNormalScale: new THREE.Vector2(-0.1, 0.1),
  displacementScale: 0.9,
  displacementBias: -0.9,
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
export function updateMeshes(wildMapMisc) {
  // Update your material parameters with the new texture maps
  MeshPhysicalMaterialParams.map = wildMapMisc
  MeshPhysicalMaterialParams.emissiveMap = wildMapMisc
  MeshPhysicalMaterialParams.aoMap = wildMapMisc
  MeshPhysicalMaterialParams.envMap = wildMapMisc
  MeshPhysicalMaterialParams.normalMap = wildMapMisc
  MeshPhysicalMaterialParams.metalnessMap = wildMapMisc
  MeshPhysicalMaterialParams.roughnessMap = wildMapMisc
  MeshPhysicalMaterialParams.displacementMap = wildMapMisc
  MeshPhysicalMaterialParams.clearcoatNormalMap = wildMapMisc
  MeshPhysicalMaterialParams.sheenColorMap = wildMapMisc
}

const MeshPhysicalMaterial = new THREE.MeshPhysicalMaterial(MeshPhysicalMaterialParams)
//------------------------------------------------------------------------------ ◉

//------------------------------------------------------------------------------ ◉
export const torusKMesh = new THREE.Mesh(torusKG, MeshPhysicalMaterial)
export const sphereMesh = new THREE.Mesh(sphereG, MeshPhysicalMaterial)
export const cubeMesh = new THREE.Mesh(cubeG, MeshPhysicalMaterial)
export const cylinderMesh = new THREE.Mesh(cylinderG, MeshPhysicalMaterial)
export const torusMesh = new THREE.Mesh(torusG, MeshPhysicalMaterial)
export const planeMesh = new THREE.Mesh(planeG, MeshPhysicalMaterial)
//------------------------------------------------------------------------------ ◉
