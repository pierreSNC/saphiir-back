

const Product = require('../models/Product');

module.exports = (app) => {
    app.get('/products', (req, res) => {
        Product.findAll()
            .then(products => {
                res.json(products);
            })
            .catch(error => {
                console.error('Error during products retrieval', error);
                res.status(500).send(error.message);
            });
    });

    app.get('/product/:id', (req, res) => {
        Product.findByPk(req.params.id)
            .then(product => {
                if (!product) {
                    return res.status(404).send(`Product with ID ${req.params.id} not found.`);
                }
                res.json(product);
            })
            .catch(error => {
                console.error('Error during product retrieval', error);
                res.status(500).send(error.message);
            });
    });

    app.post('/product',(req, res) => {
        const { id_category, name, thumbnail, price, stock } = req.body;

        Product.create({
            id_category,
            name,
            thumbnail,
            price,
            stock
        })
            .then(product => {
                res.json({ message: 'Product created.', data: product });
            })
            .catch(error => {
                console.error('Error during the product creation', error);
                res.status(500).send(error.message);
            });
    });

    app.delete('/product/:id', (req, res) => {
        const productId = req.params.id;

        Product.findByPk(productId)
            .then(product => {
                if (!product) {
                    return res.status(404).send(`Product with ID ${productId} not found.`);
                }
                return product.destroy()
                    .then(() => {
                        res.json(`Product with ID ${productId} deleted.`);
                    })
                    .catch(error => {
                        console.error('Error during the product deletion:', error);
                        res.status(500).send(error.message);
                    });
            })
            .catch(error => {
                console.error('Error finding the product:', error);
                res.status(500).send(error.message);
            });
    });

    app.patch('/product/:id', (req, res) => {
        const productId = req.params.id;

        Product.findByPk(productId).then(product => {
            if (!product) {
                return res.status(404).send(`Product with ID ${productId} not found.`);
            }

            Object.keys(req.body).forEach(key => {
                product[key] = req.body[key];
            });

            product.save()
                .then(updatedProduct => {
                    res.json({ message: 'Product updated successfully', data: updatedProduct });
                })
                .catch(error => {
                    console.error('Error updating the product:', error);
                    res.status(500).send(error.message);
                });
        })
            .catch(error => {
                console.error('Error finding the product:', error);
                res.status(500).send(error.message);
            });
    });
};
