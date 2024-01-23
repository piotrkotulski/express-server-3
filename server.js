const express = require('express');
const cors = require('cors');
const app = express();


const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(cors());
app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/concerts', concertsRoutes);
app.use('/api/seats', seatsRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found...' });
});

module.exports = app;

