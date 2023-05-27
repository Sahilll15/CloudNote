
const connectToMongo = require('./db')
const express = require('express');
var cors = require('cors')



connectToMongo();

const app = express();
app.use(cors())
const port = 4000;

app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

