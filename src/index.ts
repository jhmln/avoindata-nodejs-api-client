/**
 * Avoindata API Client
 */
export class AvoindataApiClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  /**
   * @param {string} apiKey - Your API key for avoindata.fi
   * @param {string} [baseUrl] - The base URL of the API
   */
  constructor(apiKey: string, baseUrl = 'https://www.avoindata.fi/data/api/3') {
    if (!apiKey) {
      throw new Error('API key is required.');
    }
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  /**
   * A sample method to demonstrate API client usage.
   * @returns A welcome message.
   */
  public greet(): string {
    console.log('Hello from AvoindataApiClient!');
    return 'Welcome to the Avoindata API Client.';
  }
}

// Example usage:
// To run this, you would need to provide an API key.
// const client = new AvoindataApiClient('YOUR_API_KEY');
// client.greet();
