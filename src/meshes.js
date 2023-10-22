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


const meshPhysicalMaterialParameters = {
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



export function createMesh(geometry, material) {
  return new THREE.Mesh(geometry, material)
}

const textureGenerator = new TextureGenerator();
const initialTexture = textureGenerator.i_texture(TextureGenerator.wildcard, 1)


  const meshPhysicalMaterial = new THREE.MeshPhysicalMaterial({
  ...meshPhysicalMaterialParameters,
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
})  

export const meshes = {}
// Initialize Meshes
export function initializeMeshes() {
  torusKMesh : createMesh(geometries.torusKG, meshPhysicalMaterial)
  sphereMesh : createMesh(geometries.sphereG, meshPhysicalMaterial)
  cubeMesh : createMesh(geometries.cubeG, meshPhysicalMaterial)
  cylinderMesh : createMesh(geometries.cylinderG, meshPhysicalMaterial)
  coneMesh : createMesh(geometries.coneG, meshPhysicalMaterial)
  torusMesh : createMesh(geometries.torusG, meshPhysicalMaterial)
  planeMesh : createMesh(geometries.planeG, meshPhysicalMaterial)
  ringMesh : createMesh(geometries.ringG, meshPhysicalMaterial)
}

// Update Meshes with New Texture
export function updateMeshes(newTexture) {
  for (const meshName in meshes) {
    if (meshes.hasOwnProperty(meshName)) {
      const mesh = meshes[meshName];
      for (const mapName in newTexture) {
        if (newTexture.hasOwnProperty(mapName)) {
          mesh.material[mapName] = newTexture[mapName];
        }
      }
    }
  }
}

const position = (0,0,0)
const scale = (0,0,0)
const rotation = (0,0,0)
// Initialization
initializeMeshes(position, scale, rotation)
// Export Mesh Objects
export const { torusKMesh, sphereMesh, cubeMesh,cylinderMesh,coneMesh,torusMesh,planeMesh,ringMesh,} = meshes