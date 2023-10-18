import * as THREE from "three";

export class Rendering {
  constructor(canvas, palette) {
    this.canvas = canvas;
    let hex = "#"+ palette.highlight.getHexString()
    document.documentElement.style.setProperty("--text", hex);

  ////////////////////////////////////////////////////////////////
// ✧ VIEWPORT + PIXEL DENSITY RADIUS

    this.vp = {
      canvas: {
        width: canvas.offsetWidth,
        height: canvas.offsetHeight,
        dpr: Math.min(window.devicePixelRatio, 2)
      },
      scene: {
        width: 1,
        height: 1
      },
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    }

  ////////////////////////////////////////////////////////////////
// ✧ RENDERER

      this.renderer = new THREE.WebGLRenderer({
        powerPreference: "high-performance",
        antialias: true,
        canvas,
        depth: true,
        alpha: true,
        stencil: true,
        preserveDrawingBuffer: false,
    });

    this.renderer.setSize(this.vp.canvas.width, this.vp.canvas.height, false);
    this.renderer.setPixelRatio(this.vp.canvas.dpr);

    ////////////////////////////////////////////////////////////////
// ✧ TONE MAPPING
// https://offscreencanvas.com/issues/webgl-tone-mapping/

    this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
		this.renderer.toneMappingExposure = 1;

    ////////////////////////////////////////////////////////////////
// ✧ CAMERA 

    this.camera = new THREE.PerspectiveCamera(
      50,
      this.vp.canvas.width / this.vp.canvas.height,
      0.01,
      1000
    );
    this.camera.position.set(0, 0,8);
    this.camera.lookAt(0, 0, 0);

    ////////////////////////////////////////////////////////////////
// ✧ LIGHTS

    //this.ambientLight = new THREE.AmbientLight(palette.highlight, 0.8)

  ////////////////////////////////////////////////////////////////
// ✧ SCENE

    this.scene = new THREE.Scene();
    this.scene.background = palette.BG.clone()

    this.fog = new THREE.FogExp2(0xffffff, 0.5);
    this.scene.fog 

    this.clock = new THREE.Clock();

    this.vp.scene = this.getViewSizeAtDepth();

    this.disposed = false;

    this.addEvents(); 
  }

  addEvents() {
    window.addEventListener("resize", this.onResize);
  }

  dispose() {
    this.disposed = true;
    window.removeEventListener("resize", this.onResize);
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.context = null;
    this.renderer.domElement = null;
    this.renderer = null
  }

  getViewSizeAtDepth(depth = 0) {
    const fovInRadians = (this.camera.fov * Math.PI) / 180;
    const height = Math.abs(
      (this.camera.position.z - depth) * Math.tan(fovInRadians / 2) * 2
    );
    return { width: height * this.camera.aspect, height };
  }

//-----✓ INITIALIZATION

  init() {
  }

   update() {
   // this.ambientLight.color.getHex
   }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onResize = () => {
    let canvas = this.canvas
    this.vp.canvas.width = canvas.offsetWidth;
    this.vp.canvas.height = canvas.offsetHeight;
    this.vp.canvas.dpr = Math.min(window.devicePixelRatio, 2);

    this.vp.scene.width = window.innerWidth;
    this.vp.scene.height = window.innerHeight;

    this.renderer.setSize(this.vp.canvas.width, this.vp.canvas.height, false);
    this.camera.aspect = this.vp.canvas.width / this.vp.canvas.height;
    this.camera.updateProjectionMatrix();

    this.vp.scene = this.getViewSizeAtDepth();
  }
}

// let a = new Demo(GL.canvas);
// a.init();