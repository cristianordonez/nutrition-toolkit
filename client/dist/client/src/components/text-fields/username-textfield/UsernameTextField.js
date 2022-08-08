"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameTextField = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var UsernameTextField = function (_a) {
    var showSignup = _a.showSignup, handleCreateAccountChange = _a.handleCreateAccountChange, handleLoginChange = _a.handleLoginChange;
    return (react_1.default.createElement(material_1.TextField, { inputProps: { 'data-testid': 'username-textfield' }, required: true, onChange: showSignup ? handleCreateAccountChange : handleLoginChange, label: 'Username', type: 'text', variant: 'filled', name: 'username', placeholder: 'Username', fullWidth: true, id: 'username', helperText: 'Enter your username' }));
};
exports.UsernameTextField = UsernameTextField;
//# sourceMappingURL=UsernameTextField.js.map