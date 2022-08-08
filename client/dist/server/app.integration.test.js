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
process.env.NODE_ENV = 'test';
var supertest_1 = __importDefault(require("supertest"));
var jestGlobals_1 = require("../jestGlobals");
var app_1 = __importDefault(require("./app"));
var db_1 = require("./database/db");
var schemas = require('./database/SQL').schemas;
var request = (0, supertest_1.default)(app_1.default);
var cookie;
var testCookie;
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    var beforeResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, db_1.db.query(schemas.session)];
            case 1:
                _a.sent();
                return [4, db_1.db.query(schemas.users)];
            case 2:
                _a.sent();
                return [4, db_1.db.query(schemas.daily_goals)];
            case 3:
                _a.sent();
                return [4, request.post('/api/signup').send({
                        username: 'test',
                        email: 'test@email.com',
                        password: 'password',
                    })];
            case 4:
                beforeResponse = _a.sent();
                testCookie = beforeResponse.headers['set-cookie'];
                return [2];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, db_1.db.query("DROP TABLE session")];
            case 1:
                _a.sent();
                return [4, db_1.db.query('DROP TABLE daily_goals')];
            case 2:
                _a.sent();
                return [4, db_1.db.query('DROP TABLE users')];
            case 3:
                _a.sent();
                return [4, request.post('/api/logout').set('Cookie', testCookie)];
            case 4:
                _a.sent();
                return [2];
        }
    });
}); });
describe('Authentication routes', function () {
    test('GET /: should allow user to access base url with no errors', function () { return __awaiter(void 0, void 0, void 0, function () {
        var currentResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, request.get('/api')];
                case 1:
                    currentResponse = _a.sent();
                    (0, jestGlobals_1.expect)(currentResponse.statusCode).toBe(200);
                    return [2];
            }
        });
    }); });
    test('POST /signup: it should allow user to create an account and then set session', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, request.post('/api/signup').send({
                        username: 'test_user',
                        email: 'testemail@email.com',
                        password: 'password',
                    })];
                case 1:
                    response = _a.sent();
                    (0, jestGlobals_1.expect)(response.statusCode).toBe(201);
                    cookie = response.headers['set-cookie'];
                    return [2];
            }
        });
    }); });
    test('POST /metrics: it should allow user to add metrics', function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, metricsResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = {
                        total_carbohydrates: 200,
                        min_carbs_per_meal: 45,
                        max_carbs_per_meal: 65,
                        total_protein: 200,
                        min_protein_per_meal: 45,
                        max_protein_per_meal: 65,
                        total_fat: 200,
                        min_fat_per_meal: 45,
                        max_fat_per_meal: 75,
                        total_calories: 2000,
                        min_calories_per_meal: 400,
                        max_calories_per_meal: 700,
                    };
                    return [4, request
                            .post('/api/metrics')
                            .set('Cookie', cookie)
                            .send(body)];
                case 1:
                    metricsResponse = _a.sent();
                    (0, jestGlobals_1.expect)(metricsResponse.statusCode).toBe(201);
                    return [2];
            }
        });
    }); });
    test('POST /login: should allow user to login', function () { return __awaiter(void 0, void 0, void 0, function () {
        var loginResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, request
                        .post('/api/login')
                        .set('Cookie', testCookie)
                        .send({
                        username: 'test_user',
                        password: 'password',
                    })];
                case 1:
                    loginResponse = _a.sent();
                    (0, jestGlobals_1.expect)(loginResponse.statusCode).toBe(200);
                    return [2];
            }
        });
    }); });
    test('GET /metrics: should allow user to retrieve metrics from database', function () { return __awaiter(void 0, void 0, void 0, function () {
        var metricsResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, request
                        .get('/api/metrics')
                        .set('Cookie', cookie)];
                case 1:
                    metricsResponse = _a.sent();
                    (0, jestGlobals_1.expect)(metricsResponse.statusCode).toBe(200);
                    (0, jestGlobals_1.expect)(metricsResponse.body.min_carbs_per_meal).toBe(45);
                    return [2];
            }
        });
    }); });
    test('Should allow user to get recipes from API', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getRecipesResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, request.get('/api/recipes').query({
                        query: 'chicken',
                        type: 'Main Course',
                        intolerance: '',
                        minCalories: '100',
                        maxCalories: '600',
                        minCarbs: '10',
                        maxCarbs: '50',
                        minProtein: '10',
                        maxProtein: '100',
                        minFat: '10',
                        maxFat: '100',
                        number: '10',
                        offset: 0,
                    })];
                case 1:
                    getRecipesResponse = _a.sent();
                    (0, jestGlobals_1.expect)(getRecipesResponse.statusCode).toBe(200);
                    return [2];
            }
        });
    }); });
    test('Should allow user to get menu items from API', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getMenuItemsResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, request.get('/api/menuitems').query({
                        query: 'spaghetti',
                        type: 'Main Course',
                        intolerance: '',
                        minCalories: '100',
                        maxCalories: '500',
                        minCarbs: '10',
                        maxCarbs: '40',
                        minProtein: '10',
                        maxProtein: '50',
                        minFat: '10',
                        maxFat: '50',
                        number: '10',
                        offset: 0,
                    })];
                case 1:
                    getMenuItemsResponse = _a.sent();
                    (0, jestGlobals_1.expect)(getMenuItemsResponse.statusCode).toBe(200);
                    return [2];
            }
        });
    }); });
    test('Should allow user to get grocery products from the API', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getRecipesResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, request
                        .get('/api/groceryProducts')
                        .query({
                        query: 'milk',
                        type: 'Main Course',
                        intolerance: '',
                        minCalories: '100',
                        maxCalories: '600',
                        minCarbs: '10',
                        maxCarbs: '50',
                        minProtein: '10',
                        maxProtein: '100',
                        minFat: '10',
                        maxFat: '100',
                        number: '10',
                        offset: 0,
                    })];
                case 1:
                    getRecipesResponse = _a.sent();
                    (0, jestGlobals_1.expect)(getRecipesResponse.statusCode).toBe(200);
                    return [2];
            }
        });
    }); });
    test('POST /logout: should allow user to logout', function () { return __awaiter(void 0, void 0, void 0, function () {
        var logoutResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, request
                        .post('/api/logout')
                        .set('Cookie', cookie)];
                case 1:
                    logoutResponse = _a.sent();
                    (0, jestGlobals_1.expect)(logoutResponse.statusCode).toBe(200);
                    (0, jestGlobals_1.expect)(logoutResponse.text).toBe('You have been logged out');
                    return [2];
            }
        });
    }); });
});
//# sourceMappingURL=app.integration.test.js.map