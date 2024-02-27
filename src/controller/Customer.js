const Customer = require('../models/Customer');

module.exports = (app) => {
    app.get('/customers', (req, res) => {
        Customer.findAll()
            .then(customers => {
                res.json(customers)
            })
            .catch(error => {
                console.error('Error during customers get', error);
                res.status(500).send(error.message);
            });
    });

    app.get('/customer/:id', (req, res) => {
        Customer.findByPk(req.params.id)
            .then(customer => {
                res.json(customer)
            })
            .catch(error => {
                console.error('Error during customer get',error);
                res.status(500).send(error.message);
            });
    });

    app.post('/customer', (req, res) => {
        const { lastname, firstname, email, password } = req.body;

        Customer.findOne({ where: { email } })
            .then(emailExist => {
                if (emailExist) {
                    return res.status(409).send('Customer already exists');
                }

                Customer.create({
                    lastname,
                    firstname,
                    email,
                    password
                })
                    .then(customer => {
                        res.json({ message: 'Customer created.', data: customer });
                    })
                    .catch(error => {
                        console.error('Error during the customer creation', error);
                        res.status(500).send(error.message);
                    });
            })
            .catch(error => {
                console.error('Error during email verification', error);
                res.status(500).send(error.message);
            });
    });

    app.delete('/customer/:id', (req, res) => {
        const customerID = req.params.id;

        Customer.findByPk(customerID)
            .then(customer => {
                if (!customer) {
                    return res.status(404).send(`Customer with ID ${customerID} not found.`);
                }
                return customer.destroy()
                    .then(() => {
                        res.json(`Customer with ID ${customerID} deleted.`);
                    })
                    .catch(error => {
                        console.error('Error during the user deletion:', error);
                        res.status(500).send(error.message);
                    });
            })
            .catch(error => {
                console.error('Error finding the user:', error);
                res.status(500).send(error.message);
            });
    });

    app.patch('/customer/:id', (req, res) => {
        const customerID = req.params.id;

        Customer.findByPk(customerID).then(customer => {
            if (!customer) {
                return res.status(404).send(`Customer with ID ${customerID} not found.`);
            }

            Object.keys(req.body).forEach(key => {
                customer[key] = req.body[key];
            });

            customer.save()
                .then(updatedCustomer => {
                    res.json({ message: 'Customer updated successfully', data: updatedCustomer });
                })
                .catch(error => {
                    console.error('Error updating the user:', error);
                    res.status(500).send(error.message);
                });
        })
            .catch(error => {
                console.error('Error finding the user:', error);
                res.status(500).send(error.message);
            });
    });


};
