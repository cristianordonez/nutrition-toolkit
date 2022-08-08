"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryTextField = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var Search_1 = __importDefault(require("@mui/icons-material/Search"));
var QueryTextField = function (_a) {
    var query = _a.query, handleInputChange = _a.handleInputChange;
    return (react_1.default.createElement(material_1.TextField, { id: 'query', required: true, "data-testid": 'query-text-field', InputProps: {
            startAdornment: (react_1.default.createElement(material_1.InputAdornment, { position: 'start' },
                react_1.default.createElement(Search_1.default, null))),
        }, label: 'Item', helperText: 'Enter an ingredient or item you want your search to contain (i.e. chicken, greek yogurt, etc.)', value: query, onChange: handleInputChange }));
};
exports.QueryTextField = QueryTextField;
//# sourceMappingURL=QueryTextField.js.map