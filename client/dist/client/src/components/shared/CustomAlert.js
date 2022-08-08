"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAlert = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var CustomAlert = function (_a) {
    var openAlert = _a.openAlert, handleAlert = _a.handleAlert, alertSeverity = _a.alertSeverity, alertMessage = _a.alertMessage;
    return (react_1.default.createElement(material_1.Snackbar, { anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, open: openAlert, autoHideDuration: 8000, onClose: handleAlert },
        react_1.default.createElement(material_1.Alert, { onClose: handleAlert, severity: alertSeverity, sx: { width: '100%' } }, alertMessage)));
};
exports.CustomAlert = CustomAlert;
//# sourceMappingURL=CustomAlert.js.map