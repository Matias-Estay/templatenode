const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const {EnvioEmail} = require("../controllers/EmailController.js");

//Envio de correo
router.post(
    '/envio_email',
    [
        check("email", "El correo es obligatorio").isEmail(),
        check("name", "El nombre no es válido").not().isEmpty(),
        check("subject", "El asunto es obligatorio").not().isEmpty(),
        check("body", "El mensaje es obligatorio").not().isEmpty()
    ],
    EnvioEmail
);

module.exports = router