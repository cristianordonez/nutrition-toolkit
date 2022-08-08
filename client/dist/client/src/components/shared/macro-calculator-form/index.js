"use strict";
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
exports.MacroCalculatorForm = void 0;
var react_1 = __importDefault(require("react"));
require("./index.scss");
var axios_1 = __importDefault(require("axios"));
var material_1 = require("@mui/material");
var HeightInputField_1 = require("./HeightInputField");
var WeightInputField_1 = require("./WeightInputField");
var AgeInputField_1 = require("./AgeInputField");
var useMetrics_1 = require("../../../helper-functions/use-metrics/useMetrics");
var react_router_dom_1 = require("react-router-dom");
var bs_1 = require("react-icons/bs");
var MacroCalculatorForm = function (_a) {
    var setOpenErrorAlert = _a.setOpenErrorAlert, setErrorMessage = _a.setErrorMessage, setShowNextPage = _a.setShowNextPage, setShowSignup = _a.setShowSignup, setAlertSeverity = _a.setAlertSeverity, showNextPage = _a.showNextPage, page = _a.page;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _b = react_1.default.useState(1), activityLevel = _b[0], setActivityLevel = _b[1];
    var _c = react_1.default.useState('male'), gender = _c[0], setGender = _c[1];
    var _d = react_1.default.useState(18), age = _d[0], setAge = _d[1];
    var _e = react_1.default.useState(60), height = _e[0], setHeight = _e[1];
    var _f = react_1.default.useState(200), weight = _f[0], setWeight = _f[1];
    var handleGenderChange = function (event, newAlignment) {
        setGender(newAlignment);
    };
    var handleActivityLevelChange = function (event, newActivityLevel) {
        setActivityLevel(newActivityLevel);
    };
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var metrics, response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    metrics = (0, useMetrics_1.useMetrics)({
                        gender: gender,
                        age: age,
                        height: height,
                        weight: weight,
                        activityLevel: activityLevel,
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, axios_1.default.post("/api/metrics", metrics)];
                case 2:
                    response = _a.sent();
                    if (page === 'macrocalculator') {
                        setErrorMessage('You have updated your macronutrient needs. Go to search page to begin searching for recipes, menu items, or grocery products within this range.');
                    }
                    else {
                        setErrorMessage('You have successfully created an account. Please login.');
                    }
                    setAlertSeverity('success');
                    setOpenErrorAlert(true);
                    setShowNextPage(false);
                    setShowSignup(false);
                    return [3, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log('err:', err_1);
                    return [3, 4];
                case 4: return [2];
            }
        });
    }); };
    return (react_1.default.createElement("div", { className: 'macro-calculator-container' },
        react_1.default.createElement(material_1.Paper, { onSubmit: handleSubmit, component: 'form', className: 'macro-calculator-form', "data-testid": 'macro-calculator-signup-form', elevation: 2 },
            page !== undefined && page === 'macrocalculator' ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(material_1.Stack, { direction: 'row', sx: { gap: '1em' } },
                    react_1.default.createElement(bs_1.BsCalculatorFill, { className: 'macro-calculator-icon' }),
                    react_1.default.createElement(material_1.Typography, { align: 'center', variant: 'h6' }, "Recalculate your Macronutrient Recommendations")),
                react_1.default.createElement(material_1.Typography, { variant: 'subtitle1' }, "Fill out the form below to recalculate your recommended nutrient needs (note that all recommendations are made for individuals with Type 2 Diabetes)."))) : (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(material_1.Typography, { variant: 'h6' }, "Complete setting up your account"),
                react_1.default.createElement(material_1.Typography, { variant: 'subtitle1' }, "Fill out the form below so we can calculate your recommended nutrient needs (note that all recommendations are made for individuals with Type 2 Diabetes)."))),
            react_1.default.createElement(material_1.ToggleButtonGroup, { color: 'primary', fullWidth: true, value: gender, exclusive: true, onChange: handleGenderChange },
                react_1.default.createElement(material_1.ToggleButton, { value: 'male' }, "Male"),
                react_1.default.createElement(material_1.ToggleButton, { value: 'female' }, "Female"),
                react_1.default.createElement(material_1.ToggleButton, { value: 'other' }, "Other")),
            react_1.default.createElement(material_1.ToggleButtonGroup, { color: 'primary', fullWidth: true, value: activityLevel, exclusive: true, onChange: handleActivityLevelChange },
                react_1.default.createElement(material_1.ToggleButton, { value: 1 }, "Sedentary(no exercise)"),
                react_1.default.createElement(material_1.ToggleButton, { value: 1.25 }, "Moderate (2x - 4x per week)"),
                react_1.default.createElement(material_1.ToggleButton, { value: 1.5 }, "Active (5x+ per week)")),
            react_1.default.createElement(AgeInputField_1.AgeInputField, { age: age, setAge: setAge }),
            react_1.default.createElement(HeightInputField_1.HeightInputField, { height: height, setHeight: setHeight }),
            react_1.default.createElement(WeightInputField_1.WeightInputField, { weight: weight, setWeight: setWeight }),
            page !== undefined && page === 'macrocalculator' ? (react_1.default.createElement(material_1.Button, { fullWidth: true, "data-testid": 'recalculate-btn', onClick: function () { return setShowNextPage(true); }, variant: 'contained' }, "Recalculate")) : (react_1.default.createElement(material_1.Button, { fullWidth: true, type: 'submit', variant: 'contained' }, "Complete creating account")),
            page !== undefined && page === 'macrocalculator' ? (react_1.default.createElement(material_1.Dialog, { open: showNextPage },
                react_1.default.createElement(material_1.DialogTitle, null, "Are you sure you want to recalculate your macronutrient needs? This will overwrite your current settings."),
                react_1.default.createElement("form", null,
                    react_1.default.createElement(material_1.DialogContent, null,
                        react_1.default.createElement(material_1.Box, { display: 'flex', flexDirection: 'column', gap: '10px' })),
                    react_1.default.createElement(material_1.DialogActions, null,
                        react_1.default.createElement(material_1.Button, { variant: 'contained', "aria-label": 'submit form to recalculate macronutrients', type: 'submit' }, "Confirm"),
                        react_1.default.createElement(material_1.Button, { color: 'error', variant: 'contained', onClick: function () { return setShowNextPage(false); } }, "Cancel"))))) : null)));
};
exports.MacroCalculatorForm = MacroCalculatorForm;
//# sourceMappingURL=index.js.map