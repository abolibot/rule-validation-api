import RequestValidationError from '../errors/request-validation-error';

export default () => (req, res, next) => {
  const requiredFields = {
    rule: {
      value: req.body?.rule,
      allowedTypes: ['object'],
      invalidTypeMessage: 'rule should be an object.'
    },
    data: {
      value: req.body?.data,
      allowedTypes: ['object', 'string'],
      invalidTypeMessage: 'data should be an object, array or string.'
    },
    'rule.field': {
      value: req.body?.rule?.field,
      allowedTypes: ['string'],
      invalidTypeMessage: 'rule.field should be a string.'
    },
    'rule.condition': {
      value: req.body?.rule?.condition,
      allowedTypes: ['string'],
      invalidTypeMessage: 'rule.condition should be a string.'
    },
    'rule.condition_value': {
      value: req.body?.rule?.condition_value,
      allowedTypes: ['number', 'string'],
      invalidTypeMessage: 'rule.condition_value should be a string or number.'
    }
  };

  for (const field in requiredFields) {
    if (requiredFields[field].value === undefined) {
      throw new RequestValidationError(`${field} is required.`);
    }

    if (
      requiredFields[field].allowedTypes.includes(
        typeof requiredFields[field].value
      ) === false ||
      requiredFields[field].value === null
    ) {
      throw new RequestValidationError(
        requiredFields[field].invalidTypeMessage
      );
    }
  }

  let specifiedFields;

  if (typeof req.body.data === 'object' && Array.isArray(req.body.data)) {
    const fields = [];
    for (let i = 0; i < req.body.data.length; i++) {
      fields.push(i.toString());
    }
    specifiedFields = fields;
  }

  if (typeof req.body.data === 'string') {
    const strArray = req.body.data.split('');
    const fields = [];
    for (let i = 0; i < strArray.length; i++) {
      fields.push(i.toString());
    }
    specifiedFields = fields;
  }

  if (typeof req.body.data === 'object' && !Array.isArray(req.body.data)) {
    const fields = [];
    for (const field in req.body.data) {
      if (typeof req.body.data[field] === 'object') {
        Object.keys(req.body.data[field]).forEach((nestedKey) => {
          fields.push(`${field}.${nestedKey}`);
        });
      } else {
        fields.push(field);
      }
    }
    specifiedFields = fields;
  }

  if (!specifiedFields.includes(req.body.rule.field)) {
    throw new RequestValidationError(
      `field ${req.body.rule.field} is missing from data.`
    );
  }

  next();
};
