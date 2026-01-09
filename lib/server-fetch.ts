import { getCookie } from "@/services/auth/tokenHandlers";

const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

const serverFetchHelper = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const { headers, ...restOptions } = options;
  const accessToken = await getCookie("accessToken");

  const config: RequestInit = {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? `${accessToken}` : "",
      ...headers,
    },
  };

  try {
    const response = await fetch(`${BACKEND_API_URL}${endpoint}`, config);

    // Handle 401/403 or other errors appropriately if needed
    // For now, we return the parsed JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

export const serverFetch = {
  get: async (endpoint: string, options: RequestInit = {}): Promise<any> =>
    serverFetchHelper(endpoint, { ...options, method: "GET" }),

  post: async (
    endpoint: string,
    body: any = {},
    options: RequestInit = {}
  ): Promise<any> =>
    serverFetchHelper(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: async (endpoint: string, body: any = {}, options: RequestInit = {}): Promise<any> =>
    serverFetchHelper(endpoint, {
        ...options, 
        method: "PUT",
        body: JSON.stringify(body)
    }),

  patch: async (
    endpoint: string,
    body: any = {},
    options: RequestInit = {}
  ): Promise<any> =>
    serverFetchHelper(endpoint, { 
        ...options, 
        method: "PATCH",
        body: JSON.stringify(body)
    }),

  delete: async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<any> =>
    serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
};
