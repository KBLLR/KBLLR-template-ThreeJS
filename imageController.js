import axios from 'axios'

const apikey = process.env.OPENAI_API_KEY;

const client = axios.create({
  baseURL: 'https://api.openai.com/v1/',
  headers: {
    'Authorization': `Bearer ${apikey}`,
    'Content-Type': 'application/json',
  },
})

async function createImageFromAPI(prompt, n, size) {
  try {
    const response = await client.post('images:create', {
      prompt,
      n,
      size,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
  function handleError(res, error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
}

export async function createImage(req, res) {
  try {
    const { prompt, n, size } = req.body;
    const response = await createImageFromAPI({ prompt, n, size });
    res.json({ imageUrl: response.data.data[0].url });
  } catch (error) {
    handleError(res, error);
  }
}

export async function createVariation(req, res) {
    // Your future implementation here
  }
  
  export async function editImage(req, res) {
    // Your future implementation here
  }
  