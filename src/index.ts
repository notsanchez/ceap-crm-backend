import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import auth from "./routes/auth";
import contacts from "./routes/contacts";

const app = express();
app.use(express.json());

app.use("/api", auth);
app.use("/api", contacts);

AppDataSource.initialize()
  .then(() => {
    app.listen(5001, () => {
      console.log("Server is running on port 5001");
    });
  })
  .catch((error) => console.log(error));
