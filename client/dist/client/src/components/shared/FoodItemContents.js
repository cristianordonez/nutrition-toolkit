"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodItemContents = void 0;
var react_1 = __importDefault(require("react"));
require("./FoodSearchItemContents.scss");
var material_1 = require("@mui/material");
var Clear_1 = __importDefault(require("@mui/icons-material/Clear"));
var FoodItemContents = function (_a) {
    var route = _a.route, image = _a.image, title = _a.title, restaurantChain = _a.restaurantChain, nutrition = _a.nutrition, url = _a.url, handleOpeningDialog = _a.handleOpeningDialog, isMealPlanItem = _a.isMealPlanItem, servings = _a.servings;
    var calories, carbs, fat, protein;
    if (route === 'recipes' || route === 'RECIPE') {
        nutrition.nutrients.forEach(function (nutrient) {
            if (nutrient.name === 'Calories') {
                calories = Math.floor(nutrition.nutrients[0].amount);
            }
            else if (nutrient.name === 'Protein') {
                protein = Math.floor(nutrition.nutrients[1].amount) + 'g';
            }
            else if (nutrient.name === 'Fat') {
                fat = Math.floor(nutrition.nutrients[1].amount);
            }
            else if (nutrient.name === 'Carbohydrates') {
                carbs = Math.floor(nutrition.nutrients[3].amount) + 'g';
            }
        });
    }
    else {
        calories = nutrition.calories;
        protein = nutrition.protein;
        fat = nutrition.fat;
        carbs = nutrition.carbs;
    }
    return (react_1.default.createElement(material_1.Paper, { elevation: 1, className: 'food-search-paper' },
        react_1.default.createElement(material_1.Card, { className: 'search-item', "data-testid": 'food-search-item' },
            react_1.default.createElement(material_1.Tooltip, { title: 'Delete from Mealplan' },
                react_1.default.createElement(material_1.IconButton, { sx: {
                        position: 'absolute',
                        alignSelf: 'flex-end',
                    }, size: 'small', color: 'error', "aria-label": 'delete from mealplan', onClick: handleOpeningDialog },
                    react_1.default.createElement(Clear_1.default, null))),
            react_1.default.createElement(material_1.CardMedia, { component: 'img', alt: 'food item image', height: '160', image: image }),
            react_1.default.createElement(material_1.CardContent, null,
                react_1.default.createElement(material_1.Typography, { align: 'center', variant: 'subtitle1' }, title),
                isMealPlanItem ? (react_1.default.createElement(material_1.Stack, { direction: 'row' },
                    react_1.default.createElement(material_1.Typography, { variant: 'subtitle2' },
                        "Servings: ",
                        servings))) : null,
                route === 'menuItems' ||
                    (route === 'MENU_ITEM' && (react_1.default.createElement(material_1.Typography, { variant: 'h6' }, restaurantChain))),
                react_1.default.createElement("div", { className: 'search-item-nutrition' },
                    react_1.default.createElement("div", { className: 'search-item-nutrient' },
                        react_1.default.createElement(material_1.Typography, { variant: 'subtitle2' },
                            react_1.default.createElement("strong", null, "Calories")),
                        react_1.default.createElement(material_1.Typography, { variant: 'body1' }, calories)),
                    react_1.default.createElement("div", { className: 'search-item-nutrient' },
                        react_1.default.createElement(material_1.Typography, { variant: 'subtitle2' },
                            react_1.default.createElement("strong", null, "Carbs")),
                        react_1.default.createElement(material_1.Typography, { variant: 'body1' }, carbs)),
                    react_1.default.createElement("div", { className: 'search-item-nutrient' },
                        react_1.default.createElement(material_1.Typography, { variant: 'subtitle2' },
                            react_1.default.createElement("strong", null, "Protein")),
                        react_1.default.createElement(material_1.Typography, { variant: 'body1' }, protein)),
                    react_1.default.createElement("div", { className: 'search-item-nutrient' },
                        react_1.default.createElement(material_1.Typography, { variant: 'subtitle2' },
                            react_1.default.createElement("strong", null, "Fat")),
                        react_1.default.createElement(material_1.Typography, { variant: 'body1' }, fat)))),
            react_1.default.createElement(material_1.CardActions, { sx: { display: 'flex' } },
                url !== undefined ? (react_1.default.createElement(material_1.Button, { fullWidth: true, component: 'a', href: url, target: '_blank', className: 'card-button', variant: 'outlined', color: 'secondary', size: 'small' }, "View Recipe")) :
                    null,
                !isMealPlanItem ? (react_1.default.createElement(material_1.Button, { fullWidth: true, className: 'card-button', onClick: handleOpeningDialog, variant: 'outlined', size: 'small', "data-testid": 'open-addtomealplan-dialog' }, "Add to Mealplan")) : null))));
};
exports.FoodItemContents = FoodItemContents;
//# sourceMappingURL=FoodItemContents.js.map