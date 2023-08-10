const express = require('express');
const cors = require('cors');

const app = express();
const mysql = require('mysql2');

app.use(express.json());
app.use(cors());


// Define a route
app.get('/user', (req, res) => {
    res.send('get all data ');
    let qr = 'select * from login_detail';
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({
                message: 'all user data',
                data: result
            });
        } else {
            res.send({
                message: 'data not found'
            });
        }
    });
});

// app.post('/user', (req, res) => {
//     console.log(req.body, 'CreateData');
//     let email = req.body.email;
//     let password = req.body.password;

//     let qr = 'INSERT INTO login_details(email,password)values()';
//     db.query(qr,(err,result)=>{
//          if(err){console.log(err);
        
//         }
//          if(result.length>0)
//          {
//             res.send({
//                 message:'data inserted'
//             });
//          }else{
//             res.send({
//                 message:'wrong...'
//             })
//          }
//     })
// });


//update data

// app.put('/user',(req,res)=>{

//     console.log(req.body,'updatedata');
//     let id=req.params.id;
//     let email=req.body.email;
//     let password = req.body.password;

//     let qr = 'update login_details set email="11@gmail.com", password="122223" where id =1';

//     db.query(qr,(err,result)=>{
//         if(err){
//             console.log(err);
//             res.send({
//                 message:'data updated'
//             });
//         }
//     })
// });

// app.post('/users', (req, res) => {

//     requestBody = req.body
//     console.log(requestBody);


//     // let email = req.body.email;
//     // let password = req.body.password;

//     // let qr = 'insert into login_details(email,password)values('${email}','${password}')';
//     user = {
//         name: requestBody.fullname,
//         contact: {
//             phone: requestBody.mobile,
//             email: requestBody.email
//         },
//         age: 26,
//         department: "IT"
//     } 

//     res.send(user);
// });

//insert data 

app.post('/user',(req,res)=>{
    console.log(req.body,'createdata');

    let email = req.body.email;
    let password = req.body.password;
    let qr = `insert into login_details(email,password) values ('${email}','${password}')`;

   db.query(qr,(err,result)=>{
    if(err){console.log(err);
        if(result.length>0){
            res.send({

message:'Data Insert' 
            });
        }else{
            res.send({
                message:'worning..'
            })


        }
    
    
    }
   }


   )
            });

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



// const PORT = 3000;

// // Create a MySQL connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'report'
// });

// db.connect(err => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//     } else {
//         console.log('Connected to MySQL');
//     }
// });

// // Define a route
// app.get('/', (req, res) => {
//     res.send('Hello, Node.js Backend!');
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });