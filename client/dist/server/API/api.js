"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromSpoonacularMealplan = exports.getFromSpoonacularMealplanWeek = exports.getFromSpoonacularMealplanDay = exports.addToSpoonacularMealplan = exports.getSpoonacularProductById = exports.getSpoonacularGroceryProducts = exports.getSpoonacularMenuItemById = exports.getSpoonacularMenuItems = exports.getSpoonacularRecipeById = exports.getSpoonacularRecipes = exports.connectUser = void 0;
var axios_1 = __importDefault(require("axios"));
var url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/';
var X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;
var X_RAPIDAPI_HOST = process.env.X_RAPIDAPI_HOST;
var connectUser = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var spoonacularUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, axios_1.default.post("".concat(url, "users/connect"), user, {
                    headers: {
                        'X-RapidAPI-Key': "".concat(X_RAPIDAPI_KEY),
                        'X-RapidAPI-Host': "".concat(X_RAPIDAPI_HOST),
                    },
                })];
            case 1:
                spoonacularUser = _a.sent();
                console.log(spoonacularUser);
                return [2, spoonacularUser];
        }
    });
}); };
exports.connectUser = connectUser;
var getSpoonacularRecipes = function (recipeQuery) { return __awaiter(void 0, void 0, void 0, function () {
    var intoleranceQuery, recipes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                intoleranceQuery = recipeQuery.intolerance.length
                    ? recipeQuery.intolerance
                    : false;
                return [4, axios_1.default.get("".concat(url, "recipes/complexSearch"), {
                        params: {
                            query: "".concat(recipeQuery.query),
                            intolerances: "".concat(intoleranceQuery),
                            type: "".concat(recipeQuery.type),
                            instructionsRequired: 'true',
                            addRecipeInformation: 'true',
                            sort: 'calories',
                            sortDirection: 'asc',
                            minCarbs: "".concat(recipeQuery.minCarbs),
                            maxCarbs: "".concat(recipeQuery.maxCarbs),
                            minProtein: "".concat(recipeQuery.minProtein),
                            maxProtein: " ".concat(recipeQuery.maxProtein),
                            minCalories: "".concat(recipeQuery.minCalories),
                            maxCalories: "".concat(recipeQuery.maxCalories),
                            minFat: "".concat(recipeQuery.minFat),
                            maxFat: "".concat(recipeQuery.maxFat),
                            offset: "".concat(recipeQuery.offset),
                            number: "".concat(recipeQuery.number),
                        },
                        headers: {
                            'X-RapidAPI-Key': "".concat(X_RAPIDAPI_KEY),
                            'X-RapidAPI-Host': "".concat(X_RAPIDAPI_HOST),
                        },
                    })];
            case 1:
                recipes = _a.sent();
                return [2, recipes.data.results];
        }
    });
}); };
exports.getSpoonacularRecipes = getSpoonacularRecipes;
var getSpoonacularRecipeById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUrl, recipeInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currentUrl = "".concat(url, "recipes/").concat(id, "/information?includeNutrition=true");
                return [4, axios_1.default.get(currentUrl, {
                        headers: {
                            'X-RapidAPI-Key': "".concat(X_RAPIDAPI_KEY),
                            'X-RapidAPI-Host': "".concat(X_RAPIDAPI_HOST),
                        },
                    })];
            case 1:
                recipeInfo = _a.sent();
                return [2, recipeInfo.data];
        }
    });
}); };
exports.getSpoonacularRecipeById = getSpoonacularRecipeById;
var getSpoonacularMenuItems = function (menuQuery) { return __awaiter(void 0, void 0, void 0, function () {
    var menuItems;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, axios_1.default.get("".concat(url, "food/menuItems/search"), {
                    params: {
                        query: "".concat(menuQuery.query),
                        type: "".concat(menuQuery.type),
                        addMenuItemInformation: 'true',
                        sort: 'calories',
                        sortDirection: 'asc',
                        minCarbs: "".concat(menuQuery.minCarbs),
                        maxCarbs: "".concat(menuQuery.maxCarbs),
                        minProtein: "".concat(menuQuery.minProtein),
                        maxProtein: " ".concat(menuQuery.maxProtein),
                        minCalories: "".concat(menuQuery.minCalories),
                        maxCalories: "".concat(menuQuery.maxCalories),
                        minFat: "".concat(menuQuery.minFat),
                        maxFat: "".concat(menuQuery.maxFat),
                        offset: "".concat(menuQuery.offset),
                        number: "".concat(menuQuery.number),
                    },
                    headers: {
                        'X-RapidAPI-Key': "".concat(X_RAPIDAPI_KEY),
                        'X-RapidAPI-Host': "".concat(X_RAPIDAPI_HOST),
                    },
                })];
            case 1:
                menuItems = _a.sent();
                console.log('menuItems:', menuItems);
                return [2, menuItems.data.menuItems];
        }
    });
}); };
exports.getSpoonacularMenuItems = getSpoonacularMenuItems;
var getSpoonacularMenuItemById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUrl, menuItemInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(id);
                currentUrl = "".concat(url, "food/menuItems/").concat(id);
                return [4, axios_1.default.get(currentUrl, {
                        headers: {
                            'X-RapidAPI-Key': "".concat(X_RAPIDAPI_KEY),
                            'X-RapidAPI-Host': "".concat(X_RAPIDAPI_HOST),
                        },
                    })];
            case 1:
                menuItemInfo = _a.sent();
                return [2, menuItemInfo.data];
        }
    });
}); };
exports.getSpoonacularMenuItemById = getSpoonacularMenuItemById;
var getSpoonacularGroceryProducts = function (groceryProductsQuery) { return __awaiter(void 0, void 0, void 0, function () {
    var groceryProducts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, axios_1.default.get("".concat(url, "food/products/search"), {
                    params: {
                        query: "".concat(groceryProductsQuery.query),
                        type: "".concat(groceryProductsQuery.type),
                        addProductInformation: 'true',
                        sort: 'calories',
                        sortDirection: 'asc',
                        maxCarbs: "".concat(groceryProductsQuery.maxCarbs),
                        minCarbs: "".concat(groceryProductsQuery.minCarbs),
                        minProtein: "".concat(groceryProductsQuery.minProtein),
                        maxProtein: " ".concat(groceryProductsQuery.maxProtein),
                        minCalories: "".concat(groceryProductsQuery.minCalories),
                        maxCalories: "".concat(groceryProductsQuery.maxCalories),
                        minFat: "".concat(groceryProductsQuery.minFat),
                        maxFat: "".concat(groceryProductsQuery.maxFat),
                        offset: "".concat(groceryProductsQuery.offset),
                        number: "".concat(groceryProductsQuery.number),
                    },
                    headers: {
                        'X-RapidAPI-Key': "".concat(X_RAPIDAPI_KEY),
                        'X-RapidAPI-Host': "".concat(X_RAPIDAPI_HOST),
                    },
                })];
            case 1:
                groceryProducts = _a.sent();
                return [2, groceryProducts.data.products];
        }
    });
}); };
exports.getSpoonacularGroceryProducts = getSpoonacularGroceryProducts;
var getSpoonacularProductById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUrl, productInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currentUrl = "".concat(url, "food/products/").concat(id);
                console.log('currentUrl:', currentUrl);
                return [4, axios_1.default.get(currentUrl, {
                        headers: {
                            'X-RapidAPI-Key': "".concat(X_RAPIDAPI_KEY),
                            'X-RapidAPI-Host': "".concat(X_RAPIDAPI_HOST),
                        },
                    })];
            case 1:
                productInfo = _a.sent();
                return [2, productInfo.data];
        }
    });
}); };
exports.getSpoonacularProductById = getSpoonacularProductById;
var addToSpoonacularMealplan = function (data, spoonacularUsername, hash) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('data in add to meal plan:', data);
                return [4, axios_1.default.post("".concat(url, "mealplanner/").concat(spoonacularUsername, "/items"), data, {
                        params: {
                            hash: "".concat(hash),
                        },
                        headers: {
                            'X-RapidAPI-Key': "".concat(X_RAPIDAPI_KEY),
                            'X-RapidAPI-Host': "".concat(X_RAPIDAPI_HOST),
                        },
                    })];
            case 1:
                response = _a.sent();
                return [2, response];
        }
    });
}); };
exports.addToSpoonacularMealplan = addToSpoonacularMealplan;
var getFromSpoonacularMealplanDay = function (spoonacularUsername, selectedDay, spoonacularHash) { return __awaiter(void 0, void 0, void 0, function () {
    var options, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options = {
                    method: 'GET',
                    url: "".concat(url, "mealplanner/").concat(spoonacularUsername, "/day/").concat(selectedDay),
                    params: { hash: spoonacularHash },
                    headers: {
                        'X-RapidAPI-Key': "".concat(X_RAPIDAPI_KEY),
                        'X-RapidAPI-Host': "".concat(X_RAPIDAPI_HOST),
                    },
                };
                console.log('options in meal plan day get: ', options);
                console.log('here in get from spoon meal plan day: ');
                return [4, axios_1.default.request(options)];
            case 1:
                response = _a.sent();
                return [2, response];
        }
    });
}); };
exports.getFromSpoonacularMealplanDay = getFromSpoonacularMealplanDay;
var getFromSpoonacularMealplanWeek = function (spoonacular_username, selectedWeek, spoonacular_hash) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, axios_1.default.get("".concat(url, "mealplanner/").concat(spoonacular_username, "/week/").concat(selectedWeek), {
                    params: { hash: spoonacular_hash },
                    headers: {
                        'X-RapidAPI-Key': "".concat(X_RAPIDAPI_KEY),
                        'X-RapidAPI-Host': "".concat(X_RAPIDAPI_HOST),
                    },
                })];
            case 1:
                response = _a.sent();
                return [2, response];
        }
    });
}); };
exports.getFromSpoonacularMealplanWeek = getFromSpoonacularMealplanWeek;
var deleteFromSpoonacularMealplan = function (spoonacularUsername, id, spoonacularHash) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUrl, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currentUrl = "".concat(url, "mealplanner/").concat(spoonacularUsername, "/items/").concat(id, "?hash=").concat(spoonacularHash);
                return [4, axios_1.default.delete(currentUrl, {
                        headers: {
                            'X-RapidAPI-Key': "".concat(X_RAPIDAPI_KEY),
                            'X-RapidAPI-Host': "".concat(X_RAPIDAPI_HOST),
                        },
                    })];
            case 1:
                response = _a.sent();
                return [2, response];
        }
    });
}); };
exports.deleteFromSpoonacularMealplan = deleteFromSpoonacularMealplan;
//# sourceMappingURL=api.js.map