const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:4040',
    optionsSuccessStatus: 200,
    credentials: true,
}
  

const app = express();
const port = process.env.PORT || 4041;

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require('./routes/index')(app);

app.use((err, req, res, next)=> {
    if(!res.headersSent){
        res.json({ success: false});
    }
    console.log(err);
})

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})