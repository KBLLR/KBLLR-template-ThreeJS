import * as THREE from 'three';
import axios from 'axios';

class TextureGenerator {
  constructor() {
    this.uiTitle = document.getElementById("ui-title");
    this.uiColTitle = document.getElementById("ui-col-title");
    this.Template = "https://unsplash.com/photos/QwoNAhbmLLo";
    this.anisotropyLevel = 16;
    this.wildCard = null;
    this.currentTopicIndex = 0;
  }

  async generateImage(prompt) {
    try {
      const response = await axios.post('http://localhost:3000/image', { prompt: prompt });
      return response.data;
    } catch (error) {
      console.error('Error generating image:', error);
      return null;
    }
  }

  async g_texture(wildcard = "topic", repeat = 8) {  // Corrected repeat argument default value syntax
    const textPrompt = wildcard === "topic" ? this.getRandomTopic() : wildcard;
    const imageURL = await this.generateImage(textPrompt);
    
    if (!imageURL) {
      console.error('Failed to generate image.');
      return null;
    }

    const preload = new THREE.TextureLoader().load(
      imageURL,
      (e) => {
        e.mapping = THREE.EquirectangularRefractionMapping;
        e.anisotropy = this.anisotropyLevel;
        e.magFilter = THREE.NearestFilter;
        e.minFilter = THREE.LinearMipmapLinearFilter;
        e.wrapS = e.wrapT = THREE.MirroredRepeatWrapping;
        e.type = THREE.HalfFloatType;
        e.format = THREE.RGBAFormat;
        e.repeat.set(repeat, repeat);
        e.generateMipmaps = true;
        e.needsUpdate = true;
        // Removed e.dispose() as it would dispose of the texture immediately after loading.
      }
    );
    console.log(preload);
    return preload;
  }
}

export { TextureGenerator };
