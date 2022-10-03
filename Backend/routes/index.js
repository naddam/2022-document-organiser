const getTypesMW = require('../middleware/type/getTypesMW')
const getTypeMW = require('../middleware/type/getTypeMW')
const saveTypeMW = require('../middleware/type/saveTypeMW')
const delTypeMW = require('../middleware/type/delTypeMW')
const addTypeMW = require('../middleware/type/addTypeMW')

const getUsersMW = require('../middleware/user/getUsersMW')
const getUserMW = require('../middleware/user/getUserMW')
const saveUserMW = require('../middleware/user/saveUserMW')
const delUserMW = require('../middleware/user/delUserMW')
const addUserMW = require('../middleware/user/addUserMW')

const getUserdocsMW = require('../middleware/userdoc/getUserdocsMW')
const getUserdocMW = require('../middleware/userdoc/getUserdocMW')
const saveUserdocMW = require('../middleware/userdoc/saveUserdocMW')
const delUserdocMW = require('../middleware/userdoc/delUserdocMW')
const addUserdocMW = require('../middleware/userdoc/addUserdocMW')

const loginMW = require('../middleware/auth/loginMW')
const registerMW = require('../middleware/auth/registerMW')
const authMW = require('../middleware/auth/authMW')

const DoctypeModel = require('../models/doctype')
const UserModel = require('../models/user')
const UserdocModel = require('../models/userdoc')

module.exports = function (app) {
    const objectRepository = {
        DoctypeModel: DoctypeModel,
        UserModel: UserModel,
        UserdocModel: UserdocModel
    };


    app.get('/',
        authMW(objectRepository),
        (_, res) => {
            res.json(res.locals.authenticatedUser)
            //res.send("The API server is RUNNING")
        });

    //AUTH

    app.post('/login',
        loginMW(objectRepository),
    );
    app.post('/register',
        registerMW(objectRepository),
    );

    //TYPES

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

    //USERS

    app.get('/users',
        getUsersMW(objectRepository),
        (_, res) => { res.json(res.locals.users) },
    );
    app.post('/users',
        addUserMW(objectRepository),
        (_, res) => { res.json(res.locals.user) },
    );
    app.get('/users/:userid',
        getUserMW(objectRepository),
        (_, res) => { res.json(res.locals.user) },
    );
    app.patch('/users/:userid',
        getUserMW(objectRepository),
        saveUserMW(objectRepository),
        (_, res) => { res.json(res.locals.user) },
    );
    app.delete('/users/:userid',
        getUserMW(objectRepository),
        delUserMW(objectRepository),
        (_, res) => { res.json(res.locals.user) },
    );

    //USERDOCS

    app.get('/userdocs',
        getUserdocsMW(objectRepository),
        (_, res) => { res.json(res.locals.userdocs) },
    );
    app.post('/userdocs',
        addUserdocMW(objectRepository),
        (_, res) => { res.json(res.locals.userdoc) },
    );
    app.get('/userdocs/:userdocid',
        getUserdocMW(objectRepository),
        (_, res) => { res.json(res.locals.userdoc) },
    );
    app.patch('/userdocs/:userdocid',
        getUserdocMW(objectRepository),
        saveUserdocMW(objectRepository),
        (_, res) => { res.json(res.locals.userdoc) },
    );
    app.delete('/userdocs/:userdocid',
        getUserdocMW(objectRepository),
        delUserdocMW(objectRepository),
        (_, res) => { res.json(res.locals.userdoc) },
    );
}