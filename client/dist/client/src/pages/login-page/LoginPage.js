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
exports.LoginPage = void 0;
var react_1 = __importStar(require("react"));
var LoginForm_1 = require("../../components/login-form/LoginForm");
var SignupForm_1 = require("../../components/sign-up-form/SignupForm");
var CustomAlert_1 = require("../../components/shared/CustomAlert");
var NavBar_1 = __importDefault(require("../../components/navbar/NavBar"));
var LoginPage = function () {
    var _a = (0, react_1.useState)(false), showSignup = _a[0], setShowSignup = _a[1];
    var _b = (0, react_1.useState)('success'), alertSeverity = _b[0], setAlertSeverity = _b[1];
    var _c = (0, react_1.useState)(false), showTextFieldError = _c[0], setShowTextFieldError = _c[1];
    var _d = (0, react_1.useState)(false), openErrorAlert = _d[0], setOpenErrorAlert = _d[1];
    var _e = (0, react_1.useState)(''), errorMessage = _e[0], setErrorMessage = _e[1];
    var handleAlert = function () {
        setOpenErrorAlert(!openErrorAlert);
    };
    var handleRedirectToSignup = function () {
        setShowSignup(!showSignup);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(NavBar_1.default, { isLoggedIn: false }),
        showSignup ? (react_1.default.createElement(SignupForm_1.SignupForm, { showSignup: showSignup, setShowSignup: setShowSignup, setAlertSeverity: setAlertSeverity, handleRedirectToSignup: handleRedirectToSignup, showTextFieldError: showTextFieldError, setShowTextFieldError: setShowTextFieldError, errorMessage: errorMessage, setErrorMessage: setErrorMessage, setOpenErrorAlert: setOpenErrorAlert })) : (react_1.default.createElement(LoginForm_1.LoginForm, { showSignup: showSignup, handleRedirectToSignup: handleRedirectToSignup, showTextFieldError: showTextFieldError, setShowTextFieldError: setShowTextFieldError, errorMessage: errorMessage, setErrorMessage: setErrorMessage, handleErrorAlert: handleAlert })),
        react_1.default.createElement(CustomAlert_1.CustomAlert, { openAlert: openErrorAlert, handleAlert: handleAlert, alertSeverity: alertSeverity, alertMessage: errorMessage })));
};
exports.LoginPage = LoginPage;
//# sourceMappingURL=LoginPage.js.map