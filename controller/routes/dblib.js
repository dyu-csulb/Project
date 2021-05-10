// Add packages
require("dotenv").config();
// Add database package and connection string
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


const insertCustomer = (product) => {
    // Will accept either a product array or product object
    if (product instanceof Array) {
        params = product;
    } else {
        params = Object.values(product);
    };

    const sql = "INSERT INTO CUSTOMER (cusId, cusFname, cusLname, cusState, cusSalesYTD, cusSalesPrev) values ($1,$2,$3,$4,$5,$6)"
    return pool.query(sql, params)
        .then(res => {
            return {
                trans: "success", 
                msg: `Customer ID ${params[0]} successfully inserted`
            };
        })
        .catch(err => {
            return {
                trans: "fail", 
                msg: `Customer ID: ${params[0]} - ${err.message}`
            };
        });
};

// Add this at the bottom
module.exports.insertCustomer = insertCustomer;