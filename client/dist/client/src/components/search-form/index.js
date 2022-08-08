"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchForm = void 0;
var react_1 = __importDefault(require("react"));
require("./index.scss");
var ScreenSearchDesktop_1 = __importDefault(require("@mui/icons-material/ScreenSearchDesktop"));
var material_1 = require("@mui/material");
var SearchFormSuggested_1 = require("./SearchFormSuggested");
var SearchFormCustom_1 = require("./SearchFormCustom");
var SearchForm = function (_a) {
    var handleSubmit = _a.handleSubmit, route = _a.route, setRoute = _a.setRoute, setCurrentTab = _a.setCurrentTab, currentTab = _a.currentTab, handleChange = _a.handleChange, values = _a.values, setValues = _a.setValues, goals = _a.goals, handleSuggestedSubmit = _a.handleSuggestedSubmit;
    var handleRouteChange = function (event) {
        setRoute(event.target.value);
    };
    var handleInputChange = function (event) {
        var _a;
        setValues(__assign(__assign({}, values), (_a = {}, _a[event.target.id] = event.target.value, _a)));
    };
    var handleTypeSelect = function (event) {
        setValues(__assign(__assign({}, values), { type: event.target.value }));
    };
    return (react_1.default.createElement("div", { className: 'search-form' },
        react_1.default.createElement(material_1.Stack, { direction: 'row', spacing: 1 },
            react_1.default.createElement(ScreenSearchDesktop_1.default, null),
            react_1.default.createElement(material_1.Typography, { variant: 'body1' }, "Find recipes, grocery products, or menu items from over 800+ restaurants that match your nutrient goals")),
        react_1.default.createElement(material_1.Tabs, { value: currentTab, onChange: handleChange, "aria-label": 'toggle suggested search', className: 'search-form-tabs' },
            react_1.default.createElement(material_1.Tab, { value: 'custom-search', label: 'Custom' }),
            react_1.default.createElement(material_1.Tab, { value: 'suggested-goals', label: 'Suggested' })),
        currentTab === 'custom-search' ? (react_1.default.createElement(SearchFormCustom_1.SearchFormCustom, { route: route, values: values, handleSubmit: handleSubmit, handleRouteChange: handleRouteChange, handleInputChange: handleInputChange, handleTypeSelect: handleTypeSelect })) : (react_1.default.createElement(SearchFormSuggested_1.SearchFormSuggested, { route: route, values: values, handleRouteChange: handleRouteChange, handleInputChange: handleInputChange, handleTypeSelect: handleTypeSelect, goals: goals, handleSuggestedSubmit: handleSuggestedSubmit }))));
};
exports.SearchForm = SearchForm;
//# sourceMappingURL=index.js.map