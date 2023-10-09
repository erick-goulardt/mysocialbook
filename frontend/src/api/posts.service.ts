import { API } from "../api/Api";

export interface IPosts {
    id : string,
    subject : string,
    title : string,
    urlImage : string;
    created : Date
}

export async function getUsersPosts(userId: string): Promise<IPosts[]> {
    try {
      const response = await API.get(`/posts/userPosts/${userId}`);
      const data: IPosts[] = response.data; 
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }