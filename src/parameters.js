import * as THREE from "three"

export const TexturePARAMS = 
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

export let MaterialPARAMS =
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

export const controlPARAMS = {
    enabled: true,
    enableDamping: true,
    dampingFactor: 0.08,
    autoRotate: true,
    enableZoom: true,
    autoRotateSpeed: 1.2,
    minDistance: 0.01,
    maxDistance: 25,
    minPolarAngle: 0,
    maxPolarAngle: Math.PI / 2.1,
  }

  export const dirLightPARAMS = {
    color: 0xffffff,
    intensity: 4,
    distance: 10,
    decay: 2,
    shadow: {
      castShadow: true,
      mapSize: {
        width: 2048,
        height: 2048,
      },
      bias: 0.001,
      normalBias: 0.01,
      radius: 2,
    },
  }
  

export const spotLightPARAMS = {
    map: 'g_texture(wildCard, 2)',
    color: 0xffffff,
    intensity: 8,
    distance: 20,
    angle: Math.PI / 2.1,
    penumbra: 1,
    decay: 2,
    focus: 0.5,
    bias: 0.001,
    normalBias: 0.01,
    radius: 4,
  }
  
// export const hemiLightPARAMS = {
//   skyColor: hemiLightCategory.skyC,
//   groundColor: hemiLightCategory.groundC,
//   intensity: 0.05,
// }



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
