import { Router } from "express"
import { submit, getAllOffers, getOfferById } from "../controller/offerController.js"

const offerRouter = Router();

offerRouter.get("/", getAllOffers)
offerRouter.get("/:id", getOfferById)
offerRouter.post("/submit", submit)


export default offerRouter;