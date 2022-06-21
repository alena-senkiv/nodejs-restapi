const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
const updateAvatar = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  console.log(tmpUpload);
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  try {
    await Jimp.read(tmpUpload).then((image) => {
      return image.resize(250, 250).write(tmpUpload);
    });
    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tmpUpload, resultUpload);
    const avatarUrl = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarUrl });

    res.json({ avatarUrl });
  } catch (error) {
    await fs.unlink(tmpUpload);
    throw error;
  }
};

module.exports = updateAvatar;
