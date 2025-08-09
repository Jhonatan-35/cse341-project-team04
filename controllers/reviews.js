const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags ['reviews']
    const result = await mongodb.getDatabase().db().collection('reviews').find();
    result.toArray().then((reviews) => {
       res.setHeader('Content-Type', 'application/json');
       res.status(200).json(reviews);
    });
};

const getSingle = async (req ,res) => {
  //#swagger.tags ['reviews']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('reviews').find({_id: userId});
    result.toArray().then((reviews) => {
       res.setHeader('Content-Type', 'application/json');
       res.status(200).json(reviews[0]);
    });
};

const createReviews = async (req ,res) => {
  //#swagger.tags ['contacts']
    const user = {
       movie_id: req.body.movieId,
       rating: req.body.rating,
       Comment: req.body.Comment,
       created_at: req.body.created_at,
       
    };
    const response = await mongodb.getDatabase().db().collection('reviews').insertOne(user);
    if (response.acknowledged > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.console.error || 'Some error occurred while creating the reviews');
    }
};

const updateReviews = async (req ,res) => {
  //#swagger.tags ['reviews']
    const userId = new ObjectId(req.params.id);
    const user = {
       movie_id: req.body.movieId,
       rating: req.body.rating,
       Comment: req.body.Comment,
       created_at: req.body.created_at,
      
    };
    const response = await mongodb.getDatabase().db().collection('reviews').replaceOne({_id: userId} ,user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.console.error || 'Some error occurred while updating the reviews');
    }
};

const deleteReviews = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid reviews id to delete a Movie.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('reviews').deleteOne({ _id: userId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the reviews.');
  }
};

module.exports = {
    getAll,
    getSingle,
    createReviews,
    updateReviews,
    deleteReviews

};