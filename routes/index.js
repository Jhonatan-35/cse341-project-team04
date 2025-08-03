const router = require('express').Router();
router.get('/',(req, res)=> {

router.use('/', require('./swagger'));

    res.send('Hello world');
});

router.use('/movies',require('./movies'));
router.use('/users',require('./users'));

module.exports = router