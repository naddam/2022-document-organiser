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
        authMW(objectRepository, 'User'),
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
        authMW(objectRepository, 'Superadmin'),
        getTypesMW(objectRepository),
        (_, res) => { res.json({ success: true, data: res.locals.doctypes }) },
    );
    app.post('/types',
        authMW(objectRepository, 'Superadmin'),
        addTypeMW(objectRepository),
        (_, res) => { res.json({ success: true, data: res.locals.doctype }) },
    );
    app.get('/types/:typeid',
        authMW(objectRepository, 'Superadmin'),
        getTypeMW(objectRepository),
        (_, res) => { res.json({ success: true, data: res.locals.doctype }) },
    );
    app.patch('/types/:typeid',
        authMW(objectRepository, 'Superadmin'),
        getTypeMW(objectRepository),
        saveTypeMW(objectRepository),
        (_, res) => { res.json({ success: true, data: res.locals.doctype }) },
    );
    app.delete('/types/:typeid',
        authMW(objectRepository, 'Superadmin'),
        getTypeMW(objectRepository),
        delTypeMW(objectRepository),
        (_, res) => { res.json({ success: true, data: res.locals.doctype }) },
    );

    //USERS

    app.get('/users',
        authMW(objectRepository, 'Administrator'),
        getUsersMW(objectRepository),
        (_, res) => { res.json({ success: true, data: res.locals.users }) },
    );
    app.post('/users',
        authMW(objectRepository, 'Superadmin'),
        addUserMW(objectRepository),
        (_, res) => { res.json({ success: true, data: res.locals.user }) },
    );
    app.get('/users/:userid',
        authMW(objectRepository, 'Administrator'),
        getUserMW(objectRepository),
        (_, res) => { res.json({ success: true, data: res.locals.user }) },
    );
    app.patch('/users/:userid',
        authMW(objectRepository, 'Superadmin'),
        getUserMW(objectRepository),
        saveUserMW(objectRepository),
        (_, res) => { res.json({ success: true, data: res.locals.user }) },
    );
    app.delete('/users/:userid',
        authMW(objectRepository, 'Superadmin'),
        getUserMW(objectRepository),
        delUserMW(objectRepository),
        (_, res) => { res.json({ success: true, data: res.locals.user }) },
    );

    //USERDOCS

    app.get('/userdocs',
        authMW(objectRepository, 'User'),
        getUserdocsMW(objectRepository),
        (_, res) => { res.json({ success: true, data: res.locals.userdocs }) },
    );
    app.post('/userdocs',
        authMW(objectRepository, 'User'),
        addUserdocMW(objectRepository),
        (_, res) => { res.json({ success: true, data: res.locals.userdoc }) },
    );
    app.get('/userdocs/:userdocid',
        authMW(objectRepository, 'User'),
        getUserdocMW(objectRepository),
        (_, res) => { res.json({ success: true, data: res.locals.userdoc }) },
    );
    app.patch('/userdocs/:userdocid',
        authMW(objectRepository, 'User'),
        getUserdocMW(objectRepository),
        saveUserdocMW(objectRepository),
        (_, res) => { res.json({ success: true, data: res.locals.userdoc }) },
    );
    app.delete('/userdocs/:userdocid',
        authMW(objectRepository, 'User'),
        getUserdocMW(objectRepository),
        delUserdocMW(objectRepository),
        (_, res) => { res.json({ success: true, data: res.locals.userdoc }) },
    );
}