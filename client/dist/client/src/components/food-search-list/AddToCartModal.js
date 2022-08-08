"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.AddToCartModal = void 0;
var react_1 = __importStar(require("react"));
var DialogSelectServings_1 = require("./DialogSelectServings");
var DialogSelectSlot_1 = require("./DialogSelectSlot");
var material_1 = require("@mui/material");
var DatePickerTextField_1 = require("./DatePickerTextField");
var axios_1 = __importDefault(require("axios"));
var getUnixTime_1 = __importDefault(require("date-fns/getUnixTime"));
var startOfToday_1 = __importDefault(require("date-fns/startOfToday"));
var AddToCartModal = function (_a) {
    var openDialog = _a.openDialog, handleOpeningDialog = _a.handleOpeningDialog, route = _a.route, imageType = _a.imageType, title = _a.title, id = _a.id, setOpenDialog = _a.setOpenDialog, setAlertMessage = _a.setAlertMessage, setOpenSnackbar = _a.setOpenSnackbar, setAlertSeverity = _a.setAlertSeverity;
    var currentType;
    if (route === 'recipes') {
        currentType = 'RECIPE';
    }
    else if (route === 'groceryProducts') {
        currentType = 'PRODUCT';
    }
    else {
        currentType = 'MENU_ITEM';
    }
    var _b = (0, react_1.useState)({
        date: (0, getUnixTime_1.default)((0, startOfToday_1.default)()),
        slot: 1,
        position: 0,
        type: currentType,
        value: {
            id: id,
            servings: 1,
            title: title,
            imageType: imageType,
        },
    }), data = _b[0], setData = _b[1];
    var handleSelectSlot = function (event) {
        setData(__assign(__assign({}, data), { slot: parseInt(event.target.value) }));
    };
    var handleSelectServings = function (event) {
        setData(function (data) {
            return __assign(__assign({}, data), { value: __assign(__assign({}, data.value), { servings: parseInt(event.target.value) }) });
        });
    };
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, axios_1.default.post('/api/mealplan', data)];
                case 2:
                    response = _a.sent();
                    setAlertSeverity('success');
                    setAlertMessage('Item has been added to your mealplan!');
                    setOpenSnackbar(true);
                    setOpenDialog(false);
                    return [3, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log('err:', err_1);
                    return [3, 4];
                case 4: return [2];
            }
        });
    }); };
    return (react_1.default.createElement(material_1.Dialog, { open: openDialog },
        react_1.default.createElement(material_1.DialogTitle, { align: 'left' }, "Select preferred day, slot and number of servings to add to Meaplan"),
        react_1.default.createElement("form", { onSubmit: handleSubmit },
            react_1.default.createElement(material_1.DialogContent, null,
                react_1.default.createElement(material_1.Box, { display: 'flex', flexDirection: 'column', gap: '1rem' },
                    react_1.default.createElement(DatePickerTextField_1.DatePickerTextField, { setData: setData, data: data }),
                    react_1.default.createElement(DialogSelectSlot_1.DialogSelectSlot, { handleSelectSlot: handleSelectSlot, slot: data.slot }),
                    react_1.default.createElement(DialogSelectServings_1.DialogSelectServings, { handleSelectServings: handleSelectServings, servings: data.value.servings }))),
            react_1.default.createElement(material_1.DialogActions, null,
                react_1.default.createElement(material_1.Button, { "data-testid": 'add-mealplan-btn', "aria-label": 'submit form to add to meal plan', type: 'submit', variant: 'contained' }, "Submit"),
                react_1.default.createElement(material_1.Button, { variant: 'contained', "aria-label": 'cancel', onClick: handleOpeningDialog, color: 'error' }, "Cancel")))));
};
exports.AddToCartModal = AddToCartModal;
//# sourceMappingURL=AddToCartModal.js.map