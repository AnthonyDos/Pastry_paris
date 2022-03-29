const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const message = require('../controller/MessageController');

router.post('/createMessage',message.createMessageClient);
router.get('/getAllMessage', auth);
router.get('/getAllMessage/:idBoutique', auth);
router.get('/getMessage/:id', auth);
router.get('/getMessage/:numeroClient', auth);
router.get('/getMessage/:email', auth);
router.delete('/deleteMessage/:id', auth);
router.delete('/deleteMessage/:numeroClient', auth);

module.exports = router;