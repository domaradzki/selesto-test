const express = require("express");
const app = express();


app.get('/api/info', function(req, res) {
  res.json({msg: +new Date()})
})

const port = 8070;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

