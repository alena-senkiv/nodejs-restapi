const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "name should be a type of 'text'",
    "string.empty": "name cannot be an empty field",
    "any.required": "missing required name field",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .messages({
      "string.email": "email should be a type of 'email'",
      "string.empty": "email cannot be an empty field",
    }),
  phone: Joi.string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/)
    .messages({
      "string.base": "phone must be a string",
      "string.pattern.base": "phone must match the pattern",
      "string.empty": "phone cannot be an empty field",
    }),
  favorite: Joi.bool(),
}).min(1);

const statusJoiSchema = Joi.object({
  favorite: Joi.bool()
    .required()
    .messages({ "any.required": "missing field favorite" }),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiSchema, statusJoiSchema };
