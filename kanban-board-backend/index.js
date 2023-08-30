const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const {connection} = require('./db.js')
require('dotenv').config()
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);


const PORT = process.env.PORT
app.listen(PORT, async () => {
  try{
    await connection
    console.log('connected to db')
  }
  catch(err){
    console.log(err.message)
  }
  console.log(`Server is running on port ${PORT}`);
});
