const Product = require('../models/Product');

module.exports = (app) => {
    app.get('/products/category/:categoryId', (req, res) => {
        const categoryId = req.params.categoryId;

        Product.findAll({
            where: { id_category: categoryId }
        })
            .then(products => {
                if (products.length > 0) {
                    res.json(products);
                } else {
                    res.status(200).send([] );
                }
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des produits', error);
                res.status(500).send('Erreur interne du serveur');
            });
    });
}
