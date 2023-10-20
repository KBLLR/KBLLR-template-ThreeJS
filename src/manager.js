import * as THREE from 'three'


class loadingManager {
  constructor() {
    this.loadingManager = new THREE.LoadingManager();
    this.loadingManager.onStart = this.onStart;
    this.loadingManager.onLoad = this.onLoad;
    this.loadingManager.onProgress = this.onProgress;
    this.loadingManager.onError = this.onError;
    this.loadingManager.setURLModifier(this.setURLModifier);
    this.loadingManager.setPathPrefix('src/static/');
    this.loadingManager.loadHDRTexture = this.loadHDRTexture;
  }

  onStart(url, itemsLoaded, itemsTotal) {
    console.log(
      `Started loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`
    );
  }

  onLoad() {
    console.log('Loading complete!')
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
    const loader = new RGBELoader(this.manager)
    loader.setDataType(THREE.UnsignedByteType)
    loader.setPath('src/static/hdr/')
    loader.load(url, (hdrTexture) => {
      scene.background = hdrTexture
      onLoad(hdrTexture)
    },onProgress, onError)
  }
}

export default loadingManager
