"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeDropDown = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var TypeDropDown = function (_a) {
    var type = _a.type, handleTypeSelect = _a.handleTypeSelect;
    return (react_1.default.createElement(material_1.FormControl, null,
        react_1.default.createElement(material_1.InputLabel, null, "Type"),
        react_1.default.createElement(material_1.Select, { value: type, onChange: handleTypeSelect, label: 'Type', required: true, id: 'type', "data-testid": 'select-type-dropdown' },
            react_1.default.createElement(material_1.MenuItem, { value: 'maincourse' }, "Main Course"),
            react_1.default.createElement(material_1.MenuItem, { value: 'sidedish' }, "Side Dish"),
            react_1.default.createElement(material_1.MenuItem, { value: 'dessert' }, "Dessert"),
            react_1.default.createElement(material_1.MenuItem, { value: 'appetizer' }, "Appetizer"),
            react_1.default.createElement(material_1.MenuItem, { value: 'salad' }, "Salad"),
            react_1.default.createElement(material_1.MenuItem, { value: 'bread' }, "Bread"),
            react_1.default.createElement(material_1.MenuItem, { value: 'breakfast' }, "Breakfast"),
            react_1.default.createElement(material_1.MenuItem, { value: 'soup' }, "Soup"),
            react_1.default.createElement(material_1.MenuItem, { value: 'beverage' }, "Beverage"),
            react_1.default.createElement(material_1.MenuItem, { value: 'sauce' }, "Sauce"),
            react_1.default.createElement(material_1.MenuItem, { value: 'marinade' }, "Marinade"),
            react_1.default.createElement(material_1.MenuItem, { value: 'fingerfood' }, "Fingerfood"),
            react_1.default.createElement(material_1.MenuItem, { value: 'snack' }, "Snack"),
            react_1.default.createElement(material_1.MenuItem, { value: 'drink' }, "Drink")),
        react_1.default.createElement(material_1.FormHelperText, null, "Choose the type of item you are searching for.")));
};
exports.TypeDropDown = TypeDropDown;
//# sourceMappingURL=TypeDropDown.js.map