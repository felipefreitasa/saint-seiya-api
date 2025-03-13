const app = require('./app')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({path: './.env'})

mongoose.connect(process.env.DB_SERVER)
.then(() => {
  console.log('DB connection successful!');
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})