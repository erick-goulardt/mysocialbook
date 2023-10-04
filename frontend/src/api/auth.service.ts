import { API } from "../api/Api";

export async function login(username: string, password: string) {
  try {
    const data = await API.post(
      `/auth/signin`,
      { username, password }
    );
    console.log(data)
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/*
  export async function getRepositories(username: string, page: number) {
    try {
      const perPage = 3; 
      const { data } = await API.get(`/${username}/repos`, {
        params: {
          page,
          per_page: perPage,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
    
  }
  */
