import { create } from 'axios'

const apikey = process.env.OPENAI_API_KEY

class OpenAIApiClient {
  constructor(apiKey) {
    this.client = create({
      baseURL: 'https://api.openai.com/v1/',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async createImage(prompt, n, size) {
    try {
      const response = await this.client.post('images:create', {
        prompt,
        n,
        size,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createImageEdit(imageStream, maskStream, description, n, size) {
    try {
      const formData = new FormData();
      formData.append('image', imageStream);
      formData.append('mask', maskStream);
      formData.append('description', description);
      formData.append('n', n);
      formData.append('size', size);

      const response = await this.client.post('images:edit', formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createImageVariation(imageStreamOrBuffer, n, size) {
    try {
      let formData = new FormData();
      formData.append('image', imageStreamOrBuffer);
      formData.append('n', n);
      formData.append('size', size);

      const response = await this.client.post('images:variation', formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else {
      return {
        message: error.message,
      };
    }
  }
}

export default OpenAIApiClient;
