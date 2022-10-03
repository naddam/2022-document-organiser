const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4041;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require('./routes/index')(app);

app.use((err, req, res, next)=> {
    res.end('Baj van...');
    console.log(err);
})

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})