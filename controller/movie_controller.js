// importing the necessary models for this side
import { movieModel } from "../model/movie_model.js";



// defining a function that creates a new movie
export const createMovie = async (req, res, next) => {
    try {
        // add a new movie to the database
        const newMovie = movieModel.create(
            {...req.body, user: req.session.userId
        });
        // return response
        res.status(201).json(newMovie); /* 201 is a status code for created successfully*/
    } catch (error) {
        // handle errors
        next(error);
    }
};

// defining a function that gets movies
export const getMovies = async (req, res) => {
    try {
        const { limit, skip, filter } = req.query;

        // Ensure the user filter is applied
        const userFilter = { user: req.session.userId };
        const combinedFilter = filter ? { ...JSON.parse(filter), ...userFilter } : userFilter;

        const movies = await movieModel.find(combinedFilter)
            .limit(limit ? parseInt(limit) : undefined)
            .skip(skip ? parseInt(skip) : undefined);

        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//  doing a patch and a put for the movies field 
export const updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.findOneAndUpdate(
            { _id: req.params.id, user: req.session.userId },
            { $set: req.body }, 
            /* 
             When you use { $set: req.body } in an update query, MongoDB will:

             1.   Look at the fields provided in req.body.
             2.  Update the specified fields in the document with the new values from req.body.
             3.  If any of the specified fields do not exist in the document, they will be added with the values provided in req.body.
            */
            { new: true }
        );
        if (!movie) { /* to return movie not found if it is not a movie*/
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(updatedMovie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


/******** PUT FOR MOVIES **************** */
export const putMovies = async (req, res) => {
    try {
        const putMovie = await movieModel.findOneAndUpdate(
            { _id: req.params.id, user: req.session.userId },
            req.body,
            { new: true }
        );
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(putMovie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};



/* 
 **********   PUT vs PATCH:   ***********

PUT: The PUT method is typically used for updating a resource entirely. 
It expects the client to send a complete representation of the resource. 
If any field is missing in the request, it will be considered as if the 
client wants to set that field to its default value or remove it.

PATCH: The PATCH method is used for partial updates. 
It allows the client to send only the fields that need to be updated. 
The server will then update only those specific fields without affecting the other fields.

*/


//  function to delete movies 
export const deleteMovies = async (req, res) => {
    try {
        await movieModel.findOneAndDelete({ _id: req.params.id, user: req.session.userId });
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        return res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};