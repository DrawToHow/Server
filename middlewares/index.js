const jwt = require('jsonwebtoken');

module.exports = {
    isLogin(req,res,next){
        try {
            const decoded = jwt.verify(req.headers['access-token'], process.env.JWT_SECRET)
            if(decoded) {
                req.userId = decoded._id
                next()
            };
        } catch (err) {
            if(!req.headers['access-token']) {
                res.status(400).json({
                    errors: {
                    token: {
                        message: 'Please provide your access token'
                        }
                    }
                });
            }else{
                res.status(400).json({
                    errors: {
                    token: {
                        message: 'Invalid access token'
                        }
                    }
                });
            };
        };
    }
};