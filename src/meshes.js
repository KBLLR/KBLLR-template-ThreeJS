import * as THREE from 'three'
import { geometries } from './geometries.js'
import { TextureGenerator } from './textureGenerator.js'

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
// const MeshBasicMaterialParams = {
//   ...MeshBasicMaterialParameters,
//   map: wildMapMisc,
//   alphaMap: wildMapMisc,
//   specularMap: wildMapMisc,
//   aoMap: wildMapMisc,
//   envMap: wildMapMisc,
// }
// //------------------------------------------------------------------------------ ◉

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
// const MeshLambertMaterialParams = {
//   ...MeshLambertMaterialParameters,
//   map: wildMapMisc,
//   emissiveMap: wildMapMisc,
//   aoMap: wildMapMisc,
//   envMap: wildMapMisc,
//   normalMap: wildMapMisc,
//   displacementMap: wildMapMisc,
// }
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
// const MeshPhongMaterialParams = {
//   ...MeshPhongMaterialParameters,
//   map: wildMapMisc,
//   emissiveMap: wildMapMisc,
//   aoMap: wildMapMisc,
// }
//------------------------------------------------------------------------------ ◉

const MeshStandardMaterialParameters = {
  emissive: 0x000,
  emissiveIntensity: 1.0,
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
// const MeshStandardMaterialParams = {
//   ...MeshStandardMaterialParameters,
//   map: wildMapMisc,
//   emissiveMap: wildMapMisc,
//   aoMap: wildMapMisc,
//   envMap: wildMapMisc,
//   normalMap: wildMapMisc,
//   displacementMap: wildMapMisc,
// }

//------------------------------------------------------------------------------ ◉


const MeshPhysicalMaterialParameters = {
  attenuationDistance: 1.0,
  attenuationColor: new THREE.Color(0xF5F5F5),
  color: 0xffffff,
  emissive: 0x000,
  emissiveIntensity: 1.0,
  aoMapIntensity: 0.2,
  envMapIntensity: 1.0,
  reflectivity: 0.5,
  normalScale: new THREE.Vector2(-1.0, 1.0),
  metalness: 0.05,
  roughness: 0.3,
  sheen: 0.4,
  sheenColor: new THREE.Color(0xffffff/1.0),
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

let meshPhysicalMaterial;

const initialTextureGenerator = new TextureGenerator()

export function initializeMeshes() {
  const initialTexture = initialTextureGenerator.i_texture(TextureGenerator.wildcard, (1, 4))
  meshPhysicalMaterial = new THREE.MeshPhysicalMaterial({
    map: initialTexture,
    emissiveMap: initialTexture,
    aoMap: initialTexture,
    envMap: initialTexture,
    normalMap: initialTexture,
    metalnessMap: initialTexture,
    roughnessMap: initialTexture,
    displacementMap: initialTexture,
    clearcoatNormalMap: initialTexture,
    sheenColorMap: initialTexture,
    ...MeshPhysicalMaterialParameters,
  });
}

export function updateMeshes(newTexture) {
  // Set the new texture to the map property of meshPhysicalMaterial
  meshPhysicalMaterial.map = newTexture;
  meshPhysicalMaterial.emissiveMap = newTexture
  meshPhysicalMaterial.aoMap = newTexture
  meshPhysicalMaterial.envMap = newTexture
  meshPhysicalMaterial.normalMap = newTexture
  meshPhysicalMaterial.metalnessMap = newTexture
  meshPhysicalMaterial.roughnessMap = newTexture
  meshPhysicalMaterial.displacementMap = newTexture
  meshPhysicalMaterial.clearcoatNormalMap = newTexture
  meshPhysicalMaterial.sheenColorMap = newTexture

  planeMesh.material = meshPhysicalMaterial
  torusMesh.material = meshPhysicalMaterial
  torusKMesh.material = meshPhysicalMaterial
  cubeMesh.material = meshPhysicalMaterial
  cylinderMesh.material = meshPhysicalMaterial
  coneMesh.material = meshPhysicalMaterial
  ringMesh.material = meshPhysicalMaterial
}

export const torusKMesh = new THREE.Mesh(geometries.torusKG, meshPhysicalMaterial);
export const sphereMesh = new THREE.Mesh(geometries.sphereG, meshPhysicalMaterial);
export const cubeMesh = new THREE.Mesh(geometries.cubeG, meshPhysicalMaterial);
export const cylinderMesh = new THREE.Mesh(geometries.cylinderG, meshPhysicalMaterial);
export const coneMesh = new THREE.Mesh(geometries.coneG, meshPhysicalMaterial);
export const torusMesh = new THREE.Mesh(geometries.torusG, meshPhysicalMaterial);
export const planeMesh = new THREE.Mesh(geometries.planeG, meshPhysicalMaterial);
export const ringMesh = new THREE.Mesh(geometries.ringG, meshPhysicalMaterial);