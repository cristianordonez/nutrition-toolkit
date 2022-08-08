"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var compression_1 = __importDefault(require("compression"));
var express_session_1 = __importDefault(require("express-session"));
var cors_1 = __importDefault(require("cors"));
var passport_1 = __importDefault(require("passport"));
var api_1 = require("./API/api");
var user_model_1 = require("./models/user.model");
var auth_route_1 = require("./routes/auth.route");
var recipe_route_1 = require("./routes/recipe.route");
var menuitems_route_1 = require("./routes/menuitems.route");
var groceryproducts_route_1 = require("./routes/groceryproducts.route");
var mealplan_route_1 = require("./routes/mealplan.route");
var passport_local_1 = require("passport-local");
var GoogleStrategy = require('passport-google-oidc');
var generator = require('generate-password');
var db_1 = require("./database/db");
var bcrypt_1 = __importDefault(require("bcrypt"));
var pgSession = require('connect-pg-simple')(express_session_1.default);
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '../client/dist')));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
var database = process.env.NODE_ENV === 'test' ? 'mealplans_test' : 'mealplans';
var conObject = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: 5432,
    database: database,
};
var pgStoreConfig = {
    conObject: conObject,
};
app.use((0, express_session_1.default)({
    store: new pgSession(pgStoreConfig),
    secret: "".concat(process.env.SESSION_SECRET),
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use(new passport_local_1.Strategy(function (username, password, cb) {
    db_1.db.query("SELECT id, username, hash, email FROM users WHERE username='".concat(username, "'"))
        .then(function (result) {
        if (result.length) {
            var first_1 = result[0];
            bcrypt_1.default.compare(password, first_1.hash, function (err, res) {
                if (res) {
                    cb(null, {
                        id: first_1.id,
                        username: first_1.username,
                    });
                }
                else {
                    cb(null, false, { message: 'Incorrect password' });
                }
            });
        }
    })
        .catch(function (err) {
        console.log('err in passport use local strategy:', err);
        return cb(err);
    });
}));
passport_1.default.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/api/oauth2/redirect/google',
    scope: ['profile', 'email'],
}, function (issuer, profile, done) {
    (0, user_model_1.getById)(profile.id)
        .then(function (response) {
        if (response.length > 0) {
            done(null, profile);
        }
        else {
            var password_1 = generator.generate({
                length: 8,
                numbers: true,
            });
            var spoonacularAccountPromise = (0, api_1.connectUser)({
                username: profile.displayName,
                email: profile.emails[0].value,
                password: password_1,
            }).then(function (spoonacularAccount) {
                var currentHash = bcrypt_1.default
                    .hash(password_1, 10)
                    .then(function (hash) {
                    var user = {};
                    user.spoonacular_username =
                        spoonacularAccount.data.username;
                    user.spoonacular_password =
                        spoonacularAccount.data.spoonacularPassword;
                    user.spoonacular_hash = spoonacularAccount.data.hash;
                    user.hash = hash;
                    user.username = profile.displayName;
                    user.email = profile.emails[0].value;
                    user.id = profile.id;
                    (0, user_model_1.createGoogleUser)(user).then(function (userId) {
                        done(null, profile);
                    });
                });
            });
        }
    })
        .catch(function (err) {
        console.log('err in catch get by id: ', err);
        done(err);
    });
}));
passport_1.default.serializeUser(function (user, done) {
    done(null, user.id);
});
passport_1.default.deserializeUser(function (id, cb) {
    console.log('here in deserializeUser');
    console.log('id: ', id);
    console.log('typeof id: ', typeof id);
    db_1.db.query("SELECT id, username, email, spoonacular_username FROM users WHERE id='".concat(id, "'"))
        .then(function (results) {
        console.log('results in deserialize user: ', results);
        cb(null, results[0]);
    })
        .catch(function (err) {
        console.log('err in deserialize user:', err);
        return cb(err);
    });
});
app.use('/api/recipes', recipe_route_1.router);
app.use('/api/menuItems', menuitems_route_1.router);
app.use('/api/groceryProducts', groceryproducts_route_1.router);
app.use('/api/mealplan', mealplan_route_1.router);
app.use('/api', auth_route_1.router);
app.get('/*', function (req, res) {
    if (process.env.NODE_ENV === 'production') {
        res.sendFile(path_1.default.join(__dirname, '../index.html'));
    }
    else {
        res.sendFile(path_1.default.join(__dirname, '../client/dist/index.html'));
    }
});
exports.default = app;
//# sourceMappingURL=app.js.map