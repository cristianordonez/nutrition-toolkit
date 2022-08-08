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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMealPlanItem = exports.getMealPlanWeek = exports.getMealPlanDay = exports.addMealPlanItem = void 0;
var apiHelpers = __importStar(require("../API/api"));
var user_model_1 = require("../models/user.model");
var addMealPlanItem = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, hash, response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = req.user;
                    return [4, (0, user_model_1.getHashByUsername)(user.spoonacular_username)];
                case 1:
                    hash = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4, apiHelpers.addToSpoonacularMealplan(req.body, user.spoonacular_username, hash[0].spoonacular_hash)];
                case 3:
                    response = _a.sent();
                    console.log('response.data.status in add meal plan items: ', response.data.status);
                    res.status(201).send(response.data.status);
                    return [3, 5];
                case 4:
                    err_1 = _a.sent();
                    console.log('err:', err_1);
                    res.status(400).send('Error adding item to mealplan');
                    return [3, 5];
                case 5: return [2];
            }
        });
    });
};
exports.addMealPlanItem = addMealPlanItem;
var getMealPlanDay = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var mealplanDay, user, hash, mealplanDayItems, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mealplanDay = req.query;
                    user = req.user;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4, (0, user_model_1.getHashByUsername)(user.spoonacular_username)];
                case 2:
                    hash = _a.sent();
                    return [4, apiHelpers.getFromSpoonacularMealplanDay(user.spoonacular_username, mealplanDay.date, hash[0].spoonacular_hash)];
                case 3:
                    mealplanDayItems = _a.sent();
                    res.status(200).send(mealplanDayItems.data);
                    return [3, 5];
                case 4:
                    err_2 = _a.sent();
                    if (err_2.response.data.message === 'No meals planned for that day') {
                        res.status(400).send(err_2.response.data.message);
                    }
                    else {
                        res.status(400).send('Bad Request.');
                    }
                    return [3, 5];
                case 5: return [2];
            }
        });
    });
};
exports.getMealPlanDay = getMealPlanDay;
var getMealPlanWeek = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var mealplanWeek, user, hash, mealplanWeekItems, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mealplanWeek = req.query;
                    user = req.user;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4, (0, user_model_1.getHashByUsername)(user.spoonacular_username)];
                case 2:
                    hash = _a.sent();
                    return [4, apiHelpers.getFromSpoonacularMealplanWeek(user.spoonacular_username, mealplanWeek.date, hash[0].spoonacular_hash)];
                case 3:
                    mealplanWeekItems = _a.sent();
                    res.status(200).send('Successfully deleted mealplan item.');
                    return [3, 5];
                case 4:
                    err_3 = _a.sent();
                    console.log('err:', err_3);
                    res.status(400).send('No meal plan items found.');
                    return [3, 5];
                case 5: return [2];
            }
        });
    });
};
exports.getMealPlanWeek = getMealPlanWeek;
var deleteMealPlanItem = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, user, hash, successResponse, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    user = req.user;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4, (0, user_model_1.getHashByUsername)(user.spoonacular_username)];
                case 2:
                    hash = _a.sent();
                    return [4, apiHelpers.deleteFromSpoonacularMealplan(user.spoonacular_username, id, hash[0].spoonacular_hash)];
                case 3:
                    successResponse = _a.sent();
                    console.log(successResponse.data);
                    res.status(200).send('Item has been deleted.');
                    return [3, 5];
                case 4:
                    err_4 = _a.sent();
                    res.status(400).send('Unable to delete item.');
                    console.log('err deleting item from mealplan:', err_4);
                    return [3, 5];
                case 5: return [2];
            }
        });
    });
};
exports.deleteMealPlanItem = deleteMealPlanItem;
//# sourceMappingURL=mealplan.controller.js.map