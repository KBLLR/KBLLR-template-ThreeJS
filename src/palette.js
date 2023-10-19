import { Color } from "three";
import * as THREE from "three";
THREE.ColorManagement.enabled = false

export const paletteList = ["black", "pink", "aquamarine", "blue", "darkblue", "grey", "white", "orange"]

export const palettes = {
  black: {
    "index": 0,
    "accentPalette": "black",
    "id": "black",
    "BG":             new Color("#100f10"),
    "BGLight":        new Color("#2a282a"),
    "text":           new Color("#b9bec2"),
    "highlightHover": new Color("#cccccc"),
    "inactive":       new Color("#6d6d6d"),
    "highlight":      new Color("#ffffff")
  },
  pink: {
    "index": 1,
    "accentPalette": "black",
    "id": "pink",
    "text":           new Color("#f0dede"),
    "inactive":       new Color("#e39393"),
    "BG":             new Color("#db7676"),
    "highlightHover": new Color("#f3c6c6"),
    "BGLight":        new Color("#d55f5f"),
    "highlight":      new Color("#ffffff")
  },
  aquamarine: {
    "index": 2,
    "accentPalette": "black",
    "id": "aquamarine",
    "BGLight":        new Color("#66a2a5"),
    "text":           new Color("#e0f1f1"),
    "highlightHover": new Color("#b5d6d8"),
    "inactive":       new Color("#56979b"),
    "BG":             new Color("#7fb9bc"),
    "highlight":      new Color("#ffffff")
  },
  blue: {
    "index": 3,
    "accentPalette": "black",
    "id": "blue",
    "BG":             new Color("#5963fa"),
    "BGLight":        new Color("#424bd3"),
    "highlight":      new Color("#f6f6f4"),
    "text":           new Color("#d2daf3"),
    "highlightHover": new Color("#c1c3e9"),
    "inactive":       new Color("#7b82e7")
  },
  darkblue:{
    "index": 4,
    "accentPalette": "black",
    "id": "darkblue",
    "BGLight":        new Color("#2c4570"),
    "BG":             new Color("#446091"),
    "text":           new Color("#a4b8db"),
    "highlightHover": new Color("#9fbae9"),
    "highlight":      new Color("#e7e6e4"),
    "inactive":       new Color("#6580ad")
  },
  grey: {
    "index": 5,
    "accentPalette": "white",
    "id": "grey",
    "inactive":       new Color("#7c8598"),
    "BG":             new Color("#ebebeb"),
    "BGLight":        new Color("#bcc2c9"),
    "highlight":      new Color("#122438"),
    "text":           new Color("#2a3e53"),
    "highlightHover": new Color("#3c526a")
  },
  white: {
    "index": 6,
    "accentPalette": "white",
    "id": "white",
    "BG":             new Color("#ffffff"),
    "BGLight":        new Color("#dfdfdf"),
    "text":           new Color("#3d3d3d"),
    "highlightHover": new Color("#333333"),
    "inactive":       new Color("#8d8d8d"),
    "highlight":      new Color("#000000"),
  },
  orange: {
    "index": 7,
    "accentPalette": "black",
    "id": "orange",
    "BG":             new Color("#f5e1ce"),
    "BGLight":        new Color("#f1d7c0"),
    "highlight":      new Color("#f04924"),
    "text":           new Color("#ff7657"),
    "highlightHover": new Color("#fd6e4e"),
    "inactive":       new Color("#ebaf92")
  }
}

export const sinPalettes = {
  black: {
    c0: new Color(0x404040),
    c1: new Color(0xcef316),
    c2: new Color(0x815903),
    c3: new Color(0xae00ff),
  },
  pink: {
    c0: new Color(0x949494),
    c1: new Color(0x9ccd32),
    c2: new Color(0x835a01),
    c3: new Color(0x7b6f80),
  },
  aquamarine: {
    c0: new Color(0x7df96c),
    c1: new Color(0xaccd32),
    c2: new Color(0x8f7338),
    c3: new Color(0xf52ee5),
  },
  blue: {
    c0: new Color(0.8 , 0.95, 0.4),
    c1: new Color(0.5 , 0.5, 0.35),
    c2: new Color(0.1 , 0.5, 0.4),
    c3: new Color(0   , 0, 0.85),
  },
  darkblue: {
    c0: new Color(0xd8e3ba),
    c1: new Color(0x7f7f59),
    c2: new Color(0x197f66),
    c3: new Color(0x090953),
  },
  grey: {
    c0: new Color(0x878787),
    c1: new Color(0x83a59a),
    c2: new Color(0xebebeb),
    c3: new Color(0x00d6bd),
  },
  white: {
    c0: new Color(0x878787),
    c1: new Color(0x707070),
    c2: new Color(0xffffff),
    c3: new Color(0x4b7d95),
  },
  orange: {
    c0: new Color(0.5, 0.5, 0.5),
    c1: new Color(0.5, 0.5, 0.5),
    c2: new Color(0.5, 0.5, 0.5),
    c3: new Color(0.5, 0.5, 0.5),
  },
};

//--- HEMILIGHT SKY & GROUND COLOR PICKERS

// function getRandomCategory() {
//   const categories = Object.keys(hemiLightColors)
//   const randomIndex = Math.floor(Math.random() * categories.length)
//   console.log(hemiLightColors[categories[randomIndex]])
//   return categories[randomIndex]
// }
// const hemiLightCategory = getRandomCategory()

export const hemiLightColors = {
  sunset: {
    skyC: 0xFFD700, // Light yellow for the sunset sky
    groundC: 0x8B4513, // Brown for the ground
  },
  beach: {
    skyC: 0x87CEFA, // Light sky blue for the beach sky
    groundC: 0xFFFFE0, // Ivory for the ground
  },
  forest: {
    skyC: 0x228B22, // Forest green for the forest sky
    groundC: 0x8B4513, // Brown for the ground
  },
  desert: {
    skyC: 0xFFD700, // Light yellow for the desert sky
    groundC: 0xCD853F, // Peru for the ground
  },
  arctic: {
    skyC: 0xB0E0E6, // Powder blue for the arctic sky
    groundC: 0xFFFFFF, // White for the ground
  },
  jungle: {
    skyC: 0x006400, // Dark green for the jungle sky
    groundC: 0x8B4513, // Brown for the ground
  },
  ocean: {
    skyC: 0x1E90FF, // Dodger blue for the ocean sky
    groundC: 0x5F9EA0, // Cadet blue for the ground
  },
  mountain: {
    skyC: 0x87CEEB, // Sky blue for the mountain sky
    groundC: 0x8B4513, // Brown for the ground
  },
  urban: {
    skyC: 0x708090, // Slate gray for the urban sky
    groundC: 0x696969, // Dim gray for the ground
  },
  space: {
    skyC: 0x000080, // Navy blue for the space sky
    groundC: 0x000000, // Black for the ground
  },
};