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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Menu_1 = __importDefault(require("@mui/icons-material/Menu"));
var material_1 = require("@mui/material");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = __importDefault(require("axios"));
var react_router_dom_2 = require("react-router-dom");
var authContext_1 = require("../../context/authContext");
var LOGO_svg_1 = __importDefault(require("../../../img/LOGO.svg"));
var App_1 = require("../../pages/App");
var styles_1 = require("@mui/material/styles");
var Brightness4_1 = __importDefault(require("@mui/icons-material/Brightness4"));
var Brightness7_1 = __importDefault(require("@mui/icons-material/Brightness7"));
var react_router_dom_3 = require("react-router-dom");
var pages = ['Search', 'Macro Calculator', 'Meal Plan'];
var NavBar = function (_a) {
    var isLoggedIn = _a.isLoggedIn, isSettingsPage = _a.isSettingsPage;
    var location = (0, react_router_dom_3.useLocation)();
    var theme = (0, styles_1.useTheme)();
    var colorMode = (0, react_1.useContext)(App_1.ColorModeContext);
    var navigate = (0, react_router_dom_1.useNavigate)();
    var isLoading = (0, authContext_1.useAuth)();
    var _b = (0, react_1.useState)(false), isOpen = _b[0], setIsOpen = _b[1];
    var _c = react_1.default.useState(null), anchorElNav = _c[0], setAnchorElNav = _c[1];
    var _d = react_1.default.useState(null), anchorElUser = _d[0], setAnchorElUser = _d[1];
    var handleOpenNavMenu = function (event) {
        setAnchorElNav(event.currentTarget);
    };
    var handleOpenUserMenu = function (event) {
        setAnchorElUser(event.currentTarget);
    };
    var handleCloseNavMenu = function () {
        setAnchorElNav(null);
    };
    var handleMenuClick = function () {
        setAnchorElUser(null);
    };
    var handleUserProfileClick = function () {
        setAnchorElUser(null);
        navigate('/settings');
    };
    var handleLogout = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, axios_1.default.post('/api/logout')];
                case 1:
                    response = _a.sent();
                    navigate('/', { state: { loggedOut: true }, replace: true });
                    return [3, 3];
                case 2:
                    err_1 = _a.sent();
                    console.log('err:', err_1);
                    return [3, 3];
                case 3: return [2];
            }
        });
    }); };
    var handleNavigateToHome = function () {
        navigate('/');
    };
    return (react_1.default.createElement(material_1.AppBar, { position: 'fixed', sx: {
            zIndex: function (theme) { return theme.zIndex.drawer + 1; },
            boxShadow: 'none',
            padding: '0 1vw',
        }, color: 'default', enableColorOnDark: true },
        react_1.default.createElement(material_1.Toolbar, { disableGutters: true },
            react_1.default.createElement(material_1.Box, { component: 'img', src: LOGO_svg_1.default, sx: {
                    display: { md: 'flex' },
                    mr: 1,
                    objectFit: 'contain',
                    height: '2.5rem',
                    '&:hover': {
                        cursor: 'pointer',
                    },
                }, onClick: handleLogout }),
            react_1.default.createElement(material_1.Typography, { variant: 'h6', noWrap: true, "data-testid": 'navlink', onClick: handleLogout, sx: {
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    flexGrow: 1,
                    '&:hover': {
                        cursor: 'pointer',
                    },
                } }, "DiabetesCalculator"),
            isLoggedIn === true ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(material_1.Box, { sx: {
                        flexGrow: 1,
                        display: { xs: 'flex', md: 'none' },
                    } },
                    react_1.default.createElement(material_1.IconButton, { size: 'large', "aria-label": 'account of current user', "aria-controls": 'menu-appbar', "aria-haspopup": 'true', onClick: handleOpenNavMenu, color: 'inherit' },
                        react_1.default.createElement(Menu_1.default, null)),
                    react_1.default.createElement(material_1.Menu, { id: 'menu-appbar', anchorEl: anchorElNav, anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                        }, keepMounted: true, transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                        }, open: Boolean(anchorElNav), onClose: handleCloseNavMenu, sx: {
                            display: { xs: 'block', md: 'none' },
                        } },
                        react_1.default.createElement(material_1.Stack, { direction: 'column' }, pages.map(function (page) {
                            return page.toLowerCase().replace(' ', '') ===
                                location.pathname.slice(1) ? (react_1.default.createElement(react_router_dom_2.NavLink, { onClick: handleCloseNavMenu, key: page, to: "/".concat(page
                                    .toLowerCase()
                                    .replace(/ /g, '')) }, page)) : (react_1.default.createElement(material_1.Link, { onClick: handleCloseNavMenu, key: page, underline: 'hover', variant: 'overline', color: 'secondary', href: "/".concat(page
                                    .toLowerCase()
                                    .replace(/ /g, '')) }, page));
                        })))),
                react_1.default.createElement(material_1.Box, { sx: {
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex' },
                        gap: 2,
                    } }, isSettingsPage !== undefined &&
                    isSettingsPage === true ? (react_1.default.createElement(material_1.Button, { variant: 'text', onClick: function () { return history.back(); } }, "Go Back")) : (pages.map(function (page) {
                    return page.toLowerCase().replace(' ', '') ===
                        location.pathname.slice(1) ? (react_1.default.createElement(material_1.Link, { key: page, underline: 'hover', variant: 'overline', href: "/".concat(page
                            .toLowerCase()
                            .replace(/ /g, '')) }, page)) : (react_1.default.createElement(material_1.Link, { key: page, underline: 'hover', variant: 'overline', color: 'secondary', href: "/".concat(page
                            .toLowerCase()
                            .replace(/ /g, '')) }, page));
                }))),
                react_1.default.createElement(material_1.Box, { sx: { flexGrow: 0 } },
                    react_1.default.createElement(material_1.Tooltip, { title: 'Open settings' },
                        react_1.default.createElement(material_1.IconButton, { onClick: handleOpenUserMenu, sx: { p: 0 }, "data-testid": 'avatar' },
                            react_1.default.createElement(material_1.Avatar, { alt: 'Remy Sharp' }))),
                    react_1.default.createElement(material_1.Menu, { sx: { mt: '45px' }, id: 'menu-appbar', anchorEl: anchorElUser, anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        }, keepMounted: true, transformOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        }, open: Boolean(anchorElUser), onClose: handleMenuClick },
                        react_1.default.createElement(material_1.MenuItem, { onClick: handleUserProfileClick },
                            react_1.default.createElement(material_1.Typography, { textAlign: 'center' }, "User Profile")),
                        react_1.default.createElement(material_1.MenuItem, { onClick: handleLogout, "data-testid": 'logout-btn' },
                            react_1.default.createElement(material_1.Typography, { textAlign: 'center' }, "Logout")))))) : (react_1.default.createElement(material_1.Link, { href: '/login', underline: 'hover', "data-testid": 'home-page', className: 'navbar-login', variant: 'overline', sx: { fontWeight: 'bold', marginLeft: 'auto' } },
                react_1.default.createElement(material_1.Typography, { variant: 'overline' }, "Log in"))),
            react_1.default.createElement(material_1.IconButton, { sx: { ml: 1 }, onClick: colorMode.toggleColorMode, color: 'inherit' }, theme.palette.mode === 'dark' ? (react_1.default.createElement(Brightness7_1.default, null)) : (react_1.default.createElement(Brightness4_1.default, null))))));
};
exports.default = NavBar;
//# sourceMappingURL=NavBar.js.map