const router = require('express').Router()
const controller = require('../controllers/userController')

router.get('/', function(req, res, next) {
  res.send('User Route');
});

router.post('/register', controller.register )

router.post('/login', controller.login )

module.exports = router;
