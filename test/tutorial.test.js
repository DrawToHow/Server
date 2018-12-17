const chai = require("chai");
const chaiHttp = require("chai-http");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Tutorial = require("../models/Tutorial");

const expect = chai.expect;

const app = require("../app");
const clearUsersCollection = require("../helpers/clearUsersCollection");

let tutorialId = null;

chai.use(chaiHttp);

describe("Tutorial", () => {
  before(done => {
    Tutorial.create({
      title: "draw black cat",
      description: "this is the tutorial for drawing",
      thumbnail: "thumbnail",
      difficulty: "5c0bd50510b1a50f3bfb7ffe"
    }).then(created => {
      tutorialId = String(created._id);
      done();
    });
  });

  after(done => {
    User.deleteMany({}, () => {
      Tutorial.deleteMany({}, () => {
        done();
      });
    });
  });

  describe("POST /tutorial", () => {
    it("POST /tutorial should return created totorial and status 200", done => {
      let toturialObj = {
        title: "draw black cat",
        description: "this is the tutorial for drawing",
        thumbnail: "thumbnail",
        difficulty: "5c0bd50510b1a50f3bfb7ffd"
      };
      chai
        .request(app)
        .post("/tutorials")
        .send(toturialObj)
        .end((err, result) => {
          expect(result).to.have.status(201);
          expect(result.body).to.have.property("title");
          expect(result.body).to.have.property("description");
          expect(result.body).to.have.property("thumbnail");
          expect(result.body).to.have.property("difficulty");
          expect(result).to.have.property("status");
          done();
        });
    });

    it("POST /tutorial should return error with status code 400 if the title is empty", done => {
      let toturialObj = {
        description: "this is the tutorial for drawing",
        thumbnail: "kk",
        difficulty: "5c0bd50510b1a50f3bfb7ffd"
      };
      chai
        .request(app)
        .post("/tutorials")
        .send(toturialObj)
        .end((err, result) => {
          expect(result).to.have.status(400);
          expect(result.body.errors.create.message).to.equals(
            "Create tutorial error"
          );
          expect(result.body.errors.create.message).to.equals(
            "Create tutorial error"
          );
          expect(
            result.body.errors.create.error.errors.title.message
          ).to.equals("title is required");
          done();
        });
    });

    it("POST /tutorial should return error with status code 400 if the description is empty", done => {
      let toturialObj = {
        title: "title",
        thumbnail: "thumbnail",
        difficulty: "5c0bd50510b1a50f3bfb7ffd"
      };
      chai
        .request(app)
        .post("/tutorials")
        .send(toturialObj)
        .end((err, result) => {
          expect(result).to.have.status(400);
          expect(result.body.errors.create.message).to.equals(
            "Create tutorial error"
          );
          expect(result.body.errors.create.message).to.equals(
            "Create tutorial error"
          );
          expect(
            result.body.errors.create.error.errors.description.message
          ).to.equals("description is required");
          done();
        });
    });

    it("POST /tutorial should return error with status code 400 if the thumbnail is empty", done => {
      let toturialObj = {
        title: "title",
        description: "this is the tutorial for drawing",
        difficulty: "5c0bd50510b1a50f3bfb7ffd"
      };
      chai
        .request(app)
        .post("/tutorials")
        .send(toturialObj)
        .end((err, result) => {
          expect(result).to.have.status(400);
          expect(result.body.errors.create.message).to.equals(
            "Create tutorial error"
          );
          expect(result.body.errors.create.message).to.equals(
            "Create tutorial error"
          );
          expect(
            result.body.errors.create.error.errors.thumbnail.message
          ).to.equals("thumbnail is required");
          done();
        });
    });
  });

  describe('GET /tutorials', () => {
    it(" GET /tutorials should return all tutorials and should have status 200", done => {
      chai
        .request(app)
        .get("/tutorials")
        .end((err, result) => {
          expect(result).to.have.property("status");
          expect(result).to.have.status(200);
          expect(result.body).to.be.an("array");
  
          expect(result.body[0]).to.have.property("title");
          expect(result.body[0]).to.have.property("description");
          expect(result.body[0]).to.have.property("thumbnail");
          expect(result.body[0]).to.have.property("difficulty");
          done();
        });
    });
  })

  describe('PUT /tutorials', () => {
    it("PUT /tutorials/:id should return updated tutorial ", done => {
      let obj = {
        title: "title edited",
        description: "description edited",
        thumbnail: "thumbnail edited",
        difficulty: "5c0bd50510b1a50f3bfb7ffd"
      };
      chai
        .request(app)
        .put("/tutorials/" + tutorialId)
        .send(obj)
        .end((err, result) => {
          if (err) {
            console.log(err);
          }
          expect(result).to.have.status(200);
          expect(result.body).to.have.property("title");
          expect(result.body).to.have.property("description");
          expect(result.body).to.have.property("thumbnail");
          expect(result.body).to.have.property("difficulty");
          // expect(result.body.title).to.equal(obj.title)
          // expect(result.body.description).to.equal(obj.description)
          // expect(result.body.thumbnail).to.equal(thumbnail)
          // expect(result.body.difficulty).to.equal(obj.difficulty)
        });
  
      done();
    });
  })

  describe('DELETE /tutorials', () => {
    it("DELETE /tutorials/:id should return deleted tutorial and status 200 ", done => {
      chai
        .request(app)
        .delete("/tutorials/" + tutorialId)
        .end((err, result) => {
          if (err) {
            console.log("testing delete tutorial error", err);
          }
          expect(result).to.have.status(200);
          expect(result.body).to.have.property("title");
          expect(result.body).to.have.property("description");
          expect(result.body).to.have.property("thumbnail");
          expect(result.body).to.have.property("difficulty");
        });
  
      done();
    });
  })
});