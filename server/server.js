import express, {Router} from "express"
import mongoose from "mongoose";
import cors from "cors"
import bodyParser from "body-parser";
import authRouter from "./routes/authRouter.js";
import offerRouter from "./routes/offerRouter.js";
import buyRouter from "./routes/buyRouter.js";

const app = express();
const PORT = process.env.PORT || 8080 ;
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/users', authRouter)
app.use('/offer', offerRouter)
app.use('/buy', buyRouter)

mongoose
  .connect("mongodb://127.0.0.1:27017/agroDB")
  .then(() => console.log("Sucessfully connected to database"))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));