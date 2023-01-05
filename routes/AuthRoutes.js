const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const {create, login, logout, loggedin} = require("../controllers/AuthController.js");

router.get(
    '/Loggedin',
    loggedin
);

router.post(
    '/CreateUser',
    [
        check("email", "El email no es válido").isEmail(),
        check("password", "El password no es válido").not().isEmpty(),
        check("name", "El nombre no es válido").not().isEmpty(),
    ],
    create
);

router.post(
    '/Login',
    [
        check("email", "El email no es válido").isEmail(),
        check("password", "El password no es válido").not().isEmpty(),
    ],
    login
);

router.delete(
    '/Logout',
    [
        check("email", "El email no es válido").isEmail(),
        check("password", "El password no es válido").not().isEmpty(),
    ],
    logout
);

module.exports = router