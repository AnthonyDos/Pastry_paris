//création d'une boutique
exports.createBoutique = "INSERT INTO boutiques SET nomBoutique= ?, adresse= ?, ville= ?, codePostal= ?, pays= ?, phone= ?, horaire= ?"

//get boutique
exports.getAllBoutiques = "SELECT * FROM boutiques"
exports.getBoutiqueByIdBoutique = "SELECT * FROM boutiques WHERE idBoutique= ?"
exports.getBoutiqueByVille = "SELECT * FROM boutiques WHERE ville= ?"
exports.getBoutiqueByPays = "SELECT * FROM boutiques WHERE pays= ?"


// update boutique
exports.updateBoutiqueByIdBoutique = "UPDATE boutiques SET nomBoutique= ?, adresse= ?, codePostal= ?, ville= ?, pays= ?, phone= ?, horaire= ? WHERE idBoutique= ?"