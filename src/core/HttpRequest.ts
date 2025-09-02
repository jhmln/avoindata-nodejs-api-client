/**
 * Represents options for an HTTP request, extending the native RequestInit.
 */
export interface RequestOptions extends RequestInit {
  // Custom options can be added here in the future.
}

/**
 * A generic HTTP request client.
 */
export class HttpRequest {
  private readonly baseUrl: string;
  private readonly defaultHeaders: Record<string, string>;

  /**
   * @param {string} baseUrl - The base URL for all requests.
   * @param {Record<string, string>} [defaultHeaders={}] - Default headers to be sent with every request.
   */
  constructor(baseUrl: string, defaultHeaders: Record<string, string> = {}) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = defaultHeaders;
  }

  /**
   * Performs an HTTP request.
   * @template T - The expected response type.
   * @param {string} endpoint - The API endpoint.
   * @param {RequestOptions} options - Request options.
   * @returns {Promise<T>} - The response data.
   * @private
   */
  private async request<T>(endpoint: string, options: RequestOptions): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }

    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  }

  /**
   * Performs a GET request.
   * @template T - The expected response type.
   * @param {string} endpoint - The API endpoint.
   * @param {Omit<RequestOptions, 'body' | 'method'>} [options={}] - Request options.
   * @returns {Promise<T>} - The response data.
   */
  public get<T>(endpoint: string, options: Omit<RequestOptions, 'body' | 'method'> = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  /**
   * Performs a POST request.
   * @template T - The expected response type.
   * @param {string} endpoint - The API endpoint.
   * @param {unknown} body - The request body.
   * @param {Omit<RequestOptions, 'body' | 'method'>} [options={}] - Request options.
   * @returns {Promise<T>} - The response data.
   */
  public post<T>(endpoint: string, body: unknown, options: Omit<RequestOptions, 'body' | 'method'> = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  }

  /**
   * Performs a PUT request.
   * @template T - The expected response type.
   * @param {string} endpoint - The API endpoint.
   * @param {unknown} body - The request body.
   * @param {Omit<RequestOptions, 'body' | 'method'>} [options={}] - Request options.
   * @returns {Promise<T>} - The response data.
   */
  public put<T>(endpoint: string, body: unknown, options: Omit<RequestOptions, 'body' | 'method'> = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  }

  /**
   * Performs a DELETE request.
   * @template T - The expected response type.
   * @param {string} endpoint - The API endpoint.
   * @param {Omit<RequestOptions, 'body' | 'method'>} [options={}] - Request options.
   * @returns {Promise<T>} - The response data.
   */
  public delete<T>(endpoint: string, options: Omit<RequestOptions, 'body' | 'method'> = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}
