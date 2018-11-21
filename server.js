const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
var localStorage = require('localStorage');
var firebase = require('firebase');
var nodemailer = require('nodemailer');

// const urlencodeParser = bodyParser.urlencoded({extended:false})
 const jsonParser = bodyParser.json();
////////////////MYSql config//////////////////////////////////
var connect = mysql.createConnection({
    host: 'lancedb.cjgoraxv1j8k.us-west-1.rds.amazonaws.com',
    user: 'lanceypants',
    password: 'panceylants',
    port:'3303',
    database: 'minisafeway'
});
connect.connect(function(err){
    if(!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log(err);
    }
});
global.db = connect;

////////////////Firebase config///////////////////////////////
const config = {
  apiKey: "AIzaSyCEK08XguV4CVa4balQ05DD-zj1L8I57QY",
  authDomain: "minisafeway-ac266.firebaseapp.com",
  databaseURL: "https://minisafeway-ac266.firebaseio.com",
  projectId: "minisafeway-ac266",
  storageBucket: "minisafeway-ac266.appspot.com",
  messagingSenderId: "1031101506009"
};

firebase.initializeApp(config);
const firebaseDB = firebase.database();

/////////////////USE//////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('client/build'))


//////////GET//////////////////
app.get(`/api/allItems`, (req, res) => {
  connect.query(`SELECT * FROM items`, function(error, results) {
    if (error) {
      res.send(error);
    } else {
      if (results.length > 0) {
        res.send(results);
      } else {
        res.send({
          code: 204,
          success: "cannot find items"
        });
      }
    }
  });
 });

app.get('/api/getItems', (req,res)=>{
  let aisle = req.query.aisle;
  connect.query(`SELECT * FROM items WHERE aisle = ?`, [aisle], function (error, results,fields) {
      if(error){
        res.send(error);
      }else{
        if(results.length > 0){
          res.send(results)
        }else{
          res.send({
            "code":204,
            "success":"cannot find items"
          })
        }
      }
  })
})

app.get('/api/getOneItem',(req,res)=>{
  let item =req.query.item;
  connect.query(`SELECT * FROM items WHERE name = ?`, [item], function (error, results,fields) {
    if(error){
      res.send(error);
    }else{
      if(results.length >0){
        res.send(results)
      }else{
        res.send({
          "code":204,
          "success":"cannot find items"
        })
      }
    }
  })
})

app.get('/api/getOnSale', (req,res)=>{
  connect.query('SELECT * FROM items WHERE discount < 1',function(error,result){
    if(error){
      res.send(error)
    }else{
      if(result.length > 0){
        res.send(result)
      }else{
        res.send({
          "code": 204,
          "success" : "cannot find items"
        })
      }
    }
  })
})


app.get('/api/getLastOrder', (req,res)=>{
  let username = req.query.username
  firebaseDB.ref(`/orders/${username}`).limitToLast(1).once('value', (snapshot)=>{
    const order = [];
    snapshot.forEach((childSnapshot)=>{
      order.push({
        ...childSnapshot.val()
      })
    })
    res.send(order)
  
  })
})

app.get('/api/getWatchList', (req,res)=>{
  let username = req.query.username;
  let item = req.query.item;
  firebaseDB.ref(`/watchList/${username}`).orderByChild('name').equalTo(`${item}`).once('value',(snapshot)=>{
    console.log(snapshot.val())
    const item =[];
    snapshot.forEach((childSnapshot)=>{
      item.push({
        itemIndex: childSnapshot.key,
        ...childSnapshot.val()
      })
      res.send(item)
    })
  })
})

app.get('/api/getAllWatchList', (req,res)=>{
  let username = req.query.username;
  firebaseDB.ref(`/watchList/${username}`).orderByChild('discount').endAt(1).once('value',(snapshot)=>{
    const items = [];
    snapshot.forEach((childSnapshot)=>{
      items.push({
        ...childSnapshot.val()
      })
    })
    res.send(items)
  })
})

app.get('/api/getAddress', (req,res)=>{
  let username= req.query.username;
  firebaseDB.ref(`/address/${username}`).once('value', (snapshot)=>{
    console.log(snapshot.val())
    res.send(snapshot.val())
  })
})

////////POST///////////
app.post('/api/login',(req,res)=>{
    var username = req.body.username;
    var password = req.body.password;
    connect.query(`SELECT * FROM members WHERE username = ?`, [username], function (error, results,fields) {
        if (error) {
          res.send(error)
        }else{
          if(results.length >0){  
            if(bcrypt.compareSync(password,results[0].password)){
              var SERECT = "superserect"
              var username = req.body.username;
              var token = jwt.sign(Buffer.from(username,'utf8'),SERECT);
                res.send({
                  "code":200,
                  "message":"success login",
                  "user":`${username}`,
                  "isAuth":true,
                  "token":token
                })
            }
            else{
              res.send({
                "code":204,
                "message":"Username and password does not match",
                "isAuth":false
                  });
            }
          }
          else{
            res.send({
              "code":204,
              "message":"User does not exits",
              "isAuth":false
                });
          }
        }
        });
})

app.post('/api/register', (req,res)=>{
  var password = req.body.user.password;
  if(password === req.body.user.confirmPassword && req.body.user.username !== "" && req.body.user.email !== ""){
  var user = {
      username: req.body.user.username,
      email: req.body.user.email,
      answer:req.body.user.answer,
      password:bcrypt.hashSync(password, salt)
  }
      var query = db.query('INSERT INTO members SET ?', user, function(err, result) {
              if(err){
                  console.log('not able to insert!')
                  res.send({
                    "code":204,
                    message:"user exist"
                  });
              }else{
              message = "Succesfully! Your account has been created.";
              console.log(message)
              var SERECT = "superserect"
              var username = req.body.user.username;
              var token = jwt.sign(Buffer.from(username,'utf8'),SERECT);
              res.send({
                "code":200,
                "token":token,
                "success": message
              })}
           })
     }else{
      res.send({
        "code":204,
        "message":"password not match"
      })
  }})

app.post('/api/updateRating', (req,res)=>{
  console.log(req.body)
  var ratingChange = {
    avgstars:req.body.newAvgRates,
    nrates:req.body.ratingNumber
  }
  var name = req.body.itemName
  connect.query(`UPDATE items SET ? WHERE name = '${name}';`,ratingChange, function(err,result){
    if(err){
      console.log(err)
      res.send({err})
    }else{
      message = "successfully update";
      console.log(message);
      res.send({message})
    }
  })
})

app.post('/api/resetPassword',(req,res)=>{
  var username = req.body.username;
  var password = req.body.newpw;
  password = bcrypt.hashSync(password, salt)
  connect.query(`UPDATE members SET password = '${password}' WHERE username = '${username}'`, function(err,result){
    if(err){
      res.send(err)
    }else{
      message = "successfully change password"
      res.send({message})
    }
  })

})

app.post('/api/forgetPassword', (req,res)=>{
  let username = req.body.user.username;
  let password = req.body.user.password
  let answer = req.body.user.answer;
  password = bcrypt.hashSync(password, salt)
  connect.query(`UPDATE members SET creditcard = '${password}' WHERE username = '${username}' AND answer = '${answer}'`, function(err,result){
    if(err){
      res.send(err)
    }else{
      if(result.affectedRows === 1){
      message = "successfully reset password"
      res.send({
        "code":200,
        "message" : message
      })
    }else {
      message = "user doesn't exits or answer not correct"
      res.send({
        "code":204,
        "message":message
      })
    }
    }
  })

})

app.post('/api/addToWatchList',(req,res)=>{
  let username = req.body.username;
  let item = req.body.item;
  console.log(item)
  firebaseDB.ref(`/watchList/${username}`).push(item)
    .then(
      res.send({
        'success':'success addede'
      })
    )
})

app.post('/api/removeFromWatchList',(req,res)=>{
  let username = req.body.username;
  let index = req.body.index;
  console.log(index)
  firebaseDB.ref(`/watchList/${username}/${index}`).remove()
  .then(res.send({
    'success':'success delete'
  }))
})

app.post('/api/changeAddress',(req,res)=>{
  let username = req.body.username;
  let address = req.body.address
  firebaseDB.ref(`/address/${username}`).set(address)
    .then(
      res.send({
        'success':"success change"
      })
    )
})

app.post('/api/sentEmail',(req,res)=>{
  var email = req.body.email;
  var totalPrice = req.body.totalprice;
  var orders = [];
  req.body.orders.forEach(items=>{
    var item = {
      name:items.name,
      price: (items.price * items.discount).toFixed(2)
    }
    orders.push(item);
  })
  var html = "<div>here is your orders</div>"
  html += "<table border='1|1'>";
for (var i = 0; i < orders.length; i++) {
    html+="<tr>";
    html+="<td>"+orders[i].name+"</td>";
    html+="<td>"+orders[i].price+"</td>";
    html+="</tr>";
}
html+="</table>";
html+=`<div>Total price: ${totalPrice}</div>`
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youemail@gmail.com',
      pass: 'yourpassword'
    }
  });
  
  var mailOptions = {
    from: 'youremail@gmail.com',
    to: `${email}`,
    subject: 'Thank you for shopping with us',
    html: `${html}`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})

//////////////////////////////////////////////
if(process.env.NODE_ENV === 'production'){
    const path=require('path');
    app.get('/*',(req,res)=>{
        res.sendfile(path.resolve(__dirname,'./client','build','index.html'))
    })
}

const port = process.env.PORT || 8000
app.listen(port);