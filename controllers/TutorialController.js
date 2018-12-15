const Tutorial = require('../models/Tutorial')

class Controller {
    static create(req,res){
        const data = {
            title : req.body.title,
            description : req.body.description,
            thumbnail : req.body.thumbnail,
            difficulty : req.body.difficulty
        }

        Tutorial
            .create(data)
            .then((created)=>{
                res.status(200).json(created)
            })
            .catch((error)=>{
                res.status(400).json({
                    errors : {
                        create : {
                            message : 'Create tutorial failed'
                        }
                    }
                })
            })
    }
    
    static read (req,res){
        Tutorial
            .find({})
            .then((list)=>{
                res.status(200).json(list)
            })
            .catch((error)=>{
                res.status(400).json({
                    errors : {
                        read : {
                            message : 'Read tutorial failed'
                        }
                    }
                })
            })
    }
}

module.exports = Controller;