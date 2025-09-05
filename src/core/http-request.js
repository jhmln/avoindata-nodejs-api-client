/**
 * A wrapper class for the Node.js fetch API to simplify making HTTP requests.
 */
export default class HttpRequest {
  /**
   * Creates an instance of HttpRequest.
   * @param {string} baseUrl - The base URL for all requests.
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * Performs an HTTP request.
   * @param {string} path - The path to request, appended to the base URL.
   * @param {object} options - The options for the fetch request.
   * @param {string} [options.method='GET'] - The HTTP method.
   * @param {object} [options.headers={}] - The request headers.
   * @param {object} [options.body=null] - The request body for methods like POST or PUT.
   * @returns {Promise<any>} A promise that resolves with the JSON response.
   */
  async request(path, options = {}) {
    const url = `${this.baseUrl}${path}`;
    const { method = 'GET', headers = {}, body = null } = options;

    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...headers,
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      if (response.status === 204) { // No Content
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  }

  /**
   * Performs a GET request.
   * @param {string} path - The path to request.
   * @param {object} [headers={}] - The request headers.
   * @returns {Promise<any>} A promise that resolves with the JSON response.
   */
  get(path, headers = {}) {
    return this.request(path, { method: 'GET', headers });
  }

  /**
   * Performs a POST request.
   * @param {string} path - The path to request.
   * @param {object} body - The request body.
   * @param {object} [headers={}] - The request headers.
   * @returns {Promise<any>} A promise that resolves with the JSON response.
   */
  post(path, body, headers = {}) {
    return this.request(path, { method: 'POST', body, headers });
  }

  /**
   * Performs a PUT request.
   * @param {string} path - The path to request.
   * @param {object} body - The request body.
   * @param {object} [headers={}] - The request headers.
   * @returns {Promise<any>} A promise that resolves with the JSON response.
   */
  put(path, body, headers = {}) {
    return this.request(path, { method: 'PUT', body, headers });
  }

  /**
   * Performs a DELETE request.
   * @param {string} path - The path to request.
   * @param {object} [headers={}] - The request headers.
   * @returns {Promise<any>} A promise that resolves with the JSON response.
   */
  delete(path, headers = {}) {
    return this.request(path, { method: 'DELETE', headers });
  }
}