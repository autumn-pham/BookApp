const express = require('express');
const app = express();

app.get('/books', (req, res)=>{
  res.send('hello');
})



// /MIDDLEWARE
app.use(express.json()) //use .json(), not .urlencoded()

// LISTENER
app.listen(3001, () => {
  console.log('listening on port')
})
