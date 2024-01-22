const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    res.json(db.testimonials);
});

router.get('/:id', (req, res) => {
    const testimonial = db.testimonials.find(t => t.id === parseInt(req.params.id));
    if (testimonial) {
        res.json(testimonial);
    } else {
        res.status(404).json({ message: 'Not found' });
    }
});

router.get('/random', (req, res) => {
    if (db.testimonials.length === 0) {
        res.status(404).json({ message: 'Not found' });
    } else if (db.testimonials.length === 1) {
        res.json(db.testimonials[0]);
    } else {
        const randomIndex = Math.floor(Math.random() * db.testimonials.length);
        const randomTestimonial = db.testimonials[randomIndex];
        res.json(randomTestimonial);
    }
});

router.post('/', (req, res) => {
    const { author, text } = req.body;
    if (!author || !text) {
        res.status(400).json({ message: 'Author and text are required' });
    } else {
        const newTestimonial = { id: db.testimonials.length + 1, author, text };
        db.testimonials.push(newTestimonial);
        res.json({ message: 'OK' });
    }
});

router.put('/:id', (req, res) => {
    const testimonial = db.testimonials.find(t => t.id === parseInt(req.params.id));
    if (!testimonial) {
        res.status(404).json({ message: 'Not found' });
    } else {
        const { author, text } = req.body;
        if (!author || !text) {
            res.status(400).json({ message: 'Author and text are required' });
        } else {
            testimonial.author = author;
            testimonial.text = text;
            res.json({ message: 'OK' });
        }
    }
});

router.delete('/:id', (req, res) => {
    const index = db.testimonials.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).json({ message: 'Not found' });
    } else {
        db.testimonials.splice(index, 1);
        res.json({ message: 'OK' });
    }
});

module.exports = router;