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

const HOST2 = process.env.HOST2;
const USER2 = process.env.USER2;
const PASSWD2 = process.env.PASSWD2;
const DATABASE2 = process.env.DATABASE2;
const Port2 = process.env.PORT2;

const connection = mysql.createConnection(rdsConfig);

const rdsConfigRO = {
    host: HOST2,
    user: USER2,
    password: PASSWD2,
    database: DATABASE2,
    port: Port2 // Default MySQL port
};
const connectionRO = mysql.createConnection(rdsConfigRO);

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
    }
    console.log('Connected to MySQL as ID ' + connection.threadId);
});

connectionRO.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
    }
    console.log('Connected to MySQL as ID ' + connectionRO.threadId);
});

app.post('/purchase', (req, res) => {
    var purchase_data = req.body.data;
    purchase_data[1] = Number(purchase_data[1]);
    purchase_data = ['moisture? cream', 30000, '1'];
    connection.query('insert into product (name, price, user_id) values (?)', [purchase_data], (error, results) => {
        if (error) {
           res.send(error);
        }
        res.send(results);
    });
});

var cnt = 'snack';
app.post('/select', (req, res) => {
    // var purchase_data = req.body.data;
    // purchase_data[1] = Number(purchase_data[1]);
    connectionRO.query('select * from product where name = ?', [cnt], (error, results) => {
        if (error) {
           res.send(error);
        }
        res.send('done');
    });
});


app.get('/healthcheck', function(req, res){
    res.send("it's on");  
})

app.listen(PORT, () => {
    console.log(`WAS running on ${PORT} port`);
});
