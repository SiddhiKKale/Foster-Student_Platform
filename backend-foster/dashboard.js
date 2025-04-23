const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let profile = {
  name: 'John Doe',
  email: 'john@example.com',
  enrollment: '123456'
};

app.get('/api/profile', (req, res) => {
  res.json(profile);
});

app.post('/api/profile', (req, res) => {
  profile = req.body;
  res.json({ message: 'Profile updated successfully' });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
