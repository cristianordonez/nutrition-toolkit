"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealPlanPage = void 0;
var react_1 = __importStar(require("react"));
require("./MealPlanPage.scss");
var SideBarMealPlan_1 = require("../../components/sidebar-mealplan/SideBarMealPlan");
var DateSelectForm_1 = require("../../components/date-select-form/DateSelectForm");
var mealplan_day_1 = require("../../components/mealplan-day");
var CustomAlert_1 = require("../../components/shared/CustomAlert");
var MealPlanWeekText_1 = require("../../components/mealplan-week-text/MealPlanWeekText");
var material_1 = require("@mui/material");
var axios_1 = __importDefault(require("axios"));
var format_1 = __importDefault(require("date-fns/format"));
var NavBar_1 = __importDefault(require("../../components/navbar/NavBar"));
var getDay_1 = __importDefault(require("date-fns/getDay"));
var addDays_1 = __importDefault(require("date-fns/addDays"));
var subDays_1 = __importDefault(require("date-fns/subDays"));
var ArrowForwardIos_1 = __importDefault(require("@mui/icons-material/ArrowForwardIos"));
var authContext_1 = require("../../context/authContext");
var CalendarMonth_1 = __importDefault(require("@mui/icons-material/CalendarMonth"));
var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
var MealPlanPage = function () {
    var isLoading = (0, authContext_1.useAuth)();
    var _a = (0, react_1.useState)((0, getDay_1.default)(Date.now())), dayIndex = _a[0], setDayIndex = _a[1];
    var _b = (0, react_1.useState)([]), mealplanItems = _b[0], setMealplanItems = _b[1];
    var _c = (0, react_1.useState)(true), mealplanItemsFound = _c[0], setMealplanItemsFound = _c[1];
    var _d = (0, react_1.useState)(false), openSnackbar = _d[0], setOpenSnackbar = _d[1];
    var _e = (0, react_1.useState)('error'), alertSeverity = _e[0], setAlertSeverity = _e[1];
    var _f = (0, react_1.useState)(''), alertMessage = _f[0], setAlertMessage = _f[1];
    var _g = (0, react_1.useState)((0, format_1.default)(new Date(Date.now()), 'yyyy-MM-dd')), currentDay = _g[0], setCurrentDay = _g[1];
    var _h = (0, react_1.useState)([]), breakfastItems = _h[0], setBreakfastItems = _h[1];
    var _j = (0, react_1.useState)([]), lunchItems = _j[0], setLunchItems = _j[1];
    var _k = (0, react_1.useState)([]), dinnerItems = _k[0], setDinnerItems = _k[1];
    var _l = react_1.default.useState(new Date(Date.now())), value = _l[0], setValue = _l[1];
    var _m = react_1.default.useState(false), mobileOpen = _m[0], setMobileOpen = _m[1];
    var _o = (0, react_1.useState)([]), nutritionSummary = _o[0], setNutritionSummary = _o[1];
    var handleClose = function (event) {
        setOpenSnackbar(false);
    };
    var handleDrawerToggle = function () {
        setMobileOpen(!mobileOpen);
    };
    var handleTabChange = function (event, newValue) {
        setMealplanItems([]);
        setNutritionSummary([]);
        var prevDate = currentDay;
        var prevDayIndex = dayIndex;
        var differenceInDays = newValue - dayIndex;
        var newDate;
        var _a = getFormattedDay(currentDay), year = _a.year, month = _a.month, day = _a.day;
        if (differenceInDays > 0) {
            newDate = (0, addDays_1.default)(new Date("".concat(year, ", ").concat(month, ", ").concat(day)), differenceInDays);
        }
        else if (differenceInDays < 0) {
            newDate = (0, subDays_1.default)(new Date("".concat(year, ", ").concat(month, ", ").concat(day)), Math.abs(differenceInDays));
        }
        if (newDate !== undefined) {
            setValue(newDate);
            setDayIndex(newValue);
            setCurrentDay((0, format_1.default)(newDate, 'yyyy-MM-dd'));
        }
    };
    var getFormattedDay = function (date) {
        var dates = date.split('-');
        var year = dates[0];
        var month = dates[1];
        var day = dates[2];
        return { year: year, month: month, day: day };
    };
    (0, react_1.useEffect)(function () {
        handleDateChange();
    }, [currentDay]);
    var handleDateChange = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setMealplanItems([]);
                    setNutritionSummary([]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, axios_1.default.get('/api/mealplan/day', {
                            params: { date: currentDay },
                            withCredentials: true,
                        })];
                case 2:
                    response = _a.sent();
                    setNutritionSummary(response.data.nutritionSummary.nutrients);
                    setMealplanItems(response.data.items);
                    response.data.items.forEach(function (item) {
                        if (item.slot === 1) {
                            var currentBreakfastItems = __spreadArray(__spreadArray([], breakfastItems, true), [item], false);
                            setBreakfastItems(currentBreakfastItems);
                        }
                        else if (item.slot === 2) {
                            var currentLunchItems = __spreadArray(__spreadArray([], lunchItems, true), [item], false);
                            setLunchItems(currentLunchItems);
                        }
                        else {
                            var currentDinnerItems = __spreadArray(__spreadArray([], dinnerItems, true), [item], false);
                            setDinnerItems(currentDinnerItems);
                        }
                    });
                    return [3, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log('err in useeffect meal plan page:', err_1);
                    setAlertSeverity('info');
                    setAlertMessage('You have no items saved on this day for your mealplan.');
                    setOpenSnackbar(true);
                    setMealplanItemsFound(false);
                    return [3, 4];
                case 4: return [2];
            }
        });
    }); };
    return isLoading ? null : (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(NavBar_1.default, { isLoggedIn: true }),
        react_1.default.createElement("div", { className: 'mealplan-page' },
            react_1.default.createElement(material_1.Toolbar, { sx: { display: { sm: 'none' } } },
                react_1.default.createElement(material_1.IconButton, { color: 'inherit', "aria-label": 'open drawer', edge: 'start', onClick: handleDrawerToggle, sx: { mr: 2, display: { sm: 'none' } } },
                    react_1.default.createElement(ArrowForwardIos_1.default, null))),
            react_1.default.createElement(SideBarMealPlan_1.SidebarMealplan, { mobileOpen: mobileOpen, page: 'mealplan', handleDrawerToggle: handleDrawerToggle, nutritionSummary: nutritionSummary, mealplanItems: mealplanItems, mealplanItemsFound: mealplanItemsFound }),
            react_1.default.createElement(material_1.Box, { sx: {
                    p: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                    justifyContent: 'space-evenly',
                } },
                react_1.default.createElement(material_1.Stack, { direction: 'row', spacing: 1 },
                    react_1.default.createElement(CalendarMonth_1.default, null),
                    react_1.default.createElement(material_1.Typography, { variant: 'body1' }, "View your daily meal plan items or begin to add items to your meal plan")),
                react_1.default.createElement(DateSelectForm_1.DateSelectForm, { setBreakfastItems: setBreakfastItems, setLunchItems: setLunchItems, setDinnerItems: setDinnerItems, currentDay: currentDay, setCurrentDay: setCurrentDay, setDayIndex: setDayIndex, value: value, setValue: setValue }),
                react_1.default.createElement(MealPlanWeekText_1.MealPlanWeekText, { currentDay: currentDay }),
                react_1.default.createElement(material_1.Tabs, { value: dayIndex, onChange: handleTabChange }, days.map(function (day) { return (react_1.default.createElement(material_1.Tab, { key: day, label: day })); })),
                react_1.default.createElement(mealplan_day_1.MealplanDay, { setMealPlanItems: setMealplanItems, currentDay: currentDay, mealplanItems: mealplanItems, setOpenSnackbar: setOpenSnackbar, setAlertSeverity: setAlertSeverity, setAlertMessage: setAlertMessage }),
                react_1.default.createElement(CustomAlert_1.CustomAlert, { openAlert: openSnackbar, handleAlert: handleClose, alertSeverity: alertSeverity, alertMessage: alertMessage })))));
};
exports.MealPlanPage = MealPlanPage;
//# sourceMappingURL=MealPlanPage.js.map