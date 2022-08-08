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
exports.DatePickerTextField = void 0;
var react_1 = __importDefault(require("react"));
var AdapterDateFns_1 = require("@mui/x-date-pickers/AdapterDateFns");
var LocalizationProvider_1 = require("@mui/x-date-pickers/LocalizationProvider");
var DesktopDatePicker_1 = require("@mui/x-date-pickers/DesktopDatePicker");
var MobileDatePicker_1 = require("@mui/x-date-pickers/MobileDatePicker");
var material_1 = require("@mui/material");
var getFormattedDateFunc_1 = require("../../helper-functions/getFormattedDateFunc");
var getUnixTime_1 = __importDefault(require("date-fns/getUnixTime"));
var date_fns_tz_1 = require("date-fns-tz");
var startOfDay_1 = __importDefault(require("date-fns/startOfDay"));
var startOfToday_1 = __importDefault(require("date-fns/startOfToday"));
var DatePickerTextField = function (_a) {
    var setData = _a.setData, data = _a.data;
    var _b = react_1.default.useState((0, startOfToday_1.default)()), value = _b[0], setValue = _b[1];
    var handleChange = function (newValue) {
        setValue(newValue);
        var currentDate = (0, date_fns_tz_1.zonedTimeToUtc)(newValue, 'UTC');
        var _a = (0, getFormattedDateFunc_1.getFormattedDate)(currentDate), year = _a.year, month = _a.month, day = _a.day, hour = _a.hour, min = _a.min, sec = _a.sec;
        var startOfCurrentDay = (0, startOfDay_1.default)(new Date(year, month, day, hour, min, sec));
        var result = (0, getUnixTime_1.default)(startOfCurrentDay);
        setData(__assign(__assign({}, data), { date: result }));
    };
    return (react_1.default.createElement(LocalizationProvider_1.LocalizationProvider, { dateAdapter: AdapterDateFns_1.AdapterDateFns },
        react_1.default.createElement(material_1.Box, { sx: { display: { xs: 'block', sm: 'none' } } },
            react_1.default.createElement(MobileDatePicker_1.MobileDatePicker, { label: 'Select day', inputFormat: 'MM/dd/yyyy', value: value, onChange: handleChange, renderInput: function (params) { return (react_1.default.createElement(material_1.TextField, __assign({}, params, { variant: 'standard' }))); } })),
        react_1.default.createElement(material_1.Box, { sx: { display: { xs: 'none', sm: 'block' } } },
            react_1.default.createElement(DesktopDatePicker_1.DesktopDatePicker, { label: 'Select day', inputFormat: 'MM/dd/yyyy', "data-testid": 'date-picker-textfield', value: value, onChange: handleChange, renderInput: function (params) { return (react_1.default.createElement(material_1.TextField, __assign({}, params, { variant: 'standard' }))); } }))));
};
exports.DatePickerTextField = DatePickerTextField;
//# sourceMappingURL=DatePickerTextField.js.map