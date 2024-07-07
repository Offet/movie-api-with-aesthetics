//  importing model, Schema and types from mongoose
import { model, SchemaTypes, Schema, Types } from "mongoose";


//  creating a new movie schema
const movieSchema = new Schema ({
    title: {type: String, required: true},
    director: {type: String, required: true},
    year: {type: Number, required: true},
    user: {type: SchemaTypes.ObjectId, ref: "User", required: true}
});

// create and export a movie model
export const movieModel = model("Movie", movieSchema);