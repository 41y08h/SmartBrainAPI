const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const { profileUpdateSchema } = require("../JoiValidation/UpdateSchemas");

const updateProfile = (req, res) => {
  let { name, email, password } = req.body;

  // Check if all fields are empty
  if (!name && !email && !password) {
    res.json({ error: "Please fill at least one field!" });
  } else if (email) {
    // If user wants to update email, check if another user with the same email already exists
    User.findOne({ email }).then((userExists) => {
      if (userExists) {
        return res.json({ error: "Please enter your own email!" });
      }
    });
  }

  // At least one field is available to update
  // Convert email to lowercase if exists
  if (email) email = email.toLowerCase();

  // Validate user input
  const { error } = profileUpdateSchema.validate(req.body);

  // There was an error in the user input.
  if (error) {
    res.json({ error: error.details[0].message });
  } else {
    // User input validated, preceed further

    const { token } = req.params;

    // Get profile id from token
    try {
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

      let hashedPassword;
      // Hash password with bcrypt
      if (password) {
        const salt = bcrypt.genSaltSync(10);
        hashedPassword = bcrypt.hashSync(password, salt);
      }

      // Find and Update profile with id
      User.updateOne(
        { _id: verifiedToken.id },
        {
          ...(name && { name }),
          ...(email && { email }),
          ...(password && { password: hashedPassword }),
        }
      ).then((status) => {
        if (status.ok) {
          res.json({
            user: {
              ...(name && { name }),
              ...(email && { email }),
            },
          });
        } else {
          res.status(400).json({ error: "Incorrect token!" });
        }
      });
    } catch (err) {
      // Wrong token
      res.status(400).json({ error: "Incorrect token!" });
    }
  }
};

module.exports = updateProfile;
