import { Router, Request, Response } from "express";

import validateUUIDMiddleware from "../middleware/ValidatedUUIDHeader";
import GetListOfPages from "../actions/pages/GetListOfPages";

// const createUserFirebase = new CreateUserFirebase()
const pagesRouter = Router();

pagesRouter.get(
  "/listofuserpages",
  validateUUIDMiddleware, // Apply the custom UUID validation middleware
  async (req: Request, res: Response) => {
    try {
      const result = await new GetListOfPages().ListOfPages(req.uuid);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
);

export default pagesRouter;
