const Order = require('../models/Order');
const Cart = require('../models/Cart');

module.exports = (app) => {
    app.post('/order', (req, res) => {
        const {idCustomer, idCart, idProduct, status} = req.body;

        // Étape 1: Vérifier si le panier existe et est en statut 'active'
        Cart.findOne({
            where: {
                id: idCart,
                status: 'active'
            }
        }).then(cart => {
            if (!cart) {
                // Si aucun panier actif n'est trouvé, renvoyer une erreur
                return res.status(400).send('No active cart found for this ID.');
            }

            // Étape 2: Si le panier est actif, créer la commande
            Order.create({
                idCustomer,
                idCart,
                idProduct,
                status
            })
                .then(order => {
                    // Étape 3: Mettre à jour le statut du panier en 'validated'
                    return Cart.update({ status: 'validated' }, { where: { id: idCart } })
                        .then(() => {
                            res.json({ message: 'Order created and cart validated.', data: order });
                        })
                        .catch(error => {
                            console.error('Error during cart status update', error);
                            res.status(500).send(error.message);
                        });
                })
                .catch(error => {
                    console.error('Error during the order creation', error);
                    res.status(500).send(error.message);
                });
        }).catch(error => {
            console.error('Error during cart verification', error);
            res.status(500).send(error.message);
        });
    });



    app.get('/orders/:idCustomer', (req, res) => {
        const idCustomer = req.params.idCustomer;
        Order.findAll({where: { idCustomer: idCustomer },}).then(order => {
            res.json({  order });

        })
        .catch(error => {
            console.error('Error during the category creation', error);
            res.status(500).send(error.message);
        });
    })

    app.get('/order/:id', (req, res) => {
        const idOrder = req.params.id;

        Order.findByPk(idOrder).then(order => {
            res.json(order);

        })
            .catch(error => {
                console.error('Error during the category creation', error);
                res.status(500).send(error.message);
            });
    })

    app.patch('/order/:id', (req, res) => {
        const idOrder = req.params.id;

        Order.findByPk(idOrder).then(order => {
            if (!order) {
                return res.status(404).send(`Order with ID ${idOrder} not found.`);
            }

            Object.keys(req.body).forEach(key => {
                order[key] = req.body[key];
            });

            order.save()
                .then(updatedOrder => {
                    res.json({ message: 'Order updated successfully', data: updatedOrder });
                })
                .catch(error => {
                    console.error('Error updating the order:', error);
                    res.status(500).send(error.message);
                });
        })
            .catch(error => {
                console.error('Error finding the order:', error);
                res.status(500).send(error.message);
            });
    })
}