const clientModel = (req, res) => {

    const nom = req.body.nom
    const prenom = req.body.prenom
    const email = req.body.email
    const password = req.body.password
    const phone = req.body.phoneadresse
    const adresse = req.body.adresse
    const ville = req.body.ville
    const codePostal = req.body.codePostal
    const pays = req.body.pays
    const numero_client = req.body.id_user
}

module.exports = clientModel;