//création pâtisserie
exports.createPatisserie = "INSERT INTO patisseries SET idBoutique= ?, nomProduit= ?, ingredients= ?, prix= ?,numeroProduit= ?"

//get pâtisserie
exports.getAllPatisseries = "SELECT * FROM patisseries"
exports.getPatisserieByIdPatisserie = "SELECT * FROM patisseries WHERE id_patisserie= ?"
exports.getPatisserieByIdBoutique = "SELECT * FROM patisseries INNER JOIN boutiques ON patisseries.idBoutique = boutiques.idBoutique WHERE boutiques.idBoutique= ?"

//Update pâtisserie
exports.updatePatisserieByIdPatisserie = "UPDATE patisseries SET nomProduit= ?, ingredients= ?, prix= ?, numeroProduit= ? , idBoutique= ? WHERE id_patisserie= ?"

//Delete pâtisserie
exports.deletePatisserieByIdPatisserie = "DELETE FROM patisseries WHERE id_patisserie= ?"