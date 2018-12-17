const router = require('express').Router();
const {create, read, update} = require('../controllers/historyController');
const delet = require('../controllers/historyController').delete; //kalau dilangsungin delete tabrakan sama fungsi bawaan express
const {history} = require('../middlewares/packager');
const {isLogin} = require('../middlewares/')

router.post('/',isLogin,history,create);
router.get('/:id', isLogin, read);
router.get('/',isLogin,read);
router.put('/:id',isLogin,history,update);
router.delete('/:id',isLogin,delet);

module.exports = router;