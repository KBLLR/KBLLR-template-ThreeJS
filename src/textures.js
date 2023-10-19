import * as THREE from "three"
import { topics } from "./data/topics.js"


class TextureGenerator {
  constructor() {
    this.uiTitle = document.getElementById("ui-title")
    this.uiColTitle = document.getElementById("ui-Col-Title")
    this.Template = "https://unsplash.com/photos/QwoNAhbmLLo"
    this.anisotropyLevel = 16
    this.wildCard = null
    this.currentTopicIndex = 0

    this.collectionTitles = [
      "Cosmic Wonders",
      "Vivid Hues",
      "Textured Realms",
      "Substance Universe",
      "Metallic Marvels",
      "Rock Solid",
      "Material Worlds",
      "Liquid Dreams",
      "Geometric Poetry",
      "Pattern Parade",
      "Fractal Odyssey",
      "Geometry Gazette",
      "Physics Phenomena",
      "Material States",
      "Gaseous Marvels",
      "Substances of Wonder",
      "Melodic Metals",
      "Rocks and Minerals",
      "Masterful Materials",
      "Luscious Liquids",
      "Shapes and Shadows",
      "Patterns in Time",
    ]
  }
  updateUITitle() {
    const currentCollection = this.collectionTitles[this.currentTopicIndex]
    this.uiTitle.textContent = currentCollection;
    
    const randomWordElement = document.getElementById("random-word");
    const randomWord = this.getRandomWordFromCollection(currentCollection);
    randomWordElement.textContent = randomWord;
  }

  getRandomTopic() {
    const topicArray = topics[this.currentTopicIndex];
    if (!topicArray || topicArray.length === 0) {
      console.error("Invalid or empty topic array.");
      return null;
    }
    return topicArray[Math.floor(Math.random() * topicArray.length)];
  }

  populateElement() {
    this.wildCard = this.getRandomTopic();
    if (this.wildCard) {
      this.uiTitle.textContent = this.wildCard;
    }
  }

  g_texture(wildcard = "topic", repeat = 2) {
    const path = `https://source.unsplash.com/random/?${wildcard}`
    const preload = new THREE.TextureLoader().load(
      path ? path : this.Template,
      (e) => {
        e.mapping = THREE.EquirectangularRefractionMapping
        e.anisotropy = this.anisotropyLevel
        e.magFilter = THREE.NearestFilter
        e.minFilter = THREE.LinearMipmapLinearFilter
        e.wrapS = e.wrapT = THREE.MirroredRepeatWrapping
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

export { TextureGenerator };
