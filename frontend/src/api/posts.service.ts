import { API } from "../api/Api";

export interface IPosts {
    id? : string,
    subject? : string,
    title? : string,
    urlImage? : string;
    created? : Date
}

export interface ICreatePost {
  title: string,
  description: string,
  photoUrl: string;
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

  export async function editPost(postId: string): Promise<IPosts | null> {
    try {
      const response = await API.put(`/posts/edit/${postId}`);
      const data: IPosts = response.data; 
      console.log(data)
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  export async function getFriendsPosts(profileId: string): Promise<IPosts[]> {
    try {
      const response = await API.get(`/profile/${profileId}/friends`);
      const data: IPosts[] = response.data; 
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  export async function createPost(profileId: string, postData: ICreatePost): Promise<ICreatePost | null>{
    try {
      const response = await API.post(`/posts/create/${profileId}`, {postData});
      const data: ICreatePost = response.data; 
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  
