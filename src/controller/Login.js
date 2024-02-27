const bcrypt = require('bcrypt');
const Customer  = require('../models/Customer');

module.exports = (app) => {
    app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        try {
            const customer = await Customer.findOne({ where: { email } });
            if (!customer) {
                return res.status(400).send({ message: 'Email ou mot de passe incorrect' });
            }

            const isMatch = await bcrypt.compare(password, customer.password);
            if (!isMatch) {
                return res.status(400).send({ message: 'Email ou mot de passe incorrect' });
            }

            res.send({ message: 'Connexion réussie',id: customer.id });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Erreur serveur' });
        }
    });
}


