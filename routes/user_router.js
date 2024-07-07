import { Router } from "express";   
import { postUser } from "../controller/user_controller.js";

const userRouter = Router();


//  define user route for post
userRouter.post("/users", postUser);

//  export router
export default userRouter;