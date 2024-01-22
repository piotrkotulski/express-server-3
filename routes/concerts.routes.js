const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    res.json(db.concerts);
});

router.get('/:id', (req, res) => {
    const concert = db.concerts.find(c => c.id === parseInt(req.params.id));
    if (concert) {
        res.json(concert);
    } else {
        res.status(404).json({ message: 'Not found' });
    }
});

router.post('/', (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    if (!performer || !genre || !price || !day || !image) {
        res.status(400).json({ message: 'All fields are required' });
    } else {
        const newConcert = { id: db.concerts.length + 1, performer, genre, price, day, image };
        db.concerts.push(newConcert);
        res.json({ message: 'OK' });
    }
});

router.put('/:id', (req, res) => {
    const concert = db.concerts.find(c => c.id === parseInt(req.params.id));
    if (!concert) {
        res.status(404).json({ message: 'Not found' });
    } else {
        const { performer, genre, price, day, image } = req.body;
        if (!performer || !genre || !price || !day || !image) {
            res.status(400).json({ message: 'All fields are required' });
        } else {
            concert.performer = performer;
            concert.genre = genre;
            concert.price = price;
            concert.day = day;
            concert.image = image;
            res.json({ message: 'OK' });
        }
    }
});

router.delete('/:id', (req, res) => {
    const index = db.concerts.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).json({ message: 'Not found' });
    } else {
        db.concerts.splice(index, 1);
        res.json({ message: 'OK' });
    }
});

module.exports = router;
