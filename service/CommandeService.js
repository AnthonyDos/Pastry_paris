//création commande
//exports.createCommande = "INSERT INTO commandes SET dateDuJour= CURDATE(),dateCommande= ?, numeroCommande= ?, id_user= ?, livraison= ?, prixTotal= ?, idBoutique= ?, isAdmin= 1, patisseries= ? "
exports.createCommande = "INSERT INTO commandes SET dateDuJour= CURDATE(),dateCommande= ?,heureDuJourCommande= ?, numeroCommande= ?, id_user= ?, livraison= ?, prixTotal= ?, idBoutique= ?, isAdmin= 1, patisseries= ? "

//get commande by critères
exports.getAllCommandes = "SELECT * FROM commandes"

exports.getCommandeById = "SELECT * FROM commandes WHERE id_commande= ?"

exports.getCommandeByVille = `SELECT * 
FROM commandes 
INNER JOIN boutiques ON commandes.idBoutique = boutiques.idBoutique 
WHERE boutiques.ville= ?`

exports.getCommandeByVilleAndIdBoutique = `SELECT * 
FROM commandes 
INNER JOIN boutiques ON commandes.idBoutique = boutiques.idBoutique 
WHERE boutiques.ville= ? AND boutiques.IdBoutique= ?`

exports.getCommandeByIdBoutique = `SELECT * 
FROM commandes 
INNER JOIN boutiques ON commandes.idBoutique = boutiques.idBoutique 
WHERE boutiques.idBoutique= ?`

exports.getCommandeByIdBoutiqueAndNumeroCommande = `SELECT * 
FROM commandes 
INNER JOIN boutiques ON commandes.idBoutique = boutiques.idBoutique 
WHERE boutiques.idBoutique= ? AND commandes.numeroCommande=  ?`


exports.getCommandeByNumeroClient =`SELECT commandes.id_commande,commandes.dateDuJour,commandes.heureDuJourCommande,
commandes.numeroCommande,commandes.livraison,commandes.prixTotal,commandes.pointReservation,commandes.numeroPassage,
boutiques.idBoutique,boutiques.nomBoutique,boutiques.adresse,boutiques.adresse,boutiques.ville,boutiques.codePostal,
boutiques.pays,boutiques.phone,boutiques.horaire,boutiques.id_reservation,boutiques.id_patisserie,users.id_user,
users.civilite,users.nom,users.prenom,users.prenom,users.email,users.statusFidelite,users.numero_passage,users.pointFidelite,
patisseries.id_patisserie,patisseries.nomProduit,patisseries.ingredients,patisseries.prix
FROM commandes 
INNER JOIN users ON commandes.id_user= users.id_user 
INNER JOIN patisseries ON commandes.id_patisserie= patisseries.id_patisserie 
INNER JOIN boutiques ON patisseries.idBoutique = boutiques.idBoutique 
WHERE users.numero_client = ?`



exports.getCommandeByNumeroCommande = `SELECT * 
FROM commandes
WHERE numeroCommande= ?`

exports.getCommandeByPhone = `SELECT * 
FROM commandes 
INNER JOIN users ON commandes.id_user = users.id_user 
WHERE users.phone= ?`

exports.getCommandeByDateCommande = "SELECT * FROM commandes WHERE dateCommande= ?"


//modification d'une commande
exports.updateCommandeByIdCommande = `UPDATE commandes 
SET dateDuJour= CURDATE(), dateCommande= ?, numeroCommande= ?, id_user= ?, livraison= ?, prixTotal= ?, idBoutique= ?, patisseries= ? 
WHERE id_commande= ?`

exports.updateCommandeByNumeroCommande = `UPDATE commandes 
SET dateDuJour= CURDATE(), dateCommande= ?, id_commande= ?, id_user= ?, livraison= ?, prixTotal= ?, idBoutique= ?, patisseries= ? 
WHERE numeroCommande= ?`

//delete commande
exports.deleteCommande = "DELETE FROM commandes WHERE id_commande= ?"