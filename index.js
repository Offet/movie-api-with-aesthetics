import express from "express";
// import the session module created in ./middleware/session.js file
import { sessionModule } from "./middleware/session.js";
// import mongoose
import mongoose from "mongoose";
//  import dbConnection from the config folder
import { dbConnection } from "./config/db.js";
//  import oas generator
import expressOasGenerator from "express-oas-generator";
// import auth
import { requireAuth } from "./middleware/session.js";

import userRouter from "./routes/user_router.js";
import movieRouter from "./routes/movie_router.js";

// instantiate express
const app = express();

// connect to database using mongoose.connect(....)
await mongoose.connect(process.env.MONGO_URL);

//  call out the session module to be as a middleware
app.use(sessionModule);

// applying middleware
app.use(express.json());

app.use(userRouter);
app.use(movieRouter);



expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true, /* to serve render whether in production or development */
    tags: ["movies"],
    mongooseModels: mongoose.modelNames(),
});

expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect("api-docs/"));


// instantiate the dbconnection
dbConnection();

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`App is listening at port ${port}`)
});