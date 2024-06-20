const validateSchema = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property]);
    if (error) {
      error.statusCode = 400;
      return next(error);
    }
    req[property] = value;
    next();
  };
};
module.exports = validateSchema;
