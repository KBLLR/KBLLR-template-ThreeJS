import { collectionTitles, topics } from './data/data.js';
import { TextureGenerator } from './textureGenerator.js';
import { updateMeshes } from './meshes.js'; // Import the function to update meshes

export class SearchBarUI {
    constructor(planeMesh) {
        this.inputWord = document.getElementById("inputWord");
        this.suggestions = document.getElementById("suggestions");
        this.textureGenerator = new TextureGenerator(); // Make sure to import the TextureGenerator class
        this.planeMesh = planeMesh; // Store the planeMesh
    }

    updateTextureAndMesh() {
        this.textureGenerator.updateUITitle();
        const wildMapMisc = this.textureGenerator.g_texture(this.textureGenerator.wildCard, 8);
        // Call the function to update the materials with the new texture maps
        updateMeshes(wildMapMisc);
    }


    init() {
        const randomInspirationButton = document.getElementById("generateRandomWord");
        randomInspirationButton.addEventListener("click", () => {
            this.updateTextureAndMesh();
        });

        this.inputWord.addEventListener("input", () => {
            const userInput = this.inputWord.value.trim();
            this.suggestions.innerHTML = "";

            if (userInput.length > 0) {
                const matchingTopics = topics.filter(topic => {
                    if (typeof topic === "string") { // Corrected the type check
                        return topic.toLowerCase().includes(userInput.toLowerCase());
                    }
                    return false;
                });

                matchingTopics.forEach(topic => {
                    const suggestionItem = document.createElement("div");
                    suggestionItem.textContent = topic;
                    suggestionItem.addEventListener("click", () => {
                        this.inputWord.value = topic;
                        this.suggestions.innerHTML = "";
                        this.updateTextureAndMesh();
                    });
                    this.suggestions.appendChild(suggestionItem);
                });
            }
        });

        const sendWordButton = document.getElementById("sendWord");
        sendWordButton.addEventListener("click", () => {
            const selectedWord = this.inputWord.value;
            console.log("Selected word: " + selectedWord);
            this.updateTextureAndMesh();
        });
    }
}
