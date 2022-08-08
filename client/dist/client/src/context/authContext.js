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
exports.useAuth = exports.AuthProvider = void 0;
var react_1 = __importStar(require("react"));
var axios_1 = __importDefault(require("axios"));
var react_router_dom_1 = require("react-router-dom");
var AuthContext = (0, react_1.createContext)({
    isLoading: true,
});
var AuthProvider = function (_a) {
    var children = _a.children;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _b = (0, react_1.useState)(false), isLoggedIn = _b[0], setIsLoggedIn = _b[1];
    var _c = (0, react_1.useState)(true), isLoading = _c[0], setIsLoading = _c[1];
    (0, react_1.useEffect)(function () {
        var promise = axios_1.default.get('/api/authentication');
        promise.then(function (response) {
            setIsLoading(false);
            setIsLoggedIn(true);
            axios_1.default
                .get('api/metrics')
                .then(function (response) {
                if (response.data.length === 0) {
                    navigate('/macrocalculator');
                }
            })
                .catch(function (err) {
                console.log('err in context daily goals: ', err);
            });
        });
        promise.catch(function (err) {
            setIsLoading(false);
            setIsLoggedIn(false);
            navigate('/', {
                state: { showError: false },
                replace: true,
            });
        });
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(AuthContext.Provider, { value: isLoading }, children)));
};
exports.AuthProvider = AuthProvider;
var useAuth = function () { return (0, react_1.useContext)(AuthContext); };
exports.useAuth = useAuth;
//# sourceMappingURL=authContext.js.map