"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoPageFound = void 0;
var react_1 = __importDefault(require("react"));
var _404_not_found_svg_1 = __importDefault(require("../../../img/404-not-found.svg"));
var material_1 = require("@mui/material");
var NoPageFound = function () {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Typography, { variant: 'h1' }, "No Page Found"),
        react_1.default.createElement("img", { src: _404_not_found_svg_1.default })));
};
exports.NoPageFound = NoPageFound;
//# sourceMappingURL=404.js.map