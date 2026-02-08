import { User } from "../types/User";
import { STORAGE_KEYS } from "../data/storageKeys";
import { getJSON, saveJSON } from "../utils/storage";

// REGISTER
export const registerUser = async (
  username: string,
  password: string
) => {
  const users = (await getJSON<User[]>(STORAGE_KEYS.USERS)) || [];

  const exists = users.find(u => u.username === username);
  if (exists) {
    return { success: false, message: "User already exists" };
  }

  users.push({ id: Date.now(), username, password });
  await saveJSON(STORAGE_KEYS.USERS, users);

  return { success: true };
};

// LOGIN
export const loginUser = async (
  username: string,
  password: string
) => {
  const users = (await getJSON<User[]>(STORAGE_KEYS.USERS)) || [];

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return { success: false, message: "Invalid credentials" };
  }

  await saveJSON(STORAGE_KEYS.SESSION, { userId: user.id });
  return { success: true };
};
