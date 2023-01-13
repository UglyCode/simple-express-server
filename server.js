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
        console.log(err);
        throw err;
        }

}

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

app.get('/test', function(req, res) {
    console.log("GET From SERVER");
    res.send(ingredients);
});

app.post('/notify', function(req, res) {
    var tokenFCM = req.body.token;
    console.log('token: ' + tokenFCM);
    sendPushNotification(tokenFCM,'ВНИМАНИЕ. План обновлен!', 'Проверьте маршрут и адреса точек.');
    res.status(200).send("Successfully push message to device");
});

app.listen(6969);
