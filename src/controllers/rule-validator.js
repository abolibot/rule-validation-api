export default {
  validateRule: (req, res) => {
    let dataField;
    const { condition, field } = req.body.rule;
    const conditionValue = req.body.rule.condition_value;

    if (typeof req.body.data === 'object' && !Array.isArray(req.body.data)) {
      const fields = field.split('.');
      dataField =
        fields.length > 1
          ? req.body.data[fields[0]][fields[1]]
          : req.body.data[fields[0]];
    } else {
      dataField = req.body.data[field];
    }

    const resultMap = {
      eq: dataField === conditionValue,
      neq: dataField !== conditionValue,
      gt: dataField > conditionValue,
      gte: dataField >= conditionValue,
      contains: new RegExp(conditionValue).test(dataField)
    };

    const result = resultMap[condition];

    if (result !== true) {
      return res.status(400).json({
        message: `field ${field} failed validation.`,
        status: 'error',
        data: {
          validation: {
            error: true,
            field,
            field_value: dataField,
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
          field_value: dataField,
          condition,
          condition_value: conditionValue
        }
      }
    });
  }
};
