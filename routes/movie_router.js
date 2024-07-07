import { Router } from "express";
import { createMovie, deleteMovies, getMovies, putMovies, updateMovie } from "../controller/movie_controller.js";

// instantiate the router
const movieRouter = Router();


// define routes 
movieRouter.get("/movies", getMovies);
movieRouter.post("/movies", createMovie);
movieRouter.patch("/movies", updateMovie);
movieRouter.put("/movies", putMovies);
movieRouter.delete("/movies", deleteMovies)

// export the router
export default movieRouter;