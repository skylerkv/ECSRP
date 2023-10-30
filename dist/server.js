const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/optInNotifications', (req, res) => {
  const email = req.body.email;

  //Validate and process the email here
  //For example, you can store it in a database

  //Send a response to the client
  res.json({ message: 'Email registered successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});