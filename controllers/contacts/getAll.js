const { Contact } = require("../../models");

const findContacts = (params, skip, limit) => {
  return Contact.find({ ...params }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id, email");
};

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  let result = await findContacts({ owner: _id }, skip, limit);

  if (favorite) {
    result = await findContacts({ owner: _id, favorite }, skip, limit);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAll;
