import express from 'express';

import validateRuleController from '../controllers/rule-validator';
import ruleValidator from '../validators/rule-validator';

const router = express.Router();
const { validateRule } = validateRuleController;
const requestBodyValidator = ruleValidator();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'My Rule-Validation API',
    status: 'success',
    data: {
      name: 'Oluwatobi Alaran',
      github: '@abolibot',
      email: 'alarantobiloba@gmail.com',
      mobile: '08175520794',
      twitter: '@__tobiMac'
    }
  });
});

router.post('/validate-rule', requestBodyValidator, validateRule);

export default router;
