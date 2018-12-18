const router = require('express').Router();
const {create, read, update} = require('../controllers/difficultyController');
const delet = require('../controllers//difficultyController').delete; //kalau dilangsungin delete tabrakan sama fungsi bawaan express
const {difficulty} = require('../middlewares/packager');
const {isLogin} = require('../middlewares/')

router.post('/', isLogin, difficulty,create);
router.get('/:id',isLogin,read);
router.get('/',isLogin,read);
router.put('/:id',isLogin,difficulty,update);
router.delete('/:id',isLogin,delet);

module.exports = router;