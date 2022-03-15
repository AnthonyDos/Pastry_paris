exports.createCommande = "INSERT INTO commandes SET dateDuJour= CURDATE(),dateCommande= ?, numeroCommande= ?, id_user= ?, livraison= ?, prixTotal= ?, idBoutique= ?, isAdmin= 1, patisseries= ? "
//reservation SET dateDuJour= CURDATE(), numeroReservation= ? , id_user= ?, idBoutique= ?, horaire= ?, dateReservation= ?, nombreCouverts= ?

exports.getCommandeById = "SELECT * FROM commandes WHERE id_commande= ?"

exports.getAllCommandes = "SELECT * FROM commandes"