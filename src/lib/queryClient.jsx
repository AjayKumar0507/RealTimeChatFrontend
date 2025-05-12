import { QueryClient } from '@tanstack/react-query';

async function throwIfResNotOk(res) {
  if (!res.ok) {
    const errorText = await res.text();
    const error = new Error(errorText);
    error.status = res.status;
    throw error;
  }
}

export async function apiRequest(url, { body, method = 'GET', headers = {} } = {}) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    credentials: 'include'
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  await throwIfResNotOk(res);

  if (res.status === 204) {
    return null;
  }

  return res.json();
}

export const getQueryFn = (options = { on401: 'throw' }) => {
  const { on401 } = options;

  return async ({ queryKey }) => {
    try {
      const [url, params] = Array.isArray(queryKey) ? queryKey : [queryKey];
      const finalUrl = params ? `${url}?${new URLSearchParams(params)}` : url;

      return await apiRequest(finalUrl);
    } catch (error) {
      if (error.status === 401 && on401 === 'returnNull') {
        return null;
      }
      throw error;
    }
  };
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      queryFn: getQueryFn(),
    },
  },
});