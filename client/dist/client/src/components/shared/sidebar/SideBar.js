"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideBar = void 0;
var react_1 = __importDefault(require("react"));
var daily_goals_1 = require("../daily-goals");
var material_1 = require("@mui/material");
var ArrowBackIos_1 = __importDefault(require("@mui/icons-material/ArrowBackIos"));
var drawerWidth = 350;
var SideBar = function (_a) {
    var mobileOpen = _a.mobileOpen, handleDrawerToggle = _a.handleDrawerToggle, SearchFormComponent = _a.SearchFormComponent, apiData = _a.apiData, goals = _a.goals, page = _a.page, nutritionSummary = _a.nutritionSummary, mealplanItemsFound = _a.mealplanItemsFound;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        page === 'search' && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(material_1.Drawer, { variant: 'temporary', open: mobileOpen, onClose: handleDrawerToggle, ModalProps: {
                    keepMounted: true,
                }, sx: {
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        pt: '100px',
                    },
                } },
                react_1.default.createElement(material_1.Toolbar, null,
                    react_1.default.createElement(material_1.IconButton, { color: 'inherit', "aria-label": 'open drawer', edge: 'start', onClick: handleDrawerToggle, sx: { mr: 2, display: { sm: 'none' } } },
                        react_1.default.createElement(ArrowBackIos_1.default, null))),
                apiData !== undefined && apiData.length ? (SearchFormComponent) : (react_1.default.createElement(daily_goals_1.DailyGoals, { goals: goals, page: 'search' }))),
            react_1.default.createElement(material_1.Drawer, { open: true, variant: 'permanent', ModalProps: { keepMounted: true }, sx: {
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        pt: '100px',
                    },
                } }, apiData !== undefined && apiData.length ? (SearchFormComponent) : (react_1.default.createElement(daily_goals_1.DailyGoals, { goals: goals, page: 'search' }))))),
        page === 'mealplan' && goals !== undefined && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(material_1.Drawer, { variant: 'temporary', open: mobileOpen, onClose: handleDrawerToggle, ModalProps: {
                    keepMounted: true,
                }, sx: {
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        pt: '100px',
                    },
                } },
                react_1.default.createElement(material_1.Toolbar, null,
                    react_1.default.createElement(material_1.IconButton, { color: 'inherit', "aria-label": 'open drawer', edge: 'start', onClick: handleDrawerToggle, sx: { mr: 2, display: { sm: 'none' } } },
                        react_1.default.createElement(ArrowBackIos_1.default, null))),
                nutritionSummary ? (react_1.default.createElement(daily_goals_1.DailyGoals, { goals: goals, nutritionSummary: nutritionSummary, page: 'mealplan' })) : null),
            react_1.default.createElement(material_1.Drawer, { open: true, variant: 'permanent', ModalProps: { keepMounted: true }, sx: {
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        pt: '100px',
                    },
                } },
                nutritionSummary.length ? (react_1.default.createElement(daily_goals_1.DailyGoals, { goals: goals, nutritionSummary: nutritionSummary, page: 'mealplan' })) : null,
                !nutritionSummary.length && !mealplanItemsFound ? (react_1.default.createElement(daily_goals_1.DailyGoals, { goals: goals, page: 'search' })) : null)))));
};
exports.SideBar = SideBar;
//# sourceMappingURL=SideBar.js.map