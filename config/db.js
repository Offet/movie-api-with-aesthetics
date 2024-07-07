import mongoose from "mongoose";

//  import dotenv/config
import "dotenv/config";

// assign a avriable to process and fetch mongo_url
const mongoUri = process.env.MONGO_URL;

// export the connection created for the database
export const dbConnection = () => {
    mongoose.connect(mongoUri).then(() => {
        console.log("Database is connected!");
    });
};