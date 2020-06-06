const mongoose = require("mongoose");
//tell mongoose to use es6 implementation of promises

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect("mongodb://localhost/gatekeeper_test", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection
    .once("open", () => done())
    .on("error", (error) => {
      console.warn("Error : ", error);
    });
});

after(function (done) {
  mongoose.connection.db.dropDatabase(function () {
    mongoose.connection.close(done);
  });
});
