const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = chai.expect;

const app = require("../app");
const clearHistoryCollection = require("../helpers/clearHistoryCollection");
const clearUsersCollection = require("../helpers/clearUsersCollection");

chai.use(chaiHttp);

// Global access token for testing
let accessToken;

// Global history id for testing Update functionality
let historyId;

describe('History endpoints tests', function () {
    before(async function () {
        await clearHistoryCollection();

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

    after(async function () {
        await clearHistoryCollection();
        await clearUsersCollection();
    });

    describe('GET /Histories', function () {
        it('should send an array and a 200 status code', async function () {
            const response = await chai
                                    .request(app)
                                    .get("/histories")
                                    .set('Access-Token', accessToken)

            expect(response).to.have.status(200);
            expect(response.body).to.be.an('array');
        });

        it('should send an error object with a message and a 400 status code (no token)', async function () {
            const response = await chai
                                    .request(app)
                                    .get("/histories")

            expect(response).to.have.status(400);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.have.property('token');
            expect(response.body.errors.token.message).to.equal('Please provide your access token');
        });

        it('should send an error object with a message and a 400 status code (invalid token)', async function () {
            const response = await chai
                                    .request(app)
                                    .get("/histories")
                                    .set('Access-Token', 'senecamanu')

            expect(response).to.have.status(400);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.have.property('token');
            expect(response.body.errors.token.message).to.equal('Invalid access token');
        });
    });

    describe('POST /histories', function () {
        it('should send a newly created history', async function () {
            this.timeout(5000);

            const history = { tutorialId: 'test', score : '100', time : 'test' };

            const response = await chai
                                    .request(app)
                                    .post("/histories")
                                    .set('Access-Token', accessToken)
                                    .send(history);

            expect(response).to.have.status(201);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property('_id');
            expect(response.body).to.have.property('userId');
            expect(response.body).to.have.property('tutorialId');
            expect(response.body).to.have.property('time');

            historyId = response.body._id;
        });

        it("should send an error object with a message and a 400 status code (no token)", async function () {
            const history = { tutorialId: 'test', score : '100', time : 'test' };

            const response = await chai
                                    .request(app)
                                    .post("/histories")
                                    .send(history);

            expect(response).to.have.status(400);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property('errors')
            expect(response.body.errors).to.have.property('token');
            expect(response.body.errors.token.message).to.equal('Please provide your access token');
        });

        it('should send an error object with a message and a 400 status code (invalid token)', async function () {
            const response = await chai
                                    .request(app)
                                    .post("/histories")
                                    .set('Access-Token', 'senecamanu')

            expect(response).to.have.status(400);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.have.property('token');
            expect(response.body.errors.token.message).to.equal('Invalid access token');
        });

        it('should send an error object with a message and a 400 status code (no tutorialId key)', async function () {
            const history = {score : '100', time : 'test' };

            const response = await chai
                                    .request(app)
                                    .post("/histories")
                                    .set('Access-Token', accessToken)
                                    .send(history);

            expect(response).to.have.status(400);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property('errors')
            expect(response.body.errors).to.have.property('tutorialId');
            expect(response.body.errors.title.message).to.equal('TutorialId is required');
        });

        it("should send an error object with a message and a 400 status code (tutorialId === '')", async function () {
            const history = {tutorialId : '', score : '100', time : 'test' };

            const response = await chai
                                    .request(app)
                                    .post("/histories")
                                    .set('Access-Token', accessToken)
                                    .send(history);

            expect(response).to.have.status(400);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property('errors')
            expect(response.body.errors).to.have.property('tutorialId');
            expect(response.body.errors.title.message).to.equal('tutorialId is required');
        });

        it("should send an error object with a message and a 400 status code (no score key)", async function () {
            const history = {tutorialId : 'test', time : 'test' };

            const response = await chai
                                    .request(app)
                                    .post("/histories")
                                    .set('Access-Token', accessToken)
                                    .send(history);

            expect(response).to.have.status(400);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property('errors')
            expect(response.body.errors).to.have.property('score');
            expect(response.body.errors.description.message).to.equal('Score is required');
        });

        it("should send an error object with a message and a 400 status code (score === '')", async function () {
            const history = {tutorialId : 'test', time : 'test' , score : '' };

            const response = await chai
                                    .request(app)
                                    .post("/histories")
                                    .set('Access-Token', accessToken)
                                    .send(history);

            expect(response).to.have.status(400);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property('errors')
            expect(response.body.errors).to.have.property('score');
            expect(response.body.errors.description.message).to.equal('Score is required');
        });
    
        it("should send an error object with a message and a 400 status code (no time key)", async function () {
            const history = {tutorialId : 'test', score : 100 };

            const response = await chai
                                    .request(app)
                                    .post("/histories")
                                    .set('Access-Token', accessToken)
                                    .send(history);

            expect(response).to.have.status(400);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property('errors')
            expect(response.body.errors).to.have.property('time');
            expect(response.body.errors.description.message).to.equal('Time is required');
        });

        it("should send an error object with a message and a 400 status code (time === '')", async function () {
            const history = {tutorialId : 'test', score : 100 , time : '' };

            const response = await chai
                                    .request(app)
                                    .post("/histories")
                                    .set('Access-Token', accessToken)
                                    .send(history);

            expect(response).to.have.status(400);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property('errors')
            expect(response.body.errors).to.have.property('time');
            expect(response.body.errors.description.message).to.equal('Time is required');
        });

        it("should send an error object with a message and a 400 status code (no tutorialId, score and time keys)", async function () {
            const history = {};

            const response = await chai
                                    .request(app)
                                    .post("/histories")
                                    .set('Access-Token', accessToken)
                                    .send(history);

            expect(response).to.have.status(400);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property('errors')
            expect(response.body.errors).to.have.property("tutorialId");
            expect(response.body.errors.title.message).to.equal("TutorialId is required");
            expect(response.body.errors).to.have.property('score');
            expect(response.body.errors.description.message).to.equal('Score is required');
            expect(response.body.errors).to.have.property('time');
            expect(response.body.errors.description.message).to.equal('Time is required');
        });

        it("should send an error object with a message and a 400 status code (tutorialId === '', score === '' and time === '')", async function () {
            const history = { tutorialId: '', score: '', time : ''};

            const response = await chai
                                    .request(app)
                                    .post("/histories")
                                    .set('Access-Token', accessToken)
                                    .send(history);

            expect(response).to.have.status(400);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property('errors')
            expect(response.body.errors).to.have.property("tutorialId");
            expect(response.body.errors.title.message).to.equal("TutorialId is required");
            expect(response.body.errors).to.have.property('score');
            expect(response.body.errors.description.message).to.equal('Score is required');
            expect(response.body.errors).to.have.property('time');
            expect(response.body.errors.description.message).to.equal('Time is required');
        });
    });

    describe('GET /histories/:id', function () {
        it('should send an object and a 200 status code', async function () {
            const response = await chai
                                    .request(app)
                                    .get("/histories/" + historyId)
                                    .set('Access-Token', accessToken)

            expect(response).to.have.status(200);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property('_id');
            expect(response.body).to.have.property('tutorialId');
            expect(response.body).to.have.property('score');
            expect(response.body).to.have.property('time');
        });

        it('should send an error object with a message and a 400 status code (no token)', async function () {
            const response = await chai
                                    .request(app)
                                    .get("/histories/" + historyId)

            expect(response).to.have.status(400);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.have.property('token');
            expect(response.body.errors.token.message).to.equal('Please provide your access token');
        });

        it('should send an error object with a message and a 400 status code (invalid token)', async function () {
            const response = await chai
                                    .request(app)
                                    .get("/histories/" + historyId)
                                    .set('Access-Token', 'senecamanu')

            expect(response).to.have.status(400);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.have.property('token');
            expect(response.body.errors.token.message).to.equal('Invalid access token');
        });

        it('should send an error object with a message and a 404 status code (history not found)', async function () {
            const response = await chai
                                    .request(app)
                                    .get("/histories/5bea58362e5fcc6dae24a3f1")
                                    .set('Access-Token', accessToken);

            expect(response).to.have.status(404);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property('errors')
            expect(response.body.errors).to.have.property("history");
            expect(response.body.errors.history.message).to.equal("History not found");
        });

        it('should send an error object with a message and a 404 status code (history not found)', async function () {
            const response = await chai
                                    .request(app)
                                    .get("/histories/foobar")
                                    .set('Access-Token', accessToken);

            expect(response).to.have.status(404);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property('errors')
            expect(response.body.errors).to.have.property("history");
            expect(response.body.errors.history.message).to.equal("History not found");
        });
    });

    describe('DELETE /histories', function () {
        it('should send a deleted movie and a 200 status code', async function () {
            const response = await chai
                                    .request(app)
                                    .delete("/histories/" + historyId)
                                    .set('Access-Token', accessToken);

            expect(response).to.have.status(200);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property("_id");
        });

        it('should send an error object with a message and a 400 status code (no token)', async function () {
            const response = await chai
                                    .request(app)
                                    .delete("/histories/" + historyId);

            expect(response).to.have.status(400);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property("errors");
            expect(response.body.errors).to.have.property("token");
            expect(response.body.errors.token.message).to.equal("Please provide your access token");
        });

        it('should send an error object with a message and a 400 status code (invalid token)', async function () {
            const response = await chai
                                .request(app)
                                .delete("/histories/" + historyId)
                                .set('Access-Token', 'senecamanu');

            expect(response).to.have.status(400);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.have.property('token');
            expect(response.body.errors.token.message).to.equal('Invalid access token');
        });

        it('should send an error object with a message and a 404 status code (history not found)', async function () {
            const response = await chai
                                    .request(app)
                                    .delete("/histories/5bea58362e5fcc6dae24a3f1")
                                    .set('Access-Token', accessToken);

            expect(response).to.have.status(404);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property('errors')
            expect(response.body.errors).to.have.property("history");
            expect(response.body.errors.history.message).to.equal("History not found");
        });

        it('should send an error object with a message and a 404 status code (history not found)', async function () {
            const response = await chai
                                    .request(app)
                                    .delete("/histories/foobar")
                                    .set('Access-Token', accessToken);

            expect(response).to.have.status(404);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property('errors')
            expect(response.body.errors).to.have.property("history");
            expect(response.body.errors.history.message).to.equal("History not found");
        });
    });
});