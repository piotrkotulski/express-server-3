const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    res.json(db.seats);
});

router.get('/:id', (req, res) => {
    const seat = db.seats.find(s => s.id === parseInt(req.params.id));
    if (seat) {
        res.json(seat);
    } else {
        res.status(404).json({ message: 'Not found' });
    }
});

router.post('/', (req, res) => {
    const { day, seat, client, email } = req.body;

    if (!day || !seat || !client || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const isSeatTaken = db.seats.some(s => s.day === day && s.seat === seat);
    if (isSeatTaken) {
        return res.status(409).json({ message: 'The slot is already taken...' });
    }

    const newSeat = { id: db.seats.length + 1, day, seat, client, email };
    db.seats.push(newSeat);
    res.json({ message: 'OK' });
});

router.put('/:id', (req, res) => {
    const seat = db.seats.find(s => s.id === parseInt(req.params.id));
    if (!seat) {
        res.status(404).json({ message: 'Not found' });
    } else {
        const { day, seat, client, email } = req.body;
        if (!day || !seat || !client || !email) {
            res.status(400).json({ message: 'All fields are required' });
        } else {
            seat.day = day;
            seat.seat = seat;
            seat.client = client;
            seat.email = email;
            res.json({ message: 'OK' });
        }
    }
});

router.delete('/:id', (req, res) => {
    const index = db.seats.findIndex(s => s.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).json({ message: 'Not found' });
    } else {
        db.seats.splice(index, 1);
        res.json({ message: 'OK' });
    }
});

module.exports = router;
