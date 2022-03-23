//create
exports.createAdmin = "INSERT INTO admin SET nom= ?, password= ?, email= ?"

//get
exports.getAdminByEmail = "SELECT * FROM admin WHERE email= ?"