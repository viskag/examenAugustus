import express from "express";
import { deleteSeries, getSeries, getUser } from "../database";
import { User, Series } from "../types";
import { SortDirection } from "mongodb";
import {loginMiddleware} from "../middleware/jwtMiddleware";

export default function rootRouter() {
    const router = express.Router();

    router.get("/", loginMiddleware, async(req, res) => {
        let q : string = typeof req.query.q === "string" ? req.query.q : "";
        let sortField : string = typeof req.query.sortField === "string" ? req.query.sortField : "name";
        let sortedSeries : Series[] = await getSeries(q, sortField, 1);
        res.render("index", {sortedSeries, q});
    });

    router.post("/delete/:id", loginMiddleware, async(req, res) => {
        await deleteSeries(":id");
        res.redirect("/");
    })

    return router;
}