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
exports.MacroCalculatorPage = void 0;
var react_1 = __importStar(require("react"));
var CustomAlert_1 = require("../../components/shared/CustomAlert");
var macro_calculator_form_1 = require("../../components/shared/macro-calculator-form");
var NavBar_1 = __importDefault(require("../../components/navbar/NavBar"));
var authContext_1 = require("../../context/authContext");
var MacroCalculatorPage = function () {
    var isLoading = (0, authContext_1.useAuth)();
    var _a = (0, react_1.useState)(false), openSnackbar = _a[0], setOpenSnackbar = _a[1];
    var _b = (0, react_1.useState)(false), showNextPage = _b[0], setShowNextPage = _b[1];
    var _c = (0, react_1.useState)(false), showSignup = _c[0], setShowSignup = _c[1];
    var _d = (0, react_1.useState)('error'), alertSeverity = _d[0], setAlertSeverity = _d[1];
    var _e = (0, react_1.useState)('No options matched your search. Try again with a broader search.'), alertMessage = _e[0], setAlertMessage = _e[1];
    var handleAlert = function (event) {
        setOpenSnackbar(false);
    };
    return isLoading ? null : (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(NavBar_1.default, { isLoggedIn: true }),
        react_1.default.createElement(macro_calculator_form_1.MacroCalculatorForm, { setOpenErrorAlert: setOpenSnackbar, setErrorMessage: setAlertMessage, setShowNextPage: setShowNextPage, setShowSignup: setShowSignup, setAlertSeverity: setAlertSeverity, page: 'macrocalculator', showNextPage: showNextPage }),
        react_1.default.createElement(CustomAlert_1.CustomAlert, { openAlert: openSnackbar, handleAlert: handleAlert, alertSeverity: alertSeverity, alertMessage: alertMessage })));
};
exports.MacroCalculatorPage = MacroCalculatorPage;
//# sourceMappingURL=MacroCalculatorPage.js.map