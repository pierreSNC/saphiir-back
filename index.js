const express = require('express');
const app = express();
const sequelize = require('./src/dbConfig/dbConfig');
const cors = require('cors');
app.use(cors());
app.use(express.json());

     if (sequelize.authenticate()) {
         console.log('Connection has been established successfully.');
     } else {
         console.error('Unable to connect to the database:');
     }

sequelize.sync().then(() => console.log('Db is ready'));

require('./src/controller/Customer')(app);
require('./src/controller/Login')(app);
require('./src/controller/Category')(app);
require('./src/controller/Product')(app);
require('./src/controller/CategoryProductsHandler')(app);
require('./src/controller/Cart')(app);
require('./src/controller/Order')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
