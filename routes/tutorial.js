const router = require('express').Router();
const {create,read,update} = require('../controllers/tutorialController');
const delet = require('../controllers/tutorialController').delete;
const {tutorial} = require('../middlewares/packager');

router.post('/',tutorial,create);
router.get('/:id',read);
router.get('/',read);
router.put('/',tutorial,update);
router.delete('/',delet);

module.exports = router;
