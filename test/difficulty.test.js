const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Difficulty = require('../models/Difficulty')

const expect = chai.expect;

const app = require('../app');
const clearUsersCollection = require('../helpers/clearUsersCollection');

let difficultyId = null

chai.use(chaiHttp);

describe('Difficulty', () => {
  before((done) => {
      User
          .create({
        name: 'Hadi nw',
        email: 'hadinw@mail.com',
        password: 'secreet'
      })
      .then(user => {
        User
            .findOne({
              email: 'hadinw@mail.com'
            })
            .then(userFound => {
              let user = {
                id: userFound._id,
                name: userFound.name,
                email: userFound.email
              }
              token = jwt.sign(user, process.env.JWT_SECRET)
              userId = String(user.id)   
              done()
            })            
      })

      Difficulty.create({
        title: 'easy',
        description: 'easy drawing',
        thumbnail : 'thumb',
      })
      .then(created => {
        difficultyId = String(created._id)
      })
  })

  after((done) => {
    User.deleteMany({}, () => {
      Difficulty.deleteMany({}, () => {
        done()
      })
    })
  })


  it('POST / difficulty should return created difficulty and status 201', (done) => {
    let obj = {
      title: 'hard',
      description: 'this drawing for hard',
      thumbnail : 'thumbnail',  
    }
    chai.request(app)
        .post('/difficulties')
        .send(obj)
        .end((err, result) => {
          expect(result).to.have.status(201)
          expect(result.body).to.have.property('title')
          expect(result.body).to.have.property('description')
          expect(result.body).to.have.property('thumbnail')
          expect(result).to.have.property('status')
          done()
        })
  })

  // it('POST /tutorial should return error with status code 400 if the title is empty', (done) => {
  //   let toturialObj = {
  //     description: 'this is the tutorial for drawing',
  //     thumbnail : '',
  //     difficulty : '5c0bd50510b1a50f3bfb7ffd'    
  //   }
  //   chai.request(app)
  //       .post('/tutorials')
  //       .send(toturialObj)
  //       .end((err, result) => {
  //         expect(result).to.have.status(400)
  //         // expect(result.body).to.have.property('title')
  //         // expect(result.body).to.have.property('description')
  //         // expect(result.body).to.have.property('thumbnail')
  //         // expect(result.body).to.have.property('difficulty')
  //         // expect(result).to.have.property('status')
  //         done()
  //       })
  // })

  it(' GET /difficulties should return all difficulty and should have status 200', (done) => {
    chai.request(app)
        .get('/difficulties')
        .end((err, result) => {
          expect(result).to.have.property('status')
          expect(result).to.have.status(200)
          expect(result.body).to.be.an('array')
          expect(result.body).to.have.lengthOf(2)

          expect(result.body[0]).to.have.property('title')
          expect(result.body[0]).to.have.property('description')
          expect(result.body[0]).to.have.property('thumbnail')
          done()
        })
  })

  it('PUT /difficulties/:id should return updated difficulty ', (done) => {
    let obj = {
      title: 'title edited',
      description: 'description edited',
      thumbnail : 'thumbnail edited'  
    }
    chai.request(app)
        .put('/difficulties/'+difficultyId)
        .send(obj)
        .end((err, result) => {
          if (err) {
            console.log(err)
          }
          // console.log(result.body, '=====')
          expect(result).to.have.status(200)
          expect(result.body).to.have.property('title')
          expect(result.body).to.have.property('description')
          expect(result.body).to.have.property('thumbnail')
        //   expect(result.body.title).to.equal(obj.title)
        //   expect(result.body.description).to.equal(obj.description)
        //   expect(result.body.thumbnail).to.equal(thumbnail)
        //   expect(result.body.difficulty).to.equal(obj.difficulty)
        })

        done()
  })

  it('DELETE /difficulties/:id should return deleted difficulty and status 200 ', (done) => {
    chai.request(app)
        .delete('/difficulties/'+difficultyId)
        .end((err, result) => {
          if (err) {
            console.log('testing delete difficulty error', err)
          }
          expect(result).to.have.status(200)
          expect(result.body).to.have.property('title')
          expect(result.body).to.have.property('description')
          expect(result.body).to.have.property('thumbnail')
        })

        done()
  })


})