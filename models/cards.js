const db = require('../db/db_connection');

const addCards = (req, res) => {
    db.none('INSERT INTO cards (id, card, rank, deck_id, set_name) VALUES(${id}, ${card}, ${rank}, ${deck_id}, ${set_name})', req.body)
    .then(() => res.json({message: "The Set Has Been Saved", status: 200}))
    .catch(err => res.json({message: "ERR On Set Save", err, status: 402}))
}

const getCards = (req, res) => {
    db.any('SELECT * FROM cards')
    .then(data => res.json({data}))
    .catch(err => console.log(err))
}

module.exports = {
    addCards,
    getCards
}