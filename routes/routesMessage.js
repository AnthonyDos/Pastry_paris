const express = require('express');
const router = express.Router();

router.post('/createMessage');
router.get('/getAllMessage');
router.get('/getAllMessage/:idBoutique');
router.get('/getMessage/:id');
router.get('/getMessage/:numeroClient');
router.get('/getMessage/:email');
router.delete('/deleteMessage/:id');
router.delete('/deleteMessage/:numeroClient');

module.exports = router;