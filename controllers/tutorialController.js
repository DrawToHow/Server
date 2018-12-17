//di giniin supaya tinggal edit dua const ini aja misal mau dijadiin crud untuk model lain
const model = require('../models/Tutorial');
const name = 'tutorial';

module.exports = {
    create(req,res){
        const data = req.data //ini di pack nya di middleware
        model
        .create(data)
        .then((created)=>{
            res.status(201).json(created)
        })
        .catch((error)=>{
            res.status(400).json({
                errors : {
                    create : {
                        message : `Create ${name} error`,
                        error : error
                    }
                }
            })
        })
    },
    read(req,res){
        if(req.params.id){
           model
           .findById(req.params.id)
           .then((data)=>{
               res.status(200).json(data)
           })
           .catch((error)=>{
               res.status(400).json({
                   errors : {
                       read : {
                           message : `Read ${name} error`,
                           error : error
                       }
                   }
               })
           })
        }else{
            model
            .find()
            .then((data)=>{
                res.status(200).json(data)
            })
            .catch((error)=>{
                res.status(400).json({
                    errors : {
                        read : {
                            message : `Read ${name} error`,
                            error : error
                        }
                    }
                })
            })
        }
    },
    update(req,res){
        const data = req.data; //ini di pack nya di middleware
        // console.log(data,'DATA FROM BODy')
        model
        .findOneAndUpdate({
            _id : req.params.id
        }, 
        {
            $set: {
                data
            }
        },
        {
            new: true
        })
        .then((updated)=>{
            res.status(200).json(updated)
        })
        .catch((error)=>{
            res.status(400).json({
                errors : {
                    update : {
                        message : `Update ${name} error`,
                        error : error
                    }
                }
            })
        })
    },
    delete(req,res){
        model.findOneAndDelete({
            _id : req.params.id
        })
        .then((deleted)=>{
            res.status(200).json(deleted)
        })
        .catch((error)=>{
            res.status(400).json({
                errors : {
                    delete : {
                        message : `Delete ${name} error`,
                        error : error
                    }
                }
            })
        })
    }
} 