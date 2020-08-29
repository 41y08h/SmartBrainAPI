const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { signUpSchema } = require("../JoiValidation/FormSchemas");
const User = require("../Models/User");

module.exports = signUpUser = (req, res) => {
  let { name, email, password } = req.body;

  // Convert email to lowercase
  email = email.toLowerCase();

  // Validate user input
  const { error } = signUpSchema.validate(req.body);

  // There was an error in the user input.
  if (error) {
    res.json({ error: error.details[0].message });
  } else {
    // User input is valid
    // Now check if user already exists!
    User.findOne({ email }).then((user) => {
      if (user) {
        res.json({ error: "User already exists!" });
      } else {
        // User doesn't exists so create a new one
        // Hash password with bcrypt
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Store User in the database
        const newUser = new User({ name, email, password: hashedPassword });
        newUser.save().then((savedUser) => {
          // Sign a JWT token
          const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
          res.json({
            token: token,
            user: { name: savedUser.name, email: savedUser.email },
          });
        });
      }
    });
  }
};
