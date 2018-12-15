const HistoryModel = require('../models/History')

class Controller {
    static create(req,res){
        const data = {
            userId : req.body.userId,
            tutorialId : req.body.tutorialId,
            score : req.body.score
        }

        HistoryModel
            .create(data)
            .then((created)=>{
                res.status(200).json(created)
            })
            .catch((error)=>{
                res.status(400).json({
                    errors : {
                        create : {
                            message : 'Create history failed'
                        }
                    }
                })
            })
    }
    
    static read (req,res){
        HistoryModel
            .find({})
            .then((list)=>{
                res.status(200).json(list)
            })
            .catch((error)=>{
                res.status(400).json({
                    errors : {
                        read : {
                            message : 'Read history failed'
                        }
                    }
                })
            })
    }
}

module.exports = Controller;