const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 4000;
app.use(express.json());

const rdsConfig = {
    host: 'dev-ecommerce-database-01.cjyuicqq0675.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    password: 'qwer1234',
    database: 'olive_young',
    port: 3306 // Default MySQL port
};
const connection = mysql.createConnection(rdsConfig);
connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
    }
    // connection.query('insert into product (name, price, user_id) values (\'what\', 10, \'cloud\')', (error, results, fields) => {
    //     if (error) {
    //         return res.status(500).send('Error in database operation');
    //     }
    //     else {
    //         console.log(results);
    //     }
    // });
    console.log('Connected to MySQL as ID ' + connection.threadId);
});
app.post('/purchase', (req, res) => {
    var purchase_data = req.body.data;
    purchase_data[1] = Number(purchase_data[1]);
    console.log(purchase_data);
    connection.query('insert into product (name, price, user_id) values (?)', [purchase_data], (error, results) => {
        if (error) {
           console.log(error);
        }
    });
    res.send(purchase_data);
});

app.listen(PORT, () => {
    console.log(`WAS running on http://localhost:${PORT}`);
});
