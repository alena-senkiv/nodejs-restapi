const contactsOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(contactId);
  if (!result) {
    throw new NotFound(`Not found`);
  }
  res.json({
    message: "Contact deleted",
  });
};

module.exports = removeById;
