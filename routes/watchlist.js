const express = require ('express');
const router = express.Router();

const watchlistController =  require('../controllers/watchlist');
const {isAuthenticated }= require('../middleware/authenticate');

router.get('/',watchlistController.getAll);

router.get('/:id',watchlistController.getSingle);

router.post('/',isAuthenticated ,watchlistController.createWatchlist);

router.put('/:id',isAuthenticated ,watchlistController.updateWatchlist);

router.delete('/:id',isAuthenticated ,watchlistController.deleteWatchlist);


module.exports = router;