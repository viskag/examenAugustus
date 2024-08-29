import express from "express";
import { createUser, login } from "../database";
import { User } from "../types";
import * as jwt from "jsonwebtoken";
import { loginMiddleware } from "../middleware/jwtMiddleware";

export default function loginRouter() {
    const router = express.Router();

    router.get("/login", (req, res) => {
        res.render("login");
    });

    router.post("/login", async(req, res) => {
    //     const username : string = req.body.username;
    // const password : string = req.body.password;
    // try {
    //     let user : User = await login(username, password);
    //     req.session.user = user;
    //     res.redirect("/")
    // } catch (e : any) {
    //     res.redirect("/login");
    // }
        const username : string = req.body.username;
        const password : string = req.body.password;
        try {
            let user : User = await login(username, password);
            const token = jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: "1d" });
            res.cookie("jwt", token, { httpOnly: true, sameSite: "lax", secure: true });
            res.redirect("/")
        } catch (e : any) {
            res.redirect("/login");
        }
    });

    router.get("/logout", (req, res) => {
        // req.session.destroy((err) => {
        //     console.log("session ended")
        // });
        //res.redirect("/auth/login");
        res.clearCookie("jwt");
        res.redirect("/login")
    });

    router.get("/register", (req, res) => {
        res.render("register")
    });

    router.post("/register", async(req, res) => {
        try {
            let username : string = req.body.name;
            let password : string = req.body.password;
            let user : User = {username: username, password: password, role: "USER"};
            await createUser(user);
        } catch (e) {
            res.redirect("/register");
        }
    });

    return router;
}