const Clarifai = require("clarifai");
const jwt = require("jsonwebtoken");
const IncreaseSubmissions = require("./IncreaseSubmissions");

// Init Calrifai app
const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY,
});

const ImageHandler = (req, res) => {
  const { token } = req.body;

  if (!req.body.imageurl)
    return res.json({ error: "Please submit image URL!" });

  // Verify if token is correct
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const profileId = verifiedToken.id;

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.imageurl)
      .then((data) => {
        // Increase submissions
        IncreaseSubmissions(profileId);
        res.json(data);
      })
      .catch(() => {
        res.status(503).json({ error: "Your image URL is incorrect!" });
      });
  } catch {
    res.status(503).json({ error: "An error occurred with API." });
  }
};

module.exports = ImageHandler;
