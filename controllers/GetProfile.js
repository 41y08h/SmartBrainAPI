const jwt = require("jsonwebtoken");
const User = require("../Models/User");

module.exports = getProfile = (req, res) => {
  const { token } = req.params;

  // Get profile id from token
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Find profile with id
    User.findOne({ _id: verifiedToken.id }).then((foundUser) => {
      if (foundUser) {
        res.json({
          user: {
            name: foundUser.name,
            email: foundUser.email,
            submissions: foundUser.submissions,
            joined: foundUser.joined,
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
};
