const express = require('express');
require('dotenv').config()
const app = express();

// initializing middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

// creating routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/post', require('./routes/api/post'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

// listening to port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));