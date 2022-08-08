"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMetrics = exports.getMetrics = exports.checkAuthentication = exports.createMetrics = exports.createAccount = void 0;
var userModel = __importStar(require("../models/user.model"));
var dailyGoalsModel = __importStar(require("../models/dailyGoals.model"));
var api_1 = require("../API/api");
var bcrypt_1 = __importDefault(require("bcrypt"));
var saltRounds = 10;
var createAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var checkForExistingEmail, checkForExistingUsername, spoonacularAccount, hash, user, dbResponse, session, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                return [4, userModel.getByEmail(req.body.email)];
            case 1:
                checkForExistingEmail = _a.sent();
                return [4, userModel.getByUsername(req.body.username)];
            case 2:
                checkForExistingUsername = _a.sent();
                if (!(checkForExistingEmail.length ||
                    checkForExistingUsername.length)) return [3, 3];
                res.status(500).send('An account with your email or username already exists.');
                return [3, 7];
            case 3: return [4, (0, api_1.connectUser)(req.body)];
            case 4:
                spoonacularAccount = _a.sent();
                return [4, bcrypt_1.default.hash(req.body.password, saltRounds)];
            case 5:
                hash = _a.sent();
                user = req.body;
                delete user.password;
                user.spoonacular_username = spoonacularAccount.data.username;
                user.spoonacular_password =
                    spoonacularAccount.data.spoonacularPassword;
                user.spoonacular_hash = spoonacularAccount.data.hash;
                user.hash = hash;
                return [4, userModel.create(user)];
            case 6:
                dbResponse = _a.sent();
                session = req.session;
                session.user_id = dbResponse[0].id;
                res.status(201).send('You have successfully created an account!');
                _a.label = 7;
            case 7: return [3, 9];
            case 8:
                err_1 = _a.sent();
                console.log('err in createaccount controller:', err_1);
                res.status(500).send('Unable to create an account.');
                return [3, 9];
            case 9: return [2];
        }
    });
}); };
exports.createAccount = createAccount;
var createMetrics = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var session, user_id, body, initialResponse, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                session = req.session;
                user_id = session.user_id;
                body = __assign(__assign({}, req.body), { user_id: user_id });
                console.log('here in create metrics');
                console.log('body in create metrics: ', body);
                console.log('session in create metrics: ', session);
                return [4, dailyGoalsModel.createGoals(body)];
            case 1:
                initialResponse = _a.sent();
                res.status(201).json(session.user_id);
                return [3, 3];
            case 2:
                err_2 = _a.sent();
                console.log('err:', err_2);
                res.status(400).send(err_2);
                return [3, 3];
            case 3: return [2];
        }
    });
}); };
exports.createMetrics = createMetrics;
var checkAuthentication = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var session;
    return __generator(this, function (_a) {
        console.log('2. in check authentication controller');
        session = req.session;
        if (session.passport || session.user_id) {
            res.status(201).send('User is logged in.');
        }
        else {
            res.status(500).send('User is not logged in. ');
        }
        return [2];
    });
}); };
exports.checkAuthentication = checkAuthentication;
var getMetrics = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, userGoals, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user_id = req.session.user_id;
                return [4, dailyGoalsModel.getGoals(user_id)];
            case 1:
                userGoals = _a.sent();
                res.json(userGoals[0]);
                return [3, 3];
            case 2:
                err_3 = _a.sent();
                console.log('err:', err_3);
                res.status(500).send('Unable to retrieve daily goals.');
                return [3, 3];
            case 3: return [2];
        }
    });
}); };
exports.getMetrics = getMetrics;
var updateMetrics = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var session, user_id, body, initialResponse, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                session = req.session;
                user_id = session.user_id;
                body = __assign(__assign({}, req.body), { user_id: user_id });
                return [4, dailyGoalsModel.updateGoals(body)];
            case 1:
                initialResponse = _a.sent();
                console.log('initialResponse: ', initialResponse);
                res.status(201).send(initialResponse);
                return [3, 3];
            case 2:
                err_4 = _a.sent();
                console.log('err: ', err_4);
                res.status(400).send('Unable to update daily goals.');
                return [3, 3];
            case 3: return [2];
        }
    });
}); };
exports.updateMetrics = updateMetrics;
//# sourceMappingURL=user.controller.js.map