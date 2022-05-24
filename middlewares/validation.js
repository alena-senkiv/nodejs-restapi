const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      error.status = 400;
      !req._body
        ? (error.message = "missing fields")
        : (error.message = "missing required name field");

      next(error);
    }
    next();
  };
};

module.exports = validation;
