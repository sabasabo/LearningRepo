import mongo from 'mongodb'
const { MongoClient } = mongo;

const url = process.env.MONGO_URL
console.log(url);
export const client = new MongoClient(url, { useNewUrlParser: true });


export async function connectDb() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Connected to the DB");
    } catch (error) {
        console.log(error);
        await client.close();
    }
}