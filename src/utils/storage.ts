import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveJSON = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getJSON = async <T>(key: string): Promise<T | null> => {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
