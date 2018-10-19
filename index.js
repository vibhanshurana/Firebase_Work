// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();
var db = admin.database();

/*
 // Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const original = req.query.text || "Unknown";
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
      // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
      return res.redirect(303, snapshot.ref.toString());
    });
  });
 

  exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
  .onCreate((snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database.
    const original = snapshot.val();
    console.log('Uppercasing', context.params.pushId, original);
    const uppercase = original.toUpperCase();
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return snapshot.ref.parent.child('uppercase').set(uppercase);
  });
    
*/
 
  // Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
/*
exports.convertToUppercase = functions.database
.ref('/messages/{pushId}/original')
.onUpdate((change, context) => {
    const before = change.before.val()
    const after = change.after.val()

    //if(before.text === after.text){
    //    console.log("Text didn't change")
    //    return null
    //}
    console.log(before,"+",after)
    const uppercaseText = "PYTHON";
    return change.after.ref.update({uppercaseText});
});

*/


exports.changeStatusWrite = functions.database.ref('/RFID/{rfid}/Device')
    .onWrite((change, contex) => {

        // Grab the current value of what was written to the Realtime Database.
        const id = contex.params.rfid;

        var updateStatus;
        
        var ref = db.ref('RFID');

        var status;
        // Attach an asynchronous callback to read the data at our posts reference
        ref.orderByKey().equalTo(id).on("value", function(snapshot) {
            snapshot.forEach(function(data) {
                data.forEach(function(field) {
                   // console.log("field " + field.key + " value " + field.val());
                if(String(field.key) === "Status"){
                    status=field.val();
				} 
                });
              });
		}, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });
          console.log("MyStatus "+ status);

		  
        if(status === "1"){
            updateStatus = "0";
        }
        else{
            updateStatus = "1";
        }
        console.log("updateStatus "+ updateStatus);
        return change.after.ref.parent.child('Status').set(updateStatus);
    })