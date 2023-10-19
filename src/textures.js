import * as THREE from 'three';
import { miscTopics } from "./data/topics.js";

class TextureGenerator {
  constructor() {
    this.uiTitle = document.getElementById("ui-title");
    this.Template = "https://unsplash.com/photos/QwoNAhbmLLo";
    this.anisotropyLevel = 16;
    this.wildCard = null;
  }

  populateElement() {
    this.wildCard = miscTopics[Math.floor(Math.random() * miscTopics.length)];
    this.uiTitle.textContent = this.wildCard;
  }

  g_texture(wildcard = "topic", repeat = 4) {
    const path = `https://source.unsplash.com/random/?${wildcard}`;
    const preload = new THREE.TextureLoader().load(
      path ? path : this.Template,
      (e) => {
        e.mapping = THREE.EquirectangularRefractionMapping;
        e.anisotropy = this.anisotropyLevel;
        e.magFilter = THREE.NearestFilter;
        e.minFilter = THREE.LinearMipmapLinearFilter;
        e.wrapS = e.wrapT = THREE.MirroredRepeatWrapping;
        e.type = THREE.HalfFloatType;
        e.format = THREE.RGBAFormat;
        e.repeat.set(repeat, repeat);
        e.dispose();
      }
    );
    console.log(preload);
    return preload;
  }
}

// Export the TextureGenerator class
export { TextureGenerator };