import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import authRouter from "./router/authRouter";
import rootRouter from "./router/rootRouter";
import session from "./session";

dotenv.config();

const app : Express = express();

app.set("view engine", "ejs");
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.use(session);
app.use("/", rootRouter());
app.use("/auth", authRouter());
app.use((req, res, next) => {
    res.status(404).redirect("/");
});

app.set("port", process.env.PORT ?? 3000);


export default app;