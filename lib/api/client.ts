interface ApiConfig {
  baseURL: string;
  apiKey: string;
  version: string;
}

class ApiClient {
  private config: ApiConfig;

  constructor() {
    this.config = {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
      apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
      version: process.env.NEXT_PUBLIC_API_VERSION || 'v1'
    };
  }

  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'X-API-Key': this.config.apiKey,
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.baseURL}/api/${this.config.version}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `API request failed: ${response.statusText}`
      );
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient();
