const Sequelize = require('sequelize')
require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./Auth.model.js")(sequelize,Sequelize);

db.sequelize.sync({force: (process.env.DEVELOPMENT === 'true')})
    .then(() => {
    console.log("Synced db.");
    })
    .catch((err) => {
    console.log("Failed to sync db: " + err.message);
});
module.exports = db;