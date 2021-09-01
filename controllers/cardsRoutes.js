const express = require('express')
const router = express.Router();
const Cards = require('../models/cards')

router.post('/', Cards.addCards)
router.get('/', Cards.getCards)

module.exports = router