const router = require('express').Router();
const {create,read,update} = require('../controllers/tutorialController');
const delet = require('../controllers/tutorialController').delete;
const {tutorial} = require('../middlewares/packager');
const {isLogin} = require('../middlewares/')

router.post('/', isLogin,tutorial,create);
router.get('/:id', isLogin,read);
router.get('/', isLogin,read);
router.put('/:id', isLogin,tutorial,update);
router.delete('/:id', isLogin,delet);

module.exports = router;
