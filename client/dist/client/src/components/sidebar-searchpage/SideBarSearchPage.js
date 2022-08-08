"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideBarSearchPage = void 0;
var react_1 = __importDefault(require("react"));
var SideBar_1 = require("../shared/sidebar/SideBar");
var SideBarSearchPage = function (_a) {
    var mobileOpen = _a.mobileOpen, handleDrawerToggle = _a.handleDrawerToggle, SearchFormComponent = _a.SearchFormComponent, apiData = _a.apiData, goals = _a.goals;
    var drawerWidth = 350;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(SideBar_1.SideBar, { mobileOpen: mobileOpen, handleDrawerToggle: handleDrawerToggle, SearchFormComponent: SearchFormComponent, apiData: apiData, goals: goals, page: 'search' })));
};
exports.SideBarSearchPage = SideBarSearchPage;
//# sourceMappingURL=SideBarSearchPage.js.map