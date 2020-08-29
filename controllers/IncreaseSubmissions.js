const User = require("../Models/User");

module.exports = (profileId) => {
  // Increase image submissions
  User.findOneAndUpdate(
    { _id: profileId },
    {
      $inc: {
        submissions: 1,
      },
    }
  ).then((updated) => {
    if (updated) return true;
    else return false;
  });
};
