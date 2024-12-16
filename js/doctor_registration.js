const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

let doctors = []; // In-memory storage for doctors (for demonstration purposes)

// Route to register a new doctor
app.post('/register-doctor', (req, res) => {
  const { name, specialization, hospital, phone, email, experience, bio } = req.body;

  if (!name || !specialization || !hospital || !phone || !email || !experience) {
    return res.status(400).json({ message: 'All required fields must be filled' });
  }

  const newDoctor = {
    name,
    specialization,
    hospital,
    phone,
    email,
    experience,
    bio
  };

  doctors.push(newDoctor);

  return res.status(201).json({ message: 'Doctor registered successfully!', doctor: newDoctor });
});

// Route to view all registered doctors (for testing purposes)
app.get('/doctors', (req, res) => {
  return res.json(doctors);
});

app.listen(port, () => {
  console.log(Server running on http://localhost:${port});
});