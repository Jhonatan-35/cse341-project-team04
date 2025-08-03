const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags ['movies']
    const result = await mongodb.getDatabase().db().collection('movies').find();
    result.toArray().then((movies) => {
       res.setHeader('Content-Type', 'application/json');
       res.status(200).json(movies);
    });
};

const getSingle = async (req ,res) => {
  //#swagger.tags ['movies']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('movies').find({_id: userId});
    result.toArray().then((movies) => {
       res.setHeader('Content-Type', 'application/json');
       res.status(200).json(movies[0]);
    });
};

const createMovie = async (req ,res) => {
  //#swagger.tags ['contacts']
    const user = {
       movieId: req.body.movieId,
       movieName: req.body.movieName,
       movieYear: req.body.movieYear,
       movieTags: req.body.movieTags,
       movieDescription: req.body.movieDescription,
       movieProducer: req.body.movieProducer,
       movieCountry: req.body. movieCountry,
    };
    const response = await mongodb.getDatabase().db().collection('movies').insertOne(user);
    if (response.acknowledged > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.console.error || 'Some error occurred while creating the Movie');
    }
};

const updateMovie = async (req ,res) => {
  //#swagger.tags ['contacts']
    const userId = new ObjectId(req.params.id);
    const user = {
       movieId: req.body.movieId,
       movieName: req.body.movieId,
       movieYear: req.body.movieYear,
       movieTags: req.body.movieTags,
       movieDescription: req.body.movieDescription,
       movieProducer: req.body.movieProducer,
       movieCountry: req.body.movieCountry,
      
    };
    const response = await mongodb.getDatabase().db().collection('movies').replaceOne({_id: userId} ,user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.console.error || 'Some error occurred while updating the Movie');
    }
};

const deleteMovie = async (req ,res) => {
  //#swagger.tags ['movies']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('movies').deleteOne({_id: userId});
    if (response.deleteCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.console.error || 'Some error occurred while deleting the Movies');
    }
};

module.exports = {
    getAll,
    getSingle,
    createMovie,
    updateMovie,
    deleteMovie

};