const {permition} = require('../middleware/middleware.index')
const {Router} = require('express');
const router = Router();

router.get(
    '/home',
    permition
)

router.get(
    '/login',
    permition
)

module.exports=router