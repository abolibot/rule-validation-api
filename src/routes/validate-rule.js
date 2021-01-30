import express from 'express';

const router = express.Router();

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

export default router;
