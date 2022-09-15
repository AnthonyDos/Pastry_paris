//création commande
exports.createCommande = `INSERT INTO commandes SET dateDuJour= CURDATE(),dateCommande= ?, numeroCommande= ?, 
id_user= ?, livraison= ?, prixTotal= ?, idBoutique= ?, isAdmin= 1,patisseriesList= ?,heureDujourCommande= ?, id_patisserie= ?`;

exports.getAllCommandes = `SELECT *,DATE_FORMAT(commandes.dateDuJour, '%Y-%m-%d') AS dateDuJour,  DATE_FORMAT(commandes.dateCommande, '%d/%m/%Y') AS dateCommande 
FROM commandes INNER JOIN users ON commandes.id_user= users.id_user ORDER BY commandes.dateDuJour DESC;`;

exports.getCommandeById = "SELECT * FROM commandes WHERE id_commande= ?";

exports.getCommandeByVille = `SELECT * 
FROM commandes 
INNER JOIN boutiques ON commandes.idBoutique = boutiques.idBoutique 
WHERE boutiques.ville= ?`;

exports.getCommandeByVilleAndIdBoutique = `SELECT * 
FROM commandes 
INNER JOIN boutiques ON commandes.idBoutique = boutiques.idBoutique 
WHERE boutiques.ville= ? AND boutiques.IdBoutique= ?`;

exports.getCommandeByIdBoutique = `SELECT * 
FROM commandes 
INNER JOIN boutiques ON commandes.idBoutique = boutiques.idBoutique 
WHERE boutiques.idBoutique= ?`;

exports.getCommandeByIdBoutiqueAndNumeroCommande = `SELECT * 
FROM commandes 
INNER JOIN boutiques ON commandes.idBoutique = boutiques.idBoutique 
WHERE boutiques.idBoutique= ? AND commandes.numeroCommande=  ?`;

exports.getCommandByIdClient = `SELECT *,commandes.id_commande, DATE_FORMAT(commandes.dateDuJour, '%d/%m/%Y') AS dateDuJour,DATE_FORMAT(commandes.dateCommande, '%d/%m/%Y') AS dateCommande 
FROM commandes 
INNER JOIN users ON commandes.id_user = users.id_user 
WHERE users.id_user= ? ORDER BY commandes.dateDuJour DESC`;

exports.getCommandeByNumeroCommande = `SELECT *, commandes.id_commande, DATE_FORMAT(commandes.dateDuJour, '%d/%m/%Y') AS dateDuJour,boutiques.idBoutique,
boutiques.nomBoutique,boutiques.adresse,boutiques.adresse,boutiques.ville,boutiques.codePostal,
boutiques.pays,boutiques.phone,boutiques.horaire,boutiques.id_reservation
FROM commandes
INNER JOIN boutiques ON commandes.idBoutique = boutiques.idBoutique
WHERE commandes.numeroCommande= ? `;

exports.getCommandeByPhone = `SELECT * 
FROM commandes 
INNER JOIN users ON commandes.id_user = users.id_user 
WHERE users.phone= ?`;

exports.getCommandeByDateCommande =
  "SELECT * FROM commandes WHERE dateCommande= ?";

//modification d'une commande
exports.updateCommandeByIdCommande = `UPDATE commandes 
SET dateDuJour= CURDATE(), dateCommande= ?, numeroCommande= ?, id_user= ?, livraison= ?, prixTotal= ?, idBoutique= ?, patisseriesList= ? 
WHERE id_commande= ?`;

exports.updateCommandeByNumeroCommande = `UPDATE commandes 
SET dateDuJour= CURDATE(), dateCommande= ?, id_commande= ?, id_user= ?, livraison= ?, prixTotal= ?, idBoutique= ?, patisseriesList= ? 
WHERE numeroCommande= ?`;

//delete commande
exports.deleteCommande = "DELETE FROM commandes WHERE id_commande= ?";
