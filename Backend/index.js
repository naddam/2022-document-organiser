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

/*const DoctypeModel = require('./models/doctype');

let a = new DoctypeModel();
a.name = 'Gamma';
a.details = [{key: 'Név', keyType: 'String'}, {key: 'Adószám', keyType: 'Number'}, {key: 'BS', keyType: 'Date'}];
a.save((err) => {
    console.log(err);
})*/
/*const UserdocModel = require('./models/userdoc');

let a = new UserdocModel();
a.name = 'Aladar';
a.details = [{key: 'Név', keyType: 'String', value: "hello"}, {key: 'Adószám', keyType: 'Number', value: 1234}, {key: 'BS', keyType: 'Date', value: Date.now()}];
a.expires_at = Date.now();
a._doctype = "632f3f224e4bf2ab10b91815";
a.save((err) => {
    console.log(err);
})*/