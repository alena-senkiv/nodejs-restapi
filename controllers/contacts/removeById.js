const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw new NotFound(`Not found`);
  }
  res.json({
    message: "Contact deleted",
  });
};

module.exports = removeById;
