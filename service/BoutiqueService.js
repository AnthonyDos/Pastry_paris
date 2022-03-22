//création d'une boutique
exports.createBoutique = "INSERT INTO boutiques SET nomBoutique= ?, adresse= ?, ville= ?, codePostal= ?, pays= ?, phone= ?, horaire= ?"

//get
exports.getAllBoutiques = "SELECT * FROM boutiques"
exports.getBoutiqueByIdBoutique = "SELECT * FROM boutiques WHERE idBoutique= ?"
exports.getBoutiqueByVille = "SELECT * FROM boutiques WHERE ville= ?"
exports.getBoutiqueByPays = "SELECT * FROM boutiques WHERE pays= ?"