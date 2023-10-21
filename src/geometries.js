import * as THREE from 'three'
import { geometryParams } from './data/data.js'

const cubeParams = geometryParams.cube
const sphereParams = geometryParams.sphere
const coneParams = geometryParams.cone
const torusParams = geometryParams.torus
const torusKParams = geometryParams.torusK
const planeParams = geometryParams.plane
const cylinderParams = geometryParams.cylinder
const circleParams = geometryParams.circle
const ringParams = geometryParams.ring

export const geometries = {
    cubeG: new THREE.BoxGeometry(
      cubeParams.width,
      cubeParams.height,
      cubeParams.depth,
      cubeParams.widthSegments,
      cubeParams.heightSegments,
      cubeParams.depthSegments
    ),
    sphereG: new THREE.SphereGeometry(
      sphereParams.radius,
      sphereParams.widthSegments,
      sphereParams.heightSegments,
      sphereParams.phiStart,
      sphereParams.phiLength,
      sphereParams.thetaStart,
      sphereParams.thetaLength
    ),
    coneG: new THREE.ConeGeometry(
      coneParams.radius,
      coneParams.height,
      coneParams.radialSegments,
      coneParams.heightSegments,
      coneParams.openEnded
    ),
    torusG: new THREE.TorusGeometry(
      torusParams.radius,
      torusParams.tube,
      torusParams.radialSegments,
      torusParams.tubularSegments,
      torusParams.arc
    ),
    torusKG: new THREE.TorusKnotGeometry(
      torusKParams.radius,
      torusKParams.tube,
      torusKParams.radialSegments,
      torusKParams.tubularSegments,
      torusKParams.p,
      torusKParams.q,
      torusKParams.heightScale
    ),
    planeG: new THREE.PlaneGeometry(
      planeParams.width,
      planeParams.height,
      planeParams.widthSegments,
      planeParams.heightSegments
    ),
    cylinderG: new THREE.CylinderGeometry(
      cylinderParams.radiusTop,
      cylinderParams.radiusBottom,
      cylinderParams.height,
      cylinderParams.radialSegments,
      cylinderParams.heightSegments,
      cylinderParams.openEnded
    ),
    circleG: new THREE.CircleGeometry(
      circleParams.radius,
      circleParams.segments,
      circleParams.thetaStart,
      circleParams.thetaLength
    ),
    ringG: new THREE.RingGeometry(
      ringParams.innerRadius,
      ringParams.outerRadius,
      ringParams.thetaSegments,
      ringParams.phiSegments,
      ringParams.thetaStart,
      ringParams.thetaLength
    ),
  }