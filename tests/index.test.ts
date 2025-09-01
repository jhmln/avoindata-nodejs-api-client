import { AvoindataApiClient } from '../src/index.js';

describe('AvoindataApiClient', () => {
  it('should be defined', () => {
    expect(AvoindataApiClient).toBeDefined();
  });

  it('should create an instance with an API key', () => {
    const client = new AvoindataApiClient('test-api-key');
    expect(client).toBeInstanceOf(AvoindataApiClient);
  });

  it('should throw an error if API key is not provided', () => {
    expect(() => new AvoindataApiClient('')).toThrow('API key is required.');
  });

  it('should have a default baseUrl', () => {
    const client = new AvoindataApiClient('test-api-key');
    // Accessing private member for testing purposes.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(client.baseUrl).toBe('https://www.avoindata.fi/data/api/3');
  });

  it('should allow overriding the baseUrl', () => {
    const customUrl = 'https://my-custom-api.com';
    const client = new AvoindataApiClient('test-api-key', customUrl);
    // Accessing private member for testing purposes.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(client.baseUrl).toBe(customUrl);
  });

  it('greet method should return a welcome message', () => {
    const client = new AvoindataApiClient('test-api-key');
    expect(client.greet()).toBe('Welcome to the Avoindata API Client.');
  });
});
