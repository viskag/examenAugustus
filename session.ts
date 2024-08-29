//Opmerking: ik dacht initieel dat we met sessions moesten werken
//Dus er staan nog session code in commentaar in dit project/exam
import { MONGODB_URI } from "./database";
import session, { MemoryStore } from "express-session";
import { User } from "./types";
import ConnectMongoDbSession from "connect-mongodb-session";
const MongoDBStore = ConnectMongoDbSession(session);

const mongoStore = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "sessions",
    databaseName: "examen",
});

declare module 'express-session' {
    export interface SessionData {
        user?: User;
    }
}

export default session({
    secret: process.env.JWT_SECRET ?? "secret",
    store: mongoStore,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
});