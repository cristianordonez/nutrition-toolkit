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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchPage = void 0;
var react_1 = __importStar(require("react"));
require("./SearchPage.scss");
var search_form_1 = require("../../components/search-form");
var CustomAlert_1 = require("../../components/shared/CustomAlert");
var food_search_list_1 = require("../../components/food-search-list");
var material_1 = require("@mui/material");
var SideBarSearchPage_1 = require("../../components/sidebar-searchpage/SideBarSearchPage");
var authContext_1 = require("../../context/authContext");
var axios_1 = __importDefault(require("axios"));
var NavBar_1 = __importDefault(require("../../components/navbar/NavBar"));
var ArrowForwardIos_1 = __importDefault(require("@mui/icons-material/ArrowForwardIos"));
var SearchPage = function () {
    var isLoading = (0, authContext_1.useAuth)();
    var _a = (0, react_1.useState)([]), apiData = _a[0], setAPIData = _a[1];
    var _b = (0, react_1.useState)(false), showLoadMoreBtn = _b[0], setShowLoadMoreBtn = _b[1];
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)('recipes'), route = _d[0], setRoute = _d[1];
    var _e = (0, react_1.useState)('custom-search'), currentTab = _e[0], setCurrentTab = _e[1];
    var _f = (0, react_1.useState)(false), openSnackbar = _f[0], setOpenSnackbar = _f[1];
    var _g = (0, react_1.useState)('No options matched your search. Try again with a broader search.'), alertMessage = _g[0], setAlertMessage = _g[1];
    var _h = (0, react_1.useState)('error'), alertSeverity = _h[0], setAlertSeverity = _h[1];
    var _j = (0, react_1.useState)({
        query: '',
        type: '',
        intolerance: '',
        minCalories: '',
        maxCalories: '',
        minCarbs: '',
        maxCarbs: '',
        minProtein: '',
        maxProtein: '',
        minFat: '',
        maxFat: '',
        number: 6,
        offset: 0,
    }), values = _j[0], setValues = _j[1];
    var _k = (0, react_1.useState)({}), goals = _k[0], setGoals = _k[1];
    var _l = react_1.default.useState(false), mobileOpen = _l[0], setMobileOpen = _l[1];
    var handleDrawerToggle = function () {
        setMobileOpen(!mobileOpen);
    };
    var handleClose = function (event) {
        setOpenSnackbar(false);
    };
    var handleChange = function (event, currentValue) {
        setCurrentTab(currentValue);
    };
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var newValues, foodItems, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newValues = __assign(__assign({}, values), { offset: 0 });
                    setValues(newValues);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    setLoading(true);
                    event.preventDefault();
                    return [4, axios_1.default.get("/api/".concat(route), {
                            params: newValues,
                            withCredentials: true,
                        })];
                case 2:
                    foodItems = _a.sent();
                    if (foodItems.data.length === 0) {
                        setAlertMessage('No options matched your search. Try again with a broader search');
                        setAlertSeverity('warning');
                        setOpenSnackbar(true);
                        setShowLoadMoreBtn(false);
                    }
                    else {
                        setAlertSeverity('success');
                        setAlertMessage('Success! Here are your matching items.');
                        setOpenSnackbar(true);
                        if (foodItems.data.length < 6) {
                            setShowLoadMoreBtn(false);
                        }
                        else {
                            setShowLoadMoreBtn(true);
                        }
                    }
                    setAPIData(foodItems.data);
                    setLoading(false);
                    return [3, 4];
                case 3:
                    err_1 = _a.sent();
                    setLoading(false);
                    return [3, 4];
                case 4: return [2];
            }
        });
    }); };
    var handleSuggestedSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var newValues, suggestedValues, foodItems, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newValues = __assign(__assign({}, values), { offset: 0 });
                    setValues(newValues);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    setLoading(true);
                    event.preventDefault();
                    suggestedValues = values;
                    suggestedValues.minCalories = goals.min_calories_per_meal;
                    suggestedValues.maxCalories = goals.max_calories_per_meal;
                    suggestedValues.minCarbs = goals.min_carbs_per_meal;
                    suggestedValues.maxCarbs = goals.max_carbs_per_meal;
                    suggestedValues.minProtein = goals.min_protein_per_meal;
                    suggestedValues.maxProtein = goals.max_protein_per_meal;
                    suggestedValues.minFat = goals.min_fat_per_meal;
                    suggestedValues.maxFat = goals.max_fat_per_meal;
                    return [4, axios_1.default.get("/api/".concat(route), {
                            params: suggestedValues,
                        })];
                case 2:
                    foodItems = _a.sent();
                    if (foodItems.data.length === 0) {
                        setAlertMessage('No options matched your search. Try again with a broader search');
                        setAlertSeverity('warning');
                        setOpenSnackbar(true);
                        setShowLoadMoreBtn(false);
                    }
                    else {
                        setAlertSeverity('success');
                        setAlertMessage('Success! Here are your matching items.');
                        setOpenSnackbar(true);
                        if (foodItems.data.length < 6) {
                            setShowLoadMoreBtn(false);
                        }
                        else {
                            setShowLoadMoreBtn(true);
                        }
                    }
                    setValues(suggestedValues);
                    setAPIData(foodItems.data);
                    setLoading(false);
                    return [3, 4];
                case 3:
                    err_2 = _a.sent();
                    console.log('err:', err_2);
                    setLoading(false);
                    return [3, 4];
                case 4: return [2];
            }
        });
    }); };
    var handleLoadMore = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var newValues, newItems, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    setLoading(true);
                    newValues = __assign(__assign({}, values), { offset: values.offset + 6 });
                    setValues(newValues);
                    return [4, axios_1.default.get("/api/".concat(route), {
                            params: newValues,
                        })];
                case 1:
                    newItems = _a.sent();
                    if (newItems.data.length < 6) {
                        setShowLoadMoreBtn(false);
                    }
                    else {
                        setShowLoadMoreBtn(true);
                    }
                    setAPIData(apiData.concat(newItems.data));
                    setLoading(false);
                    return [3, 3];
                case 2:
                    err_3 = _a.sent();
                    setLoading(false);
                    console.log('err: ', err_3);
                    return [3, 3];
                case 3: return [2];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        var promise = axios_1.default.get('/api/metrics', { withCredentials: true });
        promise.then(function (results) {
            setGoals(results.data);
        });
        promise.catch(function (err) {
            console.log('er:', err);
        });
    }, []);
    var SearchFormComponent = (react_1.default.createElement(search_form_1.SearchForm, { handleSubmit: handleSubmit, handleSuggestedSubmit: handleSuggestedSubmit, route: route, setRoute: setRoute, handleChange: handleChange, currentTab: currentTab, setCurrentTab: setCurrentTab, values: values, setValues: setValues, goals: goals }));
    return (react_1.default.createElement(react_1.default.Fragment, null, isLoading ? null : (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(NavBar_1.default, { isLoggedIn: true }),
        react_1.default.createElement(material_1.Box, { className: 'search-page', sx: { width: '100vw' } },
            loading && react_1.default.createElement(material_1.CircularProgress, { size: 68 }),
            react_1.default.createElement(material_1.Toolbar, { sx: { display: { sm: 'none' } } },
                react_1.default.createElement(material_1.IconButton, { color: 'inherit', "aria-label": 'open drawer', edge: 'start', onClick: handleDrawerToggle, sx: { mr: 2, display: { sm: 'none' } } },
                    react_1.default.createElement(ArrowForwardIos_1.default, null))),
            react_1.default.createElement(SideBarSearchPage_1.SideBarSearchPage, { goals: goals, mobileOpen: mobileOpen, handleDrawerToggle: handleDrawerToggle, SearchFormComponent: SearchFormComponent, apiData: apiData }),
            apiData.length ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(food_search_list_1.FoodSearchList, { apiData: apiData, route: route, handleLoadMore: handleLoadMore, setAlertMessage: setAlertMessage, setOpenSnackbar: setOpenSnackbar, setAlertSeverity: setAlertSeverity, showLoadMoreBtn: showLoadMoreBtn }))) : (react_1.default.createElement(react_1.default.Fragment, null, SearchFormComponent)),
            react_1.default.createElement(CustomAlert_1.CustomAlert, { openAlert: openSnackbar, handleAlert: handleClose, alertSeverity: alertSeverity, alertMessage: alertMessage }))))));
};
exports.SearchPage = SearchPage;
//# sourceMappingURL=SearchPage.js.map