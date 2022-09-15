//création pâtisserie
exports.createPatisserie = `INSERT INTO patisseries 
SET id_admin=?, nomProduit= ?, ingredients= ?, prix= ?, gammeProduit= ?,allergenes= ?, imageUrl= ?`

//get pâtisserie
exports.getAllPatisseries = `SELECT * FROM patisseries `

//get pâtisserie by gamme
exports.getGammePatisserie = `SELECT * FROM patisseries WHERE gammeProduit= ?`

exports.getPatisserieByIdPatisserie = "SELECT * FROM patisseries WHERE id_patisserie= ?"

// exports.getPatisserieByIdBoutique = `SELECT * 
// FROM patisseries 
// INNER JOIN boutiques ON patisseries.idBoutique = boutiques.idBoutique 
// WHERE boutiques.idBoutique= ?`

//Update pâtisserie
exports.updatePatisserieByIdPatisserie = `UPDATE patisseries 
SET nomProduit= ?, ingredients= ?, prix= ?, numeroProduit= ? , idBoutique= ? ,gammeProduit= ?, imageUrl= ? 
WHERE id_patisserie= ?`

//Delete pâtisserie
exports.deletePatisserieByIdPatisserie = "DELETE FROM patisseries WHERE id_patisserie= ?"