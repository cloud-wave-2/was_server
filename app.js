const HOST = process.env.HOST;
const USER = process.env.USER;
const PASSWD = process.env.PASSWD;
const DATABASE = process.env.DATABASE;
const Port = process.env.PORT;

const express = require('express');
const mysql = require('mysql');


const app = express();
const PORT = 4000;
app.use(express.json());

const rdsConfig = {
    host: HOST,
    user: USER,
    password: PASSWD,
    database: DATABASE,
    port: Port // Default MySQL port
};
const connection = mysql.createConnection(rdsConfig);
connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
    }
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
    console.log(`WAS running on ${PORT} port`);
});
