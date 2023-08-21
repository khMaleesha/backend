const express = require('express');
const cors = require('cors');

const app = express();
const mysql = require('mysql2');

app.use(express.json());
app.use(cors());

// Define a route
app.get('/user', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const itemsPerPage = 5; 
      const offset = (page - 1) * itemsPerPage;
  
      const countQuery = 'SELECT COUNT(*) as totalCount FROM login_details';
      const dataQuery = 'SELECT * FROM login_details ORDER BY id LIMIT ? OFFSET ?';
  
      db.query(countQuery, (countErr, countResult) => {
        if (countErr) {
          console.error(countErr);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
  
        const totalCount = countResult[0].totalCount;
  
        db.query(dataQuery, [itemsPerPage, offset], (dataErr, dataResult) => {
          if (dataErr) {
            console.error(dataErr);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
  
          const totalPages = Math.ceil(totalCount / itemsPerPage);
  
          res.json({
            data: dataResult,
            pagination: {
              currentPage: page,
            totalCount: totalCount
            }
          });
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
//    app.get('/user', (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const itemsPerPage = 10;
//   const offset = (page - 1) * itemsPerPage;

//   const countQuery = 'SELECT COUNT(*) as totalCount FROM login_details';
//   const dataQuery = 'SELECT * FROM login_details LIMIT ? OFFSET ?';

//   connection.query(countQuery, (countErr, countResults) => {
//     if (countErr) {
//       console.error('Error fetching total count:', countErr);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }

//     const totalCount = countResults[0].totalCount;

//     connection.query(dataQuery, [itemsPerPage, offset], (dataErr, dataResults) => {
//       if (dataErr) {
//         console.error('Error fetching paginated data:', dataErr);
//         res.status(500).json({ error: 'Internal server error' });
//         return;
//       }

//       const totalPages = Math.ceil(totalCount / itemsPerPage);

//       res.json({
//         data: dataResults,
//         pagination: {
//           currentPage: page,
//           totalPages: totalPages
//         }
//       });
//     });
//   });
// });

// get single data
app.get('/user/:id', async (req, res) => {

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
        else {
            res.send({
                message: 'Data Not Found'
            });
        }
    });
});
//     app.get('/user', async (req, res) => {
//         try {
//           const id = req.params.id;
//           const qr = `SELECT * FROM login_details WHERE id=${id}`;

//           connection.query(qr, (err, result) => {
//             if (err) {
//               console.log(err);
//               res.status(500).json({ message: 'Internal server error' });
//               return;
//             }
//             if (result.length > 0) {
//               res.send({
//                 message: 'You Got single data',
//                 data: result
//               });
//             } else {
//               res.send({
//                 message: 'Data Not Found'
//               });
//             }
//           });

//           const { page, limit } = req.query;
//           const offset = (page - 1) * limit;
//           const data = await new Promise((resolve, reject) => {
//             connection.query(
//               'SELECT * FROM login_details LIMIT ? OFFSET ?',
//               [limit, offset],
//               (err, results) => {
//                 if (err) reject(err);
//                 else resolve(results);
//               }
//             );
//           });

//           const [totalPageData] = await new Promise((resolve, reject) => {
//             connection.query('SELECT COUNT(*) as count FROM login_details', (err, results) => {
//               if (err) reject(err);
//               else resolve(results);
//             });
//           });

//           const totalPage = Math.ceil(+totalPageData[0]?.count / limit);

//           res.json({
//             data: data,
//             pagination: {
//               page: +page,
//               limit: +limit,
//               totalPage
//             }
//           });
//         } catch (error) {
//           console.log(error);
//           res.status(500).json({ message: 'Internal server error' });
//         }
//       });
// });

// app.get('/user', (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const itemsPerPage = 10;
//     const offset = (page - 1) * itemsPerPage;

//     const countQuery = 'SELECT COUNT(*) as totalCount FROM login_details';
//     const dataQuery = 'SELECT * FROM login_details LIMIT ? OFFSET ?';

//     connection.query(countQuery, (countErr, countResults) => {
//       if (countErr) {
//         console.error('Error fetching total count:', countErr);
//         res.status(500).json({ error: 'Internal server error' });
//         return;
//       }

//       const totalCount = countResults[0].totalCount;

//       connection.query(dataQuery, [itemsPerPage, offset], (dataErr, dataResults) => {
//         if (dataErr) {
//           console.error('Error fetching paginated data:', dataErr);
//           res.status(500).json({ error: 'Internal server error' });
//           return;
//         }

//         const totalPages = Math.ceil(totalCount / itemsPerPage);

//         res.json({
//           data: dataResults,
//           pagination: {
//             currentPage: page,
//             totalPages: totalPages
//           }
//         });
//       });
//     });
//   });

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

app.put('/user/:id', (req, res) => {
    console.log(req.body, 'Your Data updated');

    let id = req.params.id;
    let email = req.body.email;
    let password = req.body.password;

    let qr = `UPDATE login_details SET email='${email}',password='${password}' WHERE id=${id}`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send({
            message: "DATA WAS UPDATED"
        })
    })
});

//delete single data

app.delete('/user/:id', (req, res) => {
    let id = req.params.id;

    let qr = `DELETE FROM login_details WHERE id=${id}`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err,);
        }
        res.send({
            message: 'DATA RECODE WAS DELETED'
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
