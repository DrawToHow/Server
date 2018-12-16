module.exports = {
    history(req,res,next){
        req.data = {
            userId : req.userId, //ini harusnya dari middleware hasil decode token
            tutorialId : req.body.tutorialId,
            score : req.body.score,
            time : req.body.time
        }
        next()
    },
    tutorial(req,res,next){
        req.data = {
            title : req.body.title,
            description : req.body.description,
            thumbnail : req.body.thumbnail,
            difficulty : req.body.difficulty //ini isinya id dari difficulty (easy?medium?hard?)
        }
        next()
    },
    difficulty(req,res,next){
        req.data = {
            title : req.body.title,
            thumbnail : req.body.thumbnail,
            description : req.body.description
        }
        next()
    }
}