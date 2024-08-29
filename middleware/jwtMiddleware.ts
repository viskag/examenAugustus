import { Request, Response, NextFunction } from "express";
import { Cookie } from "express-session";
import * as jwt from "jsonwebtoken";

export function loginMiddleware(req: Request, res: Response, next: NextFunction) {
    // if (req.session.user) {
    //     res.locals.user = req.session.user;
    //     next();
    // } else {
    //     res.redirect("/auth/login");
    // }
    let token : string = req.cookies.jwt;
    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
        if (err) {
            res.redirect("/");
            //res.redirect("/login");
        } else {
            console.log(user);
            res.locals.user = user;
            next();
        }
    });
}