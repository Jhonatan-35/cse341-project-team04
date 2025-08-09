const express = require ('express');
const router = express.Router();

const reviewsController =  require('../controllers/reviews');
const {isAuthenticated }= require('../middleware/authenticate');

router.get('/',reviewsController.getAll);

router.get('/:id',reviewsController.getSingle);

router.post('/',isAuthenticated ,reviewsController.createReviews);

router.put('/:id',isAuthenticated ,reviewsController.updateReviews);

router.delete('/:id', isAuthenticated ,reviewsController.deleteReviews);


module.exports = router;