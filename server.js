// dependencies
const express = require('express');
const app = express();
const path = require('path')

// port
const PORT = process.env.PORT || 4000;

// link to FE
app.use(express.static(path.join(__dirname, 'public')));

// handle routes
    





// listen on port
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})