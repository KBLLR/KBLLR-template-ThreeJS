import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
import {TextureGenerator} from './textures.js'

// API endpoints:

// Generations: generates an image or images based on an input caption
// Edits: edits or extends an existing image
// Variations: generates variations of an input image

const imgNaming =  'dall-e-texture.png'
const genTextures = './src/static/textures/dall-e/'

// Required inputs:

// prompt (str): A text description of the desired image(s). The maximum length is 1000 characters.

// Optional inputs:

// n (int): The number of images to generate. Must be between 1 and 10. Defaults to 1.
// size (str): The size of the generated images. Must be one of "256x256", "512x512", or "1024x1024". Smaller images are faster. Defaults to "1024x1024".
// response_format (str): The format in which the generated images are returned. Must be one of "url" or "b64_json". Defaults to "url".
// user (str): A unique identifier representing your end-user, which will help OpenAI to monitor and detect abuse.

document.addEventListener('DOMContentLoaded', () => {
  const textureGenerator = new TextureGenerator()

  const promptInput = document.getElementById('promptInput')
  const numImages = document.getElementById('numbImages')
  const imgResolutions = document.getElementById('imgRes')


  const generateButton = document.getElementById('generateButton')
  const generatedImage = document.getElementById('generatedImage')

  generateButton.addEventListener('click', async () => {
    const prompt = promptInput.value;
    try {
      const response = await textureGenerator.generateImage(prompt);
      generatedImage.src = response.imageUrl;
      generatedImage.style.display = 'block';
    } catch (error) {
      console.error('Failed to generate image:', error);
    }
  })
})


// FUNCTION DEFINITIONS

async function main() {
  const image = await openai.images.generate({ prompt: "A cute furry texture" });

  console.log(image.data);
}
main();













const response = await openai.createImage({
    prompt: "a white siamese cat",
    n: 1,
    size: "1024x1024",
})
image_url = response.data.data[0].url

const resImgEdit = await openai.createImageEdit(
  fs.createReadStream("sunlit_lounge.png"),
  fs.createReadStream("mask.png"),
  "A sunlit indoor lounge area with a pool containing a flamingo",
  1,
  "1024x1024"
)
image_url = response.data.data[0].url

const resImgVar = await openai.createImageVariation(
  fs.createReadStream("corgi_and_cat_paw.png"),
  1,
  "1024x1024"
)
image_url = response.data.data[0].url

// Using in-memory image data
// This is the Buffer object that contains your image data

const buffer = [image.data];

// Set a `name` that ends with .png so that the API knows it's a PNG image
buffer.name = "image.png"

const resImgVarBuf = await openai.createImageVariation(
  buffer,
  1,
  "1024x1024"
)

try {
    const response = await openai.createImageVariation(
      fs.createReadStream("image.png"),
      1,
      "1024x1024"
    );
    console.log(response.data.data[0].url);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }