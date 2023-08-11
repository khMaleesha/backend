const express = require('express');
const cors = require('cors');

const app = express();
const mysql = require('mysql2');

app.use(express.json());
app.use(cors());

// Define a route
app.get('/user', (req, res) => {
    let qr = 'SELECT * FROM login_details';
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                message: 'YOU GOT ALL DATA',
                data: result
            });
        } 
    });
});

// get single data
app.get('/user/:id', (req, res)=>{

    let id = req.params.id;
    let qr = `SELECT * FROM login_details WHERE id=${id}`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.length > 0) {
            res.send({
                message: 'You Got single data',
                data: result
            });
        }
        else{
            res.send({
                message:'Data Not Found'
            });
        }
    });
});

//create data
app.post('/user', (req, res) => {
    console.log(req.body, 'createdata');

    let email = req.body.email;
    let password = req.body.password;
    let qr = `INSERT INTO login_details(email,password) VALUES ('${email}','${password}')`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            if (result.length > 0) {
                res.send({

                    message: 'Data Insert'
                });
            } else {
                res.send({
                    message: 'Warning..'
                })
            }
        }
    }
    )
});

//update data 

app.put('/user/:id',(req,res)=>{
    console.log(req.body,'Your Data updated');
    
    let id=req.params.id;
    let email=req.body.email;
    let password=req.body.password;

    let qr=`UPDATE login_details SET email='${email}',password='${password}' WHERE id=${id}`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message:"DATA WAS UPDATED"
        })
    })
});

//delete single data

app.delete('/user/:id',(req,res)=>{
    let id = req.params.id;
    
    let qr = `DELETE FROM login_details WHERE id=${id}`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,);
        }
        res.send({
            message:'DATA RECODE WAS DELETED'
        })
    })
})

//database connection

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login',
    port: 3306
});

//check database connection

db.connect(err => {
    if (err) { console.log('err'); }
    console.log('database connected ...');
})



app.listen(3000, () => {
    console.log('server running');
})
