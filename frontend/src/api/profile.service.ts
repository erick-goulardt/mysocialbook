import { API } from "../api/Api";

interface IEditProfile {
    name: string,
    number: number,
    email: string,
    username: string,
    description: string,
    urlAvatar: string,
    password: string;
}

export interface IGetProfile {
    id: string,
    name: string,
    username: string,
    description: string,
    urlAvatar: string,
    friends: [
        string
      ],
      posts: [
        {
          id: string,
          profile: string,
          subject: string,
          likes: [
            string
          ],
          urlImag: string;
        }
      ];
}

export async function editProfile(profileId: string, request: IEditProfile): Promise<IEditProfile | null> {
    try {
      const response = await API.put(`/profile/edit/${profileId}`, request);
      const data: IEditProfile = response.data; 
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  export async function deleteProfile(profileId: string): Promise<void> {
    try {
      const response = await API.delete(`/profile/remove/${profileId}`);
    console.log(response.status);
        
    } catch (error) {
      console.error(error);
    }
  }

  export async function getProfile(username: string): Promise<IGetProfile | null> {
    try {
        const response = await API.get(`/profile/find/user/${username}`);
        const data: IGetProfile = response.data; 
        return data;
      } catch (error) {
        console.error(error);
        return null
      }
    }
  