"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogSelectSlot = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var menuItemsArray = [
    { value: 1, name: 'Morning' },
    { value: 2, name: 'Afternoon' },
    { value: 3, name: 'Evening' },
];
var DialogSelectSlot = function (_a) {
    var slot = _a.slot, handleSelectSlot = _a.handleSelectSlot;
    return (react_1.default.createElement(material_1.FormControl, null,
        react_1.default.createElement(material_1.InputLabel, null, "Slot"),
        react_1.default.createElement(material_1.Select, { value: "".concat(slot), onChange: handleSelectSlot, label: 'Slot', required: true, fullWidth: true, id: 'slot' }, menuItemsArray.map(function (item) { return (react_1.default.createElement(material_1.MenuItem, { key: item.value, value: item.value }, item.name)); })),
        react_1.default.createElement(material_1.FormHelperText, null, "Choose correct slot for chosen day")));
};
exports.DialogSelectSlot = DialogSelectSlot;
//# sourceMappingURL=DialogSelectSlot.js.map