import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { signUp } from "./servers/signup.js";
import { login } from "./servers/login.js";

dotenv.config(); 

mongoose.set("strictQuery", false);

const app = express();
const port = 3000;
app.use(express.json());

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_HOST);
  console.log("✅ MongoDB connected successfully!");
}

app.post("/signup", (req, res) => {
  signUp(req,res)
});

app.post("/login", (req, res) => {
  login(req,res)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
