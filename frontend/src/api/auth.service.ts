import { API } from "../api/Api";

export async function login(username: string, password: string) {
  try {
    const data = await API.post(
      `/auth/signin`,
      { username, password }
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function register(username: string, password: string, description: string, number: number, avatarUrl: string, name: string, email: string) {
  try {
    const data = await API.post(
      `/auth/signup`,
      { username, password, description, number, avatarUrl, name, email }
    );
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

