import axios, { AxiosResponse } from "axios";
import { getDatabase, DataSnapshot } from "firebase-admin/database";

interface UserInfo {
  userid: string;
  token: string;
  uuid: string;
}

class GetListOfPages {
  public async ListOfPages(uuid: string): Promise<string[]> {
    const userInfo = await this.GetUserInfo(uuid);

    try {
      const response: AxiosResponse = await axios.get(
        `https://graph.facebook.com/v17.0/${userInfo.userid}/accounts`,
        {
          params: {
            access_token: userInfo.token,
          },
        }
      );

      // Assuming the response data is an object with an 'accounts' property that contains an array of page objects,
      // extract the 'name' property from each page object and return as an array of strings.

      return response.data;
    } catch (error: any) {
      console.error("Error response status:", error.response?.status);
      console.error("Error response data:", error.response?.data);
      throw new Error("Error fetching data: " + error);
    }
  }

  public async GetUserInfo(uuid: string): Promise<UserInfo> {
    try {
      const snapshot: DataSnapshot = await getDatabase()
        .ref(`users/${uuid}`)
        .once("value", (data) => {
          return data;
        });
      const userInfo: UserInfo = snapshot.val(); // Assuming the structure of the data is correct

      if (!userInfo) {
        throw new Error("User information not found");
      }

      return userInfo;
    } catch (error: any) {
      console.error("Error fetching user info:", error);
      throw new Error("Error fetching user info: " + error);
    }
  }
}

export default GetListOfPages;
