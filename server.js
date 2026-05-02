const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public'))); 

// Setup SQLite Database
const db = new sqlite3.Database(path.join(__dirname, 'blessings.db'), (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Create table if not exists
        db.run(`CREATE TABLE IF NOT EXISTS wishes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            message TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

// API endpoint to save a blessing
app.post('/api/blessings', (req, res) => {
    console.log('Received POST /api/blessings from:', req.ip);
    console.log('Body:', req.body);
    
    const { name, message } = req.body;

    if (!name || !message) {
        console.warn('Missing name or message');
        return res.status(400).json({ error: 'Name and message are required' });
    }

    const sql = 'INSERT INTO wishes (name, message) VALUES (?, ?)';
    db.run(sql, [name, message], function(err) {
        if (err) {
            console.error('Error inserting blessing', err.message);
            return res.status(500).json({ error: 'Failed to save blessing' });
        }
        console.log(`Successfully saved blessing with id ${this.lastID}`);
        res.status(201).json({ id: this.lastID, success: true, message: 'Blessing saved successfully!' });
    });
});

// Default route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
