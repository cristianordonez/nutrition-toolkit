"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchInput = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var SearchInput = function (_a) {
    var route = _a.route, handleRouteChange = _a.handleRouteChange;
    return (react_1.default.createElement(material_1.FormControl, null,
        react_1.default.createElement(material_1.InputLabel, null, "Search"),
        react_1.default.createElement(material_1.Select, { value: route, onChange: handleRouteChange, label: 'Search', required: true, "data-testid": 'select-search-input' },
            react_1.default.createElement(material_1.MenuItem, { value: 'recipes' }, "Recipes"),
            react_1.default.createElement(material_1.MenuItem, { value: 'groceryProducts' }, "Grocery Products"),
            react_1.default.createElement(material_1.MenuItem, { value: 'menuItems' }, "Menu items")),
        react_1.default.createElement(material_1.FormHelperText, null, "Choose the type of item you are searching for.")));
};
exports.SearchInput = SearchInput;
//# sourceMappingURL=SearchInput.js.map