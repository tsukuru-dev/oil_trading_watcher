export type ApiClientOptions = {
  baseUrl: string;
};

export function createApiClient({ baseUrl }: ApiClientOptions) {
  return {
    get: (path: string) => fetch(`${baseUrl}${path}`).then((response) => response.json())
  };
}

