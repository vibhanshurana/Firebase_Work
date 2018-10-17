 const functions = require('firebase-functions');

 exports.hello = functions.https.onRequest((req, res)=>{
     console.log(req.query.name);
        var name = req.query.name || "Unknown"
      res.send("Hello "+ name);
 })