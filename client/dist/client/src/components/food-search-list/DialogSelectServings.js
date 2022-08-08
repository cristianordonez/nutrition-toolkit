"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogSelectServings = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var menuItemsArray = [
    { value: 1, name: '1' },
    { value: 2, name: '2' },
    { value: 3, name: '3' },
];
var DialogSelectServings = function (_a) {
    var servings = _a.servings, handleSelectServings = _a.handleSelectServings;
    return (react_1.default.createElement(material_1.FormControl, null,
        react_1.default.createElement(material_1.InputLabel, null, "Servings"),
        react_1.default.createElement(material_1.Select, { value: "".concat(servings), onChange: handleSelectServings, label: 'Servings', required: true, id: 'servings', fullWidth: true, sx: { width: '100%' } }, menuItemsArray.map(function (item) { return (react_1.default.createElement(material_1.MenuItem, { key: item.value, value: item.value }, item.name)); })),
        react_1.default.createElement(material_1.FormHelperText, null, "Choose number of servings")));
};
exports.DialogSelectServings = DialogSelectServings;
//# sourceMappingURL=DialogSelectServings.js.map