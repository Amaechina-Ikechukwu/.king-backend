import { getDatabase } from "firebase-admin/database";
interface Data {
  userid: string;
  token: string;
  uuid: string;
}
class AddUserToDatabase {
  /**
   * async  AddUser
   */
  public async AddUser(data: Data) {
    await getDatabase()
      .ref("users/" + data?.uuid)
      .set(data)
      .then(() => {
        return "done";
      })
      .catch((err: any) => {
        throw new Error(err);
      });
  }
}
export default AddUserToDatabase;
