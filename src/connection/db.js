// import { Sequelize } from "sequelize";

// const database = process.env.PROD_DATABASE;
// const user = process.env.PROD_USERNAME;
// const password = process.env.PROD_PASSWORD;
// const host = process.env.PROD_HOST

// if(!database || user || !password){
//     throw new Error(
//         "Missing required environment variables for database connection"
//     )
// }

// const sequelize = new Sequelize(database, user, password, {
//     host: host,
//     dialect: "postgres",
//   });

//   sequelize
//   .authenticate()
//   .then(() => console.log("Connection has been established successfully."))
//   .catch((error) =>
//     console.log("Unable to connect to the database:", error)
//   );

// export default sequelize;

const { Sequelize } = require("sequelize");
const dotenv = require("dotenv")
dotenv.config();
const database = process.env.PROD_DATABASE;
const user = process.env.PROD_USERNAME;;
const password = process.env.PROD_PASSWORD;
const host = process.env.PROD_HOST;

console.log(database, user, password, "ss")
if (!database || !user || !password) {
    throw new Error(
        "Missing required environment variables for database connection"
    );
}

const sequelize = new Sequelize("aas", user, password, {
    host: host,
    dialect: "postgres",
    logging: console.log,
});

sequelize
    .authenticate()
    .then(() => console.log("Connection has been established successfully."))
    .catch((error) =>
        console.log("Unable to connect to the database:", error)
    );

module.exports = sequelize;
