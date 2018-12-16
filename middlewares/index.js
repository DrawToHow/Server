const jwt = require('jsonwebtoken');

module.exports = {
    isLogin(req,res,next){
        const token = req.headers["access-token"]
        if(token){
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            if(decoded._id){
                req.userId = decoded._id
                next()
            }else{
                res.status(400).json({
                    errors : {
                        token : {
                            message : 'Invalid token',
                            error : error
                        }
                    }
                })
            }
        }else{
            res.status(400).json({
                errors : {
                    token : {
                        message : 'Please provide your access token',
                    }
                }
            })
        } 
    }
};