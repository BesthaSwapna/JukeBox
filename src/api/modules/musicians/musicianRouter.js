const { Router } = require('express');


const controller = require('./musicianController');
const Validation = require('./musicianValidation')

const router = Router();

router.post('/', Validation.createMusicians, controller.create);

module.exports = router;
