import {Router} from "express"
import { buy } from "../controller/buyController.js"

const buyRouter = Router();

buyRouter.post('/', buy);

export default buyRouter;
