"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmPasswordTextField = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var ConfirmPasswordTextField = function (_a) {
    var showTextFieldError = _a.showTextFieldError, handleCreateAccountChange = _a.handleCreateAccountChange, errorMessage = _a.errorMessage;
    return (react_1.default.createElement(material_1.TextField, { required: true, "data-testid": 'confirm-password-textfield', error: showTextFieldError, label: 'Confirm Password', placeholder: 'Confirm Password', onChange: handleCreateAccountChange, type: 'password', name: 'confirmedPassword', variant: 'filled', fullWidth: true, helperText: showTextFieldError ? errorMessage : 'Enter your password' }));
};
exports.ConfirmPasswordTextField = ConfirmPasswordTextField;
//# sourceMappingURL=ConfirmPasswordTextField.js.map