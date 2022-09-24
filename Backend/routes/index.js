const getTypesMW = require('../middleware/type/getTypesMW')
const getTypeMW = require('../middleware/type/getTypeMW')
const saveTypeMW = require('../middleware/type/saveTypeMW')
const delTypeMW = require('../middleware/type/delTypeMW')
const addTypeMW = require('../middleware/type/addTypeMW')

const DoctypeModel = require('../models/doctype')

module.exports = function (app) {
    const objectRepository = {
        DoctypeModel: DoctypeModel
    };


    app.get('/', (_, res) => {
        // res.json({ data: { title1: "a", title2: "b" } })
    });

    app.get('/types',
        getTypesMW(objectRepository),
        (_, res) => { res.json(res.locals.doctypes) },
    );
    app.post('/types',
        addTypeMW(objectRepository),
        (_, res) => { res.json(res.locals.doctype) },
    );
    app.get('/types/:typeid',
        getTypeMW(objectRepository),
        (_, res) => { res.json(res.locals.doctype) },
    );
    app.patch('/types/:typeid',
        getTypeMW(objectRepository),
        saveTypeMW(objectRepository),
        (_, res) => { res.json(res.locals.doctype) },
    );
    app.delete('/types/:typeid',
        getTypeMW(objectRepository),
        delTypeMW(objectRepository),
        (_, res) => { res.json(res.locals.doctype) },
    );
}