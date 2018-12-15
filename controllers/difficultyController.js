const Difficulty = require('../models/Difficulty');

class Controller {
    static create(req,res){
        const data = {
            title : req.body.title,
            thumbnail : req.body.thumbnail,
            description : req.body.description
        }

        Difficulty
        .create(data)
        .then((created)=>{
            res.status(201).json(this.created)
        })
        .catch((error)=>{
            res.status(400).json({
                errors : {
                    create : {
                        message : 'Create difficulty error'
                    }
                }
            })
        })
    }

    static read(req,res){
        Difficulty
        .find({})
        .then((list)=>{
            res.status(200).json(list)
        })
        .catch((error)=>{
            res.status(400).json({
                errors : {
                    read : {
                        message : 'Read difficulty error'
                    }
                }
            })
        })
    }
};

module.exports = Controller;