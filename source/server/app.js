var http = require('http'),
    fs = require("fs"),
    express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    bodyParser = require('body-parser');
cors = require('cors');

mongoose.Promise = global.Promise;


const config = require('./config/database');
mongoose.connect(config.database);

let db = mongoose.connection;

//check db error
db.on('error', function(err) {
    console.log(err);
    process.exit();
});

//check connection
db.once('open', function() {
    console.log('connection to mongodb');
});
/**
 * Enabling CORS(Cross Origin Resource Sharing) on Node 
 */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

var users = require('./api/models/user.model');


app.set('port', (process.env.PORT || 3080));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


var home = function(req, resp) {
    fs.readFile("./public/dist/index.html", function(err, data) {
        resp.writeHeader(200, { "Content-Type": "text/html" });
        resp.write(data);
        resp.end();
    });
};
/* this section handle all api */
app.get("/", home);
var routes = require("./api/routes/app.routes.js");
routes(app);
/*
general routes and UI path
 */

app.use(express.static(__dirname + '/public/dist/'));
app.use(cors());
/*
finally start the server
 */
app.listen(app.get('port'), function() {
    console.log('Server listening to port http://localhost:' + app.get('port'));
});