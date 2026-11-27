import mongoose from "mongoose";
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {conn: null, Promise:null };
}

const connectDb = async () => {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.Promise) {
        cached.Promise= mongoose
        .connect(process.env.MONGO_URI)
        .then((mongoose) => {
            return mongoose;
        })
    }

    cached.conn = await cached.Promise;
    return cached.conn;
};
export default connectDb