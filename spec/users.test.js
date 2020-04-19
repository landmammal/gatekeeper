var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var User = require("../src/models/user");
const jwt = require("jsonwebtoken");

var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("POST /api/register-user", function () {
  beforeEach(function () {
    request = chai.request(server);
  });

  it("should register a user", (done) => {
    // test user
    const user = new User({
      fullname: "First Example",
      email: "First@Example.com",
      password: "test123",
    });

    // api call
    request
      .post("/api/register-user")
      .send(user)
      .end(function (err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;
        user.token = "123.112.123";

        // Run assertions on the response
        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody).to.be.an("object").that.includes(user);

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });

  it("should save users password to db as a  hash", (done) => {
    // test user
    const user = new User({
      fullname: "First Example",
      email: "First@Example.com",
      password: "test123",
    });

    // api call
    request
      .post("/api/register-user")
      .send(user)
      .end(function (err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;
        user.token = "123.112.123";

        // Run assertions on the response
        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody.password).to.not.have.string("test123");

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });

  it("should reject users with duplicate emails", (done) => {
    // Test User
    const user = new User({
      fullname: "First Example",
      email: "First@Example.com",
      password: "test123",
    });

    request
      .post("/api/register-user")
      .send(user)
      .end(function (err, res) {
        request
          .post("/api/register-user")
          .send(user)
          .end(function (err, res) {
            var responseStatus = res.status;

            // Run assertions on the response

            expect({ err }).to.have.string(
              "There is a user with that email try login in or  going to forgot password",
              "no duplicate emails"
            );

            expect(responseStatus).to.equal(403);

            // The `done` function is used to end any asynchronous tests
            done();
          });
      });
  });

  it("should generate a jwt token", (done) => {
    // test user
    const user = new User({
      fullname: "First Example",
      email: "First@Example.com",
      password: "test123",
    });

    // api call
    request
      .post("/api/register-user")
      .send(user)
      .end(function (err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response
        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody.token.split(".")).to.have.lengthOf(2);

        expect(responseBody).to.be.an("object").that.includes(user);

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });

  it("should return the user encrypted in JWT token", (done) => {
    // test user
    const user = new User({
      fullname: "First Example",
      email: "First@Example.com",
      password: "test123",
    });

    // api call
    request
      .post("/api/register-user")
      .send(user)
      .end(function (err, res) {
        let jwtToken;
        let responseStatus = res.status;
        let responseBody = res.body;

        // Run assertions on the response
        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        jwt.sign({ user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
          jwtToken = token;
        });

        expect(responseBody.token).to.equal(jwtToken);

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });
});
