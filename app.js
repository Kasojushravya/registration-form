// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://kasojushravya:shravya178@cluster0.si7kjs2.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// Create User model
const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Default route - Redirect to registration form
app.get('/', (req, res) => {
  res.redirect('/register');
});

// Render registration form
app.get('/register', (req, res) => {
  res.render('register');
});

// Handle registration form submission
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Create a new user
  const user = new User({ username, email, password });

  try {
    // Save user to the database
    await user.save();
    res.send('Registration successful!');
  } catch (error) {
    res.send('Registration failed. Please try again.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
