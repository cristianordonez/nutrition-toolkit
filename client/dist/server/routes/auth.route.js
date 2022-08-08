"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var userController = __importStar(require("../controllers/user.controller"));
var passport_1 = __importDefault(require("passport"));
var router = (0, express_1.Router)();
exports.router = router;
router.get('/', function (req, res) {
    console.log('req.session:', req.session);
    res.status(200).json({
        status: 'success',
        data: {
            name: 'Diabetes Meal Plan',
            version: '1.0.0',
        },
    });
});
router.get('/login/federated/google', passport_1.default.authenticate('google'));
router.get('/oauth2/redirect/google', passport_1.default.authenticate('google', {
    failureRedirect: 'http://localhost:3000/login',
    failureMessage: true,
}), function (req, res) {
    var session = req.session;
    req.session.user_id = session.passport.user;
    res.redirect('http://localhost:3000/search');
});
router.get('/authentication', function (req, res) {
    console.log('1. in authentication route');
    userController.checkAuthentication(req, res);
});
router.post('/signup', function (req, res) {
    userController.createAccount(req, res);
});
router.post('/metrics', function (req, res) {
    console.log('here in post metrics');
    userController.createMetrics(req, res);
});
router.get('/metrics', function (req, res) {
    userController.getMetrics(req, res);
});
router.put('/metrics', function (req, res) {
    userController.updateMetrics(req, res);
});
router.post('/login', passport_1.default.authenticate('local', {
    failureRedirect: "/error",
    failureMessage: true,
}), function (req, res) {
    var user = req.user;
    req.session.user_id = user.id;
    req.session.save();
    res.status(200).send('Successfully logged in.');
});
router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.session.destroy();
        res.status(200).send('You have been logged out');
    });
});
router.get('/error', function (req, res) {
    var session = req.session;
    res.status(500).send('Incorrect username or password.');
});
//# sourceMappingURL=auth.route.js.map