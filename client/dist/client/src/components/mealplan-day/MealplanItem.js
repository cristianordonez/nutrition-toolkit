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
exports.MealplanItem = void 0;
var react_1 = __importStar(require("react"));
var ConfirmDeleteDialog_1 = require("./ConfirmDeleteDialog");
var FoodItemContents_1 = require("../shared/FoodItemContents");
var material_1 = require("@mui/material");
var axios_1 = __importDefault(require("axios"));
var MealplanItem = function (_a) {
    var position = _a.position, type = _a.type, id = _a.id, shoppingListId = _a.shoppingListId, setMealPlanItems = _a.setMealPlanItems, currentDay = _a.currentDay, servings = _a.servings, title = _a.title, setOpenSnackbar = _a.setOpenSnackbar, setAlertSeverity = _a.setAlertSeverity, setAlertMessage = _a.setAlertMessage;
    var _b = (0, react_1.useState)(null), itemData = _b[0], setItemData = _b[1];
    var _c = (0, react_1.useState)(false), openDialog = _c[0], setOpenDialog = _c[1];
    var handleOpeningDialog = function () {
        setOpenDialog(!openDialog);
    };
    (0, react_1.useEffect)(function () {
        var url = "/api/recipes/".concat(id);
        if (type === 'RECIPE') {
            url = "/api/recipes/".concat(id);
        }
        else if (type === 'PRODUCT') {
            url = "/api/groceryProducts/".concat(id);
        }
        else if (type === 'MENU_ITEM') {
            url = "/api/menuItems/".concat(id);
        }
        axios_1.default
            .get(url)
            .then(function (itemInfo) {
            setItemData(itemInfo.data);
        })
            .catch(function (err) {
            console.log('err in meal plan itemData', err);
        });
    }, [id]);
    if (itemData) {
        return (react_1.default.createElement(material_1.Grid, { item: true, xs: 12, sm: 6, md: 4, xl: 3 },
            react_1.default.createElement(FoodItemContents_1.FoodItemContents, { servings: servings, route: type, image: itemData === null || itemData === void 0 ? void 0 : itemData.image, title: title, restaurantChain: (itemData === null || itemData === void 0 ? void 0 : itemData.restaurantChain) || undefined, nutrition: itemData === null || itemData === void 0 ? void 0 : itemData.nutrition, url: (itemData === null || itemData === void 0 ? void 0 : itemData.sourceUrl) || undefined, handleOpeningDialog: handleOpeningDialog, isMealPlanItem: true }),
            react_1.default.createElement(ConfirmDeleteDialog_1.ConfirmDeleteDialog, { setMealPlanItems: setMealPlanItems, currentDay: currentDay, setOpenSnackbar: setOpenSnackbar, setAlertSeverity: setAlertSeverity, setAlertMessage: setAlertMessage, shoppingListId: shoppingListId, openDialog: openDialog, setOpenDialog: setOpenDialog, handleOpeningDialog: handleOpeningDialog })));
    }
    else {
        return react_1.default.createElement("div", null, "Loading...");
    }
};
exports.MealplanItem = MealplanItem;
//# sourceMappingURL=MealplanItem.js.map