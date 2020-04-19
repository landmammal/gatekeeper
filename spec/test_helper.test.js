const mongoose = require("mongoose");
//tell mongoose to use es6 implementation of promises

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect("mongodb://localhost/gatekeeper_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection
    .once("open", () => done())
    .on("error", (error) => {
      console.warn("Error : ", error);
    });
});
//Called hooks which runs before something.
beforeEach((done) => {
  if (mongoose.connection.collections.length > 0) {
    mongoose.connection.collections.users.drop(() => {
      //this function runs after the drop is completed
      done(); //go ahead everything is done now.
    });
  }
  done();
});
