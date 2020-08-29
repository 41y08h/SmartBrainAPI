const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { signInSchema } = require("../JoiValidation/FormSchemas");
const User = require("../Models/User");

module.exports = signInUser = (req, res) => {
  let { email, password } = req.body;

  // Convert email to lowercase
  email = email.toLowerCase();

  // Validate user input
  const { error } = signInSchema.validate(req.body);

  // There was an error in the user input.
  if (error) {
    res.json({ error: error.details[0].message });
  } else {
    // User input is valid
    // Now check if user with given credentials exists!
    User.findOne({ email }).then((foundUser) => {
      if (!foundUser) {
        res.json({ error: "Email or password is incorrect!" });
      } else {
        // User exists so compare password with bcrypt to check if password is correct!
        const passwordIsCorrect = bcrypt.compareSync(
          password,
          foundUser.password
        );

        if (passwordIsCorrect) {
          // Password is correct so send token to the user
          // Sign a JWT token
          const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET);
          res.json({
            token: token,
            user: { name: foundUser.name, email: foundUser.email },
          });
        } else {
          // Password is incorrect!
          res.json({ error: "Email or password is incorrect!" });
        }
      }
    });
  }
};
