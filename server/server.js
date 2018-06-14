const express = require('express');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
app.use(express.static(publicDir));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});