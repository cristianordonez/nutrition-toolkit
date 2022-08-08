"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodSearchList = void 0;
var react_1 = __importDefault(require("react"));
require("./index.scss");
var FoodSearchItem_1 = require("./food-search-item/FoodSearchItem");
var Grid_1 = __importDefault(require("@mui/material/Grid"));
var Stack_1 = __importDefault(require("@mui/material/Stack"));
var Button_1 = __importDefault(require("@mui/material/Button"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var MenuBook_1 = __importDefault(require("@mui/icons-material/MenuBook"));
var FoodSearchList = function (_a) {
    var apiData = _a.apiData, route = _a.route, handleLoadMore = _a.handleLoadMore, setAlertMessage = _a.setAlertMessage, setOpenSnackbar = _a.setOpenSnackbar, setAlertSeverity = _a.setAlertSeverity, showLoadMoreBtn = _a.showLoadMoreBtn;
    return (react_1.default.createElement("div", { className: 'food-search-list' },
        react_1.default.createElement(Stack_1.default, { direction: 'row', spacing: 1 },
            react_1.default.createElement(MenuBook_1.default, null),
            react_1.default.createElement(Typography_1.default, { variant: 'body1' }, "Click on the Add to Mealplan button then choose intended date and slot (morning, afternoon, or evening) to save any item")),
        react_1.default.createElement(Grid_1.default, { container: true, spacing: 2 }, apiData.map(function (item) { return (react_1.default.createElement(FoodSearchItem_1.FoodSearchItem, { key: item.id, id: item.id, imageType: item.imageType, image: item.image, title: item.title, nutrition: item.nutrition, route: route, url: item.sourceUrl || undefined, restaurantChain: item.restaurantChain || undefined, setAlertMessage: setAlertMessage, setOpenSnackbar: setOpenSnackbar, setAlertSeverity: setAlertSeverity })); })),
        showLoadMoreBtn ? (react_1.default.createElement(Button_1.default, { fullWidth: true, onClick: handleLoadMore, variant: 'contained' }, "Load More")) : null));
};
exports.FoodSearchList = FoodSearchList;
//# sourceMappingURL=index.js.map