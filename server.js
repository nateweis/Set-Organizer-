const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3006

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const cardController = require('./controllers/cardsRoutes')
app.use('/cards', cardController)

app.listen(port, () => console.log(`Hidee Hoe im on port ${port}`))