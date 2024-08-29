import { Collection, MongoClient, ObjectId, SortDirection } from "mongodb";
import dotenv from "dotenv";
import { Series, User } from "./types";
import bcrypt from "bcrypt";
dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
export const client = new MongoClient(MONGODB_URI);

export const userCollection: Collection<User> = client.db("examen").collection<User>("users");
export const seriesCollection: Collection<Series> = client.db("examen").collection<Series>("series");

async function seedDatabase() {
    if (await userCollection.countDocuments() === 0) {
        let ad : User = {username: "admin", password: "admin", role:"ADMIN"}
        let us : User = {username: "user", password:"user", role:"USER"};
        ad.password = await bcrypt.hash(ad.password, 10);
        us.password = await bcrypt.hash(us.password, 10);
        await userCollection.insertMany([ad, us]);
    }
    if (await seriesCollection.countDocuments() === 0) {
        const response = await fetch('https://raw.githubusercontent.com/similonap/json/master/series.json');
        const seriesdata = await response.json();
        const series : Series[] = seriesdata.series;
        console.log(series);
        await seriesCollection.insertMany(series);
    }
}

export async function getSeries(q: string, sortField: string, direction: number) {
    if (!q) {
        return await seriesCollection.find({}).sort(sortField, direction as SortDirection).toArray();
    }
    await seriesCollection.createIndex({ title: "text" });
    const result = await seriesCollection.find({ $text: { $search: q} }).sort(sortField, direction as SortDirection).toArray();
    return result;
}

export async function login(username: string, password: string) {
    let user : User | null = await userCollection.findOne<User>({username: username});
    if (user) {
        if (await bcrypt.compare(password, user.password!)) {
            return user;
        } else {
            throw new Error("Password incorrect");
        }
    } else {
        throw new Error("User does not exist");
    }
}

export async function getUser(username: string) {
    return await userCollection.findOne<User>({username: username});
}

export async function deleteSeries(id: string) {
    await seriesCollection.deleteOne( { _id: id as unknown as ObjectId} )
}

export async function createUser(user: User) {
    user.password = await bcrypt.hash(user.password, 10);
    await userCollection.insertOne(user);
}

async function exit() {
    try {
        await client.close();
        console.log('Disconnected from database');
    } catch (error) {
        console.error(error);
    }
}
export async function connect() {
    try {
        await client.connect();
        await seedDatabase();
        console.log('Connected to database');
        process.on('SIGINT', exit);
    } catch (error) {
        console.error(error);
    }
}