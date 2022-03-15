//création commande
exports.createCommande = "INSERT INTO commandes SET dateDuJour= CURDATE(),dateCommande= ?, numeroCommande= ?, id_user= ?, livraison= ?, prixTotal= ?, idBoutique= ?, isAdmin= 1, patisseries= ? "

//get commande
exports.getAllCommandes = "SELECT * FROM commandes"

exports.getCommandeById = "SELECT * FROM commandes WHERE id_commande= ?"

exports.getCommandeByVille = "SELECT * FROM commandes INNER JOIN boutiques ON commandes.idBoutique = boutiques.idBoutique WHERE boutiques.ville= ?"