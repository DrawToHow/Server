const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Difficulty = require('../models/Difficulty')

const expect = chai.expect;

const app = require('../app');
const clearUsersCollection = require('../helpers/clearUsersCollection');

let difficultyId = null
let accessToken

chai.use(chaiHttp);

describe('Difficulty', () => {
  before((done) => {
      Difficulty.create({
        title: 'easy',
        description: 'easy drawing',
        thumbnail : 'thumb',
      })
      .then(created => {
        difficultyId = String(created._id)
        done()
      })
  })

  before(async function () {
    const user = { email: 'hadi@mail.com', password: 'secret' };
    await chai
            .request(app)
            .post('/users/register')
            .send(user);

    const response = await chai
                            .request(app)
                            .post('/users/login')
                            .send(user);

    accessToken = response.body.accessToken;
});

  after((done) => {
    User.deleteMany({}, () => {
      Difficulty.deleteMany({}, () => {
        done()
      })
    })
  })

  describe('POST /difficulty', () => {
    it('POST / difficulty should return created difficulty and status 201', (done) => {
      let obj = {
        title: 'hard',
        description: 'this drawing for hard',
        thumbnail : 'thumbnail',  
      }
      chai.request(app)
          .post('/difficulties')
          .send(obj)
          .set('Access-Token', accessToken)
          .end((err, result) => {
            expect(result).to.have.status(201)
            expect(result.body).to.have.property('title')
            expect(result.body).to.have.property('description')
            expect(result.body).to.have.property('thumbnail')
            expect(result).to.have.property('status')
            done()
          })
    })

    it("should send an error object with a message and a 400 status code (no token)", async function () {
      let obj = {
        title: 'hard',
        description: 'this drawing for hard',
        thumbnail : 'thumbnail',  
      }
      const response = await chai
                            .request(app)
                            .post("/difficulties")
                            .send(obj);
      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.have.property('token');
      expect(response.body.errors.token.message).to.equal('Please provide your access token');
  });

  it('should send an error object with a message and a 400 status code (no title key)', async function () {
    let obj = {
      description: 'this drawing for hard',
      thumbnail : 'thumbnail',  
    }

    const response = await chai
                            .request(app)
                            .post("/difficulties")
                            .set('Access-Token', accessToken)
                            .send(obj);

    expect(response).to.have.status(400);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property('errors')
    expect(response.body.errors.create.message).to.equal('Create difficulty error');
    expect(response.body.errors.create.error.errors.title.message).to.equal('title is required');
});

it('should send an error object with a message and a 400 status code (no description key)', async function () {
  let obj = {
    title: 'title',
    thumbnail : 'thumbnail'
  }

  const response = await chai
                          .request(app)
                          .post("/difficulties")
                          .set('Access-Token', accessToken)
                          .send(obj);

  expect(response).to.have.status(400);
  expect(response.body).to.be.an("object");
  expect(response.body).to.have.property('errors')
  expect(response.body.errors.create.message).to.equal('Create difficulty error');
  expect(response.body.errors.create.error.errors.description.message).to.equal('description is required');
});


})

  describe('GET /difficulties', () => {
    it('GET /difficulties should return all difficulty and should have status 200', (done) => {
      chai.request(app)
          .get('/difficulties')
          .set('Access-Token', accessToken)
          .end((err, result) => {
            expect(result).to.have.property('status')
            expect(result).to.have.status(200)
            expect(result.body).to.be.an('array')
            expect(result.body[0]).to.have.property('title')
            expect(result.body[0]).to.have.property('description')
            expect(result.body[0]).to.have.property('thumbnail')
            done()
          })
    })


    it('GET /difficulties should return one detail difficulty and should have status 200', (done) => {
      chai.request(app)
          .get('/difficulties/'+difficultyId)
          .set('Access-Token', accessToken)
          .end((err, result) => {
            expect(result).to.have.property('status')
            expect(result).to.have.status(200)
            expect(result.body).to.be.an('object')
            expect(result.body).to.have.property('title')
            expect(result.body).to.have.property('description')
            expect(result.body).to.have.property('thumbnail')
            done()
          })
    })

    it('GET /difficulties should return error and  status 400 if the id is invalid objectId', (done) => {
      chai.request(app)
          .get('/difficulties/invalidhoho')
          .set('Access-Token', accessToken)
          .end((err, result) => {
            expect(result).to.have.property('status')
            expect(result).to.have.status(400)
            expect(result.body).to.be.an('object')
            expect(result.body).to.have.property('errors')
            done()
          })
    })

    it("should send an error object with a message and a 400 status code (no token)", async function () {
      
      const response = await chai
                            .request(app)
                            .get('/difficulties')
      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.have.property('token');
      expect(response.body.errors.token.message).to.equal('Please provide your access token');
  });

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
          .set('Access-Token', accessToken)
          .end((err, result) => {
            if (err) {
              console.log(err)
            }
            expect(result).to.have.status(200)
            expect(result.body).to.have.property('title')
            expect(result.body).to.have.property('description')
            expect(result.body).to.have.property('thumbnail')
            done()
          })         
    })

    it("should send an error object with a message and a 400 status code (no token)", async function () {
      
      const response = await chai
                            .request(app)
                            .put('/difficulties/'+difficultyId)
      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.have.property('token');
      expect(response.body.errors.token.message).to.equal('Please provide your access token');
  });

  it('PUT /difficulties should return error and should have status 400 if one of property not provided', (done) => {
    let obj = {
      description: 'description edited',
      thumbnail : 'thumbnail edited'  
    }
    chai.request(app)
        .get('/difficulties/'+difficultyId)
        .set('Access-Token', accessToken)
        .send(obj)
        .end((err, result) => {
          expect(result).to.have.property('status')
          expect(result).to.have.status(200)
          expect(result.body).to.be.an('object')
          done()
        })
  })
    
  
 describe('DELETE /difficulties', () => {
  it('DELETE /difficulties/:id should return deleted difficulty and status 200 ', (done) => {
    chai.request(app)
        .delete('/difficulties/'+difficultyId)
        .set('Access-Token', accessToken)
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

  it("should send an error object with a message and a 400 status code (no token)", async function () {
      
    const response = await chai
                          .request(app)
                          .delete('/difficulties/'+difficultyId)
    expect(response).to.have.status(400);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property('errors');
    expect(response.body.errors).to.have.property('token');
    expect(response.body.errors.token.message).to.equal('Please provide your access token');
  });
})
 


})