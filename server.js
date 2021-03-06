var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var secret = require("./secret");
var bcrypt = require('bcrypt-nodejs');

var app = express();
var port = 8000;

//-----------Importing Controllers-----------//
var ListingCtrl = require('./Server-Assets/Controllers/ListingCtrl');
var PurchaseCtrl = require('./Server-Assets/Controllers/PurchaseCtrl');
var ClientCtrl = require('./Server-Assets/Controllers/ClientCtrl');
var UserCtrl = require('./Server-Assets/Controllers/UserCtrl');
var User = require('./Server-Assets/Models/User')
var TaskCtrl = require('./Server-Assets/Controllers/TaskCtrl')

//----------Fluff------------//
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static(__dirname+'/Public'));
app.listen(port, function () {
  console.log("Listening on port: " + port);
});

//-----------Connection to database-----------//
mongoose.connect('mongodb://localhost/simplre')
mongoose.connection.once('connected', function() {
  console.log('connected to db');
})

//-----------Passport Facebook Authentication-----------//
// app.use(session({
//     secret: secret.session,
//     resave: false,
//     saveUninitialized: false,
// }));
// app.use(passport.initialize());
// app.use(passport.session());
//
// passport.use(new FacebookStrategy({
//     clientID: secret.fb.clientID,
//     clientSecret: secret.fb.clientSecret,
//     callbackURL: "http://localhost:"+port+"/api/auth/callback",
//     profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
//     },  function(accessToken, refreshToken, profile, done) {
//   	    	process.nextTick(function(){
//   	    		User.findOne({'facebook.id': profile.id}, function(err, user){
//   	    			if(err)
//   	    				return done(err);
//   	    			if(user)
//   	    				return done(null, user);
//   	    			else {
//   	    				var newUser = new User();
//   	    				newUser.facebook.id = profile.id;
//   	    				newUser.facebook.token = accessToken;
//   	    				newUser.facebook.name = profile._json.first_name + " " + profile._json.last_name;
//                 newUser.facebook.email = profile._json.email;
//
//   	    				newUser.save(function(err){
//   	    					if(err)
//   	    						throw err;
//   	    					return done(null, newUser);
//   	    				})
//   	    				console.log(user);
//   	    			}
//   	    		});
//   	    	});
//   	    }
//
// ));

//-----------Passport Local Authentication-----------//

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false);
//       }
//       if (!user.verifyPassword(password)) {
//         return done(null, false);
//       }
//
//       return done(null, user);
//     });
//   }
// ));

//---------------------------------------------------//

// var requireAuth = function(req, res, next) {
//   if (!req.isAuthenticated()) {
//     res.redirect('/#/login');
//   }
//   else { next(); }
// };
//
// app.get("/api/auth/", passport.authenticate("facebook"));
// app.get("/api/auth/callback", passport.authenticate("facebook", {
//     successRedirect: "/#/user/dashboard",
//     failureRedirect: "/#/login"
// }));
//
// passport.serializeUser(function(user, done){
//     done(null, user);
// });
// passport.deserializeUser(function(obj, done){
//     done(null, obj);
// });
//
// app.get("/me", requireAuth, function(req, res){
//     res.json(req.user);
// });
//
// app.get("/checklogged", function(req, res){
//     res.send(req.isAuthenticated() ? req.user : '0');
// });
//
// app.get('/logout',function(req, res) {
//   req.logout();
//   res.redirect('/#/login');
// })

//-----------Client Endpoints-----------//
app.get('/api/client', ClientCtrl.read);
app.get('/api/client/:id', ClientCtrl.readOne);
app.post('/api/client', ClientCtrl.create);
app.put('/api/client/:id', ClientCtrl.update);
app.delete('/api/client/:id', ClientCtrl.delete);

//-----------Listing Contract Endpoints-----------//
app.get('/api/listing', ListingCtrl.read);
app.get('/api/listing/:id', ListingCtrl.readOne);
app.post('/api/listing', ListingCtrl.create);
app.put('/api/listing/:id', ListingCtrl.update);
app.delete('/api/listing', ListingCtrl.delete);

//-----------Purchase Contract Endpoints-----------//
app.get('/api/purchase', PurchaseCtrl.read);
app.get('/api/purchase/:id', PurchaseCtrl.readOne);
app.post('/api/purchase', PurchaseCtrl.create);
app.put('/api/purchase/:id', PurchaseCtrl.update);
app.delete('/api/purchase', PurchaseCtrl.delete);

//-----------User Endpoints-----------//
app.get('/api/user', UserCtrl.read);
app.get('/api/user/:id', UserCtrl.readOne);
// app.post('/api/user', UserCtrl.create);
app.put('/api/user/:id', UserCtrl.update);
app.delete('/api/user', UserCtrl.delete);

//-----------Task Endpoints-----------//
app.get('/api/task', TaskCtrl.read);
app.get('/api/task/:id', TaskCtrl.readOne);
app.post('/api/task', TaskCtrl.create);
app.put('/api/task/:id', TaskCtrl.update);
app.delete('/api/task', TaskCtrl.delete);
