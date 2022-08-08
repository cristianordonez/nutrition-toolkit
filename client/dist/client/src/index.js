"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./index.scss");
var client_1 = __importDefault(require("react-dom/client"));
var App_1 = require("./pages/App");
var react_router_dom_1 = require("react-router-dom");
var root = client_1.default.createRoot(document.getElementById('root'));
root.render(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
    react_1.default.createElement(App_1.App, null)));
//# sourceMappingURL=index.js.map