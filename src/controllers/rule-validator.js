export default {
  validateRule: (req, res) => {
    let result = false;
    const { condition, field } = req.body.rule;
    const conditionValue = req.body.rule.condition_value;
    // const { specifiedFields } = req.body;

    if (typeof req.body.data === 'string') {
      const resultMap = {
        eq: req.body.data[field] === conditionValue,
        neq: req.body.data[field] !== conditionValue,
        gt: req.body.data[field] > conditionValue,
        gte: req.body.data[field] >= conditionValue,
        contains: (new RegExp(conditionValue).test(req.body.data[field]))
      };

      result = resultMap[condition];
    }

    if (typeof req.body.data === 'object' && !Array.isArray(req.body.data)) {
      console.log(req.body.data[field]);
      const resultMap = {
        eq: req.body.data[field] === conditionValue,
        neq: req.body.data[field] !== conditionValue,
        gt: req.body.data[field] > conditionValue,
        gte: req.body.data[field] >= conditionValue,
        contains: (new RegExp(conditionValue).test(req.body.data[field]))
      };

      result = resultMap[condition];
    }

    if (typeof req.body.data === 'object' && Array.isArray(req.body.data)) {
      console.log('here');
      const resultMap = {
        eq: req.body.data[field] === conditionValue,
        neq: req.body.data[field] !== conditionValue,
        gt: req.body.data[field] > conditionValue,
        gte: req.body.data[field] >= conditionValue,
        contains: (new RegExp(conditionValue).test(req.body.data[field]))
      };

      result = resultMap[condition];
    }

    if (result !== true) {
      return res.status(200).json({
        message: `field ${field} failed validation.`,
        status: 'error',
        data: {
          validation: {
            error: true,
            field,
            field_value: req.body.data[field],
            condition,
            condition_value: conditionValue
          }
        }
      });
    }

    return res.status(200).json({
      message: `field ${field} successfully validated.`,
      status: 'success',
      data: {
        validation: {
          error: false,
          field,
          field_value: req.body.data[field],
          condition,
          condition_value: conditionValue
        }
      }
    });
  }
};
