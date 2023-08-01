import { Router, Request, Response } from "express";
import AddUserToDatabase from "../actions/auth/AddUserToFirebase";
import CreateUserFirebase from "../actions/auth/CreateUserFirebase";
import GetLongLiveUserToken from "../actions/auth/GetLongLiveUserToken";
import { v4 as uuidv4 } from "uuid";
import { requestValidator } from "../middleware/requestvalidator";
interface Data {
  userid: string;
  token: string;
  uuid: string;
}
// const createUserFirebase = new CreateUserFirebase()
const authRouter = Router();
const createUserFirebase = new CreateUserFirebase();
authRouter.post(
  "/getusertoken",
  requestValidator(["userid", "token"]),
  async (req: Request, res: Response) => {
    const token = await GetLongLiveUserToken(req.body.token);
    try {
      const newUUID = uuidv4();
      const body: Data = {
        userid: req.body.userid,
        token: token,
        uuid: newUUID,
      };
      const result = await createUserFirebase.CreateUser(body);
      await new AddUserToDatabase().AddUser(body);
      res.status(200).json({ result });
    } catch (error: any) {
      res.status(500).json(error);
    }
  }
);

export default authRouter;
