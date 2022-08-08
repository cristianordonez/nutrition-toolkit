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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = void 0;
var react_1 = __importStar(require("react"));
var material_1 = require("@mui/material");
var HomePageCard_1 = require("../../components/home-page-card/HomePageCard");
var CustomAlert_1 = require("../../components/shared/CustomAlert");
var NavBar_1 = __importDefault(require("../../components/navbar/NavBar"));
require("./Home.scss");
var dietitian_svg_1 = __importDefault(require("../../../img/dietitian.svg"));
var male_chef_svg_1 = __importDefault(require("../../../img/male-chef.svg"));
var schedule_svg_1 = __importDefault(require("../../../img/schedule.svg"));
var calculate_svg_1 = __importDefault(require("../../../img/calculate.svg"));
var react_router_dom_1 = require("react-router-dom");
var Home = function () {
    var _a = (0, react_1.useState)('success'), alertSeverity = _a[0], setAlertSeverity = _a[1];
    var _b = (0, react_1.useState)(false), openAlert = _b[0], setOpenAlert = _b[1];
    var _c = (0, react_1.useState)(''), alertMessage = _c[0], setAlertMessage = _c[1];
    var handleAlert = function () {
        setOpenAlert(!openAlert);
    };
    var cardMessages = [
        'Use our Macronutrient Calculator to find your estimated daily carbohydrate needs',
        'Search for recipes, grocery products or menu items that match your nutrient needs',
        'Save your favorite items to your meal plan and view how many carbs you have left',
    ];
    var cardTitles = [
        'Calculate Your Macronutrient Needs',
        'Search For Matching Food Items',
        'Create Your Own Custom Mealplan',
    ];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var cardImages = [calculate_svg_1.default, male_chef_svg_1.default, schedule_svg_1.default];
    var location = (0, react_router_dom_1.useLocation)();
    (0, react_1.useEffect)(function () {
        if (location.state && location.state.loggedOut) {
            setAlertSeverity('success');
            setAlertMessage('You have been logged out.');
            setOpenAlert(true);
        }
    }, [location]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(NavBar_1.default, { isLoggedIn: false }),
        react_1.default.createElement("div", { className: 'home-page' },
            react_1.default.createElement(material_1.Stack, { direction: { xs: 'column', sm: 'row' }, className: 'home-title-image', alignItems: 'center', gap: 4 },
                react_1.default.createElement(material_1.Stack, { direction: 'column' },
                    react_1.default.createElement(material_1.Typography, { textAlign: { xs: 'center', sm: 'left' }, variant: 'h2' }, "The Diabetes Calculator"),
                    react_1.default.createElement(material_1.Typography, { variant: 'body1' }, "We help you calculate your daily carbohydrate needs and give you the power to create and customize your own custom meal plan."),
                    react_1.default.createElement("div", { className: 'home-btn' },
                        react_1.default.createElement(material_1.Button, { variant: 'contained', onClick: function () { return navigate('/login'); }, "data-testid": 'home-page' }, "Log in"))),
                react_1.default.createElement("img", { src: dietitian_svg_1.default })),
            react_1.default.createElement(material_1.Typography, { variant: 'h4' }, "How It Works"),
            react_1.default.createElement(material_1.Slide, { in: true, direction: 'right' },
                react_1.default.createElement(material_1.Grid, { container: true, spacing: 2, alignItems: 'stretch' }, cardMessages.map(function (message, index) { return (react_1.default.createElement(HomePageCard_1.HomePageCard, { key: message, body: message, title: cardTitles[index], image: cardImages[index] })); })))),
        react_1.default.createElement(CustomAlert_1.CustomAlert, { openAlert: openAlert, handleAlert: handleAlert, alertSeverity: alertSeverity, alertMessage: alertMessage })));
};
exports.Home = Home;
//# sourceMappingURL=Home.js.map