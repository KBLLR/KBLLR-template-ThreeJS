import fs from 'fs'
import { Configuration, OpenAI } from 'openai'

const openai = new OpenAI()

const configuration = new Configuration({
    organization: "org-9w23Co0ihZOiBvU7qiJtUJVm",
    Authorization: Bearer, OPENAI_API_KEY,
})

async function main() {
    const image = await openai.images.generate({ prompt: "A cute baby sea otter" })
    console.log(image.data)
}
main() 

async function main() {
    const image = await openai.images.edit({
      image: fs.createReadStream("otter.png"),
      mask: fs.createReadStream("mask.png"),
      prompt: "A cute baby sea otter wearing a beret",
    })
    console.log(image.data)
}
main()

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
  )
  console.log(preload);
  return preload;


export { TextureGenerator };
