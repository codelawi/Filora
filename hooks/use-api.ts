import { getToken } from "@/utils/storage";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

// Types
interface RequestOptions {
  showAlert?: boolean;
  headers?: Record<string, string>;
}

interface ErrorResponse {
  message: string;
  status: number;
  data?: any;
}

interface SuccessResponse<T = any> {
  success: true;
  data: T;
}

interface FailResponse {
  success: false;
  error: string;
  status: number | null;
}

type ApiResponse<T = any> = SuccessResponse<T> | FailResponse;

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Base request function
  const request = useCallback(
    async <T = any>(
      method: string,
      endpoint: string,
      data: any = null,
      options: RequestOptions = {},
    ): Promise<ApiResponse<T>> => {
      const { showAlert = false, headers = {} } = options;

      setLoading(true);
      setError(null);

      try {
        const token = await getToken();

        // Prepare headers
        const requestHeaders: Record<string, string> = {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...headers,
        };

        // Add token if exists
        if (token) {
          requestHeaders.Authorization = `Bearer ${token}`;
        }

        // Prepare request options
        const requestOptions: RequestInit = {
          method,
          headers: requestHeaders,
        };

        // Add body for non-GET requests
        if (data && method !== "GET") {
          requestOptions.body = JSON.stringify(data);
        }

        const response = await fetch(
          `${API_BASE_URL}${endpoint}`,
          requestOptions,
        );
        const responseData = await response.json();

        if (!response.ok) {
          throw {
            message: responseData.message || "Something went wrong",
            status: response.status,
            data: responseData,
          };
        }

        setLoading(false);
        return { success: true, data: responseData as T };
      } catch (err: any) {
        const errorMessage =
          err.message || "Network error. Check your connection.";
        setError(errorMessage);
        setLoading(false);

        if (showAlert) {
          Alert.alert("Error", errorMessage);
        }

        return {
          success: false,
          error: errorMessage,
          status: err.status || null,
        };
      }
    },
    [],
  );

  // HTTP methods with proper typing
  const get = useCallback(
    <T = any>(
      endpoint: string,
      options: RequestOptions = {},
    ): Promise<ApiResponse<T>> => {
      return request<T>("GET", endpoint, null, options);
    },
    [request],
  );

  const post = useCallback(
    <T = any>(
      endpoint: string,
      data: any,
      options: RequestOptions = {},
    ): Promise<ApiResponse<T>> => {
      return request<T>("POST", endpoint, data, options);
    },
    [request],
  );

  const put = useCallback(
    <T = any>(
      endpoint: string,
      data: any,
      options: RequestOptions = {},
    ): Promise<ApiResponse<T>> => {
      return request<T>("PUT", endpoint, data, options);
    },
    [request],
  );

  const patch = useCallback(
    <T = any>(
      endpoint: string,
      data: any,
      options: RequestOptions = {},
    ): Promise<ApiResponse<T>> => {
      return request<T>("PATCH", endpoint, data, options);
    },
    [request],
  );

  const del = useCallback(
    <T = any>(
      endpoint: string,
      options: RequestOptions = {},
    ): Promise<ApiResponse<T>> => {
      return request<T>("DELETE", endpoint, null, options);
    },
    [request],
  );

  return {
    loading,
    error,
    get,
    post,
    put,
    patch,
    delete: del,
  };
};

export default useApi;
