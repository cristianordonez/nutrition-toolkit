"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordTextField = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var PasswordTextField = function (_a) {
    var showTextFieldError = _a.showTextFieldError, errorMessage = _a.errorMessage, showSignup = _a.showSignup, handleCreateAccountChange = _a.handleCreateAccountChange, handleLoginChange = _a.handleLoginChange;
    return (react_1.default.createElement(material_1.TextField, { required: true, error: showTextFieldError, onChange: showSignup ? handleCreateAccountChange : handleLoginChange, label: 'Password', placeholder: 'Password', type: 'password', name: 'password', variant: 'filled', fullWidth: true, helperText: showTextFieldError ? errorMessage : 'Enter your password' }));
};
exports.PasswordTextField = PasswordTextField;
//# sourceMappingURL=PasswordTextField.js.map