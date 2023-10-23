import { createImage } from 'openai-api-client'

export async function createImage(req, res) {
    try {
        const response = await createImage({
            prompt: req.body.prompt,
            n: req.body.n,
            size: req.body.size,
        });
        res.json({ imageUrl: response.data.data[0].url });
    } catch (error) {
        handleError(res, error);
    }
}

export async function editImage(req, res) {
    // Your code for editing an image
}

export async function createVariation(req, res) {
    // Your code for creating an image variation
}

function handleError(res, error) {
    if (error.response) {
        res.status(error.response.status).send(error.response.data);
    } else {
        res.status(500).send(error.message);
    }
}
