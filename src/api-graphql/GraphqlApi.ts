class GraphqlApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:7277/graphql';
  }

  async post(query: string, variables?: { [key: string]: any }) {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });
    if (!response.ok) {
      return { error: response.statusText };
    }
    return response.json();
  }
}

export default GraphqlApi;
