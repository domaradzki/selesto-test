const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8080',
};
app.use(cors(corsOptions));

const initRoutes = require('./routes');

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

const PORT = '8070' || process.env.PORT;

app.use((err, req, res) => {
  if (err.code === 'INCORRECT_FILETYPE') {
    res.status(422).json({ error: 'Only images are allowed' });
    return;
  }
  if (err.code === 'LIMIT_FILE_SIZE') {
    res.status(422).json({ error: 'Allow file size is 500KB' });
    return;
  }
});

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);
