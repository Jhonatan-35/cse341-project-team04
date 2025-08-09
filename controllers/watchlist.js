const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags ['movies']
    const result = await mongodb.getDatabase().db().collection('watchlist').find();
    result.toArray().then((watchlist) => {
       res.setHeader('Content-Type', 'application/json');
       res.status(200).json(watchlist);
    });
};

const getSingle = async (req ,res) => {
  //#swagger.tags ['movies']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('watchlist').find({_id: userId});
    result.toArray().then((watchlist) => {
       res.setHeader('Content-Type', 'application/json');
       res.status(200).json(watchlist[0]);
    });
};

const createWatchlist = async (req ,res) => {
  //#swagger.tags ['watchlist']
    const user = {
       user_id: req.body.user_id,
       movie_id: req.body.movie_id,
      
    };
    const response = await mongodb.getDatabase().db().collection('watchlist').insertOne(user);
    if (response.acknowledged > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.console.error || 'Some error occurred while creating the watchlist');
    }
};

const updateWatchlist = async (req ,res) => {
  //#swagger.tags ['Watchlist']
    const userId = new ObjectId(req.params.id);
    const user = {
      user_id: req.body.user_id,
      movie_id: req.body.movie_id,
      
    };
    const response = await mongodb.getDatabase().db().collection('watchlist').replaceOne({_id: userId} ,user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.console.error || 'Some error occurred while updating the Movie');
    }
};

const deleteWatchlist = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid Movie id to delete a Movie.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('watchlist').deleteOne({ _id: userId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the movie.');
  }
};

module.exports = {
    getAll,
    getSingle,
    createWatchlist,
    updateWatchlist,
    deleteWatchlist

};