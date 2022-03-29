const express = require('express');
const router = express.Router();
const admin = require('../controller/AdminController');
const auth = require('../middleware/auth');

router.post('/createAdmin', admin.createAdmin);
router.post('/connexion', admin.connectAdmin);
router.get("/id_admin/:id_admin",auth, admin.getAdminById);
router.get("/getAllAdmin", auth, admin.getAllAdmin);
router.put("/updateAdmin/:id_admin", auth, admin.updateAdmin);
router.delete("/deleteAdmin/:id_admin", auth,admin.deleteAdmin);

module.exports = router;