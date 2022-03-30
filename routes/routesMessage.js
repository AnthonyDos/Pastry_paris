const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const message = require('../controller/MessageController');

router.post('/createMessage',message.createMessageClient);
router.get('/getAllMessages', auth, message.getAllMessages);
router.get('/getMessage/idMessage/:id_message', auth, message.getMessageByCritere);
router.get('/getMessage/numeroClient/:numero_client', auth, message.getMessageByCritere);
router.get('/getMessage/email/:emailClient', auth, message.getMessageByCritere);
router.delete('/deleteMessage/:id_message', auth, message.deleteMessageByIdMessage);

module.exports = router;