const router = require('express').Router();
const {create, read, update} = require('../controllers/historyController');
const delet = require('../controllers/historyController').delete; //kalau dilangsungin delete tabrakan sama fungsi bawaan express
const {history} = require('../middlewares/packager');

router.post('/',history,create);
router.get('/:id',read);
router.get('/',read);
router.put('/',history,update);
router.delete('/',delet);

module.exports = router;