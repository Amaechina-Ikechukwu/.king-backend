import jwt from "jsonwebtoken";
interface Data {
  userid: string;
  token: string;
  uuid: string;
}
class CreateUserFirebase {
  /**
   * CreateUser
   */
  public async CreateUser(body: Data) {
    try {
      const token = jwt.sign(
        {
          data: body,
        },
        ".king@(#&($)%*%&$(",
        { expiresIn: "1d" }
      );
      return token;
    } catch (error: any) {
      throw new Error("Error creating new user:" + error.message);
    }
  }
}
export default CreateUserFirebase;
