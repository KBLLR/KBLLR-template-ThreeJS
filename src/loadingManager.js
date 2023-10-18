import * as THREE from 'three'

class Manager {
  constructor() {
    this.manager = new THREE.LoadingManager()
    this.manager.onStart = this.onStart
    this.manager.onLoad = this.onLoad
    this.manager.onProgress = this.onProgress
    this.manager.onError = this.onError
    this.manager.setURLModifier(this.setURLModifier)
    this.manager.setPathPrefix('src/assets/')
    this.manager.loadHDRTexture = this.loadHDRTexture
    this.manager.loadTexture = this.loadTexture
    this.manager.loadCubeMap = this.loadCubeMap
    this.manager.loadGLtf = this.loadGLtf
  }

  onStart(url, itemsLoaded, itemsTotal) {
    console.log(
      `Started loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`
    );
  }

  onLoad() {
    console.log('Loading complete!');
  }

  onProgress(url, itemsLoaded, itemsTotal) {
    console.log(
      `Loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`
    );
  }

  onError(url) {
    console.log(`There was an error loading ${url}`)
  }

  setURLModifier(url) {
    return url.replace('src/assets/', '')
  }

  loadHDRTexture(url, onLoad, onProgress, onError) {
    const loader = new THREE.RGBELoader(this.manager)
    loader.setDataType(THREE.UnsignedByteType)
    loader.setPath('src/assets/hdr/')
    loader.load(url, onLoad, onProgress, onError)
  }

  loadTextureCube(urls)

  loadGLtf(url, onLoad, onProgress, onError) {
    const loader = new THREE.GLTFLoader(this.manager)
    loader.load(url, onLoad, onProgress, onError)
  }

  loadTexture(url, onLoad, onProgress, onError) {
    const textureLoader = new THREE.TextureLoader(this.manager)
    textureLoader.load(url, onLoad, onProgress, onError);
  }

  loadCubeMap(urls, onLoad, onProgress, onError) {
    const cubeTextureLoader = new THREE.CubeTextureLoader(this.manager)
    cubeTextureLoader.setPath('src/assets/cubeMaps/')
    cubeTextureLoader.load(urls, onLoad, onProgress, onError)
  }
}

export default Manager;
