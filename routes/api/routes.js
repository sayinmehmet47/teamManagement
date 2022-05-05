const { getItems } = require('../../controller/controller');

const express = require('express');

const router = express.Router();

router.route('/api/items').get(getItems);

module.exports = router;
