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


const insertCustomer = async (customer) => {
    // Will accept either a product array or product object
    if (customer instanceof Array) {
        params = customer;
    } else {
        params = Object.values(customer);
    };

    let numFailed = 0;
    let numInserted = 0;
    let errorMessage = "";
    
    const sql = "INSERT INTO CUSTOMER (cusId, cusFname, cusLname, cusState, cusSalesYTD, cusSalesPrev) values ($1,$2,$3,$4,$5,$6)"

    for (cust of customer) {
        params = cust.split(",");

        await pool.query(sql, params)
            .then(res => {
                    numInserted++;
            })
            .catch(err => {
                numFailed++;
                errorMessage += "Customer ID: " + params[0] + " - " + err + '\n'
            });
    };
    total = Number(numInserted) + Number(numFailed)
    message = "Records Processed: " + total + '\n' + 
    "Records Inserted Successfully: " + numInserted + '\n' +   
    "Records Not Inserted: " + numFailed + '\n' +  '\n' +  
    "Errors: " + '\n' +  errorMessage
    
    return message;

};

// Add this at the bottom
module.exports.insertCustomer = insertCustomer;