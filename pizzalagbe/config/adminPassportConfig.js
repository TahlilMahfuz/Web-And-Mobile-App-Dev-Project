const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./dbconfig");
const bcrypt = require("bcrypt");

function initialize(passport) {
  console.log("Admin Passport Config Started");
  console.log("Initialized");

  const authenticateAdmin = (adminemail, adminpassword, done) => {
    console.log("admin email: " + adminemail);
    console.log("admin password: " + adminpassword);

    let error = [];
    pool.query(
      `select * from admins where adminemail=$1`,
      [adminemail],
      (err, results) => {
        if (err) {
          return done(err); // Use done to handle errors
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          const admin = results.rows[0];

          bcrypt.compare(adminpassword, admin.adminpassword, (err, isMatch) => {
            if (err) {
              console.log(err);
              return done(err);
            }
            if (isMatch) {
              return done(null, admin); // Save admin object in session
            } else {
              // Password is incorrect
              error.push({ message: "Incorrect Password" });
              return done(null, false, { message: "Incorrect Password" });
            }
          });
        } else {
          // No user
          // Password is incorrect
          error.push({ message: "Incorrect Password" });
          return done(null, false, { message: "Incorrect Password" });
        }
      }
    );
  };

  passport.use(
    'admin',
    new LocalStrategy(
      { usernameField: "adminemail", passwordField: "adminpassword" },
      authenticateAdmin
    )
  );
  passport.serializeUser((admin, done) => done(null, admin.adminid));

  passport.deserializeUser((adminid, done) => {
    pool.query(`SELECT * FROM admins WHERE adminid = $1`, [adminid], (err, results) => {
      if (err) {
        return done(err);
      }
      console.log("here are admin data");
      console.log(results.rows[0]);
      return done(null, results.rows[0]);
    });
  });
}

module.exports = initialize;
