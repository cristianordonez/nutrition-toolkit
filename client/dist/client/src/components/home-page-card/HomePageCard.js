"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePageCard = void 0;
var react_1 = __importDefault(require("react"));
require("./HomePageCard.scss");
var material_1 = require("@mui/material");
var HomePageCard = function (_a) {
    var body = _a.body, title = _a.title, image = _a.image;
    return (react_1.default.createElement(material_1.Grid, { item: true, xs: 12, sm: 4, className: 'home-page-grid' },
        react_1.default.createElement(material_1.Card, { elevation: 2, className: 'home-page-card' },
            react_1.default.createElement(material_1.CardMedia, { component: 'img', className: 'home-page-card-image', image: image, alt: 'How to use app', height: '140' }),
            react_1.default.createElement(material_1.CardContent, null,
                react_1.default.createElement(material_1.Typography, { textAlign: 'center', variant: 'h6' }, title),
                react_1.default.createElement(material_1.Typography, { variant: 'body2' }, body)))));
};
exports.HomePageCard = HomePageCard;
//# sourceMappingURL=HomePageCard.js.map