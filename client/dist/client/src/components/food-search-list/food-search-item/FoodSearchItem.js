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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodSearchItem = void 0;
var react_1 = __importStar(require("react"));
require("./FoodSearchItem.scss");
var FoodItemContents_1 = require("../../shared/FoodItemContents");
var material_1 = require("@mui/material");
var AddToCartModal_1 = require("../AddToCartModal");
var FoodSearchItem = function (_a) {
    var route = _a.route, image = _a.image, imageType = _a.imageType, title = _a.title, nutrition = _a.nutrition, restaurantChain = _a.restaurantChain, url = _a.url, id = _a.id, setAlertMessage = _a.setAlertMessage, setOpenSnackbar = _a.setOpenSnackbar, setAlertSeverity = _a.setAlertSeverity;
    var _b = (0, react_1.useState)(false), openDialog = _b[0], setOpenDialog = _b[1];
    var handleOpeningDialog = function () {
        setOpenDialog(!openDialog);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Grid, { item: true, xs: 12, sm: 6, md: 4, "data-testid": 'food-search-item' },
            react_1.default.createElement(FoodItemContents_1.FoodItemContents, { route: route, image: image, title: title, restaurantChain: restaurantChain, nutrition: nutrition, url: url, handleOpeningDialog: handleOpeningDialog, isMealPlanItem: false })),
        react_1.default.createElement(AddToCartModal_1.AddToCartModal, { openDialog: openDialog, handleOpeningDialog: handleOpeningDialog, route: route, imageType: imageType, title: title, id: id, setOpenDialog: setOpenDialog, setAlertMessage: setAlertMessage, setOpenSnackbar: setOpenSnackbar, setAlertSeverity: setAlertSeverity })));
};
exports.FoodSearchItem = FoodSearchItem;
//# sourceMappingURL=FoodSearchItem.js.map