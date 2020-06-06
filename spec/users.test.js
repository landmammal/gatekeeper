require("dotenv/config");
const server = require("../server");
// const User = require("../src/models/user");
const chai = require("chai");
const jwt = require("jsonwebtoken");
const chaiHttp = require("chai-http");

const expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

let request;

describe("POST /api/register", function () {
  beforeEach(function () {
    request = chai.request(server);
  });

  it("should register a user", (done) => {
    // test user
    const user = {
      fullname: "First Example",
      email: "First@Example.com",
      password: "test123",
      confirmPassword: "test123",
    };

    // api call
    request
      .post("/api/register")
      .send(user)
      .end(function (err, res) {
        const responseStatus = res.status;
        const responseBody = res.body;
        user.token = "123.112.123";

        // Run assertions on the response
        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        // expect(responseBody).to.be.an("object").that.includes(user.fullname);
        expect(responseBody.user).to.have.own.property(
          "email",
          "First@Example.com"
        );
        expect(responseBody.user).to.have.own.property(
          "fullname",
          "First Example"
        );

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });

  it("should save users password to db as a  hash", (done) => {
    // test user
    const user = {
      fullname: "First Example",
      email: "First@Example.com",
      password: "test123",
      confirmPassword: "test123",
    };

    // api call
    request
      .post("/api/register")
      .send(user)
      .end(function (err, res) {
        const responseStatus = res.status;
        const responseBody = res.body;
        user.token = "123.112.123";

        // Run assertions on the response
        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody.user.password).to.not.have.string("test123");

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });

  it("should generate a jwt token", (done) => {
    // test user
    const user = {
      fullname: "First Example",
      email: "First@Example.com",
      password: "test123",
      confirmPassword: "test123",
    };

    // api call
    request
      .post("/api/register")
      .send(user)
      .end(function (err, res) {
        const responseStatus = res.status;
        const responseBody = res.body;

        // Run assertions on the response
        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody.token.split(".")).to.have.lengthOf(3);

        expect(responseBody.user).to.be.an("object").that.includes({
          fullname: "First Example",
          email: "First@Example.com",
        });

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });

  it("should return the user ID encrypted in JWT token", (done) => {
    // test user
    const user = {
      fullname: "First Example",
      email: "First@Example.com",
      password: "test123",
      confirmPassword: "test123",
    };

    // api call
    request
      .post("/api/register")
      .send(user)
      .end(function (err, res) {
        const responseStatus = res.status;
        const responseBody = res.body;

        // Run assertions on the response
        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        jwt.verify(responseBody.token.trim(), "secret", (err, userData) => {
          if (err) throw err;

          expect(userData.payload.email).to.equal("First@Example.com");
          expect(userData.payload.id).to.be.a("string");
          // The `done` function is used to end any asynchronous tests
          done();
        });
      });
  });
});
