
////////////////////
// ✧ WILDCARDS

let topic = ["diamonds", "minerals", "eye", "iridescent", "eyes", "geometry", "New York", "Universe", "aurora borealis", "northern lights", "neon", "clouds", "smoke", "AI", "Caustics", "Fractals", "words", "colors", "abstract", "pattern"];
let wcUniverse = ["atoms", "black holes", "comets", "constellations", "galaxies", "meteors", "moons", "planets", "satellites", "stars", "supernovas", "universes"]
let wcColors = [ "red", "blue", "green", "yellow", "orange", "purple", "pink", "black", "white", "gray", "brown", "gold" ]
let wcTexturesI = [ "smooth", "rough", "bumpy", "cracked", "flaky", "metallic", "shiny", "dull", "matte", "glossy", "reflective" ]
let wcTexturesII = ["marble", "woodgrain", "crystal lattice", "honeycomb", "kaleidoscope", "coral reef", "silk threads", "rusty metal", "sand dunes", "bark texture", "feathers", "water ripples", "tangled vines", "mossy stones", "starry night", "frost patterns", "cracked ice", "textured fabric", "straw mat", "brick wall", "leather texture", "paper folds", "concrete surface", "plaster relief", "sponge texture", "glossy droplets", "swirling clouds", "foggy mist", "rippling water"];
let wcGases = [ "hydrogen", "helium", "oxygen", "nitrogen", "carbon dioxide", "methane", "ammonia", "neon", "argon", "krypton", "xenon" ]
let wcSubstances = [ "water", "air", "rock", "metal", "gas", "plasma", "dust", "ice", "fire", "electricity", "gravity" ]
let wcMetals = [ "iron", "aluminum", "copper", "gold", "silver", "platinum", "titanium", "nickel", "zinc", "lead", "mercury" ]
let wcRocks = [ "granite", "basalt", "shale", "sandstone", "limestone", "marble" ]
let wcMaterials = [ "plastic", "wood", "metal", "glass", "rubber", "ceramic", "fabric", "paper", "leather", "concrete", "stone" ]
let wcLiquids = [ "water", "milk", "juice", "soda", "coffee", "tea", "wine", "beer", "oil", "gasoline", "blood" ]
let wcShapes = [ "circle", "square", "rectangle", "triangle", "cube", "sphere", "cone", "cylinder", "pyramid", "octagon", "pentagon", "hexagon" ]
let wcPatterns = [ "polka dots", "stripes", "plaids", "zigzags", "chevron", "damask", "paisley", "floral", "geometric", "abstract" ]
let wcFractals = [ "Mandelbrot set", "Julia set", "Koch snowflake", "Sierpinski triangle", "Cantor set", "Menger sponge", "Barnsley fern", "Dragon curve", "Hilbert curve", "Koch curve", "Peano curve"]
let wcAbstract = ["fractal chaos", "hypnotic swirls", "nebula patterns", "quantum particles", "psychedelic dreams", "glitch aesthetics", "cybernetic network", "digital illusions", "ethereal dimensions", "virtual reality", "cosmic vibrations", "time dilation", "quantum entanglement", "cyberpunk cityscape", "ethereal waves", "interdimensional portals", "perceptual shifts", "infinite possibilities", "surreal landscapes", "mind's eye visions", "synaptic connections", "chaotic symmetry", "lucid daydreams", "algorithmic artistry", "abstract metaphysics", "esoteric geometry", "vibrant anomalies", "paradoxical perspectives", "dreamscape realms"];
let wcGeometry = [ "point", "line", "plane", "solid", "angle", "curve", "triangle", "quadrilateral", "polygon", "circle", "sphere", "cone", "cylinder"]
let wcPhysics = [ "motion", "force", "acceleration", "gravity", "energy", "momentum", "work", "power", "heat", "temperature", "pressure", "volume" ]
let wcMaterialStates = ["solid", "liquid", "gas", "plasma", "superfluid", "Bose–Einstein condensate", "fermionic condensate", "neutron-degenerate matter", "quark–gluon plasma", "amorphous solid", "liquid crystal", "glass", "crystal", "metal", "insulator", "semiconductor", "superconductor", "ferromagnet", "antiferromagnet", "ferrimagnet", "piezoelectric", "pyroelectric", "ferroelectric", "shape-memory alloy", "metamaterial", "smart material", "biological material", "geological material", "synthetic material"];


const uiTitle = document.getElementById("ui-title");
let wildCard

function populateElement() {
   wildCard = topic[Math.floor(Math.random() * topic.length)];
   uiTitle.textContent = wildCard;
}
populateElement()

const Template = "https://unsplash.com/photos/QwoNAhbmLLo";

const g_texture = (wildcard = "topic", repeat = 4) => {
  const path = `https://source.unsplash.com/random/?${wildcard}`;
  const preload = new THREE.TextureLoader().load(
    path ? path : Template,
    (e) => {
      e.mapping = THREE.EquirectangularRefractionMapping;
      e.anisotropy = anisotropyLevel
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
};

  ////////////////////////////////////////////////////////////////
// ✧ Properties that take a texture image as an input 

const mPhysicalMat_maps = new THREE.MeshPhysicalMaterial(
    {
    map: g_texture(wildCard, 4),
    emissiveMap: g_texture(wildCard, 4),
    aoMap: g_texture(wildCard, 4),
    envMap: g_texture(wildCard, 4),
    normalMap: g_texture(wildCard, 4),
    metalnessMap: g_texture(wildCard, 4),
    roughnessMap: g_texture(wildCard, 4),
    clearcoatRoughnessMap: g_texture(wildCard, 4),
    clearcoatNormalMap: g_texture(wildCard, 4),
    displacementMap: g_texture(wildCard, 4),
    sheenRoughnessMap: g_texture(wildCard, 4),
    sheenColorMap: g_texture(wildCard, 4),
    clearcoatRoughnessMap: g_texture(wildCard, 4), 
    clearcoatNormalMap: g_texture(wildCard, 4),
    displacementMap: g_texture(wildCard, 4)
    }
);

  ////////////////////////////////////////////////////////////////
// ✧ Properties that take a value as an input 

const mPhysicalMat_values = new THREE.MeshPhysicalMaterial(
    {
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
    side: THREE.FrontSide,
    precision: "highp",
    }
)
