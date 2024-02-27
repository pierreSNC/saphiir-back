const Category = require('../models/Category');

module.exports = (app) => {
    app.post('/category', (req, res) => {
        const { name, excerpt, thumbnail, description } = req.body;

        Category.create({
            name,
            excerpt,
            thumbnail,
            description
        })
            .then(category => {
                res.json({ message: 'Category created.', data: category });
            })
            .catch(error => {
                console.error('Error during the category creation', error);
                res.status(500).send(error.message);
            });
    });

    app.get('/categories', (req, res) => {
        Category.findAll()
            .then(categories => {
                res.json(categories);
            })
            .catch(error => {
                console.error('Error during categories retrieval', error);
                res.status(500).send(error.message);
            });
    });

    app.get('/category/:id', (req, res) => {
        Category.findByPk(req.params.id)
            .then(category => {
                if (!category) {
                    return res.status(404).send(`Category with ID ${req.params.id} not found.`);
                }
                res.json(category);
            })
            .catch(error => {
                console.error('Error during category retrieval', error);
                res.status(500).send(error.message);
            });
    });

    app.delete('/category/:id', (req, res) => {
        const categoryId = req.params.id;

        Category.findByPk(categoryId)
            .then(category => {
                if (!category) {
                    return res.status(404).send(`Category with ID ${categoryId} not found.`);
                }
                return category.destroy()
                    .then(() => {
                        res.json(`Category with ID ${categoryId} deleted.`);
                    })
                    .catch(error => {
                        console.error('Error during the category deletion:', error);
                        res.status(500).send(error.message);
                    });
            })
            .catch(error => {
                console.error('Error finding the category:', error);
                res.status(500).send(error.message);
            });
    });

    app.patch('/category/:id', (req, res) => {
        const categoryId = req.params.id;

        Category.findByPk(categoryId).then(category => {
            if (!category) {
                return res.status(404).send(`Category with ID ${categoryId} not found.`);
            }

            Object.keys(req.body).forEach(key => {
                category[key] = req.body[key];
            });

            category.save()
                .then(updatedCategory => {
                    res.json({ message: 'Category updated successfully', data: updatedCategory });
                })
                .catch(error => {
                    console.error('Error updating the category:', error);
                    res.status(500).send(error.message);
                });
        })
            .catch(error => {
                console.error('Error finding the category:', error);
                res.status(500).send(error.message);
            });
    });
};
