const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./dbconfig");
const bcrypt = require("bcrypt");

function initialize(passport) {
  console.log("DeliveryMan Passport Config Started");
  console.log("Initialized");

  const authenticateDeliveryman = (deliverymanid, deliverymanpassword , done) => {
    console.log(deliverymanid, deliverymanpassword);
    pool.query(
      `select * from deliveryman where deliverymanid = $1`, [deliverymanid],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          const user = results.rows[0];
          if(deliverymanid === user.deliverymanid && bcrypt.compareSync(deliverymanpassword, user.password)){
            return done(null, user);
          }
          else {
            //password is incorrect
            return done(null, false, { message: "Password or ID is incorrect" });
          }
        } 
        else {
          // No user
          console.log("no deliveryman with that email");
          return done(null, false, {
            message: "No user with that email address"
          });
        }
      }
    );
  };

  passport.use(
    'deliveryman',
    new LocalStrategy(
      { usernameField: "deliverymanid", passwordField: "deliverymanpassword" },
      authenticateDeliveryman
    )
  );
  passport.serializeUser((user, done) => done(null, user.deliverymanid));

  passport.deserializeUser((userid, done) => {
    pool.query(`select * from deliveryman where deliverymanid = $1`, [userid], (err, results) => {
      if (err) {
        return done(err);
      }
      return done(null, results.rows[0]);
    });
  });
}

module.exports = initialize;