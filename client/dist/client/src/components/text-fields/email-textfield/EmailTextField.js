"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTextField = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var EmailTextField = function (_a) {
    var handleCreateAccountChange = _a.handleCreateAccountChange;
    return (react_1.default.createElement(material_1.TextField, { required: true, onChange: handleCreateAccountChange, "data-testid": 'email-textfield', label: 'Email', placeholder: 'Email', type: 'email', name: 'email', variant: 'filled', fullWidth: true, helperText: 'Enter your email' }));
};
exports.EmailTextField = EmailTextField;
//# sourceMappingURL=EmailTextField.js.map