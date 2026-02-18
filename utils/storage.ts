import * as SecureStore from "expo-secure-store";

export const getToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync("token");
};

export const setToken = async (token: string): Promise<void> => {
  return await SecureStore.setItemAsync("token", token);
};

export const removeToken = async (): Promise<void> => {
  return await SecureStore.deleteItemAsync("token");
};
