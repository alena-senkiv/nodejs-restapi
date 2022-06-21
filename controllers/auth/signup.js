const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use`);
  }

  const avatarUrl = gravatar.url(email);
  const newUser = new User({ email, avatarUrl });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        avatarUrl,
      },
    },
  });
};

module.exports = signup;
