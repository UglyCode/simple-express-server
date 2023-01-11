var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var admin = require("firebase-admin");
var fcm = require('fcm-notification');
var serviceAccount = require('../simple-express-server/configs/hyperdelivery-c3b7d-da9da01e4161.json');
const certPath = admin.credential.cert(serviceAccount);
var FCM = new fcm(certPath);

sendPushNotification= (fcm_token, title, body) => {

    try{
        let message = {
            android: {
                notification: {
                    title: title,
                    body: body,
                },
            },
            token: fcm_token
        };

        FCM.send(message, function(err, resp) {
            if(err){
                throw err;
            }else{
                console.log('Successfully sent notification');
            }
        });

    }catch(err){
        throw err;
        }

    }

    var fcmT = "fcwFykjJRBWPyonihExHmI:APA91bHsgWm_mUksKzg4ykM74WItMXm7z5ZgzGYKkyBR8luUwIjxDWPitnfrTYHMinIM4j9My1AnfynaakKh_phaOBkycY2Uy_ljjyAdmksYjCmP7VlKdTQvuVn50CsNbH7I4C45iL3v";
    sendPushNotification(fcmT,'GOVNO', 'huy pizda volosa');

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var ingredients = [
    {
        "id": "234kjw",
        "text": "Eggs"
    },
    {
        "id": "as82w",
        "text": "Milk"
    },
    {
        "id": "234sk1",
        "text": "Bacon"
    },
    {
        "id": "ppo3j3",
        "text": "Frog Legs"
    }
];


app.get('/ingredients', function(req, res) {
    console.log("GET From SERVER");
    res.send(ingredients);
});

app.post('/ingredients', function(req, res) {
    var ingredient = req.body;
    console.log(req.body);
    ingredients.push(ingredient);
    res.status(200).send("Successfully posted ingredient");
});

app.listen(6069);
