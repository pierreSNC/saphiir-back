const Cart = require('../models/Cart');
const CartProduct = require('../models/CartProduct');

module.exports = (app) => {
    // Ajouter au panier
    app.post('/add-to-cart', (req, res) => {
        const { idCustomer, idProduct, quantity } = req.body;
        let globalCartId;

        // Trouver ou créer un panier
        Cart.findOrCreate({
            where: { idCustomer: idCustomer, status: 'active' },
            defaults: { idCustomer, status: 'active' }
        })
            .then(([cart, created]) => {
                globalCartId = cart.id;
                // Vérifier si le produit est déjà dans le panier
                return CartProduct.findOne({
                    where: { idCart: cart.id, idProduct: idProduct }
                });
            })
            .then(cartProduct => {
                // Mettre à jour la quantité si le produit est déjà dans le panier
                if (cartProduct) {
                    return cartProduct.update({
                        quantity: parseInt(cartProduct.quantity) + parseInt(quantity)
                    });
                } else {
                    // Ajouter le produit dans le panier s'il n'y est pas déjà
                    return CartProduct.create({
                        idCart: globalCartId,
                        idProduct,
                        quantity
                    });
                }
            })
            .then(result => {
                res.json({ message: 'Product added/updated in cart successfully.', result });
            })
            .catch(error => {
                console.error('Error while adding/updating product in cart', error);
                res.status(500).send(error.message);
            });
    });

    // Récupérer les produits du panier
    app.get('/cart/:idCustomer', (req, res) => {
        const { idCustomer } = req.params;

        Cart.findOne({
            where: { idCustomer: idCustomer, status: 'active' }
        })
            .then(cart => {
                if (!cart) {
                    return res.status(200).json({ message: 'No active cart found for this customer.' });
                }
                return CartProduct.findAll({
                    where: { idCart: cart.id }
                });
            })
            .then(cartProducts => {
                if (cartProducts) {
                    // Simplifier les données si nécessaire
                    const simplifiedCartProducts = cartProducts.map(product => product.toJSON ? product.toJSON() : product);
                    res.json(simplifiedCartProducts);
                } else {
                    // S'il n'y a pas de produits, renvoyer un tableau vide ou une autre réponse appropriée
                    res.json([]);
                }
            })
            .catch(error => {
                console.error('Error fetching cart products', error);
                if (!res.headersSent) {
                    res.status(500).send(error.message);
                }
            });
    });



    // Supprimer un produit du panier
    app.delete('/cart/:idCart/:idProduct', (req, res) => {
        const { idCart, idProduct } = req.params;

        CartProduct.destroy({
            where: {
                idCart,
                idProduct
            }
        })
            .then(deleted => {
                if (deleted) {
                    res.json({ message: 'Product removed from cart successfully.' });
                } else {
                    res.status(404).send('Product not found in cart.');
                }
            })
            .catch(error => {
                console.error('Error removing product from cart', error);
                res.status(500).send(error.message);
            });
    });
};
