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
exports.UserSettingsPage = void 0;
var react_1 = __importStar(require("react"));
require("./UserProfilePage.scss");
var daily_goals_1 = require("../../components/shared/daily-goals");
var CustomAlert_1 = require("../../components/shared/CustomAlert");
var material_1 = require("@mui/material");
var axios_1 = __importDefault(require("axios"));
var NavBar_1 = __importDefault(require("../../components/navbar/NavBar"));
var authContext_1 = require("../../context/authContext");
var Settings_1 = __importDefault(require("@mui/icons-material/Settings"));
var UserSettingsPage = function () {
    var isLoading = (0, authContext_1.useAuth)();
    var _a = (0, react_1.useState)(false), openAlert = _a[0], setOpenAlert = _a[1];
    var _b = (0, react_1.useState)('error'), alertSeverity = _b[0], setAlertSeverity = _b[1];
    var _c = (0, react_1.useState)(''), alertMessage = _c[0], setAlertMessage = _c[1];
    var _d = (0, react_1.useState)({}), goals = _d[0], setGoals = _d[1];
    var handleAlert = function () {
        setOpenAlert(!openAlert);
    };
    (0, react_1.useEffect)(function () {
        axios_1.default
            .get('/api/metrics')
            .then(function (results) {
            setGoals(results.data);
        })
            .catch(function (err) {
            setAlertMessage('Could not retrieve your daily goals. Please try again later.');
            setAlertSeverity('error');
            setOpenAlert(true);
        });
    }, []);
    var handleSubmitUpdatedGoals = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var totalCalories, minCalPerMeal, currentGoals, updatedGoals, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    totalCalories = Math.floor(goals.total_carbohydrates * 4 +
                        goals.total_protein * 4 +
                        goals.total_fat * 9);
                    minCalPerMeal = totalCalories <= 450 ? 0 : totalCalories / 3 - 150;
                    currentGoals = __assign(__assign({}, goals), { total_calories: totalCalories, min_calories_per_meal: Math.floor(minCalPerMeal), max_calories_per_meal: Math.floor(totalCalories / 3 + 150) });
                    setGoals(currentGoals);
                    return [4, axios_1.default.put('/api/metrics', currentGoals)];
                case 2:
                    updatedGoals = _a.sent();
                    if (updatedGoals.status === 201) {
                        setAlertMessage('Your Macronutrient goals have been updated!');
                        setAlertSeverity('success');
                        setOpenAlert(true);
                    }
                    return [3, 4];
                case 3:
                    err_1 = _a.sent();
                    setAlertMessage('Could not update goals. Please try again.');
                    setAlertSeverity('error');
                    setOpenAlert(true);
                    return [3, 4];
                case 4: return [2];
            }
        });
    }); };
    return isLoading ? null : (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(NavBar_1.default, { isLoggedIn: true, isSettingsPage: true }),
        react_1.default.createElement("div", { className: 'user-profile-page' },
            react_1.default.createElement(material_1.Stack, { direction: 'row', spacing: 1 },
                react_1.default.createElement(Settings_1.default, null),
                react_1.default.createElement(material_1.Typography, { variant: 'body1' }, "Edit your macronutrient goals to a custom amount (calories will be calculated based on your input)")),
            react_1.default.createElement(daily_goals_1.DailyGoals, { goals: goals, page: 'user-profile', setGoals: setGoals, handleSubmitUpdatedGoals: handleSubmitUpdatedGoals }),
            react_1.default.createElement(CustomAlert_1.CustomAlert, { openAlert: openAlert, handleAlert: handleAlert, alertSeverity: alertSeverity, alertMessage: alertMessage }))));
};
exports.UserSettingsPage = UserSettingsPage;
//# sourceMappingURL=UserProfilePage.js.map