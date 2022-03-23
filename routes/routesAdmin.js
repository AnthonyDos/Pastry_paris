const express = require('express');
const router = express.Router();
const admin = require('../controller/AdminController');
const auth = require('../middleware/auth');

router.post('/createAdmin', admin.createAdmin);
router.post('/admin/connexion');
router.get("/admin/name/:id_admin",auth)
router.get("/admin/getAllAdmin", auth)
router.put("/updateAdmin/:id_admin", auth),
router.delete("/deleteAdmin/:id_admin", auth)

module.exports = router;