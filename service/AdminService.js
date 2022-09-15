//create
exports.createAdmin = `INSERT INTO admin 
SET nom= ?, password= ?, email= ?`;

//get
exports.getAdminByEmail = "SELECT * FROM admin WHERE email= ?";
exports.getAllAdmin = "SELECT * FROM admin";
exports.getAdminById = "SELECT * FROM admin WHERE id_admin= ?";

//update
exports.updateAdminById =
  "UPDATE admin SET nom= ?, password= ?, email= ? WHERE id_admin= ?";

//delete
exports.deleteAdminById = "DELETE FROM admin WHERE id_admin= ?";
