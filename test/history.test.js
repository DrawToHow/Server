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
                                .post('/login')
                                .send(user);

        accessToken = response.body.accessToken;
    });

    after(async function () {
        await clearHistoriesCollection();
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
    });
});