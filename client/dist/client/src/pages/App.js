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
exports.App = exports.ColorModeContext = void 0;
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var Home_1 = require("./home/Home");
var LoginPage_1 = require("./login-page/LoginPage");
var MacroCalculatorPage_1 = require("./macro-calculator-page/MacroCalculatorPage");
var MealPlanPage_1 = require("./meal-plan-page/MealPlanPage");
var SearchPage_1 = require("./search-page/SearchPage");
var _404_1 = require("./404-page/404");
var authContext_1 = require("../context/authContext");
var UserProfilePage_1 = require("./user-profile-page/UserProfilePage");
var material_1 = require("@mui/material");
var styles_1 = require("@mui/material/styles");
var react_2 = require("@emotion/react");
var colors_1 = require("@mui/material/colors");
var useLocalStorage_1 = require("../hooks/useLocalStorage");
var getDesignTokens = function (mode) { return ({
    palette: __assign(__assign({ mode: mode, primary: __assign(__assign({}, colors_1.teal), (mode === 'dark' && {
            main: '#14ffec',
        })) }, (mode === 'dark' && {
        background: {
            default: '#121212',
            paper: '#121212',
        },
    })), { text: __assign({}, (mode === 'light'
            ? {
                primary: colors_1.grey[900],
                secondary: colors_1.grey[800],
            }
            : {
                primary: '#fff',
                secondary: colors_1.grey[500],
            })) }),
}); };
exports.ColorModeContext = react_1.default.createContext({
    toggleColorMode: function () { },
});
var App = function () {
    var _a = (0, useLocalStorage_1.useLocalStorageState)('mode', 'dark'), mode = _a[0], setMode = _a[1];
    var colorMode = react_1.default.useMemo(function () { return ({
        toggleColorMode: function () {
            var currentMode = mode === 'light' ? 'dark' : 'light';
            localStorage.setItem('mode', mode === 'light' ? 'dark' : 'light');
            setMode(function (prevMode) {
                return prevMode === 'light' ? 'dark' : 'light';
            });
        },
    }); }, []);
    var theme = react_1.default.useMemo(function () { return (0, styles_1.createTheme)(getDesignTokens(mode)); }, [mode]);
    theme = (0, styles_1.responsiveFontSizes)(theme);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(exports.ColorModeContext.Provider, { value: colorMode },
            react_1.default.createElement(react_2.ThemeProvider, { theme: theme },
                react_1.default.createElement(material_1.CssBaseline, null),
                react_1.default.createElement(react_router_dom_1.Routes, null,
                    react_1.default.createElement(react_router_dom_1.Route, { path: '/', element: react_1.default.createElement(Home_1.Home, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: '/login', element: react_1.default.createElement(LoginPage_1.LoginPage, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: '/search', element: react_1.default.createElement(authContext_1.AuthProvider, null,
                            react_1.default.createElement(SearchPage_1.SearchPage, null)) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: '/mealplan', element: react_1.default.createElement(authContext_1.AuthProvider, null,
                            react_1.default.createElement(MealPlanPage_1.MealPlanPage, null)) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: '/macrocalculator', element: react_1.default.createElement(authContext_1.AuthProvider, null,
                            react_1.default.createElement(MacroCalculatorPage_1.MacroCalculatorPage, null)) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: '/settings', element: react_1.default.createElement(authContext_1.AuthProvider, null,
                            react_1.default.createElement(UserProfilePage_1.UserSettingsPage, null)) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: '*', element: react_1.default.createElement(_404_1.NoPageFound, null) }))))));
};
exports.App = App;
//# sourceMappingURL=App.js.map