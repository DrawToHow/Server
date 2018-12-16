const router = require('express').Router();
const {create, read, update} = require('../controllers/difficultyController');
const delet = require('../controllers//difficultyController').delete; //kalau dilangsungin delete tabrakan sama fungsi bawaan express
const {difficulty} = require('../middlewares/packager');

router.post('/',difficulty,create);
router.get('/:id',read);
router.get('/',read);
router.put('/',difficulty,update);
router.delete('/',delet);

module.exports = router;